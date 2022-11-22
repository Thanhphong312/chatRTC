const socket = io('https://democallcideo.herokuapp.com/');
//const socket = io('http://localhost:3000');
socket.on("server-manage-user",function(data){
 
});
socket.on("list",arruser=>{
       $('#boxcontent').html("");
      arruser.forEach(function(data){
        $('#boxcontent').append('<li id='+data.peerId+'>'+data.ten+'</li>');
      });
      
});
socket.on("server-send-success",function(data){ 
    $('#btn-login').hide();
    $('#btn-call').show();
    $('#right').show();
    $('#name').append(data);
});

$(document).ready(function(){
      $('#btn-login').show();
      $('#btn-call').hide();
      $('#right').hide();
      // $("#btnsign").click(function(){
      //   socket.emit("client-send-username",$("#txtusername").val());
      // });
});

function openStream()
{
	const config={audio:false,video:true};
	return navigator.mediaDevices.getUserMedia(config);
}
function playStream(idvideoTag,stream){
	const video = document.getElementById(idvideoTag);
	video.srcObject = stream;
	video.play();
}
// openStream()
// .then(stream=>playStream('localStream',stream));
const peer = new Peer({key: 'lwjd5qra8257b9'});
peer.on('open',id =>{
  $("#idStream").append(id);
  $("#btnsign").click(function(){
      const username = $("#txtusername").val();
      socket.emit("user-send",{ten:  username, peerId: id});
      socket.on("server-send-error",function(data){
          $('#btn-login').show();
          $('#btn-call').hide();
          $('#right').hide();
          alert("tên đã được sử dụng");
      });
      socket.on("success",function(){
                socket.emit("client-send-username",username);

      });

  });
  $("#onl").click(function(){
  });
});
$('#boxcontent').on('click','li',function(){
  const id = $(this).attr('id');
  openStream()
  .then(stream=>{
   // call.answer(stream);
    playStream('localStream',stream);
    const call = peer.call(id,stream);
     call.on('stream',remoteStream=>playStream('remoteStream',remoteStream));
  });
});
$('#btnCall').click(()=>{
	const id = $('#remoteId').val();
	openStream()
	.then(stream =>{
		playStream('localStream',stream);
		const call = peer.call(id,stream);
		 call.on('stream',remoteStream => playStream('remoteStream',remoteStream));

	});
});
peer.on('call',call=>{
	openStream()
	.then(stream=>{
		call.answer(stream);
		playStream('localStream',stream);
		 call.on('stream',remoteStream=>playStream('remoteStream',remoteStream));
	});
});

var video = document.querySelector('video');
var constraints = window.constraints = {
  audio: false,
  video: true
};
var errorElement = document.querySelector('#errorMsg');

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);
  console.log(videoTracks);
  stream.onremovetrack = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
})


function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

