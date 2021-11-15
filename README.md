# job-portal-app
Simple replica of a job portal.

1. Create PG Database instance and provide details in .env file

create sequence user_id_seq increment by 1 start with 10;  

create table users (
	id int default nextval('user_id_seq') primary key,
	email text,
	password text,
	first_name text,
	last_name text, 
	role text
); 

