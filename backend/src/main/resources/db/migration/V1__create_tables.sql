CREATE TABLE projects (
    id          BIGSERIAL    PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    description TEXT         NOT NULL,
    image_url   VARCHAR(255),
    github_url  VARCHAR(255),
    demo_url    VARCHAR(255),
    featured    BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE skills (
    id        BIGSERIAL    PRIMARY KEY,
    name      VARCHAR(50)  NOT NULL UNIQUE,
    category  VARCHAR(30)  NOT NULL,
    level     VARCHAR(30)  NOT NULL
);

CREATE TABLE project_skills (
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    skill_id   BIGINT NOT NULL REFERENCES skills(id)   ON DELETE CASCADE,
    PRIMARY KEY (project_id, skill_id)
);

CREATE TABLE messages (
    id         BIGSERIAL    PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    content    VARCHAR(1000) NOT NULL,
    read       BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
