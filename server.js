const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        answer: "Xabar yuborilmadi."
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Sen foydali va muloyim sun'iy intellekt yordamchisisan. Har doim o'zbek tilida javob ber."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      answer: "AI serverda xatolik yuz berdi."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`);
});
