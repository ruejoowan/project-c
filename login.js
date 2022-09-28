const express = require('express')
const app = express();
const mysql = require('mysql')
const path = require('path')
const connection = mysql.createConnection({
  host :'localhost',
  port : "3306",
  user: 'root',
  password:'rzo01042218221@',
  database:'node.js'
})

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,"login.html"))
})

app.post("/",function(req,res){
  let sql ="select * from user;"
  let body = req.body;

  connection.query(sql,(err,result)=>{
  let islogin = false;
    
    if(err){
      console.log(err)
    }
    console.log(body)
    result.forEach((item) => {
      if(item.id === Number(body.id) && item.password === body.password){
        islogin = true
      }
    });

    if(islogin){
      res.sendFile(path.join(__dirname,"login2.html"))
    }else{
      console.log("내가 뭘 잘못했어?")
    }
  })
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

app.listen(3000, ()=>{
  console.log("http://localhost:3000/")
});