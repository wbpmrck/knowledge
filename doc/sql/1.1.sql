--   -------------------------------------------------- 
--   Generated by Enterprise Architect Version 11.0.1106
--   Created On : 星期四, 21 九月, 2017 
--   DBMS       : MySql 
--   -------------------------------------------------- 


SET FOREIGN_KEY_CHECKS=0;


--  Drop Tables, Stored Procedures and Views 

DROP TABLE IF EXISTS `feature` CASCADE
;
DROP TABLE IF EXISTS `knowledge` CASCADE
;
DROP TABLE IF EXISTS `knowledge_and_material` CASCADE
;
DROP TABLE IF EXISTS `knowledge_and_subject` CASCADE
;
DROP TABLE IF EXISTS `material` CASCADE
;
DROP TABLE IF EXISTS `module` CASCADE
;
DROP TABLE IF EXISTS `module_and_feature` CASCADE
;
DROP TABLE IF EXISTS `project` CASCADE
;
DROP TABLE IF EXISTS `project_and_feature` CASCADE
;
DROP TABLE IF EXISTS `subject` CASCADE
;
DROP TABLE IF EXISTS `tag` CASCADE
;
DROP TABLE IF EXISTS `tag_and_feature` CASCADE
;
DROP TABLE IF EXISTS `tag_and_material` CASCADE
;
DROP TABLE IF EXISTS `tag_and_module` CASCADE
;
DROP TABLE IF EXISTS `train_route_map` CASCADE
;
DROP TABLE IF EXISTS `train_step` CASCADE
;
DROP TABLE IF EXISTS `train_step_and_knowledge` CASCADE
;

--  Create Tables 
CREATE TABLE `feature`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` NVARCHAR(64) NOT NULL DEFAULT '' COMMENT '名称',
	`desc` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '标签描述',
	`enable` SMALLINT NOT NULL DEFAULT 1 COMMENT '是否有效。1有效',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='特性表'
;


CREATE TABLE `knowledge`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` NVARCHAR(64) NOT NULL DEFAULT '' COMMENT '知识点名称',
	`parent_id` BIGINT NOT NULL DEFAULT -1 COMMENT '父亲节点id. -1代表自己是根节点',
	`enable` SMALLINT NOT NULL DEFAULT 1 COMMENT '记录是否隐藏。1隐藏 0不隐藏',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='知识点表'
;


CREATE TABLE `knowledge_and_material`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`knowledge_id` BIGINT NOT NULL DEFAULT -1,
	`material_id` BIGINT NOT NULL DEFAULT 0,
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`),
	UNIQUE `uk_knowledge_id_material_id`(`knowledge_id`, `material_id`)

) 
;


CREATE TABLE `knowledge_and_subject`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`knowledge_id` BIGINT NOT NULL DEFAULT -1,
	`subject_id` BIGINT NOT NULL DEFAULT 0,
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`),
	UNIQUE `uk_knowledge_id_subject_id`(`knowledge_id`, `subject_id`)

)  COMMENT='知识点与学科关系表。 
 一个知识点模块，可能在几个领域都需要学习，所以是多对多关系'
;


CREATE TABLE `material`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '材料名称，标题',
	`desc` NVARCHAR(256) NOT NULL DEFAULT '' COMMENT '材料描述',
	`location` SMALLINT NOT NULL DEFAULT 0 COMMENT '材料位置编码。 0:知识中心统一管理的文件，url应该是后缀 1:互联网地址，url保存的是资源的绝对路径',
	`url` NVARCHAR(512) NOT NULL DEFAULT '' COMMENT '材料地址。 对用不同的location类型，url的含义也不同',
	`type` SMALLINT NOT NULL DEFAULT 0 COMMENT '材料类型。 0：代表文档类材料 1：代表视频类材料 2：代表音频类材料 3：代表外链。(该材料)',
	`author` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '材料的作者，最好是原创者。或者是负责搜集整理的人',
	`quality` SMALLINT NOT NULL DEFAULT 0 COMMENT '材料质量。暂定5等评级，分别对应界面5颗星星。0代表未评定，1～5越高说明材料质量内容越好',
	`enable` SMALLINT NOT NULL DEFAULT 1 COMMENT '记录是否隐藏。1隐藏 0不隐藏',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='学习资料表'
;


CREATE TABLE `module`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`ename` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '英文名称',
	`cname` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '中文名称',
	`desc` NVARCHAR(256) NOT NULL DEFAULT '' COMMENT '模块描述。',
	`version` NVARCHAR(64) NOT NULL DEFAULT '1.0+' COMMENT '版本描述。可以是某个版本号，也可以是版本区间。只要能够描述这个模块的版本范围即可',
	`activeness` BIGINT NOT NULL DEFAULT 0 COMMENT '活跃度。越大代表项目越活跃',
	`use_prj_num` INTEGER NOT NULL DEFAULT 0 COMMENT '在本选型系统里，记录的选用了该模块的项目数',
	`size` BIGINT NOT NULL DEFAULT 0 COMMENT '模块大小。单位KB. 概要描述框架/库的体积和重量级',
	`license` NVARCHAR(64) NOT NULL DEFAULT '' COMMENT '许可证类型',
	`address` NVARCHAR(512) NOT NULL DEFAULT '' COMMENT '关联的资料地址、官方首页等',
	`enable` SMALLINT NOT NULL DEFAULT 1 COMMENT '是否有效。1有效',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='可复用模块、组件、框架'
;


CREATE TABLE `module_and_feature`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`module_id` BIGINT NOT NULL DEFAULT -1,
	`feature_id` BIGINT NOT NULL DEFAULT 0,
	`support_degree` INTEGER NOT NULL DEFAULT 1000 COMMENT '支持度。使用[-1000，1000]以内的数值表示.表示这个库对这个特性的支持程度. 
 -1000:代表这个库非但不支持该特性，还会影响其他模块支持这个特性（排斥） 
 1000：代表这个库非常完美的支持该特性',
	`support_desc` NVARCHAR(1024) NOT NULL DEFAULT '' COMMENT '支持度备注。方便用户在选型的时候，查看该特性的支持方式，或者坑',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`),
	UNIQUE `uk_module_id_feature_id`(`module_id`, `feature_id`)

) 
;


CREATE TABLE `project`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` NVARCHAR(64) NOT NULL DEFAULT '' COMMENT '名称',
	`desc` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '标签描述',
	`customer_type` SMALLINT NOT NULL DEFAULT 1 COMMENT '项目客户类型。1:2C    2:2B   3:2G  4:2B2C ',
	`manager` NVARCHAR(32) NOT NULL DEFAULT '' COMMENT '项目联系人',
	`manager_phone` NVARCHAR(32) NOT NULL DEFAULT '' COMMENT '联系人电话',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='特性表'
;


CREATE TABLE `project_and_feature`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`project_id` BIGINT NOT NULL DEFAULT -1,
	`feature_id` BIGINT NOT NULL DEFAULT 0,
	`demand_desc` NVARCHAR(256) NOT NULL DEFAULT '' COMMENT '需求备注。描述项目在需要该特性时的场景，具体需求细节',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`),
	UNIQUE `uk_project_id_feature_id`(`project_id`, `feature_id`)

) 
;


CREATE TABLE `subject`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` NVARCHAR(64) NOT NULL DEFAULT '' COMMENT '学科名称。如：“web前端”“java开发”',
	`desc` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '描述',
	`enable` SMALLINT NOT NULL DEFAULT 1 COMMENT '记录是否隐藏。1隐藏 0不隐藏',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='知识学科表'
;


CREATE TABLE `tag`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` NVARCHAR(64) NOT NULL DEFAULT '' COMMENT '名称',
	`desc` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '标签描述',
	`enable` SMALLINT NOT NULL DEFAULT 1 COMMENT '是否有效。1有效',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='标签'
;


CREATE TABLE `tag_and_feature`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`tag_id` BIGINT NOT NULL DEFAULT -1,
	`feature_id` BIGINT NOT NULL DEFAULT 0,
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`),
	UNIQUE `uk_tag_id_feature_id`(`tag_id`, `feature_id`)

) 
;


CREATE TABLE `tag_and_material`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`tag_id` BIGINT NOT NULL DEFAULT -1,
	`material_id` BIGINT NOT NULL DEFAULT 0,
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`),
	UNIQUE `uk_tag_id_material_id`(`tag_id`, `material_id`)

) 
;


CREATE TABLE `tag_and_module`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`tag_id` BIGINT NOT NULL DEFAULT -1,
	`module_id` BIGINT NOT NULL DEFAULT 0,
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`),
	UNIQUE `uk_tag_id_module_id`(`tag_id`, `module_id`)

) 
;


CREATE TABLE `train_route_map`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`subject_id` BIGINT COMMENT '所属学科',
	`name` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '学习路线名称',
	`desc` NVARCHAR(256) NOT NULL DEFAULT '' COMMENT '学习路线描述',
	`enable` SMALLINT NOT NULL DEFAULT 1 COMMENT '是否有效',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='培训路线表'
;


CREATE TABLE `train_step`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`train_route_map_id` BIGINT COMMENT '所属路线',
	`priority` INTEGER NOT NULL DEFAULT 1 COMMENT '优先级，越大优先级越高。代表学习的先后顺序',
	`name` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '学习路线名称',
	`desc` NVARCHAR(256) NOT NULL DEFAULT '' COMMENT '学习路线描述',
	`enable` SMALLINT NOT NULL DEFAULT 1 COMMENT '是否有效',
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`)

)  COMMENT='培训路线步骤'
;


CREATE TABLE `train_step_and_knowledge`
(
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`knowledge_id` BIGINT NOT NULL DEFAULT 0,
	`train_step_id` BIGINT NOT NULL DEFAULT -1,
	`create_time` DATETIME(0) NOT NULL DEFAULT now(),
	`update_time` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`id`),
	UNIQUE `uk_knowledge_id_train_step_id`(`train_step_id`, `knowledge_id`)

) 
;



SET FOREIGN_KEY_CHECKS=1;
