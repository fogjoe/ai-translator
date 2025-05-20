import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  const { text } = req.body;
  const prompt = `Translate the following English text to Simplified Chinese:\n\n"${text}"`;

  try {
    const response = await axios.post(
      'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
      {
        model: 'deepseek-v3-250324',
        messages: [{"role": "system","content": "你是人工智能助手."},{ role: 'user', content: prompt }],
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data.choices[0].message.content;
    res.json({ translation: result });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
