-- Create the 'users' table
use projet_test;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the 'articles' table
CREATE TABLE Articles (
    id_article INT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id_article)
);

INSERT INTO Articles (id_article, name, quantity)
VALUES 
(2, 'Lenovo Legion', 50),
(3, 'Asus Zephyrus', 150),
(5, 'MSI TITAN', 200),
(6, 'ACER PREDATOR', 20),
(7, 'RAZER BLADE', 100),
(8, 'DELL', 250)
;