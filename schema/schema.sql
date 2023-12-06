CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS roles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name TEXT NOT NULL UNIQUE
    );

CREATE TABLE
    IF NOT EXISTS user_roles (
        user_id UUID NOT NULL,
        role_id UUID NOT NULL,
        PRIMARY KEY (user_id, role_id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS invites (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(255) NOT NULL,
        user_id UUID,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        user_id UUID NOT NULL,
        expire_at TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );