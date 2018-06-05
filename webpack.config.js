const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    entry:"./www/app/main",
    output:{
        path:path.resolve(__dirname,"./www/dist"),
        filename:"bundle.js",
        publicPath:"/xuni/" //这是对webpack-dev-server的配置，配置虚拟路径
    },
    module:{
        rules:[
            {
                //检测以什么拓展名结尾
                test: /\.js?$/,
                //包含什么文件夹
                include: [
                    path.resolve(__dirname, "www/app")
                ],
                //不包含什么文件夹
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["env"],
                    plugins: ["transform-object-rest-spread","transform-runtime"]
                }
            },
            {
                test:/\.vue$/,
                include:[
                    path.resolve(__dirname,"./www/app"),
                ],
                exclude:[
                    path.resolve(__dirname,"node_modules"),
                ],
                loader:"vue-loader"
            },
            {
                test: /\.css$/,
                use: [
                 'vue-style-loader',
                 'css-loader'
                ]
            },
            {
              test: /\.styl(us)?$/,
              use: [
                'vue-style-loader',
                'css-loader',
                'stylus-loader'
              ]
            }
        ]
    },
    plugins: [
      // 请确保引入这个插件来施展魔法
      new VueLoaderPlugin()
    ],
    resolve: {
       alias: {
         'vue$': 'vue/dist/vue.esm.js' // 用 webpackack 1 时需用 'vue/dist/vue.common.js'
       }
     },
     mode:"development"
}