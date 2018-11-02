let express = require('express')
let fs = require('fs')
let cors = require('cors')

// initialize an express app
let app = express()

app.use(cors())

app.listen(3003, function () {
  console.log('listening on port 3003')
})

app.get('/audio', function (req, res) {
  let fileId = req.query.id
  // let file = '../audio/testfile' + fileId + '.wav'
  let file = '../audio/testfile0.wav'
  fs.access(file, fs.constants.F_OK, (err) => {
    console.log(`${fileId} ${err ? 'does not exist' : 'exists'}`)
    if (!err) {
      let rstream = fs.createReadStream(file)
      rstream.pipe(res)
    } else {
      res.status(file).send('it\'s a 404')
      res.end()
    }
  })
})
