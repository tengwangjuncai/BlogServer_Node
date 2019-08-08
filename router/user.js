const APIError = require('../rest').APIError
const pool = require('../db/db')

//用于生成随机ID
const uuidv1 = require('uuid/v1');


module.exports = {

        'POST /api/user/signup' : async(ctx) => {

            let sql_check = 'select * from user where name = ?'
            let res_check = await pool.query(sql_check,Object.values(ctx.request.body))
            if(res_check[0].length > 0){
                throw  new APIError(-1,"该用户已存在")
            }
            
            let user = {...{id:uuidv1()},...ctx.request.body}
            let sql = 'insert into user(id,name,password) values(?,?,?)'
            let res = await pool.query(sql,Object.values(user))
            if (res.length > 0){
                ctx.rest(user)
            } else {
                throw  new APIError(-1,"注册失败")
            }

        },

        'POST /api/user/signin': async(ctx) => {

            let sql = 'select * from user where name = ? and password = ?'
            let res = await  pool.query(sql,Object.values(ctx.request.body))
            // console.log(JSON.stringify(res))
            if (res[0].length <= 0){
                throw new  APIError(-1,"用户名或密码不正确")
            }
            ctx.rest(res[0][0])
        },

        'POST /api/user/userInfo' : async(ctx) => {

            let sql = 'select * from user where id = ?'
            let res = await  pool.query(sql,Object.values(ctx.request.body))
            console.log(JSON.stringify(res))
            if (res[0].length <= 0){
                throw new  APIError(-1,"用户不存在")
            }
            ctx.rest(res[0][0])
        },

    'POST /api/user/updateUserInfo': async(ctx, next) => {


        console.time('update')
        let id = ctx.request.body.id
        let name = ctx.request.body.name
        let headimage = ctx.request.body.headimage
        let mark = ctx.request.body.mark
        let personInfo = ctx.request.body.personInfo
        let BgUrl = ctx.request.body.BgUrl
        let weiboUrl = ctx.request.body.weiboUrl
        let gitUrl = ctx.request.body.gitUrl
        let twitterUrl = ctx.request.body.twitterUrl
        let emailAddress = ctx.request.body.emailAddress

        let sql = 'update user set name = ?,headimage = ?,mark = ?,personInfo = ?,BgUrl = ?,weiboUrl = ?,gitUrl = ?,twitterUrl = ?,emailAddress = ? where id = ?'

        const  res = await pool.query(sql,[name,headimage,mark,personInfo,BgUrl,weiboUrl,gitUrl,twitterUrl,emailAddress,id]);
        console.error(Object.values(ctx.request.body))
        console.log(res)
        console.error(JSON.stringify(res[0]))
        ctx.rest(res[0])
        console.timeEnd('update')
    },

    'POST /api/user/updateResume': async(ctx, next) => {

            let id = ctx.request.body.id
        let resume = ctx.request.body.resume

        let sql = 'update user set resume = ? where id = ?'

        const res = await pool.query(sql,[resume,id]);

        if (res[0].length <= 0){
            throw new  APIError(-1,"简历提交失败")
        }

        ctx.rest(res[0])
    }

}
