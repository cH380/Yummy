// 1.引入第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");

//2:配置第三方模块
 //2.1:配置连接池
 var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    port:3306,
    database:"Yummy",
    connectionLimit:15
  })

  //2.2:跨域
 var server = express();
 server.use(cors({
   origin:["http://127.0.0.1:8080","http://localhost:8080","http://127.0.0.1:5501","http://127.0.0.1:8081",],
   credentials:true
 }))

 //  2.3:session
 server.use(session({
    secret:"128位字符串",	//自定义字符串用于加密数据使用
     resave:true,				//每次请求更新数据
    saveUninitialized:true	//保存初始化数据
  }))

   //  2.9指定静态目录
server.use(express.static('public'));

// 监听
server.listen(3000);

// 1.1主页小图标动态加载
// 图片和文字动态加载
server.get('/index',(req,res)=>{
    // 1.sql
    var sql='select id,title,url_img from Yummy_bao where id between 1 and 5';
    pool.query(sql,[],(err,result)=>{
      if(err){
        console.log(err);
        res.send({code:0})
      }else{
        res.send(result);
        // console.log(result);
      }
    })
  })

// 2.主页几个商品动态加载表
server.get('/index_product',(req,res)=>{
  // 1.sql
  var sql='select id,title,del,price,url_img from Yummy_index_product where id between 1 and 4';
  pool.query(sql,[],(err,result)=>{
    if(err){
      console.log(err);
      res.send({code:0})
    }else{
      res.send(result);
      // console.log(result);
    }
  })
})

// 3.用户注册
server.get('/zhuce',(req,res)=>{
  // 1:参数
  var uname=req.query.uname;
  var phone=req.query.phone;
  var upwd=req.query.upwd;
   console.log(phone);
  //检测值是否为空
if(!phone){
  res.send({code:401,msg:'phone required'});
    //阻止往后执行
    return;
  }
  //1.1:正则表达式验证用户名或密码
//2:sql
var sql='insert into yummy_zhuce values(?,?,?,?)';
//3:json
//  1 完成第二个功能注册
pool.query(sql,['',uname,phone,upwd],(err,result)=>{
  if(err)throw err;
  // console.log(result);
  if(result.affectedRows>0){
    res.send({code:1,msg:"注册成功"});
  }else{
     //??缺少一步
     res.send({code:-1,msg:"注册失败"});
   }
 })
})

// 4.用户登录
server.get("/login",(req,res)=>{
  //4.1:参数
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  // console.log(uname);
  // console.log(upwd);
  //4.2:正则表达式验证用户名或密码
  //4.3:sql

var sql='select id from Yummy_login where uname =? and upwd=?';
  //4.4:json
  pool.query(sql,[uname,upwd],(err,result)=>{
      if(err)throw err;
	   console.log(result);
      if(result.length==0){
         res.send({code:-1,msg:"用户名或密码有误"});
      }else{
         //??缺少一步
        //  将当前登录的uid保存在session对象中
        req.session.uid=result[0].id;
         res.send({code:1,msg:"登录成功"});
       
      }
  })
})

//5:完成功能:
//先登录操作成功后再查询购物车
//查询指定用户购物车列表
server.get("/cart",(req,res)=>{
  //1:参数(无参数)
  console.log(req.session.uid)
  var uid = req.session.uid;
  
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
  }
  //2:sql
  var sql = "SELECT id,img_url,title,price,count FROM Yummy_cart WHERE uid = ?";
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result})
  })
  //3:json
})

//6:删除购物车中商品 
server.get("/delItem",(req,res)=>{
  //1:参数购物车id
  var id = req.query.id;
  //2:sql 删除指定数据
  var sql = "DELETE FROM Yummy_cart WHERE id = ?";
  //3:json
  pool.query(sql,[id],(err,result)=>{
   if(err)throw err;
   //affectedRows 操作影响行数
   if(result.affectedRows>0){
    res.send({code:1,msg:"删除成功"});
   }else{
    res.send({code:-1,msg:"删除失败"}) 
   }
  })
});


// 7：删除多个商品
server.get("/delAll",(req,res)=>{
  //1:参数 1,2,3
  var ids = req.query.ids;
  //2:sql
  var sql = `DELETE FROM Yummy_cart WHERE id IN (${ids})`;
  //3:json
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:"删除失败"});
    }
  })
});

// 8.分页动态加载
server.get('/fen',(req,res)=>{
  // 1.sql
  var sql='select id,title,price,img_url,count from Yummy_fen where id between 1 and 3';
  pool.query(sql,[],(err,result)=>{
    if(err){
      console.log(err);
      res.send({code:0})
    }else{
      res.send(result);
      // console.log(result);
    }
  })
})

// 9.分页点击插入购物车
server.get("/incart",(req,res)=>{
  //1:获取数据
  var title= req.query.title;
  var img_url= req.query.img_url;
  var price= req.query.price;
  var count= req.query.count;
  var uid=req.query.uid;
  // console.log(title);
  // 检测是否为空
  /* 
  if(!title){
    res.send({code:401,msg:'错误 required'});
      //阻止往后执行
      return;
    }
if(!price){
  res.send({code:401,msg:'错误 price'})
}
if(!count){
  res.send({code:401,msg:'错误 price'})
}
if(!url_img){
  res.send({code:401,msg:'错误 price'})
}
*/ 
  // 
  //2:sql 插入指定数据
  var sql = "insert into Yummy_cart values(?,?,?,?,?,?)";
  //3:json
  pool.query(sql,['',img_url,price,title,count,uid],(err,result)=>{
   if(err)throw err;
   //affectedRows 操作影响行数
   if(result.affectedRows>0){
    res.send({code:1,msg:"插入成功"});
   }else{
    res.send({code:-1,msg:"插入失败"}) 
   }
  })
});

// 10.详情页动态加载
server.get('/details',(req,res)=>{
  // 1.sql
  var sql='select id,img_url,img_md,title,price,ex,counts,uid from Yummy_details ';
  pool.query(sql,[],(err,result)=>{
    if(err){
      res.send({code:0})
    }else{
      res.send(result);
    }
  })
})



