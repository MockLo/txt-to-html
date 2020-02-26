const fs = require('fs')

export const readFile = function(filePath, sender) {
  // 根据指定的文件创建一个可读流，得到一个可读流对象
  let readStream = fs.createReadStream(filePath)

  let totalSize = fs.statSync(filePath).size // 通过 fs.statSync 获取文件大小
  console.log(`开始读取：${filePath}, 文件大小：${totalSize}`)

  let curSize = 0
  let data = '<p>'
  let percent = ''

  // 流对象有一个 data 事件，流对象会自动的帮我们去读取文件中的数据
  // 一点一点的读，只要读到了一点数据，就触发 data 事件，将该数据传递给 data 事件的回调函数
  readStream.on('data', chunk => {
    // chunk 数据块
    // 计算当前读取到的文件的大小，计算读取的顺序
    // chunk 是一个 buffer 对象
    // 每一次读取到了一点数据，将该数据的长度累加起来 / 文件的总大小 * 100 得到百分比
    curSize += chunk.length
    chunk = chunk.toString() // 转成字符串
    data += chunk.replace(/\n/g, '</p><p>')
    percent = ((curSize / totalSize) * 100).toFixed(2)
    console.log(`读取中，当前chunk size: ${curSize}, 进度: ${percent}`)
    sender.send('async-readFile-progress', percent)
  })

  // end 事件监听读写结束
  readStream.on('end', () => {
    data += '</p>'
    console.log(data)
    sender.send('async-readFile-finish', data)
    console.log('读取结束')
  })
}
