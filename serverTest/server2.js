//old way to make servers without express framework tfor node.js


const http = require('http'); //node comes with its own http module and thats what we are going to use to create our server


const server = http.createServer((request, response) => {
    /* console.log('headers', request.headers) */
    console.log('method', request.method)
    console.log('url', request.url)
    const user = {
        name: 'John',
        hobby: 'Skating'
    }      
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user)); //passing user but in order to transfer it between the wires we need to use JSON.stringify in order to change the object into a JSON string
    // console.log('I hear you, tkx for request')
}) //grab http module and then create a server by defining it

server.listen(3000); //finally give a port to the server