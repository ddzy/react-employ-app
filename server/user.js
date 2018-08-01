const express = require('express');
const Router = express.Router();
const models = require('./model');
const utils = require('./utils');
// 引入用户模型
const User = models.getModel('user');
const Chat = models.getModel('chat');
const md5 = utils.md5Pwd;

const _filter = { pwd: 0, '__v': 0 };


/**
 * 用户相关路由
 */
Router.get('/list', (req, res) => {
  const { type } = req.query;
  // User.remove({}, (e, d) => {});

  User.find({ type }, _filter, (err, doc) => {
    return res.json({ code: 0, data: doc });
  });
});


/* 注册 */
Router.post('/register', (req, res) => {
  // 接收传递post的参数
  const { user, pwd, type } = req.body;
  // 防止用户名重复
  User.findOne({ user }, (err, data) => {
    if (data) {
      return res.json({ code: 1, msg: '用户名已存在!' });
    }

    const finalPwd = md5(pwd);
    const userModel = new User({ user, type, pwd: finalPwd });

    userModel.save((err, data) => {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了!' });
      }
      const { user, type, _id } = data;
      // 写入 cookie
      res.cookie('userid', _id);
      return res.json({ code: 0, data: { user, type, _id } }); 
    });

  });
});


/* 登录 */
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body;
  const finalPwd = md5(pwd);

  // 不显示密码
  User.findOne({ user, pwd: finalPwd }, _filter, (err, data) => {
    if (!data){
      return res.json({ code: 1, msg: '用户名或者密码错误!' });
    }
    // 存储到 cookie
    res.cookie('userid', data['_id']);

    return res.json({ code: 0, data });
  });
});


/* 登录成功获取数据, 检测cookie, authroute */
Router.get('/info', (req, res) => {
  // 获取cookie
  const { userid } = req.cookies;
  // 用户有没有 cookie, 没有则直接返回code:1
  if (!userid) {
    return res.json({ code: 1 });
  }

  User.findOne({_id: userid}, _filter, (err, data) => {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }else if (data) {
      return res.json({ code: 0, data });
    }
  });
  
});


/* boss信息完善 */
Router.post('/update', (req, res) => {
  // 获取cookie
  const { userid } = req.cookies;
  const body = req.body;

  if (!userid) {
    return res.json({ code: 1 });
  }

  User.findByIdAndUpdate(
    userid,
    body,
    { new: true, upsert: true },
    (err, doc) => {
      const final = {
        user: doc.user,
        type: doc.type,
        ...body,
      };

      return res.json({ code: 0, data: final });
    }
  );
});


/* 获取聊天信息列表 */
Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid;

  // 多表联查
  User.find({}, (err, doc) => {
    if(err) {
      return res.json({ code: 0, msg: '后端出错了!' });
    }
    const users = {};
    doc.forEach((value, index) => {
      users[value._id] = { name: value.user, avatar: value.avatar }
    });

    // 查询发给我的信息 or 我发出的信息
    Chat.find({ '$or': [{ from: user }, { to: user }] }, (err, data) => {
      if(!err) {
        return res.json({ code: 0, data: { fullData: data, users } });
      }
    });
  });
});


module.exports = Router;