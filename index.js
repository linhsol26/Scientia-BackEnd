const app = require('express')();
const URL = "https://scientia-9d421.firebaseio.com";
const key = require("./key.json");
const admin = require("./database");

const db = new admin(key, URL);
const port = 3000;
app.use(require('cors')());
app.use(require('body-parser')());

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Scientia is listening on port ${port}`);
});