var program = require('commander');
var codegen = require('./extends/codegen')

program.version('0.1.0')

program.command('gencode')
    .option('--output <output>', 'generated code output path')
    .option('--template <template>', 'generate code template')
    .option('--api <api>', 'the server why you fetch data')
    .action(function(options){
        codegen.gencode(options)
    })
    
program.parse(process.argv);