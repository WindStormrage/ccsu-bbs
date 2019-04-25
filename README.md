# 长沙学院的论坛系统(本人毕设)

## vue+thinkjs实现,具体功能完成后介绍

#### 运行方法

* 克隆下来
* 在server目录安装npm包`npm i`
* 然后`yarn start`就可以运行了
* 端口是8662

#### 部署方法

1. 取消`vue.config.js`中`baseUrl`的注释

2. 前端代码打包

```
npm run build
```

3. 把打包后dist里面的html文件放在server里面的view里面(覆盖)

这里没有实现自动化,以后有时间改成自动化的脚本

4. 把dist里面的资源文件放在server里面的的www里面的static里面(覆盖)

5. 修改后端路由(接口前面加上/api,加上所有页面的路由)

然后就部署成功了
#### 可能出现的问题
* 后端路由错误
* 静态资源加载错误,可能是你复制的位置有问题,还有可能是前端`vue.config.js`里面的`baseUrl`设置错误了
* 上线的时候记得是用`npm i --production --registry=https://registry.npm.taobao.org`安装依赖
* 可能会出现个别依赖没有的情况比如说`debug`
* 刚刚遇到了一个大问题,就是发布到线上的时候发现我的页面可以打开然后我的资源文件都404,然后在文档里面看到,应为thinkjs默认只有开发环境才会用`resource`中间件来处理资源请求,生产环境一般用`nginx`,但是我还是想用`node`,所以按照教程的把`src/config/middleware.js`里面的`resource`一直打开然后更新了这个文件后发现还是404,找了很久问题...(两个小时后)最后才想起生产环境的后端文件都是从`/app`里面获取的,所以如果配置文件有更新需要手动`npm run compile`一下,然后把`/app`里面的文件全部覆盖到服务器上

#### 分支解释
* master 用来作为当前的开发分支
* onLine 用来做当前的线上分支

每次开发完就推到线上分支去上线,上线完回到master上开发