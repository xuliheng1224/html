var Event = require('events')

class Player extends Event {}

var player = new Player()

player.on('play', (res) => {
  console.log(`我们都是泡沫${res}`)
})
player.once('play2', (res) => {
  console.log(`我们都是泡沫${res}`)
})

player.emit('play', '轻轻一碰就破')
player.emit('play', '昨天就像飞机穿过我的床头')
player.emit('play2', '轻轻一碰就破2')
player.emit('play2', '昨天就像飞机穿过我的床头2')