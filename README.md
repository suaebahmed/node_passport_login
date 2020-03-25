## problem (1) to install bcryptjs OR bcrypt
this problem is fixed by $ npm i bcrypt@3.0.6
## problem (2)
npm install -g create-react-app 
then::
npx create-react-app my-app
## problem (3)
-firebase.storage() is not a function 
solved: <script src="https://www.gstatic.com/firebasejs/6.2.3/firebase-storage.js"></script> 
## problem (4)
<p>axios.get() request-</p>
<p>CORS header 'Access-Control-Allow-Origin' missing</p>
<h5>solved: you can put below this code in your node app:-</h5>
<p>
  app.use(function(req, res, next) {<br>
  res.header('Access-Control-Allow-Origin', '*');<br>
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');<br>
  next();
});
</p>



## problem (5)
<h3>handlebars access has been denied to resolve the property</h1>
<p>i solve this issue by installing a dev dependency for handlebars:</p>
  
npm i -D handlebars@4.5.0

