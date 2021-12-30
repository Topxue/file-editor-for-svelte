const path = require('path');
const glob = require('glob');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Purgecss = require('purgecss-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
	entry: {
		'build/bundle': ['./src/main.js']
	},
//   optimization: {
//       usedExports: true,
// 	    minimize: true,
// 	    minimizer: [new TerserPlugin({
// 	    	test: /\.js(\?.*)?$/i,    //匹配参与压缩的文件
// 	    	parallel: true,    //使用多进程并发运行
// 	    	terserOptions: {    //Terser 压缩配置
// 	    		output:{comments: false}
// 	    	},
// 	    	extractComments: true,    //将注释剥离到单独的文件中
// 	    })],
//   },
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json')),
			'@': path.resolve(__dirname, 'src')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'build/file-template-editor.js',
		library: 'FileTemplateEditor',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"]
					}
				}
			},
			{
				test: /\.(sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: !prod,
							importLoaders:2
						}
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									require('autoprefixer')({
										overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
									})
								]
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !prod
						}
					}
				]
			},
			   {
              test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[ext]'
                },
              },
            },
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	mode,
	plugins: [
	 new MiniCssExtractPlugin({
   			filename: 'build/file-template-editor.css'
   }),
   new Purgecss({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      variables: true,
      fontFace: true,
      keyframes: true,
      rejected: true,
      safelist: ['body','svg', /^\[data/,/^uk-open/,/^uk-notification/, /^fr-/, /^:root/]
   })
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true,
		host: '0.0.0.0',
	}
};
