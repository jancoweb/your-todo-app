create database todoapp

create table users(
  id serial primary key,
  name text not null,
  email text not null,
  password text not null
)

create table tasks (
	id serial primary key,
  user_id int,
  title text not null,
  foreign key (user_id) references users(id)
)