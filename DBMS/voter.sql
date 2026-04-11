-- Drop existing foreign key (if already created without cascade)
ALTER TABLE voter
DROP CONSTRAINT fk_voter_booth;

-- Recreate with ON DELETE CASCADE
ALTER TABLE voter
ADD CONSTRAINT fk_voter_booth
FOREIGN KEY (boothid, constituency_id)
REFERENCES booth(boothid, constituency_id)
ON DELETE CASCADE;
SELECT COUNT(*) AS total_votes
FROM vote v
JOIN voter vt ON v.voter_id = vt.voterid
WHERE vt.gender = 'F';
SELECT constituency_id
FROM voter
GROUP BY constituency_id
HAVING COUNT(*) > (
    SELECT AVG(cnt)
    FROM (
        SELECT COUNT(*) AS cnt
        FROM voter
        GROUP BY constituency_id
    )
);