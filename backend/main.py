from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_bot(data: Message):
    try:
        # Streamed response from Ollama
        response = requests.post(
            "http://localhost:11434/api/chat",
            json={
                "model": "llama3.2:1b",
                "messages": [{"role": "user", "content": data.message}],
                "stream": True
            },
            stream=True
        )

        response.raise_for_status()

        full_reply = ""
        for line in response.iter_lines():
            if line:
                line_data = json.loads(line.decode("utf-8"))
                message_content = line_data.get("message", {}).get("content")
                if message_content:
                    full_reply += message_content

        return {"response": full_reply if full_reply else "No response from model."}

    except Exception as e:
        return {"response": f"Error talking to Ollama: {str(e)}"}
