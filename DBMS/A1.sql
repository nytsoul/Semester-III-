CREATE TABLE PATIENT (
    patient_id INT PRIMARY KEY,
    patient_name VARCHAR(100),
    gender VARCHAR(10),
    date_of_birth DATE,
    phone VARCHAR(15),
    address VARCHAR(200),
    blood_group VARCHAR(5),
    registration_date DATE
);
CREATE TABLE DOCTOR (
    doctor_id INT PRIMARY KEY,
    doctor_name VARCHAR(100),
    specialization VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100),
    experience INT
);
CREATE TABLE APPOINTMENT (
    appointment_id INT PRIMARY KEY,
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(50),

    patient_id INT,
    doctor_id INT,

    FOREIGN KEY (patient_id) REFERENCES PATIENT(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES DOCTOR(doctor_id)
);
CREATE TABLE TREATMENT (
    treatment_id INT PRIMARY KEY,
    treatment_name VARCHAR(100),
    description TEXT,
    treatment_date DATE,
    cost DECIMAL(10,2),

    patient_id INT,
    doctor_id INT,

    FOREIGN KEY (patient_id) REFERENCES PATIENT(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES DOCTOR(doctor_id)
);
CREATE TABLE BILL (
    bill_id INT PRIMARY KEY,
    bill_date DATE,
    total_amount DECIMAL(10,2),
    payment_status VARCHAR(50),

    patient_id INT,
    treatment_id INT UNIQUE,

    FOREIGN KEY (patient_id) REFERENCES PATIENT(patient_id),
    FOREIGN KEY (treatment_id) REFERENCES TREATMENT(treatment_id)
);
CREATE TABLE PAYMENT_INSTALLMENT (
    bill_id INT,
    installment_number INT,
    payment_date DATE,
    installment_amount DECIMAL(10,2),
    payment_method VARCHAR(50),

    PRIMARY KEY (bill_id, installment_number),

    FOREIGN KEY (bill_id) REFERENCES BILL(bill_id)
        ON DELETE CASCADE
);
INSERT INTO PATIENT VALUES
(1,'Arun Kumar','Male','1995-04-10','9876543210','Chennai','O+','2026-03-01');
INSERT INTO DOCTOR VALUES
(101,'Dr. Meena','Cardiologist','9123456780','meena@hospital.com',100);
INSERT INTO APPOINTMENT VALUES
(1001,'2026-03-05','10:30:00','Scheduled',1,101);
INSERT INTO TREATMENT VALUES
(2001,'Heart Checkup','ECG and diagnosis','2026-03-05',5000,1,101);
INSERT INTO BILL VALUES
(3001,'2026-03-05',5000,'Installment',1,2001);
INSERT INTO PAYMENT_INSTALLMENT VALUES
(3001,1,'2026-03-10',2500,'UPI'),
(3001,2,'2026-03-20',2500,'UPI');
SELECT * FROM PATIENT;
SELECT * FROM DOCTOR;
SELECT * FROM APPOINTMENT;
SELECT * FROM TREATMENT;
SELECT * FROM BILL;
SELECT * FROM PAYMENT_INSTALLMENT;