const exec = require('child_process').exec;
const express = require('express');
var app = express();
const fs = require('fs');

var base64 = (file)=>{
	var bitmap = fs.readFileSync(file);
	return new Buffer(bitmap).toString('base64');
}

app.get('/', (req,res)=>{
  var proc = exec("scrot photo.jpg" , ()=>{
    res.send(base64('/home/makkar/Desktop/linux/screen/photo.jpg'));
  })
});

app.get('/start/' , (req,res)=>{
	var proc = exec("scrot photo.jpg" , ()=>{
    res.sendFile('/home/makkar/Desktop/linux/screen/image.htm');
  })
})

process.on('exit', ()=>{
  proc.kill();
})

app.listen(12331);
console.log('Server up at ', 12331);
