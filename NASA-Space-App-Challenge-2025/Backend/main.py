# from fastapi import FastAPI
# from fastapi.responses import Response
# import httpx

# app = FastAPI()

# @app.get("/proxy/{body}/{rest_of_path:path}")
# async def proxy_tiles(body: str, rest_of_path: str):
#     """
#     Proxy NASA Trek tiles to bypass CORS restrictions.
#     Example: /proxy/Moon/EQ/... -> https://trek.nasa.gov/tiles/Moon/EQ/...
#     """
#     url = f"https://trek.nasa.gov/tiles/{body}/{rest_of_path}"
    
#     async with httpx.AsyncClient() as client:
#         r = await client.get(url)
    
#     # Return the image with correct headers
#     return Response(
#         content=r.content,
#         media_type=r.headers.get("content-type", "image/jpeg"),
#         headers={"Access-Control-Allow-Origin": "*"}
#     )


# backend/main.py
from fastapi import FastAPI
from fastapi.responses import Response, JSONResponse
import httpx
from PIL import Image
import io
from ultralytics import YOLO

app = FastAPI()

# Use a small YOLO model (will download if needed)
# You can switch to "yolov8n.pt" or another weight you prefer.
model = YOLO("yolov8n.pt")

@app.get("/proxy/{body}/{rest_of_path:path}")
async def proxy_tiles(body: str, rest_of_path: str, detect: bool = False):
    """
    Proxy NASA Trek tiles; when ?detect=true runs the YOLO detector and returns JSON features.
    """
    url = f"https://trek.nasa.gov/tiles/{body}/{rest_of_path}"
    async with httpx.AsyncClient() as client:
        r = await client.get(url)

    if r.status_code != 200:
        # forward non-200 status and content
        return Response(content=r.content, status_code=r.status_code)

    image_bytes = r.content

    if detect:
        # Run detection
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        results = model.predict(source=img, device="cpu")  # runs prediction, returns Results
        features = []
        for res in results:  # usually just one result for a single image
            if getattr(res, "boxes", None) is None:
                continue
            # res.boxes.xyxy -> tensor (N,4); res.boxes.cls -> tensor (N,)
            xyxy = res.boxes.xyxy.cpu().numpy() if len(res.boxes.xyxy) else []
            cls  = res.boxes.cls.cpu().numpy().astype(int) if len(res.boxes.cls) else []
            names = res.names  # dict: id->name
            for (x1, y1, x2, y2), c in zip(xyxy, cls):
                x1, y1, x2, y2 = float(x1), float(y1), float(x2), float(y2)
                c = int(c)
                name = names.get(c, str(c))
                features.append({
                    "xmin": x1,
                    "ymin": y1,
                    "xmax": x2,
                    "ymax": y2,
                    "type": str(name),
                    "xmin_norm": x1 / img.width,
                    "xmax_norm": x2 / img.width,
                    "ymin_norm": y1 / img.height,
                    "ymax_norm": y2 / img.height,
                })
        return JSONResponse(content={"features": features}, headers={"Access-Control-Allow-Origin": "*"})

    # normal passthrough (tile image)
    return Response(
        content=image_bytes,
        media_type=r.headers.get("content-type", "image/jpeg"),
        headers={"Access-Control-Allow-Origin": "*"}
    )
    
