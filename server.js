const express = require("express");
const http = require("http");
const cors = require("cors");

const {Server} = require("socket.io");


const app = express();


// app.use(cors());


const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});



// normal api

app.get("/",(req,res)=>{

    res.send("Socket Backend Running");

});





// socket connection

io.on("connection",(socket)=>{


    console.log(
        "New user connected:",
        socket.id
    );



    // receive message from frontend

    socket.on("message",(data)=>{


        console.log(
            "Message :",
            data
        );


        // send message to all connected users

        io.emit(
            "message",
            data
        );


    });




    socket.on("disconnect",()=>{


        console.log(
            "User disconnected",
            socket.id
        );


    });


});





server.listen(5000,()=>{


    console.log(
        "Server running on 5000"
    );


});