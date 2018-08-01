const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/react-imploy-log');


/**
 * 模型
 *  user: 用户模型
 *  chat: 聊天模型
 */
const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    // 头像 ==> 判断用户是不是已经完善信息了
    avatar: { type: String, require: true },
    // 个人简介或者职位简介
    desc: { type: String },
    // 职位名
    title: { type: String },
    // 如果是 boss, 还有两个字段
    company: { type: String },
    money: { type: String },
  },
  chat: {
    chatid: { type: String, require: true },          // 聊天唯一标识
    read: { type: Boolean, default: false },    // 是否已读
    from: { type: String, require: true },    // 消息来源
    to: { type: String, require: true },       // 消息接收
    content: { type: String, require: true, default: '' }, // 聊天信息
    create_time: { type: Number, default: new Date().getTime() },        // 消息建立时间
  },
};

for (const key in models) {
  if (models.hasOwnProperty(key)) {
    const value = models[key];
    mongoose.model(key, new mongoose.Schema(value));
  }
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
};


