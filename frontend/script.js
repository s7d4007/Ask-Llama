        function sendMessage() {
            const inputBox = document.getElementById("userInput");
            const message = inputBox.value.trim();
            if (!message) return;

            const chatbox = document.getElementById("chatbox");

            // Add user's message
            const userMessage = document.createElement("p");
            userMessage.textContent = `You: ${message}`;
            chatbox.appendChild(userMessage);

            // Clear input
            inputBox.value = "";

            // Add loading message
            const loadingMessage = document.createElement("p");
            loadingMessage.textContent = "Bot: ...";
            chatbox.appendChild(loadingMessage);

            // Scroll to bottom
            chatbox.scrollTop = chatbox.scrollHeight;

            // Send request to backend
            fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: message })
            })
                .then(res => res.json())
                .then(data => {
                    loadingMessage.textContent = `Bot: ${data.response}`;
                    chatbox.scrollTop = chatbox.scrollHeight;
                })
                .catch(error => {
                    loadingMessage.textContent = "Bot: Error talking to server";
                    console.error(error);
                });
        }

        // Handle Enter key to send
        document.getElementById("userInput").addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
            }
        });