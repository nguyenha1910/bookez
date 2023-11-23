# bookez
## Book-EZ Website
Visit the website here: https://bookezclarku.herokuapp.com/book_list  (Heroku free is no longer available)


To run this project, 
1. Clone the project.
2. Initialize the project by running these lines in terminal inside of the bookez directory:  
`npm init`  (entry point: `server.js`)  
`npm i bcryptjs body-parser cookie-parser cookie-session csv-parser dotenv express express-session fs jsonwebtoken mongoose passport passport-local-mongoose path validator`  
3. Start the web server by using one of these lines in terminal:  
`node server.js`  
`nodemon server.js`
4. Start the db server manually (optional)  
`mongod`
5. Deploy new code on heroku  
`git commit -m "message"`  
`git push heroku HEAD:master`
    
Credit: [Progressus Free CSS Template](https://www.free-css.com/free-css-templates/page273/progressus)

