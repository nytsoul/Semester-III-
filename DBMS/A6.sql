SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE check_boat_availability(p_type VARCHAR2,p_color VARCHAR2)
IS
v_boat BOAT%ROWTYPE;
BEGIN
SELECT * INTO v_boat
FROM BOAT
WHERE type=p_type AND color=p_color AND ROWNUM=1;

DBMS_OUTPUT.PUT_LINE('Boat Available');
DBMS_OUTPUT.PUT_LINE('Boat ID : '||v_boat.boat_id);
DBMS_OUTPUT.PUT_LINE('Boat Name : '||v_boat.boat_name);
DBMS_OUTPUT.PUT_LINE('Capacity : '||v_boat.capacity);
DBMS_OUTPUT.PUT_LINE('Price : '||v_boat.price);

EXCEPTION
WHEN NO_DATA_FOUND THEN
DBMS_OUTPUT.PUT_LINE('No Boat Available');
END;
/

CREATE OR REPLACE PROCEDURE people_sailed(p_date DATE)
IS
v_total NUMBER;
BEGIN
SELECT SUM(no_of_people+no_of_children)
INTO v_total
FROM RESERVATION
WHERE sail_date=p_date;

IF v_total IS NULL THEN
DBMS_OUTPUT.PUT_LINE('No sailing records found');
ELSE
DBMS_OUTPUT.PUT_LINE('Total People Sailed : '||v_total);
END IF;
END;
/

CREATE OR REPLACE PROCEDURE reservation_details(p_resv_id VARCHAR2)
IS
CURSOR c1 IS
SELECT t.tourist_name,b.boat_name,b.type,s.sailor_name,
r.no_of_people,r.no_of_children
FROM RESERVATION r
JOIN TOURIST t ON r.tourist_id=t.tourist_id
JOIN BOAT b ON r.boat_id=b.boat_id
JOIN SAILOR s ON r.sailor_id=s.sailor_id
WHERE r.resv_id=p_resv_id;

v_rec c1%ROWTYPE;
v_total NUMBER;
BEGIN
OPEN c1;
FETCH c1 INTO v_rec;

IF c1%NOTFOUND THEN
DBMS_OUTPUT.PUT_LINE('Reservation not found');
ELSE
v_total:=v_rec.no_of_people+v_rec.no_of_children;

DBMS_OUTPUT.PUT_LINE('Tourist Name : '||v_rec.tourist_name);
DBMS_OUTPUT.PUT_LINE('Boat Name : '||v_rec.boat_name);
DBMS_OUTPUT.PUT_LINE('Boat Type : '||v_rec.type);
DBMS_OUTPUT.PUT_LINE('Sailor Name : '||v_rec.sailor_name);
DBMS_OUTPUT.PUT_LINE('Adults : '||v_rec.no_of_people);
DBMS_OUTPUT.PUT_LINE('Children : '||v_rec.no_of_children);
DBMS_OUTPUT.PUT_LINE('Total Passengers : '||v_total);
END IF;

CLOSE c1;
END;
/

CREATE OR REPLACE PROCEDURE generate_bill(p_resv_id VARCHAR2)
IS
v_amount NUMBER;
v_discount NUMBER:=0;
v_final NUMBER;
v_tourist VARCHAR2(50);
v_boat VARCHAR2(50);
v_type VARCHAR2(20);
v_sailor VARCHAR2(50);
v_date DATE;
BEGIN
SELECT t.tourist_name,b.boat_name,b.type,s.sailor_name,r.sail_date,p.amount
INTO v_tourist,v_boat,v_type,v_sailor,v_date,v_amount
FROM RESERVATION r
JOIN TOURIST t ON r.tourist_id=t.tourist_id
JOIN BOAT b ON r.boat_id=b.boat_id
JOIN SAILOR s ON r.sailor_id=s.sailor_id
JOIN PAYMENT p ON r.resv_id=p.resv_id
WHERE r.resv_id=p_resv_id;

IF v_amount>500 AND v_amount<2000 THEN
v_discount:=v_amount*0.05;
ELSIF v_amount>=2000 AND v_amount<5000 THEN
v_discount:=v_amount*0.10;
ELSIF v_amount>=5000 THEN
v_discount:=v_amount*0.20;
END IF;

v_final:=v_amount-v_discount;

DBMS_OUTPUT.PUT_LINE('Reservation Number : '||p_resv_id);
DBMS_OUTPUT.PUT_LINE('Tourist Name : '||v_tourist);
DBMS_OUTPUT.PUT_LINE('Boat Name : '||v_boat);
DBMS_OUTPUT.PUT_LINE('Boat Type : '||v_type);
DBMS_OUTPUT.PUT_LINE('Sailor Name : '||v_sailor);
DBMS_OUTPUT.PUT_LINE('Total Amount : '||v_amount);
DBMS_OUTPUT.PUT_LINE('Discount : '||v_discount);
DBMS_OUTPUT.PUT_LINE('Amount to be Paid : '||v_final);

UPDATE PAYMENT
SET amount=v_final
WHERE resv_id=p_resv_id;

EXCEPTION
WHEN NO_DATA_FOUND THEN
DBMS_OUTPUT.PUT_LINE('Reservation or Payment not found');
END;
/

CREATE OR REPLACE PROCEDURE recommend_boat(p_budget NUMBER,p_type VARCHAR2)
IS
v_boat VARCHAR2(50);
v_price NUMBER;
v_count NUMBER;
BEGIN
SELECT boat_name,price
INTO v_boat,v_price
FROM BOAT
WHERE type=p_type
AND boat_id IN(
SELECT boat_id
FROM RESERVATION
GROUP BY boat_id
HAVING COUNT(*)>=ALL(
SELECT COUNT(*) FROM RESERVATION GROUP BY boat_id));

IF v_price>p_budget THEN
DBMS_OUTPUT.PUT_LINE('No suitable boat within budget');
ELSE
v_count:=FLOOR(p_budget/v_price);
DBMS_OUTPUT.PUT_LINE('Recommended Boat : '||v_boat);
DBMS_OUTPUT.PUT_LINE('Trips Affordable : '||v_count);
END IF;

EXCEPTION
WHEN NO_DATA_FOUND THEN
DBMS_OUTPUT.PUT_LINE('No suitable boat found');
END;
/

CREATE OR REPLACE FUNCTION top_tourist(p_boat_id VARCHAR2)
RETURN VARCHAR2
IS
v_name VARCHAR2(50);
BEGIN
SELECT tourist_name
INTO v_name
FROM TOURIST
WHERE tourist_id=(
SELECT tourist_id
FROM RESERVATION
WHERE boat_id=p_boat_id
GROUP BY tourist_id
HAVING COUNT(*)>=ALL(
SELECT COUNT(*)
FROM RESERVATION
WHERE boat_id=p_boat_id
GROUP BY tourist_id));

RETURN v_name;

EXCEPTION
WHEN NO_DATA_FOUND THEN
RETURN 'No bookings for this boat';
END;
/

BEGIN
check_boat_availability('LUX','BLUE');
people_sailed(TO_DATE('14-03-2026','DD-MM-YYYY'));
reservation_details('2451');
generate_bill('2451');
recommend_boat(5000,'LUX');
END;
/

DECLARE
v_name VARCHAR2(50);
BEGIN
v_name:=top_tourist('B01');
DBMS_OUTPUT.PUT_LINE('Top Tourist : '||v_name);
END;
/