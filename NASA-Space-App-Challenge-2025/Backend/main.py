from fastapi import FastAPI
from fastapi.responses import Response
import httpx

app = FastAPI()

@app.get("/proxy/{body}/{rest_of_path:path}")
async def proxy_tiles(body: str, rest_of_path: str):
    """
    Proxy NASA Trek tiles to bypass CORS restrictions.
    Example: /proxy/Moon/EQ/... -> https://trek.nasa.gov/tiles/Moon/EQ/...
    """
    url = f"https://trek.nasa.gov/tiles/{body}/{rest_of_path}"
    
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
    
    # Return the image with correct headers
    return Response(
        content=r.content,
        media_type=r.headers.get("content-type", "image/jpeg"),
        headers={"Access-Control-Allow-Origin": "*"}
    )
