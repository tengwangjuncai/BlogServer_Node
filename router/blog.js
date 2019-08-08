const  APIError = require('../rest').APIError;

const  pool = require('../db/db');

// 用于生成随机ID
const uuidv1 = require('uuid/v1');

module.exports = {
    'GET /api/pages/:userid': async (ctx, next) => {

        let userid = ctx.params.userid

        console.time('start')
        let sql = 'select * from page where userid = ?'
        const res = await pool.query(sql,[userid]);
        // console.error(JSON.stringify(res[0]))

        ctx.rest(res[0])
        console.timeEnd('start')
    },

    'POST /api/addPage': async(ctx, next) => {


        console.time('insert')
        console.error(ctx.request.body)

        let id = uuidv1()
        let userid = ctx.request.body.userid
        let pageName = ctx.request.body.pageName
        let pageContent = ctx.request.body.pageContent
        let createTime = ctx.request.body.createTime
        let updateTime = ctx.request.body.createTime

        let sql = 'insert into page(id,userid,pageName,pageContent,createTime,updateTime) values (?,?,?,?,?,?)'

        const  res = await pool.query(sql,[id,userid,pageName,pageContent,createTime,updateTime]);
        console.error(Object.values(ctx.request.body))
        console.log(res)
        console.error(JSON.stringify(res[0]))
        ctx.rest(res[0])
        console.timeEnd('insert')
    },

    'POST /api/deletePage': async(ctx, next) => {

        let sql = 'delete from page where id = ?'
        const  res = await pool.query(sql,Object.values(ctx.request.body))
        console.log(JSON.stringify(res))
        ctx.rest(res[0])
    },

    'POST /api/updatePage': async(ctx, next) => {


        console.time('update')
        console.error(ctx.request.body)

        let id = ctx.request.body.id
        console.log('------' + id)

        let pageName = ctx.request.body.pageName
        let pageContent = ctx.request.body.pageContent

        let updateTime = ctx.request.body.createTime

        let sql = 'update page set pageName = ?,pageContent = ?,updateTime = ? where id = ?'

        const  res = await pool.query(sql,[pageName,pageContent,updateTime,id]);
        console.error(Object.values(ctx.request.body))
        console.log(res)
        console.error(JSON.stringify(res[0]))
        ctx.rest(res[0])
        console.timeEnd('update')
    },

};