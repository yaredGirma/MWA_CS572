var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var request = require('request');
var path = require('path');

http.createServer(function(req,res){
      //  console.log('request recieved..');
        var urlStr = req.url;
        var query = url.parse(urlStr).query;
        var path = querystring.parse(query)['url'];
    //     var readStream = fs.createReadStream(__dirname+'/'+path,{encoding:'utf8'});
    //    // readStream.pipe(res);
       // readStream.on('error',function(err){
         //   res.end('Invalid File Path ... File Not found');
       // });

var rf = fs.readFile(path.join(__dirname+'/'+path,{encoding:'utf8'}));
    res.end(rf);



}).listen(4000);

console.log('Listening on port 4000');

request('http://localhost:4000/?url=path/to/my/file.txt',function(err,res,body){
    if (!err && res.statusCode == 200) {
        console.log(body) // Print the body of response.
    }
    else{
        console.log(err);
    }
});