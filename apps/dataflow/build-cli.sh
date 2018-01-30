rm -rf dist
mkdir dist
#nexe -i extends/codegen/index.js -o  dist/linux-x64-client -t linux-x64
nexe -i cli.js -o  dist/dataflow.exe -t win32-x86-8.6.0
#nexe -i extends/codegen/index.js -o  dist/mac-x64-client -t macos-8.6.0

cp -R extends/codegen/demo ./dist
echo 'dataflow gencode --output ./output --template demo/enum.ejs --api http://192.168.0.75:3333/system/develop.enumeration/fetch' > dist/test-codegen.cmd

rm -rf ~/Desktop/dist
cp -R dist ~/Desktop
tar zcvf ~/Desktop/dataflow.tar.gz ~/Desktop/dist

cp ~/Desktop/dataflow.tar.gz ~/下载/dataflow.tar.gz