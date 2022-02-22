// 导入express创建服务器
const express = require('express')
const app = express()
// const cros = require('cors')

// 配置express-session中间件
const session = require('express-session')
app.use(session({
    secret: 'itheima',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('./pages'))

// 要解析表单数据，必须先注册url-encoded中间件
app.use(express.urlencoded({extended: false}))

// app.use(cros())
// login的接口
app.post('/api/login', (req, res)=>{
    if(req.body.username !== 'admin' || req.body.password !== '000000'){
        return res.send({status: 1, msg: '登陆失败'})
    }
    // login成功后将信息保存到session
    req.session.user = req.body
    req.session.islogin = true
    res.send({status: 0, msg:'登录成功'})
})

app.get('/api/username', (req, res)=>{
    // 从session中获取登录状态
    if(!req.session.islogin){
        return res.send({status: 1, message: 'login fail'})
    }
    res.send({
        status: 0,
        msg: 'login success',
        username: req.session.user.username
    })
})

// 退出登录，清空session
app.post('/api/logout', (req, res)=>{
    req.session.destroy()
    res.send({
        status: 0,
        msg: 'logout success'
    })
})


// 启动服务器
app.listen(80, ()=>{
    console.log('Express running at 127.0.0.1');
})

/*
整个网页流程：
1.导入express创建服务器app
2.app.listen()启动服务器
3.app.use()注册中间件，如url-encoded(),cors()
4.自定义路由模块，router=express.Router()
5.根据router.get/post编写访问接口
6.注册路由app.use(router)
7.在html中利用$.post/get请求路由，得到之前路由中的res信息判断
*/