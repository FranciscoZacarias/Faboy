from PIL import Image, ImageDraw, ImageFont
import sys, json, base64
from io import BytesIO

try:
	keyword = sys.argv[1].upper()
except:
	keyword = "dumbfuck"

image = Image.open('/Users/frank/Desktop/Work/Projetos_/Faboy/assets/100meme.png')
font = ImageFont.truetype("impact.ttf", 60)
draw = ImageDraw.Draw(image)
draw.text(xy=(10,85), text=keyword, fill=(0,0,0), font=font)

buffered = BytesIO()
image.save(buffered, format="PNG")
buffered.seek(0)
img_bytes = buffered.read()

base64_encoded_bytes = base64.b64encode(img_bytes)
base64_encoded_str = base64_encoded_bytes.decode('ascii')

print(json.dumps({'picture': base64_encoded_str}))
sys.stdout.flush()