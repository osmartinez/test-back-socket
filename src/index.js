const express = require("express")
const app = express()
const server = require("http").Server(app)
const corsConfig = require("./config/cors.config.json")
const io = require("socket.io")(server,corsConfig)
const stream = require("./socketio")
const Turn = require('node-turn');

var turnServer = new Turn({
    // set options
    authMech: 'long-term',
    credentials: {
      username: "password",
    },
    debugLevel: 'DEBUG',
    
  });
  turnServer.start();

app.get("/", (req,res)=>{
    return res.send(`
        <body>
            <h1>Server running</h1>
        </body>
    `)
})

app.use(express.static("public"))


io.of("/stream").on("connection",stream)

server.listen(3000,"0.0.0.0")