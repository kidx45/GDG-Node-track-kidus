const http = require('http');

let students = [];

const server = http.createServer((req,res)=>{
    if (req.url == "/" && req.method == "GET") {
        res.statusCode = 200;
        
        res.end("Welcome to Home Page");
    } else if (req.url == "/info" && req.method == "GET") {
        res.statusCode = 200;
        
        res.end("This is the information page")
    } else if (req.url == "/submit" && req.method == "POST") {
        res.statusCode = 201;

        req.on('data', (body) => {
            res.setHeader("Content-Type","application/json")
            res.end(JSON.stringify(JSON.parse(body)));
        })

    } else if (req.url == "/students" && req.method == "GET"){
        req.statusCode = 200;
        
        res.setHeader("Content-Type","application/json")
        
        res.end(JSON.stringify(students))
    } else if (req.url == "/students" && req.method == "POST"){
        res.statusCode = 201;
        
        req.on('data', (body)=>{
            let student = {
                id: JSON.parse(body).id,
                name: JSON.parse(body).name
            };
            
            students.push(student);
            res.end("Added");
        
        })
    } else if (req.method === "PUT") {
        if (students.length == 0) {
            res.end("Array empty");
            return;
        }
        
        const url = req.url.toString().split("/");
        
        if (url[1] === "students") {
            const index = students.findIndex(s => s.id == url[2]);
        
            req.on('data',(body)=>{
                if (index == -1) {
                    res.statusCode = 404;
                    res.end("Student not found");
                    return;
                }

                students[index] = {
                    id: url[2],
                    name: JSON.parse(body).name
                }

                res.end("Updated");
            })
        }

    } else if (req.method == "DELETE") {
        if (students.length == 0) {
            res.end("Array empty");
            return;
        }
        
        const url = req.url.toString().split("/");
        
        if (url[1] === "students") {
            const index = students.findIndex(s => s.id == url[2]);
                if (index == -1) {
                    res.statusCode = 404;
                    res.end("Student not found");
                    return;
                }
                students.splice(index,1);
                res.end("deleted");
        }

    } else {
        res.statusCode = 404;
    }
})

server.listen(3000, ()=>{
    console.log("Running ...")
})