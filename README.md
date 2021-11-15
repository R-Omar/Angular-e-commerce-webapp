## Description
An e-commerce web app developed using Angular, ExpressJS, Angular Material and MongoDB.

# Live Demo
Link: [https://e-com-webapp.herokuapp.com/](https://e-com-webapp.herokuapp.com/)<br>
Some accounts for testing, please to not change emails or passwords on the live demo:
| Role        | Email                   | Password |
|-------------|-------------------------|----------|
| admin       | admin@gmail.com         | 123456   |
| customer    | customer@gmail.com      | 123456   |

# Technologies, frameworks and libraries
- Frontend: Angular, Angular Material, Bootsrap, jQuery...
- backend: ExpressJS, Mongoose, bcryptjs, dotenv...
- MongoDB Database

# To run locally
1. Make sure you have NodeJS and angular-cli installed
2. Clone the project
3. Create a local or a cloud MongoDB database and populate it using the collections JSON files which can be found in the directory MongoDB/Database.
4. Replace the database connexion string with your MongoDB connexion string in the file .env which can be found in the directory backend.
5. Compile and run the backend with `nodemon`
6. Compile and run the frontend with `ng serve --open` 
