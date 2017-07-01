var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var request = require('request');

http.createServer(function(req,res){
        var urlStr = req.url;
        var query = url.parse(urlStr).query;
        var path = querystring.parse(query)['url'];
        var readStream = fs.createReadStream(__dirname+'/'+path,{encoding:'utf8'});
        readStream.pipe(res);
        readStream.on('error',function(err){
            res.end('Invalid Path');
        });

}).listen(4000);

request('http://localhost:4000/?url=path/to/my/file.txt',function(err,res,body){
    if (!err && res.statusCode == 200) {
        console.log(body) 
    }
    else{
        console.log(err);
    }
});