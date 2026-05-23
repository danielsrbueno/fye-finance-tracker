drop database if exists fintrack;
create database if not exists fintrack;

create table if not exists fintrack.user (
	id int auto_increment,
  user_name varchar (60) not null,
  email varchar(255) not null unique,
  passwd varchar(255) not null,
  
  created_at datetime not null default current_timestamp,
  updated_at datetime,
  deleted_at datetime,
  
  primary key (id)
);

create table if not exists fintrack.item_type (
	id int auto_increment,
  item_type varchar(60),
  
  primary key (id)
);

create table if not exists fintrack.item_category (
	user_id int,
	id int auto_increment,
  category varchar(60),
  item_type_id int not null,

  created_at datetime not null default current_timestamp,
  updated_at datetime,
  deleted_at datetime,
  
  primary key (id),
  foreign key (item_type_id) references item_type(id)
);

create table if not exists fintrack.item (
	id int auto_increment,
	user_id int not null,
    
	item_name varchar(60) not null,
  item_category_id int not null,
  item_description text,

  is_recurring tinyint(1) not null default 0,
  parent_item int,

  amount decimal(10,2) not null,
  event_date date not null,
  
  created_at datetime not null default current_timestamp,
  updated_at datetime,
  deleted_at datetime,
  
  primary key (id),
  foreign key (user_id) references user(id),
  foreign key (item_category_id) references item_category(id),
  foreign key (parent_item) references item(id),
  index idx_user (user_id),
  index idx_category (item_category_id)
);

insert into fintrack.item_type (item_type) 
  values
    ("INCOME"),
    ("EXPENSE"),
    ("INVESTMENT");