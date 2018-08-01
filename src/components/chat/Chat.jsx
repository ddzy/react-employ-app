import * as React from 'react';
import { Grid, List, InputItem, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { reduxHandleSendMsg, reduxHandleReceiveMsg, getMsgList, getChatId } from '../../redux/chat.redux';
import HeaderNav from '../header/HeaderNav';



/**
 * 聊天页面
 */
function mapStateToProps(state) {
  return {
    state,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleSendMsg,
    reduxHandleReceiveMsg,
    getMsgList,
    getChatId,
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps()
)
export default class Chat extends React.Component {
  static emoji = '😀 😃 😄 😁 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😛 😜 🤪 🤨 🧐 🤓 😎 🤩 😏 😒 😞 😔 😟 😕 🙁 ☹ ️😣 😖 😫 😩 👅 👈 😈 👿 🧦 👟 👞 👓 👠 👡 🐮 🐷 🐵 🐛 🐝 🦄 🦐 🐸 🦐 🦔 🌖 🌜 ☘ ️🌚 🌞 💦 🍭 ❤ ️🧡 💛 💚 💙 💜 🖤 💔';

  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  componentDidMount() {
    // 再次获取聊天信息列表
    if(!(this.props.state.chat.chatmsg.length)) {
      this.props.getMsgList();
      this.props.reduxHandleReceiveMsg();
    }
  }

  // 修正 跑马灯
  _fixCarousel = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  handleEveryEmojiClick = (value, index) => {
    const emoji = Chat.emoji.split(' ');
    this.setState((prevState) => {
      return {
        content: prevState.content + emoji[ index ],
      };
    });
  }

  handleEmojiClick = () => {
    this.setState((prevState) => {
      return {
        showEmoji: !prevState.showEmoji,
      };
    });
  }

  handleSubmit = () => {
    const from = this.props.state.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.content;

    this.props.reduxHandleSendMsg({
      from,
      to,
      msg,
    });
    this.setState({
      content: '',
      showEmoji: false,     
    });
  }

  render() {
    // 获取登录用户的 id
    const my_id = this.props.state.user._id;
    // 获取对方聊天id
    const chat_user = this.props.match.params.user;
    // 获取聊天的唯一id
    const chatid = this.props.getChatId(my_id, chat_user);
    // 聊天信息列表
    const chat_msg_list = this.props.state.chat.chatmsg || [];

    // 过滤后的列表, 只显示与特定用户的聊天记录
    const current_chat_msg_list = chat_msg_list.filter((value, index) => {
      return value.chatid === chatid;
    }); 

    // 用户id列表
    const chat_usersid_list = this.props.state.chat.users;
    const Item = List.Item;

    // 表情
    const emoji = Chat.emoji.split(' ').map((value, index) => {
      return { text: value };
    });

    if(!chat_usersid_list[chat_user]) {
      return <h3>您不是我们的用户!</h3>
    }
    return (
      <div id="chat-page">
        <HeaderNav text={chat_usersid_list[chat_user].name} />
        {
          current_chat_msg_list &&
            current_chat_msg_list.map((value, index) =>{
              const from = value.from;
              const avatarFromName = chat_usersid_list[from].avatar;
              const avatarToName = chat_usersid_list[chat_user].avatar;
              const avatarToImg = require(`../images/${avatarToName}.jpg`);
              const avatarFromImg = require(`../images/${avatarFromName}.jpg`);

              return value.to === chat_user
                ? (
                    <List key={index}> 
                      <Item
                        className="chat-me"
                        wrap="true"
                        extra={
                          <img src={avatarFromImg} alt="" />
                        }
                      >{value.content}</Item>
                    </List>
                  )
                : (
                    <List key={index}>
                      <Item
                        thumb={avatarToImg}
                        wrap="true"
                      >{value.content}</Item>
                    </List>
                  )
            })
        }
        <div className="stick-footer">
          <WingBlank>
            <List>
              <InputItem
                placeholder="请输入..."
                value={this.state.content}
                clear="true"
                onChange={v => {
                  this.setState({content: v})
                }}
                extra={
                  <div>
                    <span 
                    className="stick-footer-emoji"
                    onClick={() => {
                      this.handleEmojiClick();
                      this._fixCarousel();
                    }}
                    >😀</span>
                    <span 
                      className="stick-footer-send"
                      onClick={this.handleSubmit}
                    >发送</span>
                  </div>
                }
              >信息</InputItem>
            </List>
            {
              this.state.showEmoji
                && (<Grid 
                    data={emoji}
                    columnNum={9}
                    carouselMaxRow={4}
                    isCarousel="true"
                    onClick={(value, index) => {
                      this.handleEveryEmojiClick(value, index);
                    }}
                  />)
            }
          </WingBlank>
        </div>
      </div>
    );
  }
}

