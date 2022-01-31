const http = require('http');
const express = require('express');
const app = express();
const url = 'http://localhost';

const serve = require('./server');


for(i = 3000; i <= 4000; i++){
    const req = http.get(url + ':' +  i + '/ping', (res) => {
        if(res.statusCode === 200){
            console.log('listening on port ' + i);     
        }
    });
    
    req.on('error', (error) => {
       
    });

}

