const express = require('express');
const app = express();
const port = RandomPort(3000, 4000);
const usersBase = require('./UserData');

const usersModel = mongoose.model('user', usersSchema);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dbnode', { useNewUrlParser: true, useUnifiedTopology: true });
resetDatabase(mongoose);

function resetDatabase(mongoose) {
    mongoose.connection.dropDatabase();
}

const usersSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    creationDate: Date,
    role: String,
});



usersBase.forEach(user => {
   const userFinal = new usersModel({
       id: user.id,
       firstName: user.firstName,
       lastName: user.lastName,
       email: user.email,
       password: user.password,
       phone: user.phone,
       creationDate: user.creationDate,
       role: user.role,
   });
   userFinal.save().then(() => console.log('Utilisateur ' + user.id + ' créé.'));
});

function RandomPort(min, max){ 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function randString(){
    return Buffer.from(Math.random().toString()).toString("base64").substr(10, 5);
}

app.get('/list', (req, res) => {
    mongoose.connection.collection("users").find({}).toArray(function (err, users) {
        res.status(200).send(users);
    })
});

app.get('/get/:id', (req, res) => {
    mongoose.connection.collection("users").find({}).toArray(function (err, users) {
        const id = parseInt(req.params.id)
        const user = users.find(user => user.id === id)
        res.status(200).json(user)
    })
});

app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id)
    usersModel.find({ id }).deleteOne().exec();
    res.status(200).json({ success: true })
});

app.get('/create', (req, res) => {
    mongoose.connection.collection("users").find({}).toArray(function (err, users) {
        const userFinal = new usersModel({
            id: users.reverse()[0].id + 1,
            firstName: randString(),
            lastName: randString(),
            email: 'test@test.fr',
            password: 'testtest',
            phone: '0600000000',
            creationDate: '2020-12-28T22:00:00.000Z',
            role: 'Customer',
        });
        userFinal.save().then(() => console.log('Utilisateur créé.'));
        users.push(userFinal);
        res.status(200).json(users)
    })
});

app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const edit = {
        id: id,
        firstName: randString(),
        lastName: randString(),
        email: 'test@test.fr',
        password: 'testtest',
        phone: '0600000000',
        creationDate: '2020-12-28T22:00:00.000Z',
        role: 'Customer',
    }
    usersModel.find({ id }).updateOne(edit).exec();


    res.status(200).json({ success: true })
});


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});
