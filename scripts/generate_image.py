#!/usr/bin/env python3
"""
OpenAI Image Generation Script

Generates images using OpenAI's image generation APIs with predefined style blocks.

Usage:
  python generate_image.py "your prompt here" --output path/to/image.png
  python generate_image.py "your prompt" --style social --output image.png
  python generate_image.py "your prompt" --model gpt-image-1 --size 1024x1536 --quality high --output image.png
"""

import argparse
import base64
import os
import sys
import urllib.request
from pathlib import Path

from openai import OpenAI

# ============================================================================
# STYLE BLOCKS - Define reusable, consistent image styles
# ============================================================================

STYLES = {
    "queer-collage": (
        "vintage Dutch storybook silhouettes, linocut, woodcut, flat 2D, "
        "symbolic suns stars stairs, punk poster collage, torn paper, "
        "ransom-note text, neon bursts acid green laser pink safety orange, "
        "rope strands, riso grain, photocopy texture, "
        "queer strange joyful intimate"
    ),
    "queer-collage-no-text": (
        "vintage Dutch storybook silhouettes, linocut, woodcut, flat 2D, "
        "symbolic suns stars stairs, punk poster collage, torn paper, "
        "neon bursts acid green laser pink safety orange, "
        "rope strands, riso grain, photocopy texture, "
        "no text, no letters, no words, "
        "queer strange joyful intimate"
    ),
}

# ============================================================================
# CONFIGURATION
# ============================================================================

DEFAULT_MODEL = "gpt-image-1"
DEFAULT_SIZE = "1024x1024"
DEFAULT_QUALITY = "high"
DEFAULT_STYLE = "brand"

SUPPORTED_MODELS = ("gpt-image-1", "dall-e-3", "dall-e-2")
SUPPORTED_SIZES = ("1024x1024", "1024x1536", "1536x1024")
SUPPORTED_QUALITIES = ("low", "medium", "high", "auto")


def get_api_key() -> str:
    """Get OpenAI API key from environment."""
    key = os.getenv("OPENAI_API_KEY")
    if not key:
        raise ValueError(
            "OPENAI_API_KEY environment variable not set. "
            "Please set it before running this script."
        )
    return key


def build_prompt(base_prompt: str, style: str | None = None) -> str:
    """Build the final prompt by appending the style block."""
    if not style:
        return base_prompt

    if style not in STYLES:
        raise ValueError(
            f"Unknown style: {style}. Available styles: {', '.join(STYLES.keys())}"
        )

    style_block = STYLES[style]
    return f"{base_prompt}, {style_block}"


def generate_image(
    prompt: str,
    output_path: str,
    model: str = DEFAULT_MODEL,
    size: str = DEFAULT_SIZE,
    quality: str = DEFAULT_QUALITY,
    style: str | None = DEFAULT_STYLE,
    n: int = 1,
) -> dict:
    """
    Generate an image using OpenAI's image generation API.

    Args:
        prompt: Text description of the image to generate
        output_path: Where to save the generated image
        model: Model to use (gpt-image-1, dall-e-3, dall-e-2)
        size: Image size (1024x1024, 1024x1536, 1536x1024)
        quality: Image quality (low, medium, high, standard, hd)
        style: Style preset to apply (brand, minimal, icon, social, realistic, illustration)
        n: Number of images to generate

    Returns:
        Dictionary with generation metadata
    """
    # Validate inputs
    if model not in SUPPORTED_MODELS:
        raise ValueError(
            f"Unsupported model: {model}. "
            f"Supported: {', '.join(SUPPORTED_MODELS)}"
        )

    if size not in SUPPORTED_SIZES:
        raise ValueError(
            f"Unsupported size: {size}. "
            f"Supported: {', '.join(SUPPORTED_SIZES)}"
        )

    if quality not in SUPPORTED_QUALITIES:
        raise ValueError(
            f"Unsupported quality: {quality}. "
            f"Supported: {', '.join(SUPPORTED_QUALITIES)}"
        )

    # Build prompt with style
    final_prompt = build_prompt(prompt, style)

    # Initialize client
    client = OpenAI(api_key=get_api_key())

    # Prepare output directory
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)

    # Call API
    print(f"Generating image with {model}...")
    print(f"Prompt: {final_prompt}")
    print(f"Size: {size}, Quality: {quality}")

    response = client.images.generate(
        model=model,
        prompt=final_prompt,
        size=size,
        quality=quality,
        n=n,
    )

    # Save image(s)
    if n == 1:
        # Get image URL or base64
        img_data = response.data[0]
        if hasattr(img_data, 'b64_json') and img_data.b64_json:
            image_b64 = img_data.b64_json
            image_bytes = base64.b64decode(image_b64)
        elif hasattr(img_data, 'url') and img_data.url:
            image_bytes = urllib.request.urlopen(img_data.url).read()
        else:
            raise ValueError("No image data received from API")

        output_file.write_bytes(image_bytes)
        print(f"✓ Image saved to: {output_file}")
        return {"success": True, "output": str(output_file), "count": 1}
    else:
        saved_paths = []
        for idx, img_data in enumerate(response.data):
            # Get image URL or base64
            if hasattr(img_data, 'b64_json') and img_data.b64_json:
                image_b64 = img_data.b64_json
                image_bytes = base64.b64decode(image_b64)
            elif hasattr(img_data, 'url') and img_data.url:
                image_bytes = urllib.request.urlopen(img_data.url).read()
            else:
                raise ValueError(f"No image data received for image {idx + 1}")

            # Add index to filename if multiple
            stem = output_file.stem
            suffix = output_file.suffix
            indexed_path = output_file.parent / f"{stem}_{idx}{suffix}"
            indexed_path.write_bytes(image_bytes)
            saved_paths.append(str(indexed_path))
            print(f"✓ Image {idx + 1} saved to: {indexed_path}")

        return {"success": True, "outputs": saved_paths, "count": n}


def main():
    parser = argparse.ArgumentParser(
        description="Generate images using OpenAI's image generation API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python generate_image.py "a cat playing guitar" --output cat.png
  python generate_image.py "office space" --style minimal --output office.png
  python generate_image.py "abstract art" --model dall-e-3 --quality hd --output art.png

Available styles: {styles}
        """.format(styles=", ".join(STYLES.keys())),
    )

    parser.add_argument(
        "prompt",
        nargs="?",
        default=None,
        help="Text description of the image to generate",
    )
    parser.add_argument(
        "--output",
        required=False,
        help="Path where the image will be saved",
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_MODEL,
        choices=SUPPORTED_MODELS,
        help=f"Image generation model (default: {DEFAULT_MODEL})",
    )
    parser.add_argument(
        "--size",
        default=DEFAULT_SIZE,
        choices=SUPPORTED_SIZES,
        help=f"Image size (default: {DEFAULT_SIZE})",
    )
    parser.add_argument(
        "--quality",
        default=DEFAULT_QUALITY,
        choices=SUPPORTED_QUALITIES,
        help=f"Image quality (default: {DEFAULT_QUALITY})",
    )
    parser.add_argument(
        "--style",
        default=DEFAULT_STYLE,
        choices=list(STYLES.keys()) + ["none"],
        help=f"Style preset to apply (default: {DEFAULT_STYLE})",
    )
    parser.add_argument(
        "--count",
        type=int,
        default=1,
        help="Number of images to generate (default: 1)",
    )
    parser.add_argument(
        "--list-styles",
        action="store_true",
        help="List all available style presets and exit",
    )

    args = parser.parse_args()

    # Handle --list-styles
    if args.list_styles:
        print("Available style presets:\n")
        for name, description in STYLES.items():
            print(f"  {name:15} {description}")
        return 0

    # Validate required arguments when not using --list-styles
    if not args.prompt or not args.output:
        parser.error("prompt and --output are required (unless using --list-styles)")

    try:
        # Handle 'none' style
        style = None if args.style == "none" else args.style

        result = generate_image(
            prompt=args.prompt,
            output_path=args.output,
            model=args.model,
            size=args.size,
            quality=args.quality,
            style=style,
            n=args.count,
        )

        if result.get("success"):
            if "outputs" in result:
                print(f"\n✓ Generated {result['count']} images successfully")
            else:
                print(f"\n✓ Image generated successfully")
            return 0
        else:
            print(f"\n✗ Generation failed")
            return 1

    except ValueError as e:
        print(f"✗ Error: {e}", file=sys.stderr)
        return 1
    except KeyError as e:
        print(f"✗ API key error: {e}", file=sys.stderr)
        return 1
    except Exception as e:
        print(f"✗ Unexpected error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
