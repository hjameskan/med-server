const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

// write api here

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});