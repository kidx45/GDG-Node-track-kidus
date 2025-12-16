import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.status(200).type('.html').send('<p style="color: green;">Welcome to the page</p>')
})

app.get('/about', (req,res)=>{
    res.status(200).type('plain').send(`
This page consists information about how the page is constructed.
It is done using Express and return a plain text as response.`)
})

app.get('/students/:studentid', (req,res)=>{
    var result = {
        Query: req.query.department,
        Parameter: req.params.studentid
    }
    res.status(200).json(result)
})

app.listen(port, ()=>{
    console.log("Running...");
})