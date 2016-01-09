define(function(require, exports, module) {
//API模块
    var apiBase = {};

    apiBase.baseAPI = function (url) {
        return url = 'http://bzbl.com/index.php';
        // return url='http://192.168.0.60/index.php';
        //return url='http://bzl.fzbm.com/index.php';
    };

    return {
        baseHref: apiBase.baseAPI(),
        //首页宅推荐加载更多
        indexHome: apiBase.baseAPI() + '/home/interfaces/scrollLand',
        //首页搜索
        searchApi: apiBase.baseAPI() + '/home/interfaces/search',
        //活动评论
        commentActive: apiBase.baseAPI() + '/home/interfaces/commentActive',
        //活动报名
        activeApply: apiBase.baseAPI() + '/home/interfaces/joinactive',
        //用户退出
        outUser: apiBase.baseAPI() + '/home/interfaces/logout',
        //评论公告
        commentPub: apiBase.baseAPI() + '/home/interfaces/commentPub',
        //宅动态评论
        fdetail: apiBase.baseAPI() + '/home/interfaces/commentFeed',
        //私信发送
        sendmsg: apiBase.baseAPI() + '/home/interfaces/sendmsg',
        //退出该宅
        outland: apiBase.baseAPI() + '/home/interfaces/outland',
        //踢出宅用户
        removeJoin: apiBase.baseAPI() + '/home/interfaces/removeJoin',
        //删除宅动态 参数feed_id
        delfeed: apiBase.baseAPI() + '/home/interfaces/delfeed',
        //删除自己的宅动态
        delFeedByUser: apiBase.baseAPI() + '/home/interfaces/delFeedByUser',
        //宅动态加载更多
        getLandFeeds: apiBase.baseAPI() + '/home/interfaces/getLandFeeds',
        //活动详情页滚动加载更多
        getActiveCommentList: apiBase.baseAPI() + '/home/interfaces/getActiveCommentList',
        //宅动态滚动加载更多
        getFeedCommentList: apiBase.baseAPI() + '/home/interfaces/getFeedCommentList',
        //宅公告滚动加载更多
        getPubList: apiBase.baseAPI() + '/home/interfaces/getPubList',
        login: function () {
            return apiBase.baseAPI() + '/home/interfaces/login';
        }
        , reg: {
            smsCode: apiBase.baseAPI() + '/home/interfaces/smscode',
            smsValide: apiBase.baseAPI() + '/home/interfaces/regcodeValide',
            savePwd: apiBase.baseAPI() + '/home/interfaces/reg',
            resetPwd: apiBase.baseAPI() + '/home/interfaces/resetPwd',
            smsCodeFindPwd: apiBase.baseAPI() + '/home/interfaces/smscodetype',
            updatePhone: apiBase.baseAPI() + '/home/interfaces/updatePhone'
        }
        , user: {
            setDetail: apiBase.baseAPI() + '/home/interfaces/setUserDetail',
            updateDetail: apiBase.baseAPI() + '/home/interfaces/updateUserDetail',
        }
        , home: function () {
            return apiBase.baseAPI();
        }
        , urls: {
            setDetail: apiBase.baseAPI() + '/home/index/setdetail',
            login: apiBase.baseAPI() + '/home/index/login',
            land: apiBase.baseAPI() + '/home/land/index',
            medalList: apiBase.baseAPI() + '/home/medal/land'

        },
        // 动态发布
        situation: {
            publish: apiBase.baseAPI() + '/home/interfaces/pubFeed'
        },

        medalAsk: apiBase.baseAPI() + '/home/interfaces/medalAsk',
        unjoin: apiBase.baseAPI() + '/home/interfaces/join',
        outland: apiBase.baseAPI() + '/home/interfaces/outland',

        qiniuConfig: apiBase.baseAPI() + "/home/qiniu/getconfig",

        newMsg: apiBase.baseAPI() + "/home/interfaces/newmsg"
    };
});
