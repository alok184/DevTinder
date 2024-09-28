-Create a respository
- initialize the repository
-know about- node_module, package.json, package.lock.json
- install express
-create a server
-listen to port 7777
-- Make Request handlers for './test ' like that
- install nodemon and update script inside package.json
- play with routes and route extensions
-- order of the route matter a lot
- write logic to handle get, post, put, patch , delete api call and test to postman

- explore routing and use of ?, +, {}, * in the routes
- use the regex in routes
-Reading the query params in the route
-Reading the dyamics routes

-- Multiple route handlers-play with the code
- next()
-> next function and errors along with res.send();
--app.use(("/route), rh1, [rh2, rh3], rh4)

- what is a middleware ? why do we need it .
-- how express js basically handles behind the scenes
-Diff b/w app.use and app.all

- write the dummy auth middleware for admin
- write the dummy auth middleware for all user route
-- connect your application to database
- create a user Userschema and user model
- create post /singup api to add data to database
- push some documents using Apis call from postman
-- error handle useing try catch 