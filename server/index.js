const io = require('socket.io')(process.env.PORT||3000);
const mangUser =[""];
const arruser=[];
io.on('connection',socket=>{
	console.log(socket.id);
	socket.on("client-send-username",function(data){
		console.log(data+" login");
		socket.emit("server-send-success",data);
	});
	// socket.on('disconnect',()=>{
	// 	const index = arruser
	// });
	socket.on("user-send",user=>{
		const isExist = arruser.some(e=>e.ten===user.ten)
		if(isExist)
		{
			socket.emit("server-send-error","err");

		}else{
			socket.emit("success");
			arruser.push(user);
			io.sockets.emit("list",arruser);
		}
	});
	socket.on("mo-list",function(){
			
	});
	//socket.broadcast.emit("list",arruser);
});
