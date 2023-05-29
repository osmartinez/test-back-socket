module.exports = (socket)=>{
    socket.on("subscribe",(data)=>{
        socket.join(data.room)
        socket.join(data.socketId)

        if(socket.adapter.rooms.has(data.room)===true){
            console.log('suscribe','a: ',data.room, 'msg: ',{socketId: data.socketId})
            socket.to(data.room).emit("new-user", {socketId: data.socketId})
        }
    })

    socket.on("introduce-myself", (data)=>{
        socket.to(data.to).emit("introduce-myself",{sender: data.sender })
    })

    socket.on( 'sdp', ( data ) => {
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } );
    } );


    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } );
    } );


    socket.on( 'chat', ( data ) => {
        console.log(`[chat] ${JSON.stringify(data)}`)
        socket.to( data.room ).emit( 'chat', { sender: data.sender, msg: data.msg } );
    } );

}