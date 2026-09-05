-- Run this script in psql or pgAdmin to create the local PostgreSQL database & user:

CREATE DATABASE lectureconnect;
CREATE USER lectureconnect WITH PASSWORD 'lectureconnect123';
GRANT ALL PRIVILEGES ON DATABASE lectureconnect TO lectureconnect;
ALTER DATABASE lectureconnect OWNER TO lectureconnect;
