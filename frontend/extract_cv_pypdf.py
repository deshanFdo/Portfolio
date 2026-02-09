from pypdf import PdfReader
try:
    reader = PdfReader(r"c:\Project Repos\Portfolio\frontend\public\Deshan_Fernando_CV.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    print(text)
except Exception as e:
    print(f"Error: {e}")
