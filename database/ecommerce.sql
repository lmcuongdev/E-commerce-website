-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: e-commerce
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `orderLineNumber` int NOT NULL,
  PRIMARY KEY (`orderId`,`productId`),
  KEY `productId_idx` (`productId`),
  CONSTRAINT `orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (2,2,1,3),(2,6,3,2),(2,7,2,1),(2,10,1,4),(3,2,1,3),(3,6,3,2),(3,7,2,1),(3,10,1,4),(4,3,4,2),(4,7,3,1),(5,10,4,3),(5,11,3,2),(5,12,3,1);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `orderDate` date NOT NULL,
  `shippedDate` date DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`orderId`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,'2020-05-24',NULL,'In process',103),(3,'2020-05-24',NULL,'In process',103),(4,'2020-05-24',NULL,'In process',103),(5,'2020-05-24',NULL,'In process',120);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `amount` int NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`paymentId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (2,103,25800000,'2020-05-24'),(3,103,25800000,'2020-05-24'),(4,103,10250000,'2020-05-24'),(5,120,58800000,'2020-05-24');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productlines`
--

DROP TABLE IF EXISTS `productlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productlines` (
  `productline` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`productline`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productlines`
--

LOCK TABLES `productlines` WRITE;
/*!40000 ALTER TABLE `productlines` DISABLE KEYS */;
INSERT INTO `productlines` VALUES ('dienthoai',NULL),('dongho',NULL),('laptop',NULL),('maytinhbang',NULL),('phukien',NULL);
/*!40000 ALTER TABLE `productlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) NOT NULL,
  `productLine` varchar(100) NOT NULL,
  `productInfo` varchar(10000) DEFAULT NULL,
  `price` int NOT NULL,
  `quantityInstock` int NOT NULL,
  `imgFolder` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`productId`),
  KEY `productLine` (`productLine`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productLine`) REFERENCES `productlines` (`productline`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Mi Band 4','dongho',NULL,1000000,1000,'mi_band_4'),(2,'Iphone X','dienthoai','iPhone X vẫn sở hữu thiết kế tràn viền với “tai thỏ”. Viền bezel phía trên và dưới cũng được làm gọn lại nhằm tối đa màn hình sử dụng. Cùng với đó, 4 góc của máy cũng được bo tròn nhẹ tạo cảm giác chắc chắn khi cầm trên tay. Mặt lưng iPhone X làm từ chất liệu kính nên rất sang trọng, tinh tế. Khác với các dòng iPhone trước, sản phẩm này sẽ có 6 màu bản bạc, vàng, xanh lá, trắng, đen đỏ.',19000000,1000,'iphoneX'),(3,'Ipad Air','maytinhbang',NULL,1250000,1000,'ipad_air'),(4,'Apple Watch S3','dongho',NULL,2300000,1000,'apple_watch_s3'),(5,'Samsung Galaxy Zflip','dienthoai',NULL,7500000,1000,'samsung_galaxy_zflip'),(6,'Sạc dự phòng Xiaomi Essential','phukien',NULL,300000,1000,'xiaomi_essential'),(7,'Acer Aspire A315','laptop','',1750000,1000,'acer_aspire_a315'),(8,'HP Pavilon 14','laptop',NULL,14000000,1000,'hp_pavilon_14'),(9,'MyKid','dongho',NULL,100000,1000,'my_kid'),(10,'Huawei Watch GT2','dongho',NULL,2400000,1000,'huewi_watch_gt2'),(11,'Samsung Galaxy S20','dienthoai',NULL,10400000,1000,'samsung_galaxy_s20'),(12,'Iphone 8','dienthoai',NULL,6000000,1000,'iphone8'),(13,'Huawei Mediapad','maytinhbang',NULL,7600000,1000,'huawei_mediapad_t3'),(14,'Tai Nghe Kanen K6','phukien',NULL,800000,1000,'Kanen_blutooth_K6');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('7ubhPCkxEfcJeGZnIPQmgnNJDhBIaqzf',1590046580,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2020-05-21T07:36:08.602Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"flash\":{}}'),('J5Y9aYwdz3H7WEOMv0MxlAg9WxfydVSe',1590122081,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2020-05-22T04:30:18.061Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (100,'datbuaten','secret','Le','Cuong','0378383553','Ha Noi'),(101,'thuonggay','noimnot','Nguyen','Thuong','0643653732','Hai Duong'),(102,'sv18020257','21321321321','321321321','321321','undefined','undefined'),(103,'username','password','First','Last','0326247264','Sai Gon'),(105,'18020257','231321','cxzcxz','cxz','undefined','undefined'),(106,'43243243242','4323321','32121','321321','undefined','undefined'),(108,'somename','somename','somename','somename','somename','somename'),(109,'someusername','someusername','someusername','someusername','321321321321','321321'),(110,'username01','thisispass','Cuong','Le','(+84) 378383553','123 XT HN'),(111,'datbuaten2','321321','321321','321321','2131321321321','321321'),(112,'username02','123','Cuong','dsad','32132131231','123 XT HN'),(113,'username03','yowrf','Thon','Luong','21r21r21','123 XT HN'),(114,'username04','password04','Du','de','32132131231','123 XT HN'),(115,'username05','yobruh','Cuong','vip','(+84) 378383553','123 XT HN'),(116,'username06','123','dsadsa','dsad','32132131231','123 XT HN'),(117,'username07','username07','username07','username07','321321321321','123 XT HN'),(118,'cuong123','cuong123','Cuong','Lee','(+84) 378383553','Cuong'),(119,'chonbuaten','chonbuaten','John','Smith','555 132 555','USA'),(120,'sesaltme','iloveu','Sesame','Salt','030012506','Your Heart');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-25 21:29:01
