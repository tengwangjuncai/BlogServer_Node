const APIError = require('../rest').APIError
const pool = require('../db/db')


var userInfor = {
    headImage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816682771&di=f44eee8cfbbfa7405e1b37f93c15d4a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201211%2F11%2F20121111152729_vLh8t.thumb.700_0.jpeg',
    name:'WPY',
    identity:'iOS Developer',
    denName:'JunCai\'s Den',
    denUrl:'http://localhost:8080/home/PageList',
    summary:'Peng Yu Wang is a professional developer who focuses on iOS now. He has strong knowledge of Swift, Objective-C . With these skills, he created quite a few widely used applications and frameworks.',
    interests:[
        'Mobile Development',
        'Object-C Programming',
        'Swift Programming',
        'Open Source Software',
    ],
    education:[
        {
            degree:'B.CS in Computer Science and Technology',
            school:'Zhongyuan University of Technology'
        }
    ],

};

var projects = [{name:'Louvre',iconUrl:'https://upload-images.jianshu.io/upload_images/2605277-b0460d5e5eb6749f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',url:'https://www.imguider.com/#page1',desc:'ImGuider导游讲解系列的一款专注于罗浮宫讲解的App，有很多罗浮宫官导的精彩解说。'},
    {name:'ImGuider-X',iconUrl:'https://upload-images.jianshu.io/upload_images/2605277-82b675a6f3c198d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',url:'https://www.imguider.com/#page1',desc:'一款高端的出游工具，行程内容随时看，精彩讲解随时听，便捷出游的同时记录您的一次次美好。'},
    {name:'ImGuider',iconUrl:'https://upload-images.jianshu.io/upload_images/2605277-b7257de051231612.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',url:'https://www.imguider.com/#page1',desc:'一款致力于深度自由行的华语导游讲解App，很多深居欧洲多年的殿堂级导游亲自出马，讲解深度历史，奇闻趣事，带你玩懂世界。'},
    {name:'WPYPlayer',iconUrl:'https://upload-images.jianshu.io/upload_images/2605277-72764232d5174dfa.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',url:'https://github.com/tengwangjuncai/WPYPlayer',desc:'基于AVPlayer 自定义的一个高度灵活的音频播放器。是一个在音频播放方面比较全面成熟的播放器有object-C 和 Swift 两个版本'},
    {name:'WPYCamera',iconUrl:'https://upload-images.jianshu.io/upload_images/2605277-d0e0f0aebca7cab3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',url:'https://github.com/tengwangjuncai/WPYCamera',desc:'一个高度自定义的照相机和视频拍摄的app，类似于抖音拍摄剪辑功能。'},
    {name:'WPYAnimation-swift',iconUrl:'https://upload-images.jianshu.io/upload_images/2605277-dc35ff441bb42045.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',url:'https://github.com/tengwangjuncai/MyImGuider',desc:'一款专注于动画和特殊效果设计创作，收集，组合的App。把一功能需求赋予了自我的特殊设计思维'}
    ];


var experiences = [];


var contacts = [];





module.exports = {

    'GET /api/resume': async(ctx) => {

        let sql = 'select * from project'
        const res = await pool.query(sql);
        // console.error(JSON.stringify(res[0]))

        let resume = {
                userInfor:userInfor,
                projects:res[0],
                experiences:experiences,
                contacts:contacts
        };
        ctx.rest(resume)
    }
}