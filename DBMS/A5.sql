DROP TABLE PAYMENT CASCADE CONSTRAINTS;
DROP TABLE RESERVATION CASCADE CONSTRAINTS;
DROP TABLE TOURIST CASCADE CONSTRAINTS;
DROP TABLE SAILOR CASCADE CONSTRAINTS;
DROP TABLE BOAT CASCADE CONSTRAINTS;

CREATE TABLE BOAT(
boat_id VARCHAR2(10) PRIMARY KEY,
boat_name VARCHAR2(50) NOT NULL,
type VARCHAR2(10),
capacity NUMBER(3),
price NUMBER(8,2),
color VARCHAR2(20)
);

CREATE TABLE SAILOR(
sailor_id VARCHAR2(10) PRIMARY KEY,
sailor_name VARCHAR2(50),
rating NUMBER(2),
sailor_dob DATE
);

CREATE TABLE TOURIST(
tourist_id VARCHAR2(10) PRIMARY KEY,
tourist_name VARCHAR2(50),
address VARCHAR2(100),
phone VARCHAR2(15)
);

CREATE TABLE RESERVATION(
resv_id VARCHAR2(10) PRIMARY KEY,
boat_id VARCHAR2(10),
sailor_id VARCHAR2(10),
tourist_id VARCHAR2(10),
resv_date DATE,
sail_date DATE,
no_of_people NUMBER(3),
no_of_children NUMBER(3),
FOREIGN KEY (boat_id) REFERENCES BOAT(boat_id),
FOREIGN KEY (sailor_id) REFERENCES SAILOR(sailor_id),
FOREIGN KEY (tourist_id) REFERENCES TOURIST(tourist_id)
);

CREATE TABLE PAYMENT(
p_id VARCHAR2(10) PRIMARY KEY,
resv_id VARCHAR2(10),
amount NUMBER(10,2),
p_date DATE,
p_mode VARCHAR2(20),
p_status VARCHAR2(20),
FOREIGN KEY (resv_id) REFERENCES RESERVATION(resv_id)
);
CREATE VIEW Affordable_Boats AS
SELECT boat_id, boat_name, type, capacity, price
FROM BOAT
WHERE price < 500 AND type = 'CAR';

SELECT * FROM Affordable_Boats;

INSERT INTO Affordable_Boats VALUES ('B20','Mini Rider','CAR',4,350);

UPDATE Affordable_Boats
SET price = 420
WHERE boat_id = 'B20';

DELETE FROM Affordable_Boats
WHERE boat_id = 'B20';

CREATE VIEW Sailor_Reservation_View AS
SELECT S.sailor_id, S.sailor_name, S.rating, R.resv_date
FROM SAILOR S
JOIN RESERVATION R
ON S.sailor_id = R.sailor_id;

SELECT * FROM Sailor_Reservation_View;

UPDATE SAILOR
SET rating = 5
WHERE sailor_id = 'S01';

CREATE VIEW Boat_By_Month AS
SELECT boat_id,
EXTRACT(MONTH FROM sail_date) AS sail_month,
COUNT(*) AS reservation_count
FROM RESERVATION
GROUP BY boat_id, EXTRACT(MONTH FROM sail_date)
HAVING COUNT(*) > 1;

SELECT * FROM Boat_By_Month;

CREATE VIEW Family_Tourist_View AS
SELECT T.tourist_id, T.tourist_name,
COUNT(R.resv_id) AS family_reservations
FROM TOURIST T
JOIN RESERVATION R
ON T.tourist_id = R.tourist_id
WHERE R.no_of_children > 0
GROUP BY T.tourist_id, T.tourist_name
HAVING COUNT(R.resv_id) >
(
SELECT AVG(family_count)
FROM
(
SELECT COUNT(*) AS family_count
FROM RESERVATION
WHERE no_of_children > 0
GROUP BY tourist_id
)
);

SELECT * FROM Family_Tourist_View;

CREATE VIEW Small_Affordable_Boats AS
SELECT boat_id, boat_name, capacity, price
FROM Affordable_Boats
WHERE capacity <= 4;

SELECT * FROM Small_Affordable_Boats;

UPDATE Small_Affordable_Boats
SET price = 450
WHERE boat_id = 'B01';