## Concept

This is the third and final project of our WebDev bootcamp: the Origins Digital platform.
Origins Digital is a website that hosts videos chosen by the administrator, and allows premium users to watch those videos.

## Setup & Use

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- \_NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in backend/.env.sample . Choose a database name, then create a database with matching name in your sql management tool.
- To create database structure, run all SQL scripts in backend/database.sql.
- To insert the dump into the database tables, run all SQL scripts in backend/sample.sql.

### Video and image assets

To run this project in its development phase, you'll need video and image files :

- First, download and unzip thumbnails.zip folder and video.zip folder from https://www.mediafire.com/folder/njzr98k63e3js/Origins_Digital_backend_assets
- Then paste both those folders inside `backend/public` folder.

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### Deployment

For deployment, you have to go to `secrets` → app `actions` on the github repo to insert via `New repository secret` :

- CAPROVER_BACK_APPNAME : name app on caprover
- CAPROVER_FRONT_APPNAME : name app on caprover
- CAPROVER_PASSWORD : password caprover
- CAPROVER_SERVER : link of domain
