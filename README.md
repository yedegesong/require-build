# require-build require 按页面需要打包
## 目录规范定制

```
.

├── build		构建资源文件目录

├── html    存放静态模板文件

├── css     存放样式文件

├── images  存放图片文件

├── js

    ├──controller 存放每个页面控制器
	
        ├──detils 不同页面的模块控制器 已页面功能命名 如detils 表示详细页
		
        ├──index 表示首页
		
    ├──lib 共用资源文件 如 jquery,zepto,forzen
	
    ├──module 存放共用脚本模块 如封装AJAX API
	
    ├──app.js 文件配置
	
├── build.js //构建配置文件 配置信息需要以JS/app.js 文件配置一直

├── r.js NODE 打包脚本

├── fis-conf FIS3打包策略

