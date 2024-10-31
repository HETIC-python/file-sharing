CREATE TABLE users (
    id         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    email      VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    max_storage INT DEFAULT 2,
    password   VARCHAR(255) NOT NULL
);

CREATE TABLE files (
    id   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    size INT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE links(    
    id        INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    file_id   INT          NOT NULL,
    link      VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP ,
    FOREIGN KEY (file_id) REFERENCES files(id)
);

INSERT INTO users (first_name, last_name, email, password) VALUES ('John', 'Doe', 'exampl@g.com', '123456');