CREATE TABLE files (
    id   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    size INT
);


CREATE TABLE users (
    id         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL
);


CREATE TABLE Links(    
    id        INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id   INT          NOT NULL,
    file_id   INT          NOT NULL,
    link      VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exprires_at TIMESTAMP ,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (file_id) REFERENCES files(id)
);