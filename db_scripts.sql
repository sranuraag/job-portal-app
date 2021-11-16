create sequence user_id_seq increment by 1 start with 10;  

create table users (
	id int default nextval('user_id_seq') primary key,
	email text,
	password text,
	first_name text,
	last_name text, 
	role text
); 

create sequence job_id_seq increment by 1 start with 10;  

create table jobs (
	id int default nextval('job_id_seq') primary key,
	title text, 
	description text,
	user_id int references users(id)
); 

create table applications (
	job_id int references jobs(id) ON DELETE CASCADE,
	user_id int references users(id)
); 

insert into users (id, email, first_name, last_name, role) values 
(1, 'testemployer01@example.com', 'Test', 'Employer01', 'Employer'); 

insert into jobs (id, title, description, user_id)  values 
(1, 'Job for Testing 1', 'Job for Testing 1', 1); 

insert into jobs (id, title, description, user_id)  values 
(2, 'Job for Testing 2', 'Job for Testing 2', 1);