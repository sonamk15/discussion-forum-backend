# Programing-discussion-forum

## Project setup

1. Clone the repo `git clone https://github.com/sonamk15/Programing-discussion-forum`.
2. `cd Programing-discussion-forum` 
3. Install dependencies `npm install`

## DB setup

1. Install postgress: -
  `sudo apt-get update && sudo apt install postgresql postgresql-contrib`
2. Open postgres server `sudo -u postgres psql`
3. Create database `create database programing_discussion_forum`
4. Set postgres password `ALTER USER postgres WITH PASSWORD 'myPassword'`
5. Change default owner role `ALTER DATABASE programing_discussion_forum OWNER TO postgres`

## environment variable
1. Create `.env` file at root folder 
2. Refer `sample.env` file copy all environment variable and past in .env file.
3. Repalce appropriate environment varible name.

## Migration

1. Install knex globally `npm install -g knex`
2. Run `knex migrate:latest`

## Project Start

Run `npm start`

# Happy Programming