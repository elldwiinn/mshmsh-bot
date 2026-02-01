const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow

const bot = mineflayer.createBot({
  host: 'highways.aternos.me',
  port: 25565,
  username: 'mshmsh',
  version: '1.21.1', // تم ضبط الإصدار حسب طلبك
})

// تحميل مكتبة التحرك الذكي
bot.loadPlugin(pathfinder)

bot.on('spawn', () => {
  console.log('البوت mshmsh دخل السيرفر بنجاح!')
  bot.chat('أنا مشمش، جاهز للمغامرة!')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  const target = bot.players[username]?.entity

  if (message === 'تعال') {
    if (!target) {
      bot.chat('ما أقدر أشوفك، وينك؟')
      return
    }
    const mcData = require('minecraft-data')(bot.version)
    const movements = new Movements(bot, mcData)
    
    bot.pathfinder.setMovements(movements)
    bot.pathfinder.setGoal(new GoalFollow(target, 1), true)
    bot.chat('جاي أركض وراك يا ' + username)
  }

  if (message === 'وقف') {
    bot.pathfinder.setGoal(null)
    bot.chat('تم، وقفت مكاني.')
  }
  
  if (message === 'هلا') {
    bot.chat('أهلين! أنا بوت highways')
  }
})

// لمنع الطرد من سيرفر أثيرنوس بسبب الخمول
bot.on('physicTick', () => {
  if (bot.pathfinder.isMoving()) return
  if (Math.random() < 0.05) {
    bot.setControlState('jump', true)
    bot.setControlState('jump', false)
  }
})

bot.on('kicked', (reason) => console.log('تم طرد البوت لسبب: ' + reason))
bot.on('error', (err) => console.log('خطأ في الاتصال: ' + err))