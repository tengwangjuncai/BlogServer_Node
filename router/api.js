const  APIError = require('../rest').APIError;

const  pool = require('../db/db');

var products = [{
    name:'wpy',
    price:'998'
},{
    name:'wfq',
    price:'两毛'
}];


module.exports = {
    'GET /api/students': async (ctx, next) => {
        //设置content-type
        // ctx.response.type = 'application/json';
        // ctx.response.body = {
        //   products:products
        // };

        console.time('start')
        let sql = 'select * from Stu'
        const res = await pool.query(sql);
        console.error(JSON.stringify(res[0]))
        ctx.rest(res[0])
        console.timeEnd('start')
    },



    'POST /api/addstudent': async(ctx, next) => {
        // var p = {
        //     name:ctx.request.body.name,
        //     price:ctx.request.body.price
        // };
        // console.log('进来了呀');
        // products.push(p);

        //rest  统一返回数据接口
        //绑定rest 前

        // ctx.response.type = 'application/json';
        // ctx.response.body = p;

        //绑定rest 后
        // ctx.rest(p)


        console.time('insert')
        let sql = 'insert into Stu(id,name,score) values (?,?,?)'
        console.error(ctx.request.body)
        let id = ctx.request.body.id
        let name = ctx.request.body.name
        let score = ctx.request.body.score
        const  res = await pool.query(sql,[id,name,score]);
        console.error(Object.values(ctx.request.body))
        console.log(res)
        console.error(JSON.stringify(res[0]))
        // ctx.rest(res[0])
        console.timeEnd('insert')
    }
};