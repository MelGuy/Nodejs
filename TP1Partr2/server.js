const express = require('express');
const app = express();


function randomPort(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var port = randomPort(3000, 4000);

app.get('/', (req,res) => {
    res.send('Hello World')
})
  
app.get('/ping', function (req,res){
    res.send('pong');
})
 
app.listen(port, () => {
    console.log('http://localhost:${port}');
    console.log('listening at port ' + port);
}); 
 





