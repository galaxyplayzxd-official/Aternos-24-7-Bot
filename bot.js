const mineflayer = require('mineflayer')

const CONFIG = {
  host: 'YOUR_SERVER_IP',      // 🔴 CHANGE
  port: 25565,
  username: 'AFK_Jumper',
  password: 'afk12345',        // 🔴 CHANGE
  loginDelay: 3000
}

let bot

function startBot () {
  bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    version: false
  })

  bot.once('spawn', () => {
    console.log('✅ Joined server')

    // AuthMe login / register
    setTimeout(() => {
      bot.chat(`/register ${CONFIG.password} ${CONFIG.password}`)
      bot.chat(`/login ${CONFIG.password}`)
    }, CONFIG.loginDelay)

    // Jump forever
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 200)
    }, 1000)
  })

  bot.on('messagestr', msg => {
    if (msg.toLowerCase().includes('login')) {
      bot.chat(`/login ${CONFIG.password}`)
    }
  })

  bot.on('kicked', reason => {
    console.log('❌ Kicked:', reason)
    process.exit(1)
  })

  bot.on('end', () => {
    console.log('❌ Disconnected')
    process.exit(1)
  })

  bot.on('error', err => console.log('❌ Error:', err))
}

startBot()
