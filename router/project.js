const  APIError = require('../rest').APIError;

const  pool = require('../db/db');

// 用于生成随机ID
const uuidv1 = require('uuid/v1');

module.exports = {
    'GET /api/projects/:userid': async (ctx, next) => {

        let userid = ctx.params.userid

        console.time('start')
        let sql = 'select * from project where userid = ?'
        const res = await pool.query(sql,[userid]);
        // console.error(JSON.stringify(res[0]))

        ctx.rest(res[0])
        console.timeEnd('start')
    },



    'POST /api/addproject': async(ctx, next) => {


        console.time('insert')
        console.error(ctx.request.body)

        let id = uuidv1()
        console.log('------' + id)
        let userid = ctx.request.body.userid
        let projectName = ctx.request.body.projectName
        let iconUrl = ctx.request.body.iconUrl
        let projectDesc = ctx.request.body.projectDesc
        let projectUrl = ctx.request.body.projectUrl

        let sql = 'insert into project(id,userid,projectName,iconUrl,projectDesc,projectUrl) values (?,?,?,?,?,?)'

        const  res = await pool.query(sql,[id,userid,projectName,iconUrl,projectDesc,projectUrl]);
        console.error(Object.values(ctx.request.body))
        console.log(res)
        console.error(JSON.stringify(res[0]))
        ctx.rest(res[0])
        console.timeEnd('insert')
    },

    'POST /api/deleteproject': async(ctx, next) => {

        let sql = 'delete from project where id = ?'
        const  res = await pool.query(sql,Object.values(ctx.request.body))
        console.log(JSON.stringify(res))
        ctx.rest(res[0])
    },

    'POST /api/updateproject': async(ctx, next) => {


        console.time('update')
        console.error(ctx.request.body)

        let id = ctx.request.body.id
        console.log('------' + id)
        let projectName = ctx.request.body.projectName
        let iconUrl = ctx.request.body.iconUrl
        let projectDesc = ctx.request.body.projectDesc
        let projectUrl = ctx.request.body.projectUrl

        let sql = 'update project set projectName = ?,iconUrl = ?,projectDesc = ?,projectUrl = ? where id = ?'

        const  res = await pool.query(sql,[projectName,iconUrl,projectDesc,projectUrl,id]);
        console.error(Object.values(ctx.request.body))
        console.log(res)
        console.error(JSON.stringify(res[0]))
        ctx.rest(res[0])
        console.timeEnd('update')
    },

};