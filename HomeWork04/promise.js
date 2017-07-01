var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

function filePromise(filePath){
    console.log(filePath);
    return new Promise(function(resolve,reject){
        var file = fs.readFile(__dirname+'/'+filePath,function(err,data){
            if(err){
                console.log('File not found');
                reject(err);
            }
             else{
                 console.log('file found');
                resolve(data);
             }
                
        });
    });
}

http.createServer(function(req,res){
        console.log('request recieved..');
        var urlStr = req.url;
        var query = url.parse(urlStr).query;
        var path = querystring.parse(query)['url'];
        
        filePromise(path).then(function(data){
            res.writeHead(200,{ContentType:'text/plain'});
            res.end(data);
        }).catch(function(err){
            res.writeHead(404,{ContentType:'text/plain'});
            res.write('File Not Found');
            res.end();
        });

}).listen(4000);

console.log('Listening on port 4000');