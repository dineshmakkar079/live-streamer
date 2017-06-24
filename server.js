var app = require('express')();
var robot = require('robotjs');
var server = require('http').Server(app);
var exec = require('child_process').exec;
var io = require('socket.io')(server);
var fs = require('fs');

var base64 = (file)=>{
	var bitmap = fs.readFileSync(file);
	return new Buffer(bitmap).toString('base64');
}

app.get('/take/', (req,res)=>{
	var proc = exec("scrot /home/makkar/Desktop/linux/screen/photo.jpg" , ()=>{
		res.send(base64('/home/makkar/Desktop/linux/screen/photo.jpg'));
	})
});

app.get('/' , (req,res)=>{
    res.sendFile( __dirname + '/client.htm');
});

process.on('exit', ()=>{
  	proc.kill();
});

var regex = /[A-Z!@#$%^&*()_+{}<>:"?|]*/g;

io.on('connection', (socket) => {
	console.log('client connected');
    socket.on('dblclick',()=>{
    	robot.mouseClick("left",true);
    });
    socket.on('lclick',()=>{
        robot.mouseClick("left",false);
    });
    socket.on('rclick',()=>{
    	robot.mouseClick("right",false);
    });
    socket.on('sclick',()=>{
    	robot.mouseClick("middle",false);
    });
    socket.on('movie',(data)=>{
        robot.moveMouse(data['x'], data['y']);
    });
    socket.on('scrollup',()=>{
        robot.scrollMouse(0,2);
    });
    socket.on('scrolldown',()=>{
        robot.scrollMouse(0,-2);
    });
    socket.on('type',(data)=>{
    	let char = data['char'];
    	var match = char.match(regex);
    	if(match[0] == '')
    		robot.keyTap(char);
    	else
    		robot.keyTap(char, 'shift');
    });
    socket.on('backspace',()=>{
        robot.keyTap('backspace');
    });
    socket.on('space',()=>{
        robot.keyTap('space');
    });
    socket.on('enter',()=>{
        robot.keyTap('enter');
    });
    socket.on('tab',()=>{
        robot.keyTap('tab');
    });
    socket.on('delete',()=>{
        robot.keyTap('delete');
    });
    socket.on('escape',()=>{
        robot.keyTap('escape');
    });
    socket.on('up',()=>{
        robot.keyTap('up');
    });
    socket.on('down',()=>{
        robot.keyTap('down');
    });
    socket.on('left',()=>{
        robot.keyTap('left');
    });
    socket.on('right',()=>{
        robot.keyTap('right');
    });
    socket.on('home',()=>{
        robot.keyTap('home');
    });
    socket.on('end',()=>{
        robot.keyTap('end');
    });
    socket.on('pageup',()=>{
        robot.keyTap('pageup');
    });
    socket.on('pagedown',()=>{
        robot.keyTap('pagedown');
    });
    socket.on('alt',()=>{
        robot.keyTap('alt');
    });
    socket.on('control',()=>{
        robot.keyTap('control');
    });
});

server.listen(8000);
console.log('server started');