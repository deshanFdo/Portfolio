import os
from pdfminer.high_level import extract_text

path = r"c:\Project Repos\Portfolio\frontend\public\Deshan_Fernando_CV.pdf"
if os.path.exists(path):
    try:
        text = extract_text(path)
        print(text)
    except Exception as e:
        print(f"Error extracting: {e}")
else:
    print(f"File not found at: {path}")
    # Try finding it in public folder relative to cwd
    cwd = os.getcwd()
    print(f"Current working directory: {cwd}")
