const { join } = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const babelOpts = require('./babel');
const styles = require('./styles');
const setup = require('./setup');

const dist = join(__dirname, '..', 'dist');
const exclude = /(node_modules|bower_components|static)/;

module.exports = env => {
	const isProd = env && env.production;

	if (isProd) {
		babelOpts.presets.push('babili');
	} else {
		styles.unshift({ loader:'style-loader' });
	}

	return {
		entry: {
			isomorphic: './src/containers/index.js',
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
			{
				test: /.\.less$/,
				use: [
					'style-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: function () {
								return [
									require('autoprefixer')
								];
							}
						}
					},
					'less-loader' //使用less或者sass时不用为@import的less/sass添加importLoaders:1因为自动添加
				]
			},
			{test: /\.css$/,loader: 'style-loader!css-loader'},
		]
		},
		plugins: setup(isProd),
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
