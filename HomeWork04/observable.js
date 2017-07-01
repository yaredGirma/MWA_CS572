var http = require('http');
var fs = require('fs');
var url = require('url');
var rx = require('rx');
var subject = new rx.Subject();
var querystring = require('querystring');

function serveFile(httpObjects){
    var urlStr = httpObjects.req.url;
    var query = url.parse(urlStr).query;
    var path = querystring.parse(query)['url'];
    var readStream = fs.createReadStream(__dirname+'/'+path,{encoding:'utf8'});
    
    readStream.pipe(httpObjects.res);

    readStream.on('error',function(err){
         httpObjects.res.writeHead(404,{ContenType:'text/plain'});
         httpObjects.res.write('File Not Found')
         httpObjects.res.end();
    });
}

subject.subscribe(serveFile)

http.createServer(function(req,res){
        console.log('request recieved..');
        var httpObjects = {req:req,res:res};
        subject.onNext(httpObjects);
}).listen(4000);

console.log('Listening on port 4000');