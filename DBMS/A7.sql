SET SERVEROUTPUT ON;

CREATE OR REPLACE TRIGGER trg_check_capacity
BEFORE INSERT OR UPDATE ON RESERVATION
FOR EACH ROW
DECLARE
v_capacity NUMBER;
v_total NUMBER;
BEGIN
SELECT capacity INTO v_capacity
FROM BOAT
WHERE boat_id = :NEW.boat_id;

v_total := :NEW.no_of_people + :NEW.no_of_children;

IF v_total > v_capacity THEN
RAISE_APPLICATION_ERROR(-20001,'Total passengers exceed boat capacity');
END IF;

EXCEPTION
WHEN NO_DATA_FOUND THEN
DBMS_OUTPUT.PUT_LINE('Boat not found');
END;
/

CREATE OR REPLACE TRIGGER trg_check_sail_date
BEFORE INSERT OR UPDATE ON RESERVATION
FOR EACH ROW
BEGIN
IF :NEW.sail_date < :NEW.resv_date THEN
RAISE_APPLICATION_ERROR(-20002,'Sail date cannot be earlier than reservation date');
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_payment_success
AFTER INSERT OR UPDATE ON PAYMENT
FOR EACH ROW
BEGIN
IF :NEW.p_status = 'SUCCESS' THEN
UPDATE RESERVATION
SET status='CONFIRMED'
WHERE resv_id=:NEW.resv_id;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_payment_validation
AFTER INSERT OR UPDATE ON PAYMENT
FOR EACH ROW
DECLARE
v_total_payment NUMBER;
v_required_amount NUMBER;
v_price NUMBER;
v_people NUMBER;
BEGIN

SELECT price
INTO v_price
FROM BOAT B, RESERVATION R
WHERE B.boat_id = R.boat_id
AND R.resv_id = :NEW.resv_id;

SELECT no_of_people + no_of_children
INTO v_people
FROM RESERVATION
WHERE resv_id = :NEW.resv_id;

v_required_amount := v_price * v_people;

SELECT NVL(SUM(amount),0)
INTO v_total_payment
FROM PAYMENT
WHERE resv_id = :NEW.resv_id
AND p_status = 'SUCCESS';

IF v_total_payment >= v_required_amount THEN
UPDATE RESERVATION
SET status='CONFIRMED'
WHERE resv_id=:NEW.resv_id;
ELSE
UPDATE RESERVATION
SET status='PENDING'
WHERE resv_id=:NEW.resv_id;
END IF;

EXCEPTION
WHEN NO_DATA_FOUND THEN
DBMS_OUTPUT.PUT_LINE('Reservation not found');
END;
/

CREATE OR REPLACE VIEW Reservation_Details AS
SELECT resv_id,boat_id,sailor_id,tourist_id,resv_date,sail_date,no_of_people,no_of_children
FROM RESERVATION;

CREATE OR REPLACE TRIGGER trg_insert_reservation_view
INSTEAD OF INSERT ON Reservation_Details
FOR EACH ROW
BEGIN
INSERT INTO RESERVATION
(resv_id,boat_id,sailor_id,tourist_id,resv_date,sail_date,no_of_people,no_of_children,status)
VALUES
(:NEW.resv_id,:NEW.boat_id,:NEW.sailor_id,:NEW.tourist_id,
:NEW.resv_date,:NEW.sail_date,:NEW.no_of_people,:NEW.no_of_children,'PENDING');
END;
/

BEGIN
INSERT INTO Reservation_Details
VALUES('R101','B01','S01','T01',SYSDATE,SYSDATE+2,3,1);

DBMS_OUTPUT.PUT_LINE('Reservation inserted successfully');
END;
/