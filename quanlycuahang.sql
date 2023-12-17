/*
 Navicat Premium Data Transfer

 Source Server         : DERRY
 Source Server Type    : MySQL
 Source Server Version : 50515 (5.5.15)
 Source Host           : localhost:3306
 Source Schema         : quanlycuahang

 Target Server Type    : MySQL
 Target Server Version : 50515 (5.5.15)
 File Encoding         : 65001

 Date: 08/12/2023 11:21:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accounts
-- ----------------------------
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts`  (
  `AccountID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `FullName` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Phone` int(11) NULL DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Reward` double NULL DEFAULT NULL,
  `DepartmentID` int(11) NULL DEFAULT NULL,
  `IsBanned` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`AccountID`) USING BTREE,
  INDEX `FK_DepartName`(`DepartmentID`) USING BTREE,
  CONSTRAINT `FK_DepartName` FOREIGN KEY (`DepartmentID`) REFERENCES `department` (`DepartmentID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of accounts
-- ----------------------------
INSERT INTO `accounts` VALUES (1, 'thanhhaivevo@gmail.com', 'null', 'Nguyễn Thanh Hải', '47 Lê Duẩn, phường Bến Nghé, Quận 1, Tp.HCM', 903387765, 'avatar1.png', 0, 5, 0);
INSERT INTO `accounts` VALUES (3, 'baohuy@gmail.com', 'null', 'Nguyễn Bảo Huy', '168 Trương Văn Bang, Khu phố 1, Phường Thạnh Mỹ Lợi, TP Thủ Đức, Tp.HCM', 903387769, 'avatar1.png', 0, 1, 0);
INSERT INTO `accounts` VALUES (4, 'Tranganhvinhloc@gmail.com', 'null', 'Trần Thị Trang Anh', '99 Trần Quốc Thảo, Phường Võ Thị Sáu, Quận 3, Tp.HCM', 900900901, 'avatar1.png', 0, 1, 0);
INSERT INTO `accounts` VALUES (5, 'lathang@gmail.com', 'null', 'Trịnh Văn Quyết', '7 Phạm Văn Đồng, phường Mai Dịch, quận Cầu Giấy, TP Hà Nội', 375579615, 'avatar1.png', 0, 2, 1);
INSERT INTO `accounts` VALUES (6, 'truongnhatminh@gmail.com', 'null', 'Trương Nhất Minh', '18 Đoàn Như Hài, Phường 13, Quận 4, Tp.HCM', 375579611, 'avatar1.png', 0, 5, 0);
INSERT INTO `accounts` VALUES (7, 'kimsa@gmail.com', 'null', 'Kim Sa', '7 Tân Phú, Phường Tân Phú, Quận 7, Tp.HCM', 905558654, 'avatar1.png', 0, 5, 1);
INSERT INTO `accounts` VALUES (8, 'saonam@gmail.com', 'null', 'Phan Sào Nam', '44 Đường Số 50, KP. 9, P. Tân Tạo, Q. Bình Tân, Tp. Hồ Chí Minh, Việt Nam', 908887775, 'avatar1.png', 0, 4, 1);
INSERT INTO `accounts` VALUES (9, 'wawang@gmail.com', 'null', 'Zang Shi Wa', '175 Hai Bà Trưng, Phường 6, Quận 3, Thành phố Hồ Chí Minh', 1112223334, 'avatar1.png', 0, 6, 0);

-- ----------------------------
-- Table structure for brands
-- ----------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands`  (
  `BrandID` int(11) NOT NULL AUTO_INCREMENT,
  `NameBrand` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `DescBrand` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`BrandID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of brands
-- ----------------------------
INSERT INTO `brands` VALUES (1, 'Panasonic', 'Panasonic là một tập đoàn đa quốc gia có trụ sở tại Nhật Bản, chuyên sản xuất và cung cấp các sản phẩm công nghệ tiên tiến. Với lịch sử hơn 100 năm, Panasonic nổi tiếng với các sản phẩm điện tử, gia dụng, ô tô, và các giải pháp công nghiệp. Điều này bao gồm TV, máy ảnh, điều hòa không khí, pin và các sản phẩm liên quan khác. Panasonic cam kết đổi mới để đáp ứng nhu cầu ngày càng đa dạng của khách hàng toàn cầu và duy trì uy tín cao trong ngành công nghiệp.');
INSERT INTO `brands` VALUES (11, 'EXTECH', 'Miêu tả thương hiệu');
INSERT INTO `brands` VALUES (12, 'Kingled ', 'Bóng Led Bulb DOB Kingled sử dụng công nghệ Driver On Board - tích hợp công nghệ nguồn hiện đại, cách ly nhiệt với linh kiện giúp tăng tuổi thọ gấp 3 lần.');
INSERT INTO `brands` VALUES (13, 'CADIVI ', 'thương hiệu mới nổi ');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`CategoryID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Thiết bị Điều Khiển và Bảo Vệ');
INSERT INTO `category` VALUES (2, 'Thiết bị Nguồn Điện');
INSERT INTO `category` VALUES (3, 'Thiết bị Kết Nối và Dây Cáp');
INSERT INTO `category` VALUES (4, 'Thiết bị Áp Dụng trong Công Nghiệp');
INSERT INTO `category` VALUES (5, 'Thiết Bị Chiếu Sáng');
INSERT INTO `category` VALUES (6, 'Thiết Bị Điều Khiển Tự Động');
INSERT INTO `category` VALUES (7, 'Thiết Bị An Ninh và Kiểm Soát');
INSERT INTO `category` VALUES (8, 'Thiết Bị Công Nghệ');
INSERT INTO `category` VALUES (9, 'Thiết Bị Gia Đình');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `CommentID` int(11) NOT NULL,
  `CustomerID` int(11) NULL DEFAULT NULL,
  `ProductID` int(11) NULL DEFAULT NULL,
  `Content` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Rate` int(3) NULL DEFAULT NULL,
  `CreateAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`CommentID`) USING BTREE,
  INDEX `FK_Products`(`ProductID`) USING BTREE,
  INDEX `FK_NameCus`(`CustomerID`) USING BTREE,
  CONSTRAINT `FK_NameCus` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Products` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers`  (
  `CustomerID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `FullName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Gender` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Address` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `Avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `PhoneNumber` int(11) NULL DEFAULT NULL,
  `IsBanned` int(11) NULL DEFAULT NULL,
  `IsOnline` int(11) NULL DEFAULT NULL,
  `FacebookID` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `GoogleID` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `OTP` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`CustomerID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES (4, 'tranganhvinhloc@gmail.com', 'efe6398127928f1b2e9ef3207fb82663', 'Phan Sài Nam', 'Nữ giới', '175 Hai Bà Trưng, Phường 6, Quận 3, Thành phố Hồ Chí Minh', 'avatar1.png', 906675541, 0, 0, '', '', 'null');
INSERT INTO `customers` VALUES (7, 'thanhhaivevo@gmail.com', 'efe6398127928f1b2e9ef3207fb82663', 'Lê Thanh', 'Nam giới', '175 Hai Bà Trưng, Phường 6, Quận 3, Thành phố Hồ Chí Minh', 'avatar1.png', 9996665, 0, 0, '', '', 'null');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `DepartmentID` int(11) NOT NULL AUTO_INCREMENT,
  `DepartmentName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Salary` double NULL DEFAULT NULL,
  PRIMARY KEY (`DepartmentID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, 'Nhân viên bán hàng', 10000000);
INSERT INTO `department` VALUES (2, 'Nhân vên kho', 15000000);
INSERT INTO `department` VALUES (3, 'Nhân viên giao hàng', 13000000);
INSERT INTO `department` VALUES (4, 'Chăm sóc khách hàng', 15500000);
INSERT INTO `department` VALUES (5, 'Quản lý', 20000000);
INSERT INTO `department` VALUES (6, 'Phó giám đốc', 35000000);
INSERT INTO `department` VALUES (7, 'Giám đóc', 45000000);

-- ----------------------------
-- Table structure for detail_import_goods
-- ----------------------------
DROP TABLE IF EXISTS `detail_import_goods`;
CREATE TABLE `detail_import_goods`  (
  `import_goodsID` int(11) NOT NULL,
  `Quantity` int(11) NULL DEFAULT NULL,
  `ProductID` int(11) NULL DEFAULT NULL,
  `AccountID` int(11) NULL DEFAULT NULL,
  `total_payment` double NULL DEFAULT NULL,
  INDEX `import_goodsID`(`import_goodsID`) USING BTREE,
  INDEX `ProductID`(`ProductID`) USING BTREE,
  INDEX `AccountID`(`AccountID`) USING BTREE,
  CONSTRAINT `detail_import_goods_ibfk_1` FOREIGN KEY (`import_goodsID`) REFERENCES `import_goods` (`import_goodsID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_import_goods_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detail_import_goods_ibfk_3` FOREIGN KEY (`AccountID`) REFERENCES `accounts` (`AccountID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of detail_import_goods
-- ----------------------------

-- ----------------------------
-- Table structure for distributionstock
-- ----------------------------
DROP TABLE IF EXISTS `distributionstock`;
CREATE TABLE `distributionstock`  (
  `DistributionStockID` int(11) NOT NULL AUTO_INCREMENT,
  `DistributionArea` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`DistributionStockID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of distributionstock
-- ----------------------------
INSERT INTO `distributionstock` VALUES (1, 'Quận Tân Phú');
INSERT INTO `distributionstock` VALUES (2, 'Quận 12');
INSERT INTO `distributionstock` VALUES (3, 'Quận 10');
INSERT INTO `distributionstock` VALUES (4, 'Quận Tân Bình');

-- ----------------------------
-- Table structure for distributionstockdetail
-- ----------------------------
DROP TABLE IF EXISTS `distributionstockdetail`;
CREATE TABLE `distributionstockdetail`  (
  `DistributionStockDetailID` int(11) NOT NULL AUTO_INCREMENT,
  `DistributionStockID` int(11) NULL DEFAULT NULL,
  `ProductID` int(11) NULL DEFAULT NULL,
  `Quantity` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`DistributionStockDetailID`) USING BTREE,
  INDEX `FK_Prodd`(`ProductID`) USING BTREE,
  INDEX `FK_Zone`(`DistributionStockID`) USING BTREE,
  CONSTRAINT `FK_Prodd` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Zone` FOREIGN KEY (`DistributionStockID`) REFERENCES `distributionstock` (`DistributionStockID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of distributionstockdetail
-- ----------------------------
INSERT INTO `distributionstockdetail` VALUES (1, 1, 10, 100);
INSERT INTO `distributionstockdetail` VALUES (2, 1, 13, 100);
INSERT INTO `distributionstockdetail` VALUES (3, 1, 11, 50);
INSERT INTO `distributionstockdetail` VALUES (4, 1, 14, 100);
INSERT INTO `distributionstockdetail` VALUES (5, 1, 15, 50);
INSERT INTO `distributionstockdetail` VALUES (6, 1, 16, 40);
INSERT INTO `distributionstockdetail` VALUES (7, 1, 12, 50);
INSERT INTO `distributionstockdetail` VALUES (8, 1, 17, 100);
INSERT INTO `distributionstockdetail` VALUES (9, 1, 18, 100);
INSERT INTO `distributionstockdetail` VALUES (10, 1, 19, 100);
INSERT INTO `distributionstockdetail` VALUES (11, 1, 20, 100);
INSERT INTO `distributionstockdetail` VALUES (12, 1, 21, 10);
INSERT INTO `distributionstockdetail` VALUES (13, 1, 22, 50);
INSERT INTO `distributionstockdetail` VALUES (14, 1, 23, 50);
INSERT INTO `distributionstockdetail` VALUES (15, 1, 24, 50);
INSERT INTO `distributionstockdetail` VALUES (16, 1, 25, 50);
INSERT INTO `distributionstockdetail` VALUES (17, 1, 26, 50);
INSERT INTO `distributionstockdetail` VALUES (18, 1, 27, 50);
INSERT INTO `distributionstockdetail` VALUES (19, 1, 28, 50);
INSERT INTO `distributionstockdetail` VALUES (20, 1, 29, 50);
INSERT INTO `distributionstockdetail` VALUES (21, 1, 30, 40);
INSERT INTO `distributionstockdetail` VALUES (22, 1, 31, 50);
INSERT INTO `distributionstockdetail` VALUES (23, 1, 32, 50);
INSERT INTO `distributionstockdetail` VALUES (24, 1, 33, 50);
INSERT INTO `distributionstockdetail` VALUES (25, 1, 34, 50);
INSERT INTO `distributionstockdetail` VALUES (26, 1, 35, 100);
INSERT INTO `distributionstockdetail` VALUES (27, 1, 36, 50);
INSERT INTO `distributionstockdetail` VALUES (28, 1, 37, 50);
INSERT INTO `distributionstockdetail` VALUES (29, 1, 38, 50);
INSERT INTO `distributionstockdetail` VALUES (30, 1, 39, 50);
INSERT INTO `distributionstockdetail` VALUES (31, 1, 40, 60);
INSERT INTO `distributionstockdetail` VALUES (32, 1, 41, 70);

-- ----------------------------
-- Table structure for import_goods
-- ----------------------------
DROP TABLE IF EXISTS `import_goods`;
CREATE TABLE `import_goods`  (
  `import_goodsID` int(11) NOT NULL AUTO_INCREMENT,
  `SupplierID` int(11) NULL DEFAULT NULL,
  `StockID` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`import_goodsID`) USING BTREE,
  INDEX `FK_import_goods_supplier`(`SupplierID`) USING BTREE,
  INDEX `FK_import_goods_stock`(`StockID`) USING BTREE,
  CONSTRAINT `FK_import_goods_stock` FOREIGN KEY (`StockID`) REFERENCES `stocks` (`StockID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_import_goods_supplier` FOREIGN KEY (`SupplierID`) REFERENCES `supplier` (`SupplierID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of import_goods
-- ----------------------------

-- ----------------------------
-- Table structure for importorder
-- ----------------------------
DROP TABLE IF EXISTS `importorder`;
CREATE TABLE `importorder`  (
  `ImportOrderID` int(11) NOT NULL AUTO_INCREMENT,
  `SupplierID` int(11) NULL DEFAULT NULL,
  `CreateAt` datetime NULL DEFAULT NULL,
  `Total` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`ImportOrderID`) USING BTREE,
  INDEX `FK_NCC`(`SupplierID`) USING BTREE,
  CONSTRAINT `FK_NCC` FOREIGN KEY (`SupplierID`) REFERENCES `supplier` (`SupplierID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of importorder
-- ----------------------------
INSERT INTO `importorder` VALUES (1, 2, '2023-11-25 19:40:01', 100000000);
INSERT INTO `importorder` VALUES (2, 4, '2023-12-04 08:53:37', 150000000);

-- ----------------------------
-- Table structure for importorderdetail
-- ----------------------------
DROP TABLE IF EXISTS `importorderdetail`;
CREATE TABLE `importorderdetail`  (
  `ImportOrderDetailID` int(11) NOT NULL AUTO_INCREMENT,
  `ImportOrderID` int(11) NULL DEFAULT NULL,
  `ProductID` int(11) NULL DEFAULT NULL,
  `Quantity` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`ImportOrderDetailID`) USING BTREE,
  INDEX `FK_IMPORTORDER`(`ImportOrderID`) USING BTREE,
  INDEX `FK_OP`(`ProductID`) USING BTREE,
  CONSTRAINT `FK_IMPORTORDER` FOREIGN KEY (`ImportOrderID`) REFERENCES `importorder` (`ImportOrderID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_OP` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of importorderdetail
-- ----------------------------
INSERT INTO `importorderdetail` VALUES (1, 1, 10, 100);
INSERT INTO `importorderdetail` VALUES (2, 1, 11, 85);
INSERT INTO `importorderdetail` VALUES (3, 1, 12, 42);
INSERT INTO `importorderdetail` VALUES (4, 1, 13, 57);
INSERT INTO `importorderdetail` VALUES (5, 1, 14, 68);
INSERT INTO `importorderdetail` VALUES (6, 1, 15, 73);
INSERT INTO `importorderdetail` VALUES (7, 1, 16, 91);
INSERT INTO `importorderdetail` VALUES (8, 1, 17, 30);
INSERT INTO `importorderdetail` VALUES (9, 1, 18, 55);
INSERT INTO `importorderdetail` VALUES (10, 1, 19, 78);
INSERT INTO `importorderdetail` VALUES (11, 1, 20, 40);
INSERT INTO `importorderdetail` VALUES (12, 1, 11, 63);
INSERT INTO `importorderdetail` VALUES (13, 1, 12, 50);
INSERT INTO `importorderdetail` VALUES (14, 1, 13, 37);
INSERT INTO `importorderdetail` VALUES (15, 1, 14, 82);
INSERT INTO `importorderdetail` VALUES (16, 1, 15, 95);
INSERT INTO `importorderdetail` VALUES (17, 1, 16, 73);
INSERT INTO `importorderdetail` VALUES (18, 1, 17, 45);
INSERT INTO `importorderdetail` VALUES (19, 1, 18, 60);
INSERT INTO `importorderdetail` VALUES (20, 1, 19, 88);
INSERT INTO `importorderdetail` VALUES (21, 1, 20, 35);
INSERT INTO `importorderdetail` VALUES (22, 2, 11, 120);
INSERT INTO `importorderdetail` VALUES (23, 2, 12, 75);
INSERT INTO `importorderdetail` VALUES (24, 2, 13, 150);
INSERT INTO `importorderdetail` VALUES (25, 2, 14, 90);
INSERT INTO `importorderdetail` VALUES (26, 2, 15, 180);
INSERT INTO `importorderdetail` VALUES (27, 2, 16, 40);
INSERT INTO `importorderdetail` VALUES (28, 2, 17, 95);
INSERT INTO `importorderdetail` VALUES (29, 2, 18, 130);
INSERT INTO `importorderdetail` VALUES (30, 2, 19, 60);
INSERT INTO `importorderdetail` VALUES (31, 2, 20, 110);
INSERT INTO `importorderdetail` VALUES (32, 2, 21, 45);
INSERT INTO `importorderdetail` VALUES (33, 2, 22, 85);
INSERT INTO `importorderdetail` VALUES (34, 2, 23, 170);
INSERT INTO `importorderdetail` VALUES (35, 2, 24, 100);
INSERT INTO `importorderdetail` VALUES (36, 2, 25, 140);
INSERT INTO `importorderdetail` VALUES (37, 2, 26, 55);
INSERT INTO `importorderdetail` VALUES (38, 2, 27, 75);
INSERT INTO `importorderdetail` VALUES (39, 2, 28, 160);
INSERT INTO `importorderdetail` VALUES (40, 2, 29, 120);
INSERT INTO `importorderdetail` VALUES (41, 2, 30, 95);

-- ----------------------------
-- Table structure for logbuy
-- ----------------------------
DROP TABLE IF EXISTS `logbuy`;
CREATE TABLE `logbuy`  (
  `LogBuyID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `CreateAt` datetime NOT NULL,
  PRIMARY KEY (`LogBuyID`) USING BTREE,
  INDEX `FK_Customer`(`CustomerID`) USING BTREE,
  INDEX `FK_Product`(`ProductID`) USING BTREE,
  CONSTRAINT `FK_Customer` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Product` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of logbuy
-- ----------------------------

-- ----------------------------
-- Table structure for orderdetails
-- ----------------------------
DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE `orderdetails`  (
  `OrderDetailID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderID` int(11) NULL DEFAULT NULL,
  `ProductID` int(11) NULL DEFAULT NULL,
  `Quantity` int(11) NULL DEFAULT NULL,
  `DistributionStockID` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`OrderDetailID`) USING BTREE,
  INDEX `FK_Order`(`OrderID`) USING BTREE,
  INDEX `FK_NameProducts`(`ProductID`) USING BTREE,
  CONSTRAINT `FK_NameProducts` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Order` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of orderdetails
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `OrderID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` int(11) NOT NULL,
  `PromotionID` int(11) NOT NULL,
  `Total` int(11) NOT NULL,
  `CreateAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`OrderID`) USING BTREE,
  INDEX `FK_CustomerDetail`(`CustomerID`) USING BTREE,
  CONSTRAINT `FK_CustomerDetail` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for paymentdetail
-- ----------------------------
DROP TABLE IF EXISTS `paymentdetail`;
CREATE TABLE `paymentdetail`  (
  `PaymentDetailID` int(11) NOT NULL AUTO_INCREMENT,
  `PaymentID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Total` int(11) NOT NULL,
  PRIMARY KEY (`PaymentDetailID`) USING BTREE,
  INDEX `FK_NameProduct`(`ProductID`) USING BTREE,
  INDEX `FK_PaymentID`(`PaymentID`) USING BTREE,
  CONSTRAINT `FK_NameProduct` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_PaymentID` FOREIGN KEY (`PaymentID`) REFERENCES `payments` (`PaymentID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of paymentdetail
-- ----------------------------
INSERT INTO `paymentdetail` VALUES (13, 27, 40, 2, 2280000);
INSERT INTO `paymentdetail` VALUES (14, 27, 22, 21, 4200000);

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments`  (
  `PaymentID` int(11) NOT NULL AUTO_INCREMENT,
  `PaymentCode` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `PaymentType` int(11) NULL DEFAULT NULL,
  `CustomerID` int(11) NULL DEFAULT NULL,
  `AccountID` int(11) NULL DEFAULT NULL,
  `Status` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CreateAt` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Total` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`PaymentID`) USING BTREE,
  INDEX `FK_CustomerName`(`CustomerID`) USING BTREE,
  INDEX `FK_Staff`(`AccountID`) USING BTREE,
  CONSTRAINT `FK_CustomerName` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Staff` FOREIGN KEY (`AccountID`) REFERENCES `accounts` (`AccountID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of payments
-- ----------------------------
INSERT INTO `payments` VALUES (27, '4834452', 1, 7, NULL, 'Đang chờ duyệt', '8/12/2023', 6480000);

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `ProductID` int(11) NOT NULL AUTO_INCREMENT,
  `BrandID` int(11) NULL DEFAULT NULL,
  `CategoryID` int(11) NULL DEFAULT NULL,
  `NameProduct` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ImgProduct` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `NationalProduct` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `DescProduct` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `PriceProduct` double NULL DEFAULT NULL,
  `Model` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Color` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `LaunchYear` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Guarantee` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Mass` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Size` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ProductID`) USING BTREE,
  INDEX `FK_BrandKey`(`BrandID`) USING BTREE,
  INDEX `FK_Catelogy`(`CategoryID`) USING BTREE,
  CONSTRAINT `FK_BrandKey` FOREIGN KEY (`BrandID`) REFERENCES `brands` (`BrandID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Catelogy` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (10, 1, 5, 'Đèn chùm Panasonic HH-LM800388', 'ImgProduct-1700918604929-645212642.jpeg', 'Trung Quốc', 'Đèn chùm HH-LM800388 được sử dụng chất liệu kim loại màu bạc cho màu sáng bóng, dễ lau chùi, không bị gỉ set theo thời gian, Chóa đèn bằng sứ với bề mặt mịn, lớp sơn dày, tạo hiệu ứng rất đẹp khi có ánh sáng đèn chiếu qua', 16999999, 'HH-LM800388', 'Trắng', '2022', '6', '12.45kg', '∅808mm/H480mm');
INSERT INTO `products` VALUES (11, 11, 2, 'ATS chuyển nguồn không gián đoạn Aisikai', 'ImgProduct-1700922423784-212422168.png', 'Trung Quốc', 'Bộ chuyển nguồn tự động ATS (Automatic Transfer Switches) là một thiết bị chuyển đổi giữa 2 nguồn điện theo yêu cầu, chuyển đổi nguồn điện tự động giữa máy phát điện và điện lưới. Khi nguồn điện lưới chính bị mất điện hoặc gặp sự cố ATS sẽ tự động chuyển sang sử dụng nguồn điện dự phòng, máy phát điện và khi nguồn điện chính được phục hồi ATS sẽ chuyển lại sử dụng nguồn điện chính.', 16000000, 'Aisikai 63A – 2P/ 3P/ 4P', 'Trắng', '2019', '6', '12.45kg', '∅808mm/H480mm');
INSERT INTO `products` VALUES (12, 1, 5, 'Đèn Led Bulb', 'ImgProduct-1701004092344-818616437.jpg', 'Trung quốc', 'Bóng Led Bulb DOB Kingled sử dụng công nghệ Driver On Board - tích hợp công nghệ nguồn hiện đại, cách ly nhiệt với linh kiện giúp tăng tuổi thọ gấp 3 lần.', 51000, 'DOB-LB-15-A3-T', 'trắng', '2023', '12', '100g', '300x300');
INSERT INTO `products` VALUES (13, 12, 5, 'Đèn Bulb trụ ', 'ImgProduct-1701004540691-709651753.jpg', 'Việt nam', 'Bóng Led Bulb DOB Kingled sử dụng công nghệ Driver On Board - tích hợp công nghệ nguồn hiện đại, cách ly nhiệt với linh kiện giúp tăng tuổi thọ gấp 3 lần.', 100000, 'KBNL579', 'trắng', '2023', '12', '100g', '300x300');
INSERT INTO `products` VALUES (14, 12, 5, 'Đèn tích điện ', 'ImgProduct-1701004603164-263721643.jpg', 'Việt nam', 'Bóng Led Bulb DOB Kingled sử dụng công nghệ Driver On Board - tích hợp công nghệ nguồn hiện đại, cách ly nhiệt với linh kiện giúp tăng tuổi thọ gấp 3 lần.', 100000, 'KBNL579', 'trắng', '2023', '6', '100g', '300x300');
INSERT INTO `products` VALUES (15, 12, 5, ' Đèn Filament', 'ImgProduct-1701004641194-290096053.jpg', 'Trung quốc', 'Bóng Led Bulb DOB Kingled sử dụng công nghệ Driver On Board - tích hợp công nghệ nguồn hiện đại, cách ly nhiệt với linh kiện giúp tăng tuổi thọ gấp 3 lần.', 100000, 'KBNL211', 'trắng', '2023', '6', '100g', '300x300');
INSERT INTO `products` VALUES (16, 12, 5, 'MPE LBD3', 'ImgProduct-1701004689850-562110766.jpg', 'Trung quốc', 'Bóng Led Bulb DOB Kingled sử dụng công nghệ Driver On Board - tích hợp công nghệ nguồn hiện đại, cách ly nhiệt với linh kiện giúp tăng tuổi thọ gấp 3 lần.', 100000, 'KBNL579', 'trắng', '2023', '6', '100g', '300x300');
INSERT INTO `products` VALUES (17, 11, 3, ' Cáp điện kế DK-CVV (3 + 1) lõi', 'ImgProduct-1701005022427-39553735.jpg', 'Trung quốc', 'dây cáp chất lượng cao ,', 200000, 'DK-CVV', 'đỏ', '2023', '12', '1kg', '10m');
INSERT INTO `products` VALUES (18, 13, 3, 'Dây cáp mạng CAT5e FTP 0.51', 'ImgProduct-1701005119187-727902054.jpg', 'Trung quốc', 'Dây cáp mạng CAT5e FTP 0.51 mm 4 Pair chống nhiễu màu xanh/ trắng', 100000, 'CAT5e FTP 0.51', 'trắng', '2023', '6', '100g', '10kg');
INSERT INTO `products` VALUES (19, 13, 3, 'Dây điện lực (AV) ­– 0,6/1 ', 'ImgProduct-1701005670849-109446069.jpg', 'Trung quốc', 'Dây cáp mạng CAT5e FTP 0.51 mm 4 Pair chống nhiễu màu xanh/ trắng', 100000, 'KV - AS/NZS ', 'trắng', '2023', '6', '100g', '10kg');
INSERT INTO `products` VALUES (20, 13, 3, 'dây điện CXV 4 lõi 0.6/1kV', 'ImgProduct-1701005733730-20994494.jpg', 'Trung quốc', 'dây cáp xịn', 100000, 'CXV 4', 'xanh', '2023', '6', '100g', '10kg');
INSERT INTO `products` VALUES (21, 13, 3, 'Cáp mạng Cat6 DC6CAUTP4P3X', 'ImgProduct-1701005733730-20994494.jpg', 'Trung quốc', 'dây cáp xịn', 100000, 'DC6CAUTP4P3X', 'xanh', '2023', '6', '100g', '10kg');
INSERT INTO `products` VALUES (22, 1, 3, 'Ổ cắm 3 chấu vuông + 1 công tắc B215S', 'ImgProduct-1701006378760-544798211.jpg', 'Trung quốc', 'Ổ cắm 3 chấu vuông + 1 công tắc', 200000, ' B215S', 'trắng', '2023', '1', '100g', '300x300');
INSERT INTO `products` VALUES (23, 11, 3, 'Ổ cắm kéo dài chống sét lan truyền thế hệ mới', 'ImgProduct-1701006528232-446549753.jpg', 'Trung quốc', 'Ổ cắm kéo dài chống sét lan truyền thế hệ mới', 100000, 'absc', 'trắng', '2023', '1', '100g', '300x300');
INSERT INTO `products` VALUES (24, 11, 3, 'Ổ căm đa năng và ổ cắm đơn 2 chấu và 2 ổ USB S7MS/USB', 'ImgProduct-1701006834133-895132390.jpg', 'Trung quốc', 'Ổ cắm kéo dài chống sét lan truyền thế hệ mới', 100000, 'S7MS/USB', 'trắng', '2023', '6', '100g', '300x300');
INSERT INTO `products` VALUES (25, 11, 3, 'Ổ cắm dao cao râu A38V-C34', 'ImgProduct-1701006866751-913497745.jpg', 'Trung quốc', 'Ổ cắm dao cao râu A38V-C34', 100000, ' A38V-C34', 'trắng', '2023', '6', '100g', '300x300');
INSERT INTO `products` VALUES (26, 11, 3, 'Ổ cắm đa năng 16A + công tắc cho ổ cắm A38G-C34', 'ImgProduct-1701006906183-491007858.jpg', 'Trung quốc', 'Ổ cắm đa năng 16A + công tắc cho ổ cắm A38G-C34', 200000, 'A38G-C34', 'trắng', '2023', '6', '100g', '300x300');
INSERT INTO `products` VALUES (27, 1, 2, 'Công tắc vuông Wifi chiết áp đèn SDS86-03CMW(Y)', 'ImgProduct-1701007208087-327311847.jpg', 'Trung quốc', 'Công tắc vuông Wifi chiết áp đèn SDS86-03CMW(Y)', 200000, 'SDS86-03CMW(Y)', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (28, 12, 2, 'Công tắc đơn 1 chiều vuông màu đen HD86-01CMB(Y)', 'ImgProduct-1701007490823-730373929.jpg', 'Trung quốc', 'Công tắc đơn 1 chiều vuông màu đen HD86-01CMB(Y)', 200000, 'HD86-01CMB(Y)', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (29, 12, 2, 'Công tắc Smartlife mặt nhựa phím bấm nhấn nhả', 'ImgProduct-1701007539318-216539248.jpg', 'Trung quốc', 'Công tắc Smartlife mặt nhựa phím bấm nhấn nhả', 200000, 'HD86-01CMB(Y)', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (30, 11, 2, 'Công tắc đơn Kawasan cảm ứng chạm điều khiển từ xa DK1S', 'ImgProduct-1701007567032-476870294.jpg', 'Trung quốc', 'Công tắc đơn Kawasan cảm ứng chạm điều khiển từ xa DK1S', 200000, 'DK1S', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (31, 11, 2, 'Công tắc 1 chiều 16AX, size E (3S) cắm nhanh M3T31_E1F_WE', 'ImgProduct-1701007721551-582554203.jpg', 'Trung quốc', 'Công tắc 1 chiều 16AX, size E (3S) cắm nhanh M3T31_E1F_WE', 200000, 'M3T31_E1F_WE', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (32, 11, 2, 'cầu dao MCB 3P 6KA', 'ImgProduct-1701007765087-18135419.jpg', 'Trung quốc', 'Công tắc 1 chiều 16AX, size E (3S) cắm nhanh M3T31_E1F_WE', 150000, 'MCB 3P 6KA', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (33, 11, 2, 'cầu dao Easy9 MCB 2P, 4.5kA, 230V,C curve', 'ImgProduct-1701007795009-602534776.jpg', 'Trung quốc', 'Công tắc 1 chiều 16AX, size E (3S) cắm nhanh M3T31_E1F_WE', 150000, 'C curve', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (34, 11, 2, 'dao Easy9 MCB 1P, 4.5kA, 230V,C curve', 'ImgProduct-1701007928336-391842124.jpg', 'Trung quốc', 'dao Easy9 MCB 1P, 4.5kA, 230V,C curve', 232000, 'Easy9 MCB', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (35, 11, 2, 'cầu dao MCB RX3 2P 6kA 230/400V, C curve', 'ImgProduct-1701008069336-186486103.jpg', 'Trung quốc', 'cầu dao MCB RX3 2P 6kA 230/400V, C curve', 400000, 'MCB RX3 ', 'trắng', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (36, 11, 2, 'cầu dao MCB RX3 4P 6kA 400V, C curve', 'ImgProduct-1701008108824-757492726.jpg', 'Trung quốc', 'cầu dao MCB RX3 4P 6kA 400V, C curve', 400000, 'MCB RX3 4P', 'đen', '2023', '6', '200g', '300x300');
INSERT INTO `products` VALUES (37, 1, 7, 'Camera ngoài trời tích hợp đèn pha và còi báo động ', 'ImgProduct-1701008304036-955033434.jpg', 'Trung quốc', 'Camera ngoài trời tích hợp đèn pha và còi báo động LC1 CS-LC1-A0', 1140000, 'LC1 CS-LC1-A0', 'đen', '2023', '6', '1kg', '300x300');
INSERT INTO `products` VALUES (38, 1, 7, 'Camera thông minh trong nhà ', 'ImgProduct-1701008339007-650521705.jpg', 'Trung quốc', 'Camera ngoài trời tích hợp đèn pha và còi báo động LC1 CS-LC1-A0', 1140000, 'Cl1/SC', 't', '2023', '6', '1kg', '300x300');
INSERT INTO `products` VALUES (39, 1, 7, 'Camera Dome HD-TVI hồng ngoại 2.0 Megapixel ', 'ImgProduct-1701008382480-592179867.jpg', 'Trung quốc', 'Camera Dome HD-TVI hồng ngoại 2.0 Megapixel ', 1140000, 'DS-2CE71D0T-PIRL', 'trắng', '2023', '6', '1kg', '300x300');
INSERT INTO `products` VALUES (40, 1, 7, 'HD1080P IR Bullet Camera ', 'ImgProduct-1701008423686-53597717.jpg', 'Trung quốc', 'HD1080P IR Bullet Camera DS-2CE16D0T-IRP', 1140000, 'DS-2CE16D0T-IRP', 'trắng-đen', '2023', '12', '1kg', '300x300');
INSERT INTO `products` VALUES (41, 1, 7, 'Camera thông minh ngoài trời CO1/SC', 'ImgProduct-1701008459238-456045023.jpg', 'Trung quốc', 'HD1080P IR Bullet Camera DS-2CE16D0T-IRP', 1140000, ' CO1/SC', 'trắng-đen', '2022', '12', '1kg', '300x300');

-- ----------------------------
-- Table structure for promotions
-- ----------------------------
DROP TABLE IF EXISTS `promotions`;
CREATE TABLE `promotions`  (
  `PromotionID` int(11) NOT NULL AUTO_INCREMENT,
  `PromotionName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `PromotionCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CreateAt` datetime NULL DEFAULT NULL,
  `Expired` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`PromotionID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of promotions
-- ----------------------------
INSERT INTO `promotions` VALUES (1, '30', 'KHTHT', '2023-12-07 08:43:39', '2024-01-01 08:43:42');

-- ----------------------------
-- Table structure for settingwebs
-- ----------------------------
DROP TABLE IF EXISTS `settingwebs`;
CREATE TABLE `settingwebs`  (
  `SettingID` int(11) NOT NULL AUTO_INCREMENT,
  `Tax` int(20) NULL DEFAULT NULL,
  `RateImportProduct` int(5) NULL DEFAULT NULL,
  PRIMARY KEY (`SettingID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of settingwebs
-- ----------------------------

-- ----------------------------
-- Table structure for stocks
-- ----------------------------
DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks`  (
  `StockID` int(11) NOT NULL AUTO_INCREMENT,
  `StockName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `StockAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `StockPhone` int(11) NULL DEFAULT NULL,
  `Product` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`StockID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of stocks
-- ----------------------------
INSERT INTO `stocks` VALUES (1, 'Kho Long Bình', '117/2d1 Hồ Văn Long, Tân Tạo, Bình Tân, Thành phố Hồ Chí Minh 100000', 906657743, '[{\"ProductID\":10,\"Quantity\":100},{\"ProductID\":12,\"Quantity\":42},{\"ProductID\":12,\"Quantity\":50},{\"ProductID\":11,\"Quantity\":85},{\"ProductID\":11,\"Quantity\":63},{\"ProductID\":17,\"Quantity\":30},{\"ProductID\":17,\"Quantity\":45},{\"ProductID\":13,\"Quantity\":57},{\"ProductID\":13,\"Quantity\":37},{\"ProductID\":14,\"Quantity\":68},{\"ProductID\":14,\"Quantity\":82},{\"ProductID\":15,\"Quantity\":73},{\"ProductID\":15,\"Quantity\":95},{\"ProductID\":16,\"Quantity\":91},{\"ProductID\":16,\"Quantity\":73},{\"ProductID\":18,\"Quantity\":55},{\"ProductID\":18,\"Quantity\":60},{\"ProductID\":19,\"Quantity\":78},{\"ProductID\":19,\"Quantity\":88},{\"ProductID\":20,\"Quantity\":40},{\"ProductID\":20,\"Quantity\":35}]');

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier`  (
  `SupplierID` int(11) NOT NULL AUTO_INCREMENT,
  `SupplierName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `SupplierPhone` int(50) NULL DEFAULT NULL,
  PRIMARY KEY (`SupplierID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of supplier
-- ----------------------------
INSERT INTO `supplier` VALUES (1, 'Nhà Cung Cấp Phân Phối Biến Thế Và Thiết Bị Điện Miền Bắc', 324006279);
INSERT INTO `supplier` VALUES (2, 'Nhà Cung Cấp Thiết Bị Điện Kim Nguyên', 903164839);
INSERT INTO `supplier` VALUES (3, 'Nhà Cung Cấp Thiết Bị Điện Tiến Đạt', 918671515);
INSERT INTO `supplier` VALUES (4, 'Nhà Cung Cấp Cơ Khí Điện Long Giang', 221060457);
INSERT INTO `supplier` VALUES (5, 'Nhà Cung Cấp TONY GOLDEN BEES', 973884049);
INSERT INTO `supplier` VALUES (6, 'Nhà Cung Cấp Đầu Tư Xây Dựng Thương Mại Đăng Khôi', 628283999);
INSERT INTO `supplier` VALUES (7, 'Nhà Cung Cấp Sản Xuất Thương Mại Đạt Bình', 972562721);

-- ----------------------------
-- View structure for allinfoordersview
-- ----------------------------
DROP VIEW IF EXISTS `allinfoordersview`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `allinfoordersview` AS SELECT od.OrderID,p.ProductID, o.CustomerID, p.ImgProduct, p.NameProduct, b.NameBrand, p.Model, p.PriceProduct , od.Quantity
FROM orders o
JOIN orderdetails od ON o.OrderID = od.OrderID
JOIN products p ON od.ProductID = p.ProductID
JOIN brands b ON b.BrandID = p.BrandID

WHERE o.CustomerID = CustomerID ;

-- ----------------------------
-- Procedure structure for AddNewBrand
-- ----------------------------
DROP PROCEDURE IF EXISTS `AddNewBrand`;
delimiter ;;
CREATE PROCEDURE `AddNewBrand`(IN p_NameBrand VARCHAR(255),
    IN p_DescBrand TEXT)
BEGIN
    INSERT INTO brands (NameBrand, DescBrand)
    VALUES (p_NameBrand, p_DescBrand);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for AddNewPayment
-- ----------------------------
DROP PROCEDURE IF EXISTS `AddNewPayment`;
delimiter ;;
CREATE PROCEDURE `AddNewPayment`(IN p_PaymentCode VARCHAR(255),
    IN p_PaymentType VARCHAR(255),
    IN p_CustomerID INT,
    IN p_AccountID INT,
    IN p_Status VARCHAR(50),
    IN p_CreateAt VARCHAR(255),
    IN p_Total INT)
BEGIN
    DECLARE newPaymentID INT;

    INSERT INTO payments (PaymentCode, PaymentType, CustomerID, AccountID, Status, CreateAt, Total)
    VALUES (p_PaymentCode, p_PaymentType, p_CustomerID, p_AccountID, p_Status, p_CreateAt, p_Total);

    SET newPaymentID = LAST_INSERT_ID();

    SELECT newPaymentID AS PaymentID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for AddNewProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `AddNewProduct`;
delimiter ;;
CREATE PROCEDURE `AddNewProduct`(IN p_NameProduct VARCHAR(255),
    IN p_BrandID INT,
    IN p_CategoryID INT,
    IN p_ImgProduct VARCHAR(255),
    IN p_NationalProduct VARCHAR(255),
    IN p_DescProduct TEXT,
    IN p_PriceProduct INT,
    IN p_Model VARCHAR(255),
    IN p_Color VARCHAR(255),
    IN p_LaunchYear INT,
    IN p_Guarantee INT,
    IN p_Mass VARCHAR(255),
    IN p_Size VARCHAR(255))
BEGIN
    INSERT INTO products (
        NameProduct,
        BrandID,
        CategoryID,
        ImgProduct,
        NationalProduct,
        DescProduct,
        PriceProduct,
        Model,
        Color,
        LaunchYear,
        Guarantee,
        Mass,
        Size
    )
    VALUES (
        p_NameProduct,
        p_BrandID,
        p_CategoryID,
        p_ImgProduct,
        p_NationalProduct,
        p_DescProduct,
        p_PriceProduct,
        p_Model,
        p_Color,
        p_LaunchYear,
        p_Guarantee,
        p_Mass,
        p_Size
    );
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for AddNewPromotion
-- ----------------------------
DROP PROCEDURE IF EXISTS `AddNewPromotion`;
delimiter ;;
CREATE PROCEDURE `AddNewPromotion`(IN p_PromotionName VARCHAR(255),
    IN p_PromotionDesc TEXT,
    IN p_PromotionCode VARCHAR(50),
    IN p_CreateAt DATETIME,
    IN p_Expired DATETIME)
BEGIN
    INSERT INTO promotions (PromotionName, PromotionDesc, PromotionCode, CreateAt, Expired)
    VALUES (p_PromotionName, p_PromotionDesc, p_PromotionCode, p_CreateAt, p_Expired);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for AddNewSupplier
-- ----------------------------
DROP PROCEDURE IF EXISTS `AddNewSupplier`;
delimiter ;;
CREATE PROCEDURE `AddNewSupplier`(IN p_SupplierName VARCHAR(255),
    IN p_SupplierPhone VARCHAR(20))
BEGIN
    INSERT INTO supplier (SupplierName, SupplierPhone)
    VALUES (p_SupplierName, p_SupplierPhone);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for AddQuantityProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `AddQuantityProduct`;
delimiter ;;
CREATE PROCEDURE `AddQuantityProduct`(IN p_ProductID INT)
BEGIN
    IF EXISTS (SELECT 1 FROM orderdetails WHERE ProductID = p_ProductID) THEN
        UPDATE orderdetails
        SET Quantity = Quantity + 1
        WHERE ProductID = p_ProductID;
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for CheckCustomerIDExist
-- ----------------------------
DROP PROCEDURE IF EXISTS `CheckCustomerIDExist`;
delimiter ;;
CREATE PROCEDURE `CheckCustomerIDExist`(IN inputCustomerID INT)
BEGIN
    DECLARE customerCount INT;

    SELECT COUNT(*) INTO customerCount
    FROM orders
    WHERE CustomerID = inputCustomerID;

    IF customerCount > 0 THEN
        SELECT 1 AS Result;
    ELSE
        SELECT 0  AS Result;
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for CheckPromoCode
-- ----------------------------
DROP PROCEDURE IF EXISTS `CheckPromoCode`;
delimiter ;;
CREATE PROCEDURE `CheckPromoCode`(IN promocode VARCHAR(255))
BEGIN
    DECLARE promotionCount INT;
    DECLARE currentDateTime DATETIME;
    DECLARE expiredDateTime DATETIME;
    DECLARE promotionRate VARCHAR(255);

    SELECT COUNT(*) INTO promotionCount
    FROM promotions
    WHERE PromotionCode = promocode;

    IF promotionCount > 0 THEN
        SELECT CreateAt, Expired, PromotionName
        INTO currentDateTime, expiredDateTime, promotionRate
        FROM promotions
        WHERE PromotionCode = promocode;

        IF CURRENT_TIMESTAMP() >= currentDateTime AND CURRENT_TIMESTAMP() <= expiredDateTime THEN
            SELECT 1 AS Result, promotionRate AS PromotionName;
        ELSE
            SELECT 0 AS Result, 0 AS PromotionRate;  
        END IF;
    ELSE
        SELECT 0 AS Result, 0 AS PromotionRate;  
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for CheckTimeSendEmailCart
-- ----------------------------
DROP PROCEDURE IF EXISTS `CheckTimeSendEmailCart`;
delimiter ;;
CREATE PROCEDURE `CheckTimeSendEmailCart`(IN p_email VARCHAR(255), IN p_otp VARCHAR(255))
BEGIN
    UPDATE customers
    SET OTP = p_otp
    WHERE Email = p_email;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for CreateNewAccount
-- ----------------------------
DROP PROCEDURE IF EXISTS `CreateNewAccount`;
delimiter ;;
CREATE PROCEDURE `CreateNewAccount`(IN p_Email VARCHAR(255),
    IN p_Password VARCHAR(255),
    IN p_FullName VARCHAR(255),
    IN p_Address VARCHAR(255),
    IN p_Phone VARCHAR(20),
    IN p_Avatar VARCHAR(255),
    IN p_Reward INT,
    IN p_DepartmentID INT,
		IN p_IsBanned INT)
BEGIN
    INSERT INTO accounts (Email, Password, FullName, Address, Phone, Avatar, Reward, DepartmentID,IsBanned)
    VALUES (p_Email, p_Password, p_FullName, p_Address, p_Phone, p_Avatar, p_Reward, p_DepartmentID,p_IsBanned);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for DeleteAllProductInCart
-- ----------------------------
DROP PROCEDURE IF EXISTS `DeleteAllProductInCart`;
delimiter ;;
CREATE PROCEDURE `DeleteAllProductInCart`(IN p_CustomerID VARCHAR(255))
BEGIN
  DELETE FROM orderdetails
  WHERE orderID IN (SELECT orderID FROM orders WHERE CustomerID = p_CustomerID);

  DELETE FROM orders
  WHERE CustomerID = p_CustomerID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for DeleteOrder
-- ----------------------------
DROP PROCEDURE IF EXISTS `DeleteOrder`;
delimiter ;;
CREATE PROCEDURE `DeleteOrder`(IN OrderID INT)
BEGIN
   DELETE FROM orderdetails WHERE OrderID = OrderID;

   DELETE FROM orders WHERE OrderID = OrderID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for DeleteProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `DeleteProduct`;
delimiter ;;
CREATE PROCEDURE `DeleteProduct`(IN p_ProductID INT)
BEGIN
    DELETE FROM products
    WHERE ProductID = p_ProductID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for DeleteProductInCartByID
-- ----------------------------
DROP PROCEDURE IF EXISTS `DeleteProductInCartByID`;
delimiter ;;
CREATE PROCEDURE `DeleteProductInCartByID`(IN p_ProductID INT)
BEGIN
    DELETE FROM orderdetails
    WHERE ProductID = p_ProductID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for EditProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `EditProduct`;
delimiter ;;
CREATE PROCEDURE `EditProduct`(IN p_ProductID INT,
    IN p_NameProduct VARCHAR(100),
    IN p_BrandID INT,
    IN p_CategoryID INT,
    IN p_ImgProduct TEXT,
    IN p_NationalProduct VARCHAR(50),
    IN p_DescProduct TEXT,
    IN p_PriceProduct DOUBLE,
    IN p_Model VARCHAR(30),
    IN p_Color VARCHAR(30),
    IN p_LaunchYear VARCHAR(30),
    IN p_Guarantee VARCHAR(30),
    IN p_Mass VARCHAR(30),
    IN p_Size VARCHAR(30))
BEGIN
    UPDATE products
    SET
        NameProduct = p_NameProduct,
        BrandID = p_BrandID,
        CategoryID = p_CategoryID,
        ImgProduct = p_ImgProduct,
        NationalProduct = p_NationalProduct,
        DescProduct = p_DescProduct,
        PriceProduct = p_PriceProduct,
        Model = p_Model,
        Color = p_Color,
        LaunchYear = p_LaunchYear,
        Guarantee = p_Guarantee,
        Mass = p_Mass,
        Size = p_Size
    WHERE ProductID = p_ProductID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetAllAccounts
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetAllAccounts`;
delimiter ;;
CREATE PROCEDURE `GetAllAccounts`()
BEGIN
    SELECT A.AccountID, A.Email, A.IsBanned, A.FullName, A.Address, A.Phone, A.Avatar, A.Reward, D.DepartmentName
    FROM accounts A
    INNER JOIN Department D ON A.DepartmentID = D.DepartmentID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetAllBrand
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetAllBrand`;
delimiter ;;
CREATE PROCEDURE `GetAllBrand`()
BEGIN
   SELECT * FROM brands;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetAllCategory
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetAllCategory`;
delimiter ;;
CREATE PROCEDURE `GetAllCategory`()
BEGIN
   SELECT * FROM category;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetAllCustomer
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetAllCustomer`;
delimiter ;;
CREATE PROCEDURE `GetAllCustomer`()
BEGIN
    SELECT CustomerID, Email, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID
    FROM customers;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetAllDepartment
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetAllDepartment`;
delimiter ;;
CREATE PROCEDURE `GetAllDepartment`()
BEGIN
   SELECT * FROM department;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetAllProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetAllProduct`;
delimiter ;;
CREATE PROCEDURE `GetAllProduct`()
BEGIN
    SELECT b.NameBrand,b.BrandID,p.CategoryID, c.CategoryName,p.ProductID, p.NameProduct, p.ImgProduct, p.NationalProduct, p.DescProduct, p.PriceProduct,
           p.Model, p.Color, p.LaunchYear, p.Guarantee, p.Mass, p.Size
    FROM products p
    JOIN brands b ON p.BrandID = b.BrandID
    JOIN category c ON p.CategoryID = c.CategoryID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetAllSupplier
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetAllSupplier`;
delimiter ;;
CREATE PROCEDURE `GetAllSupplier`()
BEGIN
   SELECT * FROM supplier;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetCustomerInfo
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetCustomerInfo`;
delimiter ;;
CREATE PROCEDURE `GetCustomerInfo`(IN p_Email VARCHAR(255), IN p_Password VARCHAR(255))
BEGIN
    DECLARE v_CustomerID INT;
    DECLARE v_FullName VARCHAR(255);
    DECLARE v_Gender VARCHAR(10);
    DECLARE v_Address VARCHAR(255);
    DECLARE v_Avatar VARCHAR(255);
    DECLARE v_PhoneNumber VARCHAR(20);
    DECLARE v_IsOnline BOOLEAN;
    DECLARE v_IsBanned BOOLEAN;
    DECLARE v_FacebookID VARCHAR(255);
    DECLARE v_GoogleID VARCHAR(255);

    -- Lấy thông tin khách hàng từ bảng customer
    SELECT CustomerID, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID
    INTO v_CustomerID, v_FullName, v_Gender, v_Address, v_Avatar, v_PhoneNumber, v_IsOnline, v_IsBanned, v_FacebookID, v_GoogleID
    FROM customers
    WHERE Email = p_Email AND Password = p_Password;

    -- Trả về kết quả
    SELECT CustomerID, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID   FROM customers
    WHERE Email = p_Email AND Password = p_Password;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetDataCustomerByID
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetDataCustomerByID`;
delimiter ;;
CREATE PROCEDURE `GetDataCustomerByID`(IN p_CustomerID INT)
BEGIN
    SELECT
        CustomerID,
        Email,
        FullName,
        Gender,
        Address,
        Avatar,
        PhoneNumber,
        IsOnline,
        IsBanned,
        FacebookID,
        GoogleID
    FROM
        customers
    WHERE
        CustomerID = p_CustomerID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for getDetailImportProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `getDetailImportProduct`;
delimiter ;;
CREATE PROCEDURE `getDetailImportProduct`(IN p_ImportOrderID INT)
BEGIN
  SELECT
    importorder.ImportOrderID,
    SupplierID,
    CreateAt,
    Total,
    importorderdetail.ProductID,
    Quantity,
    products.CategoryID,
    CategoryName,
    NameProduct,
    ImgProduct,
    NationalProduct,
    DescProduct,
    PriceProduct,
    Model,
    Color,
    LaunchYear,
    Guarantee,
    Mass,
    products.Size,
    NameBrand,
    DescBrand
  FROM
    importorder
  JOIN
    importorderdetail ON importorder.ImportOrderID = importorderdetail.ImportOrderID
  JOIN
    products ON importorderdetail.ProductID = products.ProductID
  JOIN
    category ON products.CategoryID = category.CategoryID
  JOIN
    brands ON products.BrandID = brands.BrandID
  WHERE
    importorder.ImportOrderID = p_ImportOrderID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetDistributionStock
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetDistributionStock`;
delimiter ;;
CREATE PROCEDURE `GetDistributionStock`()
BEGIN
   SELECT * FROM DistributionStock;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetIDCustomer
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetIDCustomer`;
delimiter ;;
CREATE PROCEDURE `GetIDCustomer`(IN p_CustomerID INT)
BEGIN
    DECLARE v_OrderID INT;
    SELECT OrderID INTO v_OrderID
    FROM orders
    WHERE CustomerID = p_CustomerID;

    SELECT v_OrderID AS OrderID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetImportOrder
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetImportOrder`;
delimiter ;;
CREATE PROCEDURE `GetImportOrder`()
BEGIN
  SELECT i.ImportOrderID, s.SupplierName, i.CreateAt, i.Total 
  FROM ImportOrder i 
  JOIN Supplier s ON i.SupplierID = s.SupplierID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for getListImportorder
-- ----------------------------
DROP PROCEDURE IF EXISTS `getListImportorder`;
delimiter ;;
CREATE PROCEDURE `getListImportorder`()
BEGIN
  SELECT
    importorder.ImportOrderID,
    SupplierID,
    CreateAt,
    Total,
    importorderdetail.ProductID,
    Quantity,
    products.CategoryID,
    CategoryName,
    NameProduct,
    ImgProduct,
    NationalProduct,
    DescProduct,
    PriceProduct,
    Model,
    Color,
    LaunchYear,
    Guarantee,
    Mass,
    products.Size,
    NameBrand,
    DescBrand
  FROM
    importorder
  JOIN
    importorderdetail ON importorder.ImportOrderID = importorderdetail.ImportOrderID
  JOIN
    products ON importorderdetail.ProductID = products.ProductID
  JOIN
    category ON products.CategoryID = category.CategoryID
  JOIN
    brands ON products.BrandID = brands.BrandID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetListPayment
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetListPayment`;
delimiter ;;
CREATE PROCEDURE `GetListPayment`()
BEGIN
    SELECT 
    p.PaymentCode, 
    p.PaymentType,
    p.Status,
    p.CreateAt,
    p.Total,
    c.FullName,
    a.FullName AS AccountFullName
FROM 
    payments p
JOIN 
    customers c ON p.CustomerID = c.CustomerID
LEFT JOIN 
    accounts a ON p.AccountID = a.AccountID;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetProductDetails
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetProductDetails`;
delimiter ;;
CREATE PROCEDURE `GetProductDetails`(IN inputProductID INT)
BEGIN
    SELECT b.NameBrand, c.CategoryName, p.ProductID, p.NameProduct, p.ImgProduct, p.NationalProduct, p.DescProduct, p.PriceProduct,
           p.Model, p.Color, p.LaunchYear, p.Guarantee, p.Mass, p.Size
    FROM products p
    JOIN brands b ON p.BrandID = b.BrandID
    JOIN category c ON p.CategoryID = c.CategoryID
    WHERE p.ProductID = inputProductID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for GetQuantityByProductAndDistributionStock
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetQuantityByProductAndDistributionStock`;
delimiter ;;
CREATE PROCEDURE `GetQuantityByProductAndDistributionStock`(IN in_ProductID INT,
    IN in_DistributionStockID INT)
BEGIN
    SELECT Quantity
    FROM DistributionStockDetail
    WHERE ProductID = in_ProductID
      AND DistributionStockID = in_DistributionStockID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for getstocks
-- ----------------------------
DROP PROCEDURE IF EXISTS `getstocks`;
delimiter ;;
CREATE PROCEDURE `getstocks`()
BEGIN
  SELECT * FROM stocks;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ImportOrderInStock
-- ----------------------------
DROP PROCEDURE IF EXISTS `ImportOrderInStock`;
delimiter ;;
CREATE PROCEDURE `ImportOrderInStock`(IN StockID INT, IN ImportGoodsDetailJSON TEXT)
BEGIN
    DECLARE existingProduct TEXT;

    SELECT Product INTO existingProduct
    FROM stocks
    WHERE StockID = StockID;

    IF existingProduct IS NULL OR existingProduct = '' THEN
        UPDATE stocks
        SET Product = ImportGoodsDetailJSON
        WHERE StockID = StockID;
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for InsertOrder
-- ----------------------------
DROP PROCEDURE IF EXISTS `InsertOrder`;
delimiter ;;
CREATE PROCEDURE `InsertOrder`(IN p_CustomerID INT)
BEGIN
    INSERT INTO orders (CustomerID, PromotionID, Total, CreateAt) 
    VALUES (p_CustomerID, 0, 0, NOW());
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for InsertOrderDetail
-- ----------------------------
DROP PROCEDURE IF EXISTS `InsertOrderDetail`;
delimiter ;;
CREATE PROCEDURE `InsertOrderDetail`(IN p_ProductID INT,
    IN p_Quantity INT,
    IN p_OrderID INT,
		IN p_DistributionStockID INT)
BEGIN
    DECLARE existing_quantity INT;

    SELECT Quantity INTO existing_quantity
    FROM orderdetails
    WHERE ProductID = p_ProductID AND OrderID = p_OrderID;

    IF existing_quantity IS NOT NULL THEN
        UPDATE orderdetails
        SET Quantity = existing_quantity + p_Quantity
        WHERE ProductID = p_ProductID AND OrderID = p_OrderID;
    ELSE
        INSERT INTO orderdetails(ProductID, Quantity, OrderID,DistributionStockID)
        VALUES (p_ProductID, p_Quantity, p_OrderID,p_DistributionStockID);
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for InsertPaymentDetail
-- ----------------------------
DROP PROCEDURE IF EXISTS `InsertPaymentDetail`;
delimiter ;;
CREATE PROCEDURE `InsertPaymentDetail`(IN PaymentID INT, IN ProductID INT, IN Amount INT, IN Total INT)
BEGIN
    INSERT INTO paymentdetail (PaymentID, ProductID, Amount, Total)
    VALUES (PaymentID, ProductID, Amount, Total);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for LockAccount
-- ----------------------------
DROP PROCEDURE IF EXISTS `LockAccount`;
delimiter ;;
CREATE PROCEDURE `LockAccount`(IN p_AccountID INT,
    IN p_IsBanned INT)
BEGIN
    UPDATE accounts
    SET IsBanned = p_IsBanned
    WHERE AccountID = p_AccountID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for LoginAccount
-- ----------------------------
DROP PROCEDURE IF EXISTS `LoginAccount`;
delimiter ;;
CREATE PROCEDURE `LoginAccount`(IN p_email VARCHAR(50),
    IN p_password VARCHAR(100))
BEGIN
    DECLARE customer_id INT;
    DECLARE customer_email VARCHAR(50);
    DECLARE customer_password VARCHAR(100);

    -- Lấy thông tin người dùng từ cơ sở dữ liệu
    SELECT CustomerID, Email, Password
    INTO customer_id, customer_email, customer_password
    FROM customers
    WHERE Email = p_email;

    IF customer_id IS NULL THEN
        -- Email không tồn tại
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email không tồn tại';
    ELSE
        -- Kiểm tra mật khẩu
        IF p_password = customer_password THEN
            -- Đăng nhập thành công, trả về thông tin người dùng và kỹ năng của họ
            SELECT CustomerID, Email, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID 
            FROM customers
            WHERE CustomerID = customer_id;
        ELSE
            -- Mật khẩu không đúng hoặc không đáp ứng yêu cầu
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Mật khẩu không đúng hoặc không đáp ứng yêu cầu';
        END IF;
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for LoginCustomer
-- ----------------------------
DROP PROCEDURE IF EXISTS `LoginCustomer`;
delimiter ;;
CREATE PROCEDURE `LoginCustomer`(IN p_email VARCHAR(100),
    IN p_password VARCHAR(500))
BEGIN
    DECLARE customer_id INT;
    DECLARE customer_email VARCHAR(50);
    DECLARE customer_password VARCHAR(500);

    -- Lấy thông tin người dùng từ cơ sở dữ liệu
    SELECT CustomerID, Email, Password
    INTO customer_id, customer_email, customer_password
    FROM customers
    WHERE Email = p_email;

    IF customer_id IS NULL THEN
        -- Email không tồn tại
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email không tồn tại';
    ELSE
        -- Kiểm tra mật khẩu
        IF p_password = customer_password THEN
            -- Đăng nhập thành công, trả về thông tin người dùng và kỹ năng của họ
            SELECT CustomerID, Email, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID 
            FROM customers
            WHERE CustomerID = customer_id;
        ELSE
            -- Mật khẩu không đúng hoặc không đáp ứng yêu cầu
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Mật khẩu không đúng hoặc không đáp ứng yêu cầu';
        END IF;
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for RegisterCustomer
-- ----------------------------
DROP PROCEDURE IF EXISTS `RegisterCustomer`;
delimiter ;;
CREATE PROCEDURE `RegisterCustomer`(IN p_Email varchar(60),
    IN p_Password varchar(100),
    IN p_FullName varchar(100),
    IN p_Gender varchar(255),
    IN p_Address varchar(500),
    IN p_Avatar varchar(255),
    IN p_PhoneNumber varchar(255),
		IN p_IsOnline int,
		IN p_IsBanned int,
    IN p_FacebookID varchar(255),
    IN p_GoogleID varchar(255))
BEGIN
    INSERT INTO `customers` (`Email`,`Password`,`FullName`, `Gender`,`Address`,`Avatar`,`PhoneNumber`,`IsOnline`,`IsBanned`,`FacebookID`,`GoogleID`) VALUES (p_Email,p_Password,p_FullName, p_Gender,p_Address, p_Avatar,p_PhoneNumber,p_IsOnline,  p_IsBanned,p_FacebookID ,p_GoogleID);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SendOTPAccount
-- ----------------------------
DROP PROCEDURE IF EXISTS `SendOTPAccount`;
delimiter ;;
CREATE PROCEDURE `SendOTPAccount`(IN p_Password VARCHAR(255))
BEGIN
    SELECT *
    FROM accounts
    WHERE Password = p_Password;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SendOTPPayment
-- ----------------------------
DROP PROCEDURE IF EXISTS `SendOTPPayment`;
delimiter ;;
CREATE PROCEDURE `SendOTPPayment`(IN p_OTP VARCHAR(255))
BEGIN
    SELECT *
    FROM customers
    WHERE OTP = p_OTP;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SubtractionQuantityProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `SubtractionQuantityProduct`;
delimiter ;;
CREATE PROCEDURE `SubtractionQuantityProduct`(IN p_ProductID INT)
BEGIN
    IF EXISTS (SELECT 1 FROM orderdetails WHERE ProductID = p_ProductID) THEN
        UPDATE orderdetails
        SET Quantity = CASE WHEN Quantity > 0 THEN Quantity - 1 ELSE 0 END
        WHERE ProductID = p_ProductID;

        DELETE FROM orderdetails
        WHERE ProductID = p_ProductID AND Quantity = 0;
    END IF;
  
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for UnLockAccount
-- ----------------------------
DROP PROCEDURE IF EXISTS `UnLockAccount`;
delimiter ;;
CREATE PROCEDURE `UnLockAccount`(IN p_AccountID INT,
    IN p_IsBanned INT)
BEGIN
    UPDATE accounts
    SET IsBanned = p_IsBanned
    WHERE AccountID = p_AccountID;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for UpdateAccount
-- ----------------------------
DROP PROCEDURE IF EXISTS `UpdateAccount`;
delimiter ;;
CREATE PROCEDURE `UpdateAccount`(IN p_AccountID INT,
    IN p_Email VARCHAR(255),
    IN p_FullName VARCHAR(255),
    IN p_Address VARCHAR(255),
    IN p_Phone VARCHAR(15),
    IN p_DepartmentID INT)
BEGIN
    UPDATE accounts
    SET
        Email = p_Email,
        FullName = p_FullName,
        Address = p_Address,
        Phone = p_Phone,
        DepartmentID = p_DepartmentID
    WHERE AccountID = p_AccountID;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
