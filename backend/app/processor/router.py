from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.processor.service import process_menu_with_gemini

router = APIRouter()

@router.post("/upload")
async def receive_images(file: List[UploadFile] = File(...)):
    # file type validation
    for img in file:
        if not img.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File is not an image.")

    # process the images using Gemini and extract menu data
    try:
        print("Extracting data using gemini.")
        extracted_data = await process_menu_with_gemini(file)
        return {
            "status": "success",
            "data": extracted_data
        }
    except Exception as e:
        print(f"ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))