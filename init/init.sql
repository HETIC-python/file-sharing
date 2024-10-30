create table files
(
    id        int          not null auto_increment PRIMARY KEY,
    name      varchar(255),
    size      int(10)
);
create table user 
(
    id        int          not null auto_increment PRIMARY KEY,
    email     varchar(255),
    password  varchar(255)
)
