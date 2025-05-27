CREATE DATABASE EventPortal;
USE EventPortal;
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    registration_date DATE NOT NULL
);
CREATE TABLE Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    city VARCHAR(100) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status ENUM('upcoming', 'completed', 'cancelled'),
    organizer_id INT,
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id)
);
CREATE TABLE Sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT,
    title VARCHAR(200) NOT NULL,
    speaker_name VARCHAR(100) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);
CREATE TABLE Registrations (
    registration_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    registration_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);
CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    feedback_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);
CREATE TABLE Resources (
    resource_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT,
    resource_type ENUM('pdf', 'image', 'link'),
    resource_url VARCHAR(255) NOT NULL,
    uploaded_at DATETIME NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);
INSERT INTO Users (full_name, email, city, registration_date) VALUES
('Alice Johnson', 'alice@example.com', 'New York', '2024-12-01'),
('Bob Smith', 'bob@example.com', 'Los Angeles', '2024-12-05'),
('Charlie Lee', 'charlie@example.com', 'Chicago', '2024-12-10'),
('Diana King', 'diana@example.com', 'New York', '2025-01-15'),
('Ethan Hunt', 'ethan@example.com', 'Los Angeles', '2025-02-01');
INSERT INTO Events (title, description, city, start_date, end_date, status, organizer_id) VALUES
('Tech Innovators Meetup', 'A meetup for tech enthusiasts.', 'New York', '2025-06-10 10:00:00', '2025-06-10 16:00:00', 'upcoming', 1),
('AI & ML Conference', 'Conference on AI and ML advancements.', 'Chicago', '2025-05-15 09:00:00', '2025-05-15 17:00:00', 'completed', 3),
('Frontend Development Bootcamp', 'Hands-on training on frontend tech.', 'Los Angeles', '2025-07-01 10:00:00', '2025-07-03 16:00:00', 'upcoming', 2);
INSERT INTO Sessions (event_id, title, speaker_name, start_time, end_time) VALUES
(1, 'Opening Keynote', 'Dr. Tech', '2025-06-10 10:00:00', '2025-06-10 11:00:00'),
(1, 'Future of Web Dev', 'Alice Johnson', '2025-06-10 11:15:00', '2025-06-10 12:30:00'),
(2, 'AI in Healthcare', 'Charlie Lee', '2025-05-15 09:30:00', '2025-05-15 11:00:00'),
(3, 'Intro to HTML5', 'Bob Smith', '2025-07-01 10:00:00', '2025-07-01 12:00:00');
INSERT INTO Registrations (user_id, event_id, registration_date) VALUES
(1, 1, '2025-05-01'),
(2, 1, '2025-05-02'),
(3, 2, '2025-04-30'),
(4, 2, '2025-04-28'),
(5, 3, '2025-06-15');
INSERT INTO Feedback (user_id, event_id, rating, comments, feedback_date) VALUES
(3, 2, 4, 'Great insights!', '2025-05-16'),
(4, 2, 5, 'Very informative.', '2025-05-16'),
(2, 1, 3, 'Could be better.', '2025-06-11');
INSERT INTO Resources (event_id, resource_type, resource_url, uploaded_at) VALUES
(1, 'pdf', 'https://portal.com/resources/tech_meetup_agenda.pdf', '2025-05-01 10:00:00'),
(2, 'image', 'https://portal.com/resources/ai_poster.jpg', '2025-04-20 09:00:00'),
(3, 'link', 'https://portal.com/resources/html5_docs', '2025-06-25 15:00:00');
SELECT 
    u.full_name,
    e.title AS event_title,
    e.city,
    e.start_date
FROM 
    Users u
JOIN 
    Registrations r ON u.user_id = r.user_id
JOIN 
    Events e ON r.event_id = e.event_id
WHERE 
    e.status = 'upcoming' 
    AND u.city = e.city
ORDER BY 
    e.start_date;
SELECT 
    e.title, 
    AVG(f.rating) AS avg_rating, 
    COUNT(f.feedback_id) AS total_feedbacks
FROM 
    Events e
JOIN 
    Feedback f ON e.event_id = f.event_id
GROUP BY 
    e.event_id
HAVING 
    COUNT(f.feedback_id) >= 10
ORDER BY 
    avg_rating DESC;
SELECT u.user_id, u.full_name, u.email, u.city
FROM Users u
WHERE u.user_id NOT IN (
    SELECT r.user_id
    FROM Registrations r
    WHERE r.registration_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
);
SELECT 
    e.event_id,
    e.title,
    COUNT(s.session_id) AS peak_hour_sessions
FROM 
    Events e
LEFT JOIN 
    Sessions s ON e.event_id = s.event_id
    AND TIME(s.start_time) BETWEEN '10:00:00' AND '12:00:00'
GROUP BY 
    e.event_id, e.title
ORDER BY 
    peak_hour_sessions DESC;
SELECT 
    u.city,
    COUNT(DISTINCT r.user_id) AS unique_registrations
FROM 
    Registrations r
JOIN 
    Users u ON r.user_id = u.user_id
GROUP BY 
    u.city
ORDER BY 
    unique_registrations DESC
LIMIT 5;   
SELECT 
    e.event_id,
    e.title,
    SUM(CASE WHEN res.resource_type = 'pdf' THEN 1 ELSE 0 END) AS pdf_count,
    SUM(CASE WHEN res.resource_type = 'image' THEN 1 ELSE 0 END) AS image_count,
    SUM(CASE WHEN res.resource_type = 'link' THEN 1 ELSE 0 END) AS link_count,
    COUNT(res.resource_id) AS total_resources
FROM 
    Events e
LEFT JOIN 
    Resources res ON e.event_id = res.event_id
GROUP BY 
    e.event_id, e.title
ORDER BY 
    e.event_id; 
SELECT 
    u.user_id,
    u.full_name,
    e.event_id,
    e.title AS event_title,
    f.rating,
    f.comments,
    f.feedback_date
FROM 
    Feedback f
JOIN 
    Users u ON f.user_id = u.user_id
JOIN 
    Events e ON f.event_id = e.event_id
WHERE 
    f.rating < 3
ORDER BY 
    f.rating ASC, f.feedback_date DESC;
SELECT 
    e.event_id,
    e.title,
    COUNT(s.session_id) AS session_count
FROM 
    Events e
LEFT JOIN 
    Sessions s ON e.event_id = s.event_id
WHERE 
    e.status = 'upcoming'
GROUP BY 
    e.event_id, e.title
ORDER BY 
    session_count DESC;
SELECT 
    u.user_id,
    u.full_name AS organizer_name,
    e.status,
    COUNT(e.event_id) AS event_count
FROM 
    Users u
JOIN 
    Events e ON u.user_id = e.organizer_id
GROUP BY 
    u.user_id, u.full_name, e.status
ORDER BY 
    u.user_id, e.status;    
SELECT 
    e.event_id,
    e.title
FROM 
    Events e
JOIN 
    Registrations r ON e.event_id = r.event_id
LEFT JOIN 
    Feedback f ON e.event_id = f.event_id
WHERE 
    f.feedback_id IS NULL
GROUP BY 
    e.event_id, e.title;
SELECT 
    registration_date,
    COUNT(user_id) AS new_users
FROM 
    Users
WHERE 
    registration_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
GROUP BY 
    registration_date
ORDER BY 
    registration_date DESC;   
SELECT 
    e.event_id,
    e.title,
    COUNT(s.session_id) AS session_count
FROM 
    Events e
JOIN 
    Sessions s ON e.event_id = s.event_id
GROUP BY 
    e.event_id, e.title
ORDER BY 
    session_count DESC
LIMIT 1;
SELECT 
    e.city,
    AVG(f.rating) AS avg_rating,
    COUNT(f.feedback_id) AS feedback_count
FROM 
    Events e
JOIN 
    Feedback f ON e.event_id = f.event_id
GROUP BY 
    e.city
HAVING 
    COUNT(f.feedback_id) > 0
ORDER BY 
    avg_rating DESC;
SELECT 
    e.event_id,
    e.title,
    COUNT(r.registration_id) AS registration_count
FROM 
    Events e
JOIN 
    Registrations r ON e.event_id = r.event_id
GROUP BY 
    e.event_id, e.title
ORDER BY 
    registration_count DESC
LIMIT 3;
SELECT 
    s1.event_id,
    s1.session_id AS session1_id,
    s2.session_id AS session2_id,
    s1.title AS session1_title,
    s2.title AS session2_title,
    s1.start_time AS session1_start,
    s1.end_time AS session1_end,
    s2.start_time AS session2_start,
    s2.end_time AS session2_end
FROM 
    Sessions s1
JOIN 
    Sessions s2 ON s1.event_id = s2.event_id
    AND s1.session_id < s2.session_id
    AND s1.start_time < s2.end_time
    AND s1.end_time > s2.start_time;
SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.registration_date
FROM 
    Users u
LEFT JOIN 
    Registrations r ON u.user_id = r.user_id
WHERE 
    u.registration_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
    AND r.registration_id IS NULL;
SELECT 
    speaker_name,
    COUNT(DISTINCT session_id) AS session_count,
    COUNT(DISTINCT event_id) AS event_count
FROM 
    Sessions
GROUP BY 
    speaker_name
HAVING 
    COUNT(DISTINCT session_id) > 1
ORDER BY 
    session_count DESC;
SELECT 
    e.event_id,
    e.title
FROM 
    Events e
LEFT JOIN 
    Resources r ON e.event_id = r.event_id
WHERE 
    r.resource_id IS NULL
ORDER BY 
    e.start_date;
    SELECT 
    e.event_id,
    e.title,
    COUNT(DISTINCT r.registration_id) AS total_registrations,
    AVG(f.rating) AS average_rating,
    COUNT(f.feedback_id) AS feedback_count
FROM 
    Events e
LEFT JOIN 
    Registrations r ON e.event_id = r.event_id
LEFT JOIN 
    Feedback f ON e.event_id = f.event_id
WHERE 
    e.status = 'completed'
GROUP BY 
    e.event_id, e.title
HAVING 
    COUNT(f.feedback_id) > 0;
SELECT 
    u.user_id,
    u.full_name,
    COUNT(DISTINCT r.event_id) AS events_attended,
    COUNT(DISTINCT f.feedback_id) AS feedbacks_submitted,
    ROUND(COUNT(DISTINCT f.feedback_id) / COUNT(DISTINCT r.event_id), 2) AS feedback_ratio
FROM 
    Users u
LEFT JOIN 
    Registrations r ON u.user_id = r.user_id
LEFT JOIN 
    Feedback f ON u.user_id = f.user_id AND r.event_id = f.event_id
GROUP BY 
    u.user_id, u.full_name
ORDER BY 
    events_attended DESC, feedback_ratio DESC;
SELECT 
    u.user_id,
    u.full_name,
    COUNT(f.feedback_id) AS feedback_count,
    AVG(f.rating) AS average_rating
FROM 
    Users u
JOIN 
    Feedback f ON u.user_id = f.user_id
GROUP BY 
    u.user_id, u.full_name
ORDER BY 
    feedback_count DESC
LIMIT 5;
SELECT 
    user_id,
    event_id,
    COUNT(*) AS registration_count
FROM 
    Registrations
GROUP BY 
    user_id, event_id
HAVING 
    COUNT(*) > 1;
SELECT 
    DATE_FORMAT(registration_date, '%Y-%m') AS month,
    COUNT(*) AS registration_count
FROM 
    Registrations
WHERE 
    registration_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
GROUP BY 
    DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY 
    month ASC;
SELECT 
    e.event_id,
    e.title,
    AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) AS avg_duration_minutes
FROM 
    Events e
JOIN 
    Sessions s ON e.event_id = s.event_id
GROUP BY 
    e.event_id, e.title
ORDER BY 
    avg_duration_minutes DESC;
SELECT 
    e.event_id,
    e.title,
    e.start_date,
    e.city
FROM 
    Events e
LEFT JOIN 
    Sessions s ON e.event_id = s.event_id
WHERE 
    s.session_id IS NULL
ORDER BY 
    e.start_date;