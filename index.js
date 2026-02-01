const mineflayer = require('mineflayer')

const botArgs = {
  host: 'highways.aternos.me',
  username: 'mshmsh',
  version: '1.21.1',
  skipValidation: true // يساعد في تخطي مشاكل الدخول غير الرسمي
}

function createBot() {
  const bot = mineflayer.createBot(botArgs)

  bot.on('login', () => {
    console.log('مشمش سجل دخوله بنجاح!')
  })

  bot.on('spawn', () => {
    console.log('مشمش الآن داخل العالم!')
    bot.chat('أنا مشمش، لا أحد يطردني!')
  })

  // في حال حدث خطأ ECONNRESET، سيحاول البوت إعادة التشغيل بعد 5 ثوانٍ
  bot.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      console.log('السيرفر قطع الاتصال، سأحاول العودة بعد 5 ثوانٍ...')
      setTimeout(createBot, 5000)
    } else {
      console.log('خطأ غير متوقع: ', err.message)
    }
  })

  bot.on('end', () => {
    console.log('انفصل الاتصال، جاري إعادة المحاولة...')
    setTimeout(createBot, 5000)
  })
}

createBot()
