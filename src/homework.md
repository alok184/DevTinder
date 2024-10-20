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
-- js object vs Json (Diff)
--Add the express.json(Middleware) to your app
-- Make singup api dyamics to recive data from the end user
-- user.findone() with dublicate emilid which object will return and why .?
- Api Get user by ID
- Create delete api
-- Update data of  the user ----
-- Create a update a user
-explore the mongooose for model method
- what are options in a model.findOneAndUpdate method explore more about it

- Update the user by email Id
- explore shemetype options form the doc
- add require, unique, lowercase, min, max, minlength, trim
-add defult value
-create a custome validate fun for gender
-imporve the dev schema - put all  appopiate validations on each field in schema
- Add timestanps to the userschema

- Add Api level validation on patch request and sinUp post Api
-  Data sanitization Add Api validation for each field
-- install validator
-Explore the validator function 
- Never trust req.body
- validate data in singup api
- install bcrypt package
-create a password hash using bcrypt.hash and save the user with encrypted password
- create a login api
-- comapre the password and throw errors if email or passowrd is invaild
-- write code for implement the token logic  (in login)
- insatll middleware of npm i cookie-parser
-- validate the cookies in profile API
- install jsonwebtoken
-// in login api create a jwt token
-// validate the profile  (Read profile) and the logged in user


// userAuth middleware
// add the userAuth middleware in profile Api and new send connection request api
// set the expire of jwt token and cookies to 7 days

-- create userSchema method to get jwt 
-- create userSchema method to compare password and take the passwordinput

--explore /read doc for express.roueter
-Create Router floder for managing all api
- create authRouter, ProfileRoute, requestRouter
-import these Router in app.js


-- Read more about index in mongoose
-Read compond index
-why need index 
- what is the advantage and disadvange of indexs
-show ! or query in mongoose
-read more about logical query 
- schema.pre("save" )   function implement that ---✈️✈️


-create shema of connection request
-Add proper validation 
- write the query for send the connection request
- thing about all corner cases

-Create the api for connaction request with validation (Build own logic)

-read more about logical query 
- schema.pre("save" )   function implement that ---✈️✈️


--write the code with proper validation for post -post/request/review/status/:reqId
--Thought process - POST  Vs GET

-- Read About reg and Populate
- Create  GET /user/requests/received with all the checks ✈️

$nin means not in array
$ne means not present 
.. Logic for get /feedapi
-- explore the $nin, $ne ,$and and read all other query operatortors
--Pagination

-- Build Pagination
:NOTES::_
 Api like  /user/feed?page=1&limit=10 like that
 meeas
  /user/feed?page=1&limit=10  -> (1-10) => .skip(0) & .limit(10)
 /user/feed?page=2&limit=10  -> (11-20) =>.skip(10) & .limit(10)
  /user/feed?page=3&limit=10  -> (21-31 ) => skip(20) & .limit(10)                 data  like that show the data 
  -- here mongose build .skip() & .limite()
  -- skip fromaul somethimg like that
  skip=(page-1)* limite; (3-1)*10= 20 => /user/feed?page=3&limit=10  -> (21-31 )