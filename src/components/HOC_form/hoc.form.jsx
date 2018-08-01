import * as React from 'react';



/**
 * 所有表单组件都默认带有 handleChange 方法
 * 传入一个组件, 新增 handleChange 方法
 * @param {Component} Comp 
 */
export default function HocForm(Comp) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        type: 'genius',
      };
    }

    handleChange = (key, value) => {
      this.setState({
        [key]: value,
      });
    };

    render() {
      return (
        <Comp 
          handleChange={this.handleChange}
          state = {this.state} 
          {...this.props} 
        />
      );
    }
  }
}