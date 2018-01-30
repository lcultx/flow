module.exports = {
	presets: [
		['es2015', { loose:true, modules:false }],
		'stage-2'
	],
	plugins: [
		["transform-decorators-legacy"],
		['transform-react-jsx'],
		["transform-runtime", {
			"helpers": false, // defaults to true 
			"polyfill": false, // defaults to true 
			"regenerator": true, // defaults to true 
			"moduleName": "babel-runtime" // defaults to "babel-runtime" 
		  }]
	]
};
