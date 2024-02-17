import qrcode
from PIL import Image, ImageDraw, ImageFont


# Set up the QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=1,
)

# Set up the inner badge image
logo = Image.open("TCD-logo-badge-only.png")
 
# taking base width
basewidth = 130
 
# adjust image size
wpercent = (basewidth/float(logo.size[0]))
hsize = int((float(logo.size[1])*float(wpercent)))
logo = logo.resize((basewidth, hsize))

def make_qr_code(number, url):
    # Add the URL to the QR code
    qr.add_data(url)
    qr.make(fit=True)

    # Create the QR code image
    img = qr.make_image(fill_color="#0070BA", back_color="white")

    # set size of badge for the center of the QR code
    pos = ((img.size[0] - logo.size[0]) // 2,
        (img.size[1] - logo.size[1]) // 2)
    img.paste(logo, pos)

    # Generate a new image with the text of the number
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("arial.ttf", 70)
    text_pos = (img.size[0]//2, img.size[1]//2 - 10)
    d.text(text_pos, str(number), (255,255,255), font=font, align="center", anchor="mm", stroke_width=1)

    
    # Save the image
    img.save("temp.png")

    # TESTING ONLY: Re-open as a PIL image so it can be shown
    img = Image.open("temp.png")
    img.show()

# Run main function
if __name__ == "__main__":
    # Run the function on one URL to test
    make_qr_code(25, "https://www.tcd.ie/disability/")