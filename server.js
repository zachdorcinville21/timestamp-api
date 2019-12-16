// init project
var express = require('express');
var app = express();

var date = new Date();

const dateObj = {
  unix: Date.now(),
  utc: Date()
};

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req, res) => {
  res.json(dateObj);
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateStr = req.params.date_string;
  let dateInt;

  if (/\d{5,}/.test(dateStr)) {
    dateInt = parseInt(dateStr);
    res.json({ unix: dateStr, utc: new Date(dateInt).toUTCString() });
  }

  let dateObj = new Date(dateStr);

  if (dateObj.toString() == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }
  res.json({ unix: dateObj.valueOf(), utc: dateObj.toUTCString() });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + listener.address().port);
});
