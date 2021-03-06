let express = require('express')
let fs = require('fs')
let cors = require('cors')
let wavFileInfo = require('wav-file-info')

let app = express()

app.use(cors())

app.listen(3003, function () {
  console.log('listening on port 3003')
})

app.get('/audio', function (req, res) {
  let fileId = req.query.id
  console.log(fileId)
  let file = '../audio/' + fileId + '.wav'
  fs.access(file, fs.constants.F_OK, (err) => {
    if (!err) {
      let rstream = fs.createReadStream(file)
      rstream.pipe(res)
    } else {
      res.status(file).send('it\'s a 404')
      res.end()
    }
  })
})

app.get('/audioDuration', function (req, res) {
  let fileId = req.query.id
  console.log(fileId)
  let file = '../audio/' + fileId + '.wav'
  wavFileInfo.infoByFilename(file, function (err, info) {
    if (err) throw err
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(info))
  })
})
