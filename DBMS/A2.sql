CREATE TABLE BOATS (
    boat_id INT PRIMARY KEY,
    boat_name VARCHAR(100) NOT NULL,
    boat_type VARCHAR(50),
    max_capacity INT CHECK (max_capacity > 0),
    price_per_seat DECIMAL(10,2),
    colour VARCHAR(50)
);
CREATE TABLE SAILORS (
    sailor_id INT PRIMARY KEY,
    sailor_name VARCHAR(100) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    date_of_birth DATE
);
CREATE TABLE TOURISTS (
    tourist_no INT PRIMARY KEY,
    tourist_name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    date_of_birth DATE,
    phone VARCHAR(15)
);
CREATE TABLE RESERVATION (
    reservation_id INT PRIMARY KEY,
    tourist_no INT,
    boat_id INT,
    sailor_id INT,
    reservation_date DATE,
    number_of_people INT CHECK (number_of_people > 0),

    FOREIGN KEY (tourist_no) REFERENCES TOURISTS(tourist_no),
    FOREIGN KEY (boat_id) REFERENCES BOATS(boat_id),
    FOREIGN KEY (sailor_id) REFERENCES SAILORS(sailor_id),

    UNIQUE (boat_id, reservation_date),
    UNIQUE (sailor_id, reservation_date)
);
CREATE TABLE PAYMENT (
    payment_id INT PRIMARY KEY,
    reservation_id INT UNIQUE,
    payment_amount DECIMAL(10,2),
    payment_date DATE,
    payment_mode VARCHAR(50),
    payment_status VARCHAR(20),

    FOREIGN KEY (reservation_id) REFERENCES RESERVATION(reservation_id)
);
INSERT INTO BOATS VALUES
(1,'Sea Rider','Motor Boat',10,200,'Blue'),
(2,'Lake Cruiser','Speed Boat',8,250,'Red');
INSERT INTO SAILORS VALUES
(101,'Arun',4,'1990-05-10'),
(102,'Ravi',5,'1988-07-15');
INSERT INTO TOURISTS VALUES
(201,'Rahul','Chennai','1998-04-10','9876543210'),
(202,'Priya','Madurai','1996-06-20','9123456780');
INSERT INTO RESERVATION VALUES
(301,201,1,101,'2026-03-05',5);
INSERT INTO PAYMENT VALUES
(401,301,1000,'2026-03-04','UPI','Paid');