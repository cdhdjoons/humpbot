require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Start Training Agent 🤖", web_app: { url: "https://humpgame.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "🔘 Follow on X 🐦", url: "https://x.com/" }],
      [{ text: "🔘 Join Telegram Chat 💬", url: "https://t.me/HUMP_official" }],
    ],
  };

  const message = `
🎉 Welcome to HUMP AI! 🤖🥚
You've just cracked into the world of AI-powered MemeFi — where even falling eggs get smarter.

🌟 Here’s what you can do:
🧠 Train your very own Humpty AI Agent
🎮 Complete daily missions and AI tasks
🏆 Climb the leaderboard and earn $HUMP rewards
🎁 Unlock secret challenges as your agent evolves

🔄 From fall to rise, from laughs to tokens — your eggventure begins now.

🚀 Ready to hatch your mission?
Tap a button below and let your agent begin the journey!
  `;

  const pngUrl = 'https://humpbot.vercel.app/humppic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

