var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

http.createServer(function(req,res){
        var writeStream = fs.createWriteStream(__dirname+'/path/to/public/newfile.txt',{flags: 'a'});
        var requestBody = '';
        //req.pipe(writeStream);
        req.addListener('data',function(chunkData){
            requestBody+=chunkData;        
        });
        req.addListener('end',function(){
            var text = querystring.parse(requestBody).text;
            console.log('Data : '+text);
            if(text)
              writeStream.write(text);
        });
        res.end('Request Save');

}).listen(3333);
console.log('listening on port 3333');