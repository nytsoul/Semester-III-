CREATE OR REPLACE TRIGGER trg_check_age
BEFORE INSERT ON voter
FOR EACH ROW
BEGIN
    -- Calculate age using MONTHS_BETWEEN
    IF (MONTHS_BETWEEN(SYSDATE, :NEW.dob) / 12) < 18 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Voter must be at least 18 years old');
    END IF;
END;
/