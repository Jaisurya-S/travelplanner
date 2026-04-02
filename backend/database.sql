CREATE DATABASE IF NOT EXISTS Tourist;
USE Tourist;
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    area VARCHAR(100),
    email VARCHAR(100),
    tour_date DATE,
    phone VARCHAR(15),
    tickets INT
);
DROP TABLE bookings;
SELECT * FROM bookings;