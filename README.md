# CIS - CVrČkov Informačný Systém (JavaScript backend)

This project was implemented using [Express](https://expressjs.com).

## Install

### PostgreSQL

`brew services start postgresql@9.5`
`export PATH="/usr/local/opt/postgresql@9.5/bin:$PATH"`
`psql postgres`
`psql -d postgres -U cvrcek`

### Express

`npm init -y`
`npm i express pg cors dotenv express-validator`
`npm i -D nodemon`

## Run

`npm start`