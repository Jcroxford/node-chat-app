const express = require('express')
const path    = require('path')

const publicPath = path.join(__dirname, '../public')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath))

// app.get('/', (req, res) => {
//   res.sendFile(`${publicPath}/index.html`)
// })

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})