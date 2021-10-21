const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const PORT = process.env.port || 8000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "sky76012345",
    database : "simpleboard"
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get("/api/get", (req, res)=>{
    const sqlQuery = "SELECT * FROM simpleboard;";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    })
})

app.post("/api/insert", (req, res)=>{
    const title = req.body.title;
    const content = req.body.content;
    const sqlQuery = "INSERT INTO simpleboard (title, content) VALUES (?,?)";
    db.query(sqlQuery, [title, content], (err, result) => {
        res.send('success!');
    });
})

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});