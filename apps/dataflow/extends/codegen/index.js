var api = require('../../interface').api;
var fs = require('fs');
var mkdirp = require('mkdirp');
var ejs = require('ejs');
var path = require('path');
var _ = require('lodash');
// api.request({
//     url:api.FETCH_ALL_ENUM_DATA_API,
// }).then((res)=>{
//     debugger
//     gencode(res.data)
//     console.log(res.data)
// })

var jsonfile = require('jsonfile');
// jsonfile.readFile(path.join(__dirname,'./data.json'),(err,data)=>{
//     gencode(data)
// })


function gencodeLocal(templateFile, output, data) {

    mkdirp.sync(output);
    var template = fs.readFileSync(templateFile, 'utf-8')
    data.content.map((item) => {
        var meta = {
            outputPath:output
        };
        var str = ejs.render(template, {
            content: item,
            meta:meta,
            _: _,
            filename:templateFile,
            //debug:true
        });
        var outFile = path.join(output, meta.filename);
        var pdir = path.dirname(outFile);
        mkdirp.sync(pdir);
        fs.writeFileSync(outFile, str,'utf-8');
    })

}

exports.gencode = function gencode(options) {
    var template = path.join(options.template);
    api.request({
        url: options.api,
        baseURL:'',
    }).then((res) => {
        gencodeLocal(template, options.output, res.data)
    }).catch(function (error) {
      console.log(error);
    });
}







