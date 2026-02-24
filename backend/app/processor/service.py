from google import genai
from google.genai import types
from typing import List
from fastapi import UploadFile
import json
from dotenv import load_dotenv

load_dotenv()

client = genai.Client()

async def process_menu_with_gemini(files: List[UploadFile]):

    prompt = """
    Analizuj te zdjęcia menu. Wyciągnij wszystkie pozycje. 
    Zwróć dane WYŁĄCZNIE jako czysty JSON (lista obiektów).
    Zwróć tylko pozycje w języku angielskim.
    Format: [{"id": "unikalny_id", "category": "kategoria (np. Cocktail, Beer, Wine, Drink)", "name": "nazwa", "price": cena_jako_liczba, "volume": "pojemność (wartość liczbowa, zostaw puste jeśli brak informacji)", "ingredients": ["składniki jako tablica stringów"], "description": "opis (np. smak, aromat, itp.)"}, "section": "sekcja w menu, czyli na przykład alkohole mocne, wina (jeśli na zdjęciu nie ma nazwy sekcji, pozostaw puste)"]
    Nie dodawaj żadnych markdownowych znaczników typu ``` json.
    """
    
    content_parts: List[str | types.Part] = [prompt]
    
    for file in files:
        img_bytes = await file.read()
        m_type = file.content_type or "image/png" 
        
        content_parts.append(
            types.Part.from_bytes(data=img_bytes, mime_type=m_type)
        )
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=content_parts,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
        )
    )
        
    if response.text is None:
        return {"error": "Model did not return any content.", "raw": None}

    text_data = response.text.strip()

    # cleaning response json
    if text_data.startswith("```"):
        lines = text_data.splitlines()
        if lines[0].startswith("```"): lines = lines[1:]
        if lines[-1].startswith("```"): lines = lines[:-1]
        text_data = "\n".join(lines).strip()

    try:
        return json.loads(text_data)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON", "raw": text_data}