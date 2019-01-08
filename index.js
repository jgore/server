const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({hi: "there"})
})



var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0")