-- Migration SQL script to update database schema for Multi-Role User Support

-- 1. Add preferred_role and active_role columns to the users table
ALTER TABLE users ADD COLUMN preferred_role VARCHAR(255);
ALTER TABLE users ADD COLUMN active_role VARCHAR(255);

-- 2. Create the user_roles collection table
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, role_name),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Create the user_role_usage collection table
CREATE TABLE user_role_usage (
    user_id BIGINT NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    usage_count INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_name),
    CONSTRAINT fk_user_role_usage_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Migrate existing user single role details to the new multi-role setup
INSERT INTO user_roles (user_id, role_name)
SELECT id, role FROM users WHERE role IS NOT NULL;

INSERT INTO user_role_usage (user_id, role_name, usage_count)
SELECT id, role, 0 FROM users WHERE role IS NOT NULL;

UPDATE users SET preferred_role = role, active_role = role WHERE role IS NOT NULL;

-- 5. Drop the old single role column
ALTER TABLE users DROP COLUMN role;
