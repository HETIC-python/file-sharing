create table files
(
    id        int          not null auto_increment PRIMARY KEY,
    name      varchar(255),
    size      int(10)
);
create table user 
(
    id        int          not null auto_increment PRIMARY KEY,
    first_name varchar(255),
    last_name  varchar(255),
    email     varchar(255),
    password  varchar(255)
)
