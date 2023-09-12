CREATE DATABASE artezio_office_db;

USE artezio_office_db;

CREATE TABLE technologies(
    id INT NOT NULL,
    t_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id ASC)
);

ALTER TABLE technologies
    ADD CONSTRAINT uq_technology_name UNIQUE (t_name ASC);

CREATE TABLE employees(
    id INT NOT NULL,
    full_name NVARCHAR(100) NOT NULL,
    technology INT NOT NULL,
    position VARCHAR(100) NOT NULL,
    hiring_date DATE NOT NULL,
    avatar VARCHAR(255) NULL,
    PRIMARY KEY (id ASC)
);

ALTER TABLE employees 
    ADD CONSTRAINT fk_employees_technologies 
    FOREIGN KEY (technology) REFERENCES technologies (id) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE workspaces(
    id INT NOT NULL,
    workspace_number INT NOT NULL,
    room  INT NOT NULL,
    PRIMARY KEY (id ASC)
);

ALTER TABLE workspaces 
    ADD CONSTRAINT uq_workspace_number UNIQUE (workspace_number ASC);

CREATE TABLE workspaces_arrangement(
    employee INT NOT NULL,
    workspace INT NOT NULL,
    PRIMARY KEY (employee ASC, workspace ASC)
);

ALTER TABLE workspaces_arrangement
    ADD CONSTRAINT fk_workspaces_arrangement_employees 
    FOREIGN KEY (employee) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE workspaces_arrangement
    ADD CONSTRAINT fk_workspaces_arrangement_workspaces 
    FOREIGN KEY (workspace) REFERENCES workspaces (id) ON DELETE NO ACTION ON UPDATE NO ACTION;
