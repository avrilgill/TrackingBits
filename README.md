<div align="center"><h1>Tracking bits</h1></div>

# Table of Content:
- [Table of Content:](#table-of-content)
  - [File tree](#file-tree)
  - [Features implemented](#features-implemented)
  - [Screen-Shots / Videos](#screen-shots--videos)
  - [How to Start the App](#how-to-start-the-app)
  - [Testing the project](#testing-the-project)
  - [To access Progress Page Feature:](#to-access-progress-page-feature)
## File tree

```bash
|-Backend
    ├───controller
        └───addProject-controller.js
        └───chat-controller.js
        └───signup-controller.js
    ├───database
        └───database.js
    ├───middleware
        └───checkauth.js
    ├───router
        └───addProject-router.js
        └───authenticate-router.js
    ├───validators
    └───app.js
|-Backend
    ├─── src
        ├───components
        .
        .
        .
        ├───provider
        └───app.js
 ```
- Backend- contains all the code for controller and database.
  - controller : All controllers which will have logic to handle for particular route
  - router : All routers to route endpoints to respective controllers
  - database : Database logic
  - app.js : Main file for the server
- frontend: contains src folder where all view code re-sides.

## Features implemented
 
 1.Signup 
  - Endpoint : /api/authenticate/signup
  - Logic: Check if email is valid , passwowrd is of certain length, escape any html and normalize email. If email already exists return error else add user to the database. Crpyt the password before storing in case database is compromised. Make a jwt token to keep track of the session. Token will expire after an hour.
  
  
 2. Login
  - Endpoint : /api/authenticate/login
  - Logic : Check if user with this email exists. If not return error. If user exists check if password correct. AFter all checks return jwt token to keep track of the session.

## Screen-Shots / Videos
- Feature Videos are in Videos folder, screenshots are in Screenshots folder and prototypes are in meetings folder
 
## How to Start the App
| Steps. | What to do                                                       | Commands      |
| ------ | -----------------------------------------------------------------| ------------- |
| 1      | `cd into Backend Folder:`                                        | 'cd Backend'  |
| 2      | `After in Backend Folder, run this command:`                     | 'npm install' |
| 3      | `Go back a level using:`                                         | 'cd ..'       |
| 4      | `cd into Frontend Folder:`                                       | 'cd Frontend' |
| 5      | `After in Frontend Folder, run this command:`                    | 'npm install' |
| 6      | `Go back a level using:`                                         | 'cd ..'       |
| 7      | `Again cd into Backend Folder and run:`                          | 'node app.js' |
| 8      | `After this open a new terminal and in the new,`                 |               |
|        | `terminal cd into project folder and then frontend folder:`      | 'cd Frontend' |
| 7      | `After in Frontend Folder in a new terminal, run this command: ` | 'npm start'   | 

- After running the last command inside the Frontend folder, you'll have to wait till you recieve Compiled successfully! message and then you'll be taken to a new web page at http://localhost:3000/ 

## Testing the project
- How to run the test code
- Cd into frontend folder and enter "npm test" in the terminal.

## To access Progress Page Feature:
- Type in the URL: http://localhost:3000/
- Click on progress available on left sidebar on homepage after logging in.
