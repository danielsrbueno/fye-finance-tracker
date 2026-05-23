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

-- Dados Mockados:
insert into fintrack.item_category (user_id, category, item_type_id)
values
  (1, 'Salário', 1),
  (1, 'Freelance', 1),
  (1, 'Dividendos', 1),
  (1, 'Venda', 1),

  (1, 'Alimentação', 2),
  (1, 'Transporte', 2),
  (1, 'Lazer', 2),
  (1, 'Moradia', 2),

  (1, 'Ações', 3),
  (1, 'FIIs', 3),
  (1, 'Reserva de Emergência', 3),
  (1, 'Criptomoedas', 3);

insert into fintrack.item (
  user_id,
  item_name,
  item_category_id,
  item_description,
  amount,
  event_date
)
values
  (1, 'Salário Empresa X', 1, 'Salário mensal', 3500.00, '2026-04-05'),
  (1, 'Freela Landing Page', 2, 'Projeto para cliente', 800.00, '2026-04-12'),
  (1, 'Dividendos TAEE11', 3, 'Dividendos mensais', 120.00, '2026-04-15'),
  (1, 'Venda de teclado', 4, 'Venda OLX', 250.00, '2026-04-21'),

  (1, 'Mercado', 5, 'Compras do mês', 420.00, '2026-04-03'),
  (1, 'Uber', 6, 'Transporte faculdade', 65.00, '2026-04-08'),
  (1, 'Cinema', 7, 'Rolê final de semana', 55.00, '2026-04-16'),
  (1, 'Aluguel', 8, 'Moradia', 1200.00, '2026-04-10'),
  (1, 'Hamburgueria', 5, 'Janta com amigos', 78.00, '2026-04-19'),
  (1, 'Ônibus', 6, 'Bilhete mensal', 120.00, '2026-04-02'),

  (1, 'Compra PETR4', 9, 'Aporte mensal', 500.00, '2026-04-07'),
  (1, 'Compra MXRF11', 10, 'Aporte FII', 300.00, '2026-04-13'),
  (1, 'Tesouro Selic', 11, 'Reserva emergência', 400.00, '2026-04-18'),
  (1, 'Bitcoin', 12, 'Compra parcial BTC', 250.00, '2026-04-25'),


  (1, 'Salário Empresa X', 1, 'Salário mensal', 3500.00, '2026-05-05'),
  (1, 'Freela API Node', 2, 'Backend sistema', 1200.00, '2026-05-11'),
  (1, 'Dividendos BBAS3', 3, 'Dividendos recebidos', 140.00, '2026-05-17'),
  (1, 'Venda monitor', 4, 'Venda marketplace', 600.00, '2026-05-22'),

  (1, 'Mercado', 5, 'Compras do mês', 460.00, '2026-05-04'),
  (1, 'Gasolina', 6, 'Abastecimento', 180.00, '2026-05-09'),
  (1, 'Rodízio japonês', 7, 'Saída casal', 130.00, '2026-05-15'),
  (1, 'Aluguel', 8, 'Moradia', 1200.00, '2026-05-10'),
  (1, 'Steam Promoção', 7, 'Compra jogos', 89.00, '2026-05-20'),
  (1, 'iFood', 5, 'Lanche noite', 48.00, '2026-05-27'),

  (1, 'Compra VALE3', 9, 'Aporte ações', 650.00, '2026-05-06'),
  (1, 'Compra HGLG11', 10, 'Aporte FII', 350.00, '2026-05-14'),
  (1, 'CDB Liquidez Diária', 11, 'Reserva emergência', 500.00, '2026-05-18'),
  (1, 'Ethereum', 12, 'Compra ETH', 300.00, '2026-05-26'),


  (1, 'Salário Empresa X', 1, 'Salário mensal', 3800.00, '2026-06-05'),
  (1, 'Freela Mobile App', 2, 'Aplicativo React Native', 1500.00, '2026-06-09'),
  (1, 'Dividendos FIIs', 3, 'Rendimentos mensais', 180.00, '2026-06-16'),
  (1, 'Venda bicicleta', 4, 'Venda usada', 900.00, '2026-06-23'),

  (1, 'Mercado', 5, 'Compras do mês', 510.00, '2026-06-03'),
  (1, 'Uber', 6, 'Transporte eventos', 90.00, '2026-06-07'),
  (1, 'Show', 7, 'Evento musical', 220.00, '2026-06-12'),
  (1, 'Aluguel', 8, 'Moradia', 1250.00, '2026-06-10'),
  (1, 'Pizza', 5, 'Final de semana', 70.00, '2026-06-21'),
  (1, 'Academia', 8, 'Plano mensal', 99.00, '2026-06-28'),

  (1, 'Compra ITUB4', 9, 'Aporte mensal', 700.00, '2026-06-08'),
  (1, 'Compra XPML11', 10, 'Investimento FII', 400.00, '2026-06-14'),
  (1, 'Tesouro Selic', 11, 'Reserva emergência', 600.00, '2026-06-19'),
  (1, 'Solana', 12, 'Compra SOL', 350.00, '2026-06-26');