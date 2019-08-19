SET NAMES UTF8;
DROP DATABASE IF EXISTS Yummy;
CREATE DATABASE Yummy CHARSET=UTF8;
USE Yummy;

/*1.图标表*/
USE Yummy;
CREATE TABLE Yummy_bao(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50),
  url_img  VARCHAR(128)
);

INSERT INTO Yummy_bao VALUES
(null,'新品','http://127.0.0.1:3000/img/index-bao/bao1.png'),
(null,'甜点','http://127.0.0.1:3000/img/index-bao/bao2.png'),
(null,'生日','http://127.0.0.1:3000/img/index-bao/bao3.png'),
(null,'面包','http://127.0.0.1:3000/img/index-bao/bao4.png'),
(null,'专区','http://127.0.0.1:3000/img/index-bao/bao5.png');

/*2.主页几个商品动态加载表*/
USE Yummy;
CREATE TABLE Yummy_index_product(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50),
  del VARCHAR(128),
  price VARCHAR(50),
  url_img  VARCHAR(128)
);
INSERT INTO Yummy_index_product VALUES
(null,'米道','天然植物为基础的蛋糕，非高脂、非高糖。','298.00','http://127.0.0.1:3000/img/index_product/1.png'),
(null,'杰瑞','谁动了我的奶酪？','299.00','http://127.0.0.1:3000/img/index_product/2.png'),
(null,' 黑森林','樱桃酒味从巧克力卷的缝隙飘出','298.00','http://127.0.0.1:3000/img/index_product/3.png'),
(null,'浅草','切着吃的雨前西湖龙井','298.00','http://127.0.0.1:3000/img/index_product/4.png');



/*3.分类*/
USE Yummy;
CREATE TABLE Yummy_fen(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50),
  price VARCHAR(50),
  img_url  VARCHAR(128),
   count   INT,
  uid     INT
);
INSERT INTO Yummy_fen VALUES
(null,'元气满满组合','298.00','011.png',1,1),
(null,'黑白巧克力','278.00','012.png',1,1),
(null,'芒果奶油蛋糕','255.00','011.png',1,1);



/*4.注册*/
USE Yummy;
CREATE TABLE Yummy_zhuce(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  phone VARCHAR(50),
  upwd  VARCHAR(32)
);
             
INSERT INTO Yummy_zhuce VALUES(null,'tom','15927151078','123456');
INSERT INTO Yummy_zhuce VALUES(null,'jerry','19852444545','123456');


/*5.登录*/
USE Yummy;
CREATE TABLE Yummy_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  upwd  VARCHAR(32)
);
INSERT INTO Yummy_login VALUES(null,'tom','123456');
INSERT INTO Yummy_login VALUES(null,'jerry','123456');

/*6.Yummy_cart*/
USE   Yummy;
CREATE TABLE Yummy_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(25),
  price   DECIMAL(10,2),
  title   VARCHAR(255),
  count   INT,
  uid     INT
);
INSERT INTO Yummy_cart VALUES(null,'011.png',200,'小蛋糕1',1,1);

/*7.详情页*/
USE   Yummy;
CREATE TABLE Yummy_details(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(128),
  img_md VARCHAR(128),
  title VARCHAR(128),
  price   DECIMAL(10,2),
  ex   VARCHAR(255),
  counts   INT,
  uid     INT
);

INSERT INTO Yummy_details VALUES(null,'http://127.0.0.1:3000/img/details/1.jpg','http://127.0.0.1:3000/img/details/011.jpg','Rice Cake 米道','298.00
','一款专门为儿童设计，以天然植物为基础的蛋糕，非高脂、非高糖。',1,1);

INSERT INTO Yummy_details VALUES(null,'http://127.0.0.1:3000/img/details/2.jpg','http://127.0.0.1:3000/img/details/012.jpg','（新）杰瑞','298.00
','谁动了我的奶酪？!/Who touched my cheese?',1,1);

INSERT INTO Yummy_details VALUES(null,'http://127.0.0.1:3000/img/details/3.jpg','http://127.0.0.1:3000/img/details/013.jpg','Black Forest 黑森林','398.00
','樱桃酒味从巧克力卷的缝隙飘出/向往极北的黑森林，纷飞的雪花里有精灵的歌咏',1,1);

INSERT INTO Yummy_details VALUES(null,'http://127.0.0.1:3000/img/details/4.jpg','http://127.0.0.1:3000/img/details/014.jpg','Teatime 浅草','298.00
','浅草才能没马蹄,切着吃的雨前西湖龙井',1,1);




