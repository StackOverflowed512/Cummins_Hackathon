import os
import json
from flask import Flask, request, jsonify
from PIL import Image
import torch
# We remove BitsAndBytesConfig as we won't use GPU quantization
from transformers import VisionEncoderDecoderModel, AutoTokenizer, AutoProcessor, AutoModelForCausalLM
import io

# Suppress warnings
os.environ['TRANSFORMERS_NO_ADVISORY_WARNINGS'] = 'true'

app = Flask(__name__)

# --- 1. SETUP PATHS AND DEVICE ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CAPTION_MODEL_PATH = os.path.join(BASE_DIR, "vit-gpt2-local")
GEMMA_MODEL_PATH = os.path.join(BASE_DIR, "gemma-local")

# We will force CPU for Gemma to ensure it loads
DEVICE = "cpu" 
print(f"--- Nutrition Detective AI Service ---")
print(f"Using device: {DEVICE} for all models to ensure compatibility.")

# --- 2. LOAD MODELS ONCE AT STARTUP ---

# Load ViT-GPT2: The "Eyes" for image captioning
try:
    print(f"Loading Image Captioning model from: {CAPTION_MODEL_PATH}")
    caption_image_processor = AutoProcessor.from_pretrained(CAPTION_MODEL_PATH, local_files_only=True)
    caption_tokenizer = AutoTokenizer.from_pretrained(CAPTION_MODEL_PATH, local_files_only=True)
    caption_model = VisionEncoderDecoderModel.from_pretrained(
        CAPTION_MODEL_PATH,
        local_files_only=True
    ).to(DEVICE) # Force this model to CPU as well
    print("✅ Image Captioning model loaded successfully.")
except Exception as e:
    print(f"❌❌ FATAL ERROR: Could not load ViT-GPT2 model. Check the 'vit-gpt2-local' folder.")
    print(f"Error details: {e}")
    exit()

# Load Gemma: The "Brain" for reasoning
try:
    print(f"Loading Gemma model from: {GEMMA_MODEL_PATH} (this will be slow on CPU, please be patient)")
    
    # =================== CRITICAL CHANGE ===================
    # We are REMOVING the quantization_config and device_map to force a simple CPU load.
    # This requires more standard RAM but avoids all GPU/bitsandbytes issues.
    gemma_tokenizer = AutoTokenizer.from_pretrained(GEMMA_MODEL_PATH, local_files_only=True)
    gemma_model = AutoModelForCausalLM.from_pretrained(
        GEMMA_MODEL_PATH,
        # No quantization_config
        # No device_map="auto"
        torch_dtype=torch.float32, # Use standard precision for CPU
        local_files_only=True
    ).to(DEVICE) # Explicitly move the entire model to the CPU
    # =======================================================
    
    print("✅ Gemma model loaded successfully on CPU.")
except Exception as e:
    print(f"❌❌ FATAL ERROR: Could not load Gemma model on CPU. You may not have enough RAM.")
    print(f"Error details: {e}")
    exit()

# --- 3. DEFINE THE PREDICTION API ENDPOINT (No changes needed here) ---
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    
    try:
        image = Image.open(io.BytesIO(file.read())).convert('RGB')
        
        # Part 1: ViT-GPT2 generates a caption
        pixel_values = caption_image_processor(images=[image], return_tensors="pt").pixel_values.to(DEVICE)
        generated_ids = caption_model.generate(pixel_values, max_length=16, num_beams=4)
        food_name = caption_tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0].strip()
        print(f"ViT-GPT2 identified: '{food_name}'")

        # Part 2: Gemma generates the nutrition fact and score
        prompt = f"""You are 'Nutrition Detective', a fun and encouraging AI for kids. A child has just taken a picture of '{food_name}'. Your task is to provide a fun, positive, kid-friendly nutrition fact and a nutrition score. The score should be between -5 (very unhealthy) and 10 (very healthy). Respond ONLY in this exact JSON format: {{"fact": "...", "score": ...}}"""
        chat = [{"role": "user", "content": prompt}]
        gemma_prompt = gemma_tokenizer.apply_chat_template(chat, tokenize=False, add_generation_prompt=True)
        gemma_inputs = gemma_tokenizer.encode(gemma_prompt, add_special_tokens=False, return_tensors="pt").to(DEVICE)
        gemma_outputs = gemma_model.generate(input_ids=gemma_inputs, max_new_tokens=150)
        gemma_response_raw = gemma_tokenizer.decode(gemma_outputs[0])
        
        try:
            start_index = gemma_response_raw.find('{')
            end_index = gemma_response_raw.rfind('}') + 1
            json_response_str = gemma_response_raw[start_index:end_index]
            gemma_data = json.loads(json_response_str)
        except Exception:
             gemma_data = {"fact": "That looks tasty! Remember to eat lots of different colors to grow strong!", "score": 1}
        print(f"Gemma generated: {gemma_data}")
        
        # Part 3: Return the final JSON response
        return jsonify({
            'food_label': food_name.title(),
            'nutrition_fact': gemma_data.get('fact', 'That looks delicious!'),
            'score': gemma_data.get('score', 1)
        })

    except Exception as e:
        print(f"An error occurred during prediction: {e}")
        return jsonify({'error': 'Failed to process image with AI pipeline.'}), 500

# --- 4. START THE FLASK SERVER ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
