# Ask Llama

Ask Llama is an interactive question-answering application powered by Llama-based language models. It enables users to ask questions and receive intelligent, context-aware responses.

## Features

- Natural language question answering
- Fast and accurate responses
- User-friendly interface
- Easily extensible for custom use cases\
- Can be used offline

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ask-llama.git
    cd ask-llama
    ```
2. Install dependencies:
    ```bash
    pip install -r requirement.txt
    ```
    Please note : You must have llama3.2:1b installed on your system. You can install it from the official ollama website.

## Usage

Run the application:
```bash
    uvicorn main:app --reload
```
Make sure you also run the html file to interact with the LLM through a web Interface.

## Configuration

No configuration file is required by default. The application runs with built-in settings.

## License

This project is currently unlicensed. All rights reserved.
