const path = require('path')
// 路径解析

module.exports = {
    // webpack配置
    webpack:{
        // 配置别名
        alias:{
            // 约定：使用@表示src文件所在的路径
            '@': path.resolve(__dirname, 'src')
        }
    }
}