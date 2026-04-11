drop table vote;
drop table candidate;
drop table voter;
drop table booth;
CREATE TABLE booth (
    boothid NUMBER,
    constituency_id NUMBER,
    location VARCHAR2(50),
    bincharge VARCHAR2(50),
    CONSTRAINT pk_booth PRIMARY KEY (boothid, constituency_id)
);

CREATE TABLE voter (
    voterid NUMBER CONSTRAINT pk_voter PRIMARY KEY ,
    votername VARCHAR2(50),
    gender CHAR(1) CONSTRAINT chk_gender CHECK (gender IN ('F','M','O')),
    dob DATE,
    boothid NUMBER,
    constituency_id NUMBER,
    CONSTRAINT fk_voter_booth FOREIGN KEY (boothid, constituency_id)
        REFERENCES booth(boothid, constituency_id)
        ON DELETE CASCADE
);
CREATE TABLE candidate (
    candidate_id NUMBER CONSTRAINT pk_candidate PRIMARY KEY,
    candidate_name VARCHAR2(50),
    party VARCHAR2(50),
    constituency_id NUMBER
);

CREATE TABLE vote (
    voter_id NUMBER CONSTRAINT fk_vote_voter REFERENCES voter(voterid),
    candidate_id NUMBER CONSTRAINT fk_vote_candidate REFERENCES candidate(candidate_id),
    vote_date DATE,
 CONSTRAINT pk_vote PRIMARY KEY (voter_id, candidate_id)
);

INSERT INTO booth VALUES (1, 101, 'Chennai North', 'Officer A');
INSERT INTO booth VALUES (2, 101, 'Chennai South', 'Officer B');
INSERT INTO booth VALUES (3, 102, 'Madurai East', 'Officer C');
INSERT INTO booth VALUES (4, 102, 'Madurai West', 'Officer D');
INSERT INTO booth VALUES (5, 103, 'Coimbatore Central', 'Officer E');

INSERT INTO voter VALUES (1001, 'Ravi', 'M', TO_DATE('2000-05-10','YYYY-MM-DD'), 1, 101);
INSERT INTO voter VALUES (1002, 'Priya', 'F', TO_DATE('1998-03-12','YYYY-MM-DD'), 1, 101);
INSERT INTO voter VALUES (1003, 'Kumar', 'M', TO_DATE('1995-07-22','YYYY-MM-DD'), 2, 101);
INSERT INTO voter VALUES (1004, 'Anjali', 'F', TO_DATE('2001-01-15','YYYY-MM-DD'), 2, 101);
INSERT INTO voter VALUES (1005, 'Suresh', 'M', TO_DATE('1999-09-09','YYYY-MM-DD'), 3, 102);
INSERT INTO voter VALUES (1006, 'Meena', 'F', TO_DATE('2002-11-30','YYYY-MM-DD'), 3, 102);
INSERT INTO voter VALUES (1007, 'Arun', 'M', TO_DATE('1997-04-18','YYYY-MM-DD'), 4, 102);
INSERT INTO voter VALUES (1008, 'Divya', 'F', TO_DATE('2000-06-25','YYYY-MM-DD'), 5, 103);

INSERT INTO candidate VALUES (201, 'Rajesh', 'Party A', 101);
INSERT INTO candidate VALUES (202, 'Lakshmi', 'Party B', 101);
INSERT INTO candidate VALUES (203, 'Vikram', 'Party C', 102);
INSERT INTO candidate VALUES (204, 'Nisha', 'Party D', 102);
INSERT INTO candidate VALUES (205, 'Manoj', 'Party E', 103);

INSERT INTO vote VALUES (1001, 201, SYSDATE);
INSERT INTO vote VALUES (1002, 202, SYSDATE);
INSERT INTO vote VALUES (1003, 201, SYSDATE);
INSERT INTO vote VALUES (1004, 202, SYSDATE);
INSERT INTO vote VALUES (1005, 203, SYSDATE);
INSERT INTO vote VALUES (1006, 204, SYSDATE);
INSERT INTO vote VALUES (1007, 203, SYSDATE);
INSERT INTO vote VALUES (1008, 205, SYSDATE);

select * from voter;
select * from candidate;
select * from vote;
select * from booth:
