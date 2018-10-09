var fs = require('fs')
// // 查看文件
// fs.stat('dome1.js',(err,stats) => {
//   console.log(stats)
//   console.log(`目录${stats.isDirectory()}`)
//   console.log(`目录${stats.isFile()}`)
// })
// // 新增目录
// fs.mkdir('logs',(err)=>{
//   console.log('添加目录成功')
// })
// // 新增文件
// fs.writeFile('logs/homeWork.log','我是一个小小的石头',(err)=>{
//   console.log('添加文件成功')
// })
// // 文件的修改
// fs.appendFile('logs/homeWork.log','前朝记忆渡红尘')
// // 读取文件
// fs.readFile('logs/homeWork.log','utf-8',(err, data)=>{
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })
// // 读取目录
// fs.readdir('logs',(err,file)=>{
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(file)
//   }
// })
// 删除目录
fs.rmdir('js',(err)=>{
  console.log('确定删除吗')
})