import requests
import json
import os
import base64
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()

# Use provided API key directly
API_KEY = "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"

if not API_KEY:
    raise ValueError("API_KEY is missing")

url = "https://openrouter.ai/api/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://github.com",  # Optional: for OpenRouter analytics
    "X-Title": "Zine Image Generator"  # Optional: for OpenRouter analytics
}

# Create images directory
images_dir = Path("images")
images_dir.mkdir(exist_ok=True)

def generate_image(prompt, filename, aspect_ratio="16:9"):
    """Generate an image and save it to the images directory"""
    print(f"\nGenerating: {filename}")
    print(f"Prompt: {prompt}")
    
    payload = {
        "model": "google/gemini-2.5-flash-image-preview",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "modalities": ["image", "text"],
        "image_config": {
            "aspect_ratio": aspect_ratio
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code != 200:
            error_data = response.json() if response.text else {}
            print(f"✗ Error {response.status_code}: {error_data.get('error', {}).get('message', response.text[:200])}")
            return None
            
        result = response.json()
        
        if result.get("choices"):
            message = result["choices"][0]["message"]
            if message.get("images"):
                for image in message["images"]:
                    image_url = image["image_url"]["url"]
                    
                    # Extract base64 data
                    if image_url.startswith("data:image"):
                        # Format: data:image/png;base64,iVBORw0KGgo...
                        header, data = image_url.split(",", 1)
                        image_data = base64.b64decode(data)
                        
                        # Determine file extension from header
                        if "png" in header:
                            ext = ".png"
                        elif "jpeg" in header or "jpg" in header:
                            ext = ".jpg"
                        else:
                            ext = ".png"
                        
                        filepath = images_dir / f"{filename}{ext}"
                        with open(filepath, "wb") as f:
                            f.write(image_data)
                        
                        print(f"✓ Saved to {filepath}")
                        return filepath
        else:
            print(f"✗ No image generated. Response: {result}")
            return None
            
    except Exception as e:
        print(f"✗ Error generating image: {e}")
        return None

# Image generation prompts for the zine
images_to_generate = [
    {
        "filename": "hongkong_office",
        "prompt": "Hong Kong financial district office building exterior, modern glass skyscraper, business district, highly detailed anime style, Makoto Shinkai style, vibrant colors, cinematic lighting, daytime, no text",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "voice_cloning_attack",
        "prompt": "Abstract visualization of voice cloning attack, showing sound waves transforming, AI technology concept, stylized anime art, cybernetic aesthetic, neon colors, dark background, purely visual, no text",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "password_cracking",
        "prompt": "Abstract visualization of password cracking, showing abstract lock symbols being decoded by AI, digital security concept, stylized anime art, matrix style, cybernetic glow, dark background, purely visual, no text",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "sim_swap_attack",
        "prompt": "Clean infographic illustration showing SIM swap attack flow using icons only: phone icon, signal tower, transfer arrows, stylized anime aesthetic, clean lines, cel shaded, professional layout, step-by-step process, no text, no words",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "three_locks",
        "prompt": "Minimalist illustration of three overlapping security locks, simple to complex progression, stylized anime art, clean lines, cel shaded, vibrant colors, white on black background, modern elegant, no text",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "chain_links",
        "prompt": "Visual metaphor of security chain with three links, one weak link highlighted in red, stylized anime art, clean lines, dramatic angle, cybernetic details, white background, no text",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "yubikey_product",
        "prompt": "Professional product illustration of YubiKey security key, stylized anime art, high quality detailed, clean lighting, premium tech product aesthetic, modern, no text",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "timeline_evolution",
        "prompt": "Clean timeline visualization showing evolution of authentication security using icons only: single lock, then phone, then biometric/key, stylized anime aesthetic, clean lines, cel shaded, white background, no text, no words",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "ceo_portrait",
        "prompt": "Professional business portrait of Asian CEO in Hong Kong office, confident executive, modern office background, highly detailed anime style, Makoto Shinkai style, cinematic lighting, business attire, no text",
        "aspect_ratio": "3:4"
    }
]

if __name__ == "__main__":
    print("Starting image generation for zine...")
    print(f"API Key loaded: {'✓' if API_KEY else '✗'}")
    
    generated = {}
    for img in images_to_generate:
        filepath = generate_image(img["prompt"], img["filename"], img["aspect_ratio"])
        if filepath:
            generated[img["filename"]] = str(filepath)
    
    print(f"\n✓ Generated {len(generated)} images")
    print(f"Images saved to: {images_dir.absolute()}")
    
    # Save mapping for reference
    with open(images_dir / "image_mapping.json", "w") as f:
        json.dump(generated, f, indent=2)
    print(f"\n✓ Image mapping saved to {images_dir / 'image_mapping.json'}")

