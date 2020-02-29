$ problem (1) to install bcryptjs OR bcrypt
this problem is fixed by $ npm i bcrypt@3.0.6
$ problem (2)
npm install -g create-react-app 
then::
npx create-react-app my-app
$ problem (3)
-firebase.storage() is not a function 
solved: <script src="https://www.gstatic.com/firebasejs/6.2.3/firebase-storage.js"></script> 
$ problem (4)
axios.get() request-
CORS header 'Access-Control-Allow-Origin' missing
solved: you can put below this code in your node app:-
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
