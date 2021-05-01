<h1 align="center">
  <img alt="Logo" src="./.github/softwrap.png">
</h1>

<h3 align="center">
  Express Application for Softwrap challenge project
</h3>


<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Guribeiro/softwrap-api?color=00B7F8">

  <a href="https://www.linkedin.com/in/gustavohribeiro/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Gustavo%20Henrique-00B7F8">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Guribeiro/softwrap-api?color=00B7F8">

  <a href="https://github.com/Guribeiro/softwrap-api/commits">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Guribeiro/softwrap-api?color=00B7F8">
  </a>

  <a href="https://github.com/Guribeiro/softwrap-api/stargazers">
    <img alt="GitHub last commit" src="https://img.shields.io/github/stars/Guribeiro/softwrap-api?color=00B7F8">
  </a>

  <a href="https://github.com/Guribeiro/softwrap-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Guribeiro/softwrap-api?color=00B7F8">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/Guribeiro/softwrap-api?color=00B7F8">
</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## ⚡ About the project

this api provides everything you need to manage your customers and the administrator's authentication flow

the administrator can manage his clients in any way he prefers

Administrator can see all their customers, manage them, also see more information about them

To see the **web client**, click here: [Softwrap Web](https://github.com/Guribeiro/softwrap-frontend)<br />

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Nodemailer](https://nodemailer.com/about/)
- [Handlebars](https://handlebarsjs.com/)
- [Celebrate](https://github.com/arb/celebrate)
- [Class Transformer](https://github.com/typestack/class-transformer)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [BCrypt](https://github.com/kelektiv/node.bcrypt.js)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `insomnia-workspace.json` on Insomnia App or click on [Run in Insomnia](#insomniaButton) button

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend you to use docker

**Clone the project and access the folder**

```bash
$ git clone git@github.com:Guribeiro/softwrap-api.git && cd softwrap-api
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# Create the instance of postgreSQL using docker
# I'm using port 5431, you can see it in the ormconfig.json file, feel free to use any port you prefer
# I recommend you to use the same port as i'm using, if you don't just remember to change it in the command below
# Remember to change the port in the ormconfig.json file if you don't want to get any errors
$ docker run --name softwrap-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=softwrap -e POSTGRES_PASSWORD=docker \
              -p 5431:5432 -d postgres

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev:server

# Well done, project is started!
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 &nbsp;by Gustavo Henrique 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/gustavohribeiro/)
