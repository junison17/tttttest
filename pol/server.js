require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // 'public' 폴더에 'index.html'과 'script.js' 파일이 위치해야 합니다.

app.post('/generate-text', async (req, res) => {
    const userInput = req.body.prompt;
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003", // 모델을 GPT-4 turbo로 변경하세요.
                prompt: userInput,
                max_tokens: 150
            })
        });
        const data = await response.json();
        res.json({ text: data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

