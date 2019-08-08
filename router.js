const  fs = require('fs');

function addMapping(router,mapping) {

    // 遍历 文件中的方法   根据  方法前缀  由 router相应的方法调用相应的方法
    for(var url in mapping){
        if(url.startsWith('GET ')){
            var path = url.substring(4);

            /* path  是访问路径
               mapping[url]  文件中对应的处理方法
            */
            router.get(path,mapping[url]);
            console.log(`register URL mapping:GET ${path}`);
        }else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path,mapping[url]);
            console.log(`register URL mapping:POST ${path}`);
        }else if(url.startsWith('PUT ')){
            var path = url.substring(4);
            router.put(path,mapping[url]);
            console.log(`register URL mapping:PUT ${path}`);
        }else  if (url.startsWith('DELETE ')){
            var  path = url.substring(7);
            router.del(path,mapping[url]);
            console.log(`register URL mapping:DELETE ${path}`);
        }else {
            console.log(`invalid URL:${url}`);
        }
    }
}

function addRouters(router,dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) =>{
        return f.endsWith('.js')  //取 dir 文件夹中 .js 结尾的文件
    }).forEach((f)=>{ //然后遍历注册
        console.log('process controller:${f}...');
        let mapping = require(__dirname + '/' + dir + '/' + f); // 注册遍历好的文件
        addMapping(router,mapping);//利用 router 根据路径访问文件方法
    });
}


module.exports = function (dir) {

    let  route_dir = dir || 'router',
        //我们需要引入koa-router这个middleware，让它负责处理URL映射。
        // 注意require('koa-router')返回的是函数:
         router = require('koa-router')();
    addRouters(router,route_dir);

    return router.routes();
}