ALTER TABLE projects
    ADD COLUMN long_description TEXT,
    ADD COLUMN category VARCHAR(30) NOT NULL DEFAULT 'OTHER';
