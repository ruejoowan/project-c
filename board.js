const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require('path')
const connection = mysql.createConnection({
  host :'localhost',
  port : "3306",
  user: 'root',
  password:'rzo01042218221@',
  database:'node.js'
}) 

app.use(express.json())
app.use(express.urlencoded({extended : true}))
// body-paser

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,"board2.html"))
})
// board2html2 화면에 출력
app.get("/create" , function(req,res){
  res.sendFile(path.join(__dirname, "board.html"))
})
// 버튼을 누르면 boardhtml로 이동


app.post("/",function(req,res){
  let body = req.body
  let seq = body.seq
  let title = body.title
  let tag = body.tag
  let text = body.text
  let id = body.id


  connection.query(`insert into board(seq,title,tag,text,id) values(${seq},"${title}","${tag}","${text}",${id})`,function(err){
  // connection.query(`insert into board(title,tag,text) values("${title}","${tag}","${text}")`,function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect("/board")
    }
  })
})
// 데이터 입력
app.get("/board",function(req,res){
  let sql ="select * from board;"
  connection.query(sql,function(err,result){
    if(err){
      console.error(err)
    }
    console.log(result)
    let seq = ""
    let title = ""
    let tag = ""
    let text = ""
    let id = ""
     //  데이터 정보를 html으로 보여주기위해 객체 하나하나 선언해줬다.
    result.forEach((item)=> {
      if(item.seq !== "undefined"){
         seq += `<div>${item.seq}</div>`
      }
      if(item.title !== "undefined"){
        title += `<div>${item.title}</div>`
      }
      if(item.tag !== "undefined"){
        tag += `<div>${item.tag}</div>`
      }
      if(item.text !== "undefined"){
        text += `<div>${item.text}</div>`
      }
      if(item.id !== "undefined"){
        id += `<div>${item.id}</div>`
      }
    });
    // 규칙을 만들어 지역변수안에 넣어주었다.

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      ${title} 
      ${seq}
      ${tag}
      <p>${text}</p>
      <p>${id}</p>
    </body>
    </html>`)
  
  })
})
// 화면에 html 형식으로 보여질 코드

// 데이터 정보 보여주는 화면
app.listen(5000,function(){
  console.log("http://localhost:5000/")
})
// 서버 포트