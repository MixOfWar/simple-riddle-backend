const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const riddlesList = require('./riddles')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  next();
});

app.listen(port, () => {
  console.log(`creating something at ${port}`);
});

app.get("/", (req, res) => {
  res.json("You've found the riddles");
});

app.get('/riddles', (req, res) => {
  res.json(riddlesList.riddles)
})

app.get('/riddles/:level', (req, res) => {
  if (!req.params.level) {
    res.status(400).send('Missing level information')
  }
  const newList = riddlesList.riddles.filter((riddle) => riddle.level === Number(req.params.level))

  res.json(newList)
})
