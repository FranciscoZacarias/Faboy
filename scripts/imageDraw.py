from PIL import Image, ImageDraw, ImageFont
import sys
import json
import base64
from io import BytesIO

try:
    keyword = sys.argv[1].upper()
except:
    keyword = "dumbfuck"

initialsize = 70
kwdlen = len(keyword) - 5

if(kwdlen > 0):
    initialsize = initialsize - (int(sys.argv[3]))*kwdlen

image = Image.open('./assets/img/' + sys.argv[2] + '.png')
font = ImageFont.truetype("VeraBI.ttf", initialsize)
draw = ImageDraw.Draw(image)

strip_width, strip_height = image.size
text_width, text_height = draw.textsize(keyword, font)
position = ((strip_width-text_width)/4,
            (strip_height-text_height)/(2 - float(sys.argv[4])))

draw.text(xy=position, text=keyword, font=font)

buffered = BytesIO()
image.save(buffered, format="PNG")
buffered.seek(0)
img_bytes = buffered.read()

base64_encoded_bytes = base64.b64encode(img_bytes)
base64_encoded_str = base64_encoded_bytes.decode('ascii')

print(json.dumps({'picture': base64_encoded_str}))
sys.stdout.flush()
