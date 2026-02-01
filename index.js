const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow

const bot = mineflayer.createBot({
  host: 'highways.aternos.me',
  username: 'mshmsh',
  version: '1.21.1',
  auth: 'offline',
  skipValidation: true
})

// تحميل مكتبة التحرك الذكي
bot.loadPlugin(pathfinder)

bot.on('spawn', () => {
  console.log('مشمش الآن يتفاعل في السيرفر!')
  bot.chat('أنا مشمش! جاهز للتمشي، من يريدني أن ألحقه؟')
})

// التفاعل مع الشات والأوامر
bot.on('chat', (username, message) => {
  if (username === bot.username) return

  const target = bot.players[username]?.entity

  // أمر اللحاق باللاعب
  if (message === 'تعال') {
    if (!target) {
      bot.chat('لا أراك يا ' + username + '، اقترب مني قليلاً!')
      return
    }
    const mcData = require('minecraft-data')(bot.version)
    const movements = new Movements(bot, mcData)
    
    bot.pathfinder.setMovements(movements)
    bot.pathfinder.setGoal(new GoalFollow(target, 2), true) // سيلحقك ويقف على بعد بلوكتين
    bot.chat('أنا قادم إليك!')
  }

  // أمر التوقف
  if (message === 'وقف') {
    bot.pathfinder.setGoal(null)
    bot.chat('حاضر، سأبقى هنا.')
  }

  // التفاعل مع التحية
  if (message.includes('هلا') || message.includes('هاي')) {
    bot.chat('أهلاً بك يا ' + username + '! كيف حالك؟')
  }
})

// حركات عشوائية ليبدو كلاعب حقيقي (Anti-AFK)
bot.on('physicTick', () => {
  // القفز بشكل عشوائي كل فترة
  if (Math.random() < 0.01) {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 100)
  }
  
  // الالتفات حوله ليبدو كأنه يستكشف
  if (Math.random() < 0.05) {
    const yaw = Math.random() * Math.PI * 2
    const pitch = (Math.random() - 0.5) * Math.PI
    bot.look(yaw, pitch, false)
  }
})

// التعامل مع الموت (يعود لمكانه عند الـ Spawn)
bot.on('death', () => {
  bot.chat('أوه، لقد مت! سأعود قريباً.')
})

bot.on('error', (err) => console.log('خطأ:', err.message))
bot.on('end', () => console.log('انفصل الاتصال'))
