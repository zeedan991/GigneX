from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Gig Connect Backend is running"}
