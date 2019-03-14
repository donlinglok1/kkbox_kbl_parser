var parseString = require('xml2js').parseString;
var fs = require("fs");
var Input = require('prompt-input');

var filename = './粵語歌曲.kbl';
var array;

function doitem(index){
    console.dir(array[index]['song_name']);
    console.dir(array[index]['song_artist']);
    console.dir(array[index]['song_album']);

    var proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(array[index]['song_name']+""); proc.stdin.end();

    var input = new Input({
        name: 'first',
        message: 'Next'
    });
    
    input.ask(function(answers) {
        doitem(index+1);
    });
}

fs.readFile(filename, function(err, data) {
    if (err) throw err;
    if(data)
        parseString(data, function (err, result) {
            array = result['utf-8_data']['kkbox_package'][0]['playlist'][0]['playlist_data'][0]['song_data'];
            doitem(0);
        });
});
