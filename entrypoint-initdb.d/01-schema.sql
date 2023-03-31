create table gifs (
  id serial primary key,
  url text not null,
  category varchar(255) not null
);
