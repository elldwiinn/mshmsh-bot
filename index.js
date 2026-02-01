const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'highways.aternos.me',
  username: 'mshmsh_test',
  version: '1.21.1',
  skipValidation: true // هذا السطر يساعد في تخطي بعض مشاكل الدخول
})

bot.on('spawn', () => {
  console.log('مشمش دخل أخيراً!')
  bot.chat('أنا هنا!')
})

bot.on('error', (err) => console.log('خطأ في الاتصال: ', err.message))
bot.on('kicked', (reason) => console.log('تم الطرد بسبب: ', reason))
