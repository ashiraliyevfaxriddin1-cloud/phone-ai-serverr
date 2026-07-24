const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

// Server ishlayotganini tekshirish
app.get("/", (req, res) => {
  res.send("Phone AI Server ishlayapti!");
});

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI chat
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        answer: "Xabar yuborilmadi."
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Sen foydali AI yordamchisisan. Har doim o'zbek tilida javob ber."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      answer: completion.choices[0].message.content
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      answer: "AI serverda xatolik yuz berdi."
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ${PORT} portda ishga tushdi`);
});
