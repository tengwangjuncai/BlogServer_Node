const Koa = require('koa')

//负责处理URL映射
const router = require('./router')

//post请求 需要引入另一个middleware koa-bodyparser 来解析原始request请求json数据，
// 然后，把解析后的参数，绑定到ctx.request.body中。
const bodyparser = require('koa-bodyparser')

//引入rest文件   //rest  统一返回数据接口{code:xx,message:success/failed,data:{}}
const rest = require('./rest')

const app = new Koa()

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
   await next()
});

app.use(bodyparser());

//使用定义在ctx 上面的全局RestFul 设置，注意，因为 routerzhong 也就是每个接口中使用到rest,
//所以一定要在使用router之前就要使用rest

app.use(rest.restify());
app.use(router());

app.listen(3000);

module.exports = app
