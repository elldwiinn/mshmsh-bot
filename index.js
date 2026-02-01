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

// تحميل مكتبة التحرك
bot.loadPlugin(pathfinder)

bot.on('spawn', () => {
  const mcData = require('minecraft-data')(bot.version)
  const defaultMovements = new Movements(bot, mcData)
  bot.pathfinder.setMovements(defaultMovements)
  
  console.log('مشمش جاهز للتفاعل الآن!')
  bot.chat('أنا مشمش! اكتب "تعال" لألحقك أو "هلا" للتحية.')
})

// التفاعل مع الشات
bot.on('chat', (username, message) => {
  if (username === bot.username) return

  // التفاعل مع التحية
  if (message.includes('هلا') || message.includes('هاي')) {
    bot.chat(`هلا والله يا ${username}! كيف حالك؟`)
    bot.setControlState('jump', true) // يقفز كعلامة ترحيب
    setTimeout(() => bot.setControlState('jump', false), 500)
  }

  // ميزة اللحاق باللاعب
  if (message === 'تعال') {
    const player = bot.players[username]
    if (!player || !player.entity) {
      bot.chat('ما أقدر أشوفك، لازم تكون قريب مني!')
      return
    }

    const mcData = require('minecraft-data')(bot.version)
    const movements = new Movements(bot, mcData)
    bot.pathfinder.setMovements(movements)
    
    // اللحاق باللاعب مع تجنب العقبات
    bot.pathfinder.setGoal(new GoalFollow(player.entity, 2), true)
    bot.chat('جاي أركض وراك!')
  }

  // التوقف
  if (message === 'وقف') {
    bot.pathfinder.setGoal(null)
    bot.chat('تم، توقفت.')
  }
})

// حركات عشوائية ليبدو حياً (التفات الرأس)
bot.on('physicTick', () => {
  if (Math.random() < 0.02) { // التفات عشوائي كل فترة
    const yaw = bot.entity.yaw + (Math.random() - 0.5) * 2
    const pitch = (Math.random() - 0.5) * 1
    bot.look(yaw, pitch, false)
  }
})

bot.on('error', (err) => console.log('خطأ:', err.message))
