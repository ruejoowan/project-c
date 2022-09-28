const express = require("express")
const app = express()
const mysql = require('mysql')
const path = require("path")
const bodyParser = require("body-parser")
const connection = mysql.createConnection({
  host :'localhost',
  port : "3306",
  user: 'root',
  password:'rzo01042218221@',
  database:'node.js'
})

// connection.connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, "sign.html"))
})

app.post('/',(req,res)=>{
  // let sql = 'insert into user (id , password) values("' + id + '", "' + password + '")'
  let body = req.body;
  console.log(body)
  let id = body.id;
  let password = body.password;
  let name = body.name;
  let adress = body.adress;
  let phone = body.phone;
  
  connection.query(`insert into user(id,name,adress,phone,password) values(${id},"${name}","${adress}","${phone}","${password}");`, (err)=>{
    if(err){
      console.error(err);
    }
  })
  res.redirect("/users")
})

app.get('/users', (req, res)=>{
  let sql = "select * from user;"
  connection.query(sql, (err, result)=>{
    if(err){
      console.log(err)
    }
    res.send(result);
  })
})

// connection.end()

app.listen(8000, ()=>{
  console.log("http://localhost:8000/")
});
