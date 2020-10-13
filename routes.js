const fs = require ('fs');

const requesthandler = (req, res) => {

        // console.log(req);

    //process.exit();
    // it will exit the event loop of the node server


   const url = req.url;
   const method = req.method;
   if (url === '/'){
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>my abcpage </title></head>')
    res.write('<body><form action="/messege" method="POST"><input type="text" name="messege"><button type="submit">SEND</button></form></body')
    res.write('</html>')
    return res.end();
   }

   if(url === '/messege' && method === 'POST') {

        const body = [];


        req.on('data', (chunk)=> {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end' , ()=> {
            const parsedBody = Buffer.concat(body).toString();

            // console.log(parsedBody);
            const messege = parsedBody.split('=')[1];

            fs.writeFileSync('messege.text' ,messege);
        })


       
       res.statusCode =302;
       res.setHeader('Location', '/')
       return res.end();
   }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>my first page </title></head>')
    res.write('<body><h1>Hello IT works</h1></body')
    res.write('</html>');
    res.end();

};



// 1st method
// module.exports = requesthandler;

// 2nd method
module.exports = {
    handler:requesthandler,
    someText: 'some hard coded text'
};

// 3rd method
// module.exports.handler = requesthandler;
// module.exports.someText = 'some hard coded text';