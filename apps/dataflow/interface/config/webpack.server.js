const { join } = require('path');

const babelOpts = require('./babel');
const styles = require('./styles');
const setup = require('./setup');

const dist = join(__dirname, '..', 'dist');
const exclude = /(node_modules|bower_components|static)/;


const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});



module.exports = env => {
	const isProd = env && env.production;

	if (isProd) {
		babelOpts.presets.push('babili');
	} else {
		styles.unshift({ loader:'style-loader' });
	}

	return {
		entry: {
			server: './src/server.js',
			// vendor: [
			// 	// pull these to a `vendor.js` file
			// 	'preact'
			// ]
		},
		output: {
			path: dist,
			filename: '[name].js',
			publicPath: '/',
			library: 'App',
			libraryTarget: 'commonjs',
			umdNamedDefine: true
		},
		resolve: {
			alias: {
				// Run `npm install preact-compat --save`
				// 'react': 'preact-compat',
				// 'react-dom': 'preact-compat'
			}
		},
		module: {
			rules: [{
				test: /\.jsx?$/,
				exclude: exclude,
				loader: {
					loader: 'babel-loader',
					options: babelOpts
				}
			},
			// {
			// 	test: /\.css$/,
			// 	 loader:  ExtractText.extract("style-loader","css-loader")
			// },
			// {
			// 	test : /\.(less|css)$/,
			// 	loader: ExtractText.extract('style-loader','postcss-loader', 'less-loader')
			// }
			{
				test: /.\.less$/,
				use: extractLess.extract({
					use: [{
						loader: 'postcss-loader',
						options: {
							plugins: function () {
								return [
									require('autoprefixer')
								];
							}
						}
					}, {
						loader: "less-loader"
					}],
					// use style-loader in development
					fallback: "style-loader"
				})
			}
			//{test: /\.css$/,loader: 'style-loader!css-loader'},
		
		]
		},
		plugins: setup(isProd).concat(  extractLess),
		devtool: !isProd && 'eval',
		devServer: {
			contentBase: dist,
			port: process.env.PORT || 3000,
			historyApiFallback: true,
			compress: isProd,
			inline: !isProd,
			hot: !isProd
		}
	};
};
