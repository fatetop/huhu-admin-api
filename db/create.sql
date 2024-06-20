CREATE TABLE IF NOT EXISTS `manage_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `account` varchar(50) DEFAULT NULL COMMENT '账号',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `salt` varchar(10) NOT NULL COMMENT '密码盐',
  `avatar` varchar(100) DEFAULT 'https://oss.fatetop.com/avatar/def.jpg' COMMENT '头像地址',
  `status` tinyint unsigned DEFAULT '5' COMMENT '>0可用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `version` int DEFAULT '0' COMMENT '本条记录操作的最新版本号',
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uni_account` (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT COMMENT='管理员账号表';














