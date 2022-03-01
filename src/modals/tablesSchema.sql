-- admin table

-- user 1 insert
INSERT INTO users 
(name,email,password) 
VALUES ('user1','admin@mail.com','user1');

---auth table
create table `auth` (`sid` int unsigned not null auto_increment primary key, `user_id` int not null, `r_token` varchar(255) not null, `created_at` datetime not null default CURRENT_TIMESTAMP)
