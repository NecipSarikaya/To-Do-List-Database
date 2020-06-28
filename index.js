const express = require('express');
const Datastore = require('nedb');
const { response } = require('express');

const app = express();
app.listen(3000, ()=>{console.log("Listening 3000 port")});

app.use(express.static('public'))
const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.json({limit:"1mb"}));

app.post('/api' , (request,response) =>{
    console.log(request.body);
    const data = request.body;
    database.insert(data);
    response.send({
        status:"succes",
        icerik:data.icerik
    })
})

app.get('/api',(request,response) =>{
    database.find({}).sort({ icerik: -1 }).exec(function (err, data) {
        if(err){
            console.log("error");
            response.end();
        }
        response.json(data);
      });
})

app.post('/api' , (request,response) =>{
    console.log(request.body);
    const data = request.body;
    console.log(data.icerik);
        database.insert(data);
        response.send({
            status:"succes",
            icerik:data.icerik
    })
})
app.post('/apii' , (request,response) =>{
    const data = request.body;
    console.log(data.ilk)
    database.remove({ icerik: data.ilk }, {}, function (err, numRemoved) {
        console.log(numRemoved);
    });
    
})

