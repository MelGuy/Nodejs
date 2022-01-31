const express = require('express');
const app = express();
app.get('/', (req,res) => {
  res.send('Hello World')
})

app.get('/ping', function (req,res){
  res.send('pong');
  
})

app.listen(3000, () => {
  console.log("listen on port 3001");
});



