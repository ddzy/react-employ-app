import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';


/**
 * boss/牛人列表展示
 */
@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired,
  }

  // 卡片点击, 进入聊天页面
  handleCardClick = (user) => {
    this.props.history.push(`/chat/${user}`);
  }

  render () {
    const userlist = this.props.userlist;
    const [
      CardHeader,
      CardBody,
      CardFooter
    ] = [
      Card.Header,
      Card.Body,
      Card.Footer
    ];
    // 头像存在则渲染
    const cardItemArr = userlist.map((val, index) => {
      return (
        val.avatar
          && (
            <div key={index}>
              <WingBlank>
                <WhiteSpace size="md" />
                <Card 
                  onClick={() => {
                    this.handleCardClick(val._id)
                  }}
                >
                  <CardHeader
                    title={val.user}
                    thumb={require(`../images/${val.avatar}.jpg`)}
                    extra={<span>{val.title}</span>}
                  ></CardHeader>
                <CardBody>
                  {
                    val.desc.split('\n').map((v, idx) => (
                      <p key={idx}>{v}</p>
                    ))
                  }
                </CardBody>
                {
                  val.type === 'boss'
                    && (<CardFooter 
                      content = {`薪资: ${val.money}`}
                      extra={`公司: ${val.company}`}
                    />)
                }
              </Card>
              </WingBlank>
            </div>
          )
      );
    });

    return (
      <div>
        {cardItemArr}
      </div>
    );
  }
}


export default UserCard;