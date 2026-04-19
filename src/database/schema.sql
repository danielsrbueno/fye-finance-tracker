drop database if exists fye_fye_fintrack;
create database if not exists fye_fintrack;

create table if not exists fye_fintrack.users (
	id int auto_increment,
  user_name varchar (60) not null,
  email varchar(255) not null unique,
  passwd varchar(255) not null,
  
  created_at datetime not null default current_timestamp,
  updated_at datetime,
  deleted_at datetime,
  
  primary key (id)
);

create table if not exists fye_fintrack.item_categories (
	user_id int,
	id int auto_increment,
  category varchar(60),
  
  primary key (id)
);

create table if not exists fye_fintrack.item_types (
	id int auto_increment,
  item_type varchar(60),
  
  primary key (id)
);

create table if not exists fye_fintrack.items (
	id int auto_increment,
	user_id int not null,
    
	item_name varchar(60) not null,
  item_category_id int not null,
  item_type_id int not null,
  item_description text,
  
  amount decimal(10,2) not null,
  event_date date not null,
  
  created_at datetime not null default current_timestamp,
  updated_at datetime,
  deleted_at datetime,
  
  primary key (id),
  foreign key (user_id) references users(id),
  foreign key (item_category_id) references item_categories(id),
  foreign key (item_type_id) references item_types(id),
  index idx_user (user_id)
);

insert into fye_fintrack.item_types (item_type) 
  values
    ("INCOME"),
    ("EXPENSE"),
    ("INVESTMENT");