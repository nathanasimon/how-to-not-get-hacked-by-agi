import requests
import json
import os
import base64
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
if not API_KEY:
    raise ValueError("OPENROUTER_API_KEY not found in .env file")

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
        response.raise_for_status()
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
        "prompt": "Professional Hong Kong financial district office building exterior, modern glass skyscraper, business district, clean minimalist photography, professional architectural photo, daytime",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "voice_cloning_attack",
        "prompt": "Abstract visualization of voice cloning attack, showing sound waves transforming, AI technology concept, clean modern design, minimalist tech aesthetic, professional infographic style, dark background",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "password_cracking",
        "prompt": "Abstract visualization of password cracking, showing password characters being decoded by AI, digital security concept, clean minimalist design, professional tech aesthetic, dark background with glowing elements",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "sim_swap_attack",
        "prompt": "Clean infographic showing SIM swap attack flow, phone company call, voice cloning visualization, number transfer diagram, minimalist design, professional cybersecurity infographic, step-by-step process",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "three_locks",
        "prompt": "Minimalist illustration of three overlapping security locks, simple to complex progression, clean Apple design style, white on black background, professional vector art, modern elegant",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "chain_links",
        "prompt": "Visual metaphor of security chain with three links, one weak link highlighted in red, clean minimalist design, professional infographic style, Apple aesthetic, white background",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "yubikey_product",
        "prompt": "Professional product photography of YubiKey security key, minimalist Apple-style lighting, clean white background, premium tech product aesthetic, high quality detailed, modern",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "timeline_evolution",
        "prompt": "Clean timeline visualization showing evolution of authentication security: 1FA pre-internet era, 2FA internet age, 3FA AI age, minimalist design, professional infographic, Apple style, white background",
        "aspect_ratio": "16:9"
    },
    {
        "filename": "ceo_portrait",
        "prompt": "Professional business portrait of Asian CEO in Hong Kong office, confident executive, modern office background, professional corporate photography, clean lighting, business attire",
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

