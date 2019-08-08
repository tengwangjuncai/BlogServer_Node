module.exports = {

    APIError:function(code, message){

        this.code = code || 'internal:unknown_error';
        this.message = message || ''
    },

    //统一输出REST   因为//-------//------里面的重复代码容易导致错误
    //所以为ctx 统一加  rest 方法

    restify:(pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            //是否是 REST API 前缀？

            if (ctx.request.path.startsWith(pathPrefix)){
                //绑定rest() 方法：
                ctx.rest = (data) => {
                    //--------------------------------------
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code:0,
                        message:'success',
                        data:data
                    };
                    //---------------------------------------
                }
                try {
                    await  next();
                }catch (e) {
                    //返回错误
                    console.error("捕获到异常：" + e.message)
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code:e.code || 'internal:unknown_error',
                        message:e.message || ''
                    };
                }

            }else {
                await next();
            }
        };
    }
};