CREATE TABLE IF NOT EXISTS admin_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    profile_photo_url VARCHAR(255),
    resume_url VARCHAR(255),
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description VARCHAR(500),
    detailed_description TEXT,
    tech_stack VARCHAR(255),
    github_link VARCHAR(255),
    live_link VARCHAR(255),
    image_url VARCHAR(255),
    created_date VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    description TEXT,
    issue_date DATE,
    image_url VARCHAR(255),
    certificate_link VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS internships (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    duration VARCHAR(255),
    type VARCHAR(255),
    description TEXT,
    certificate_url VARCHAR(255),
    download_url VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    score VARCHAR(255),
    duration VARCHAR(255),
    icon_type VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
