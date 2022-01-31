const express = require('express');
const app = express();
const users = require('./UserData');

app.use(express.json());
  
app.get('/users', function (req,res){
    res.status(200).json(users);
});

app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    res.status(200).json(user);
});

app.post('/users', (req,res) => {
    users.push(req.body);
    res.status(200).json(users);
});

app.put('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    let user = users.find(user => user.id === id);
    user.firstName = req.body.firstName,
    user.lastName = req.body.lastName,
    user.email = req.body.email,
    user.password = req.body.password,
    user.phone = req.body.phone,
    users.role = user.role,
    res.status(200).json(user);
});

app.delete('/users/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let user = users.find(user => user.id === id)
    parkings.splice(users.indexOf(user),1)
    res.status(200).json(users)
});
  
app.listen(3000, () => {
console.log("listen on port 3000");
});