import React, { Component } from 'react';

import SocialLogin from '../react-social-login';

class Button extends Component {

  render () {
    const { children, triggerLogin, triggerLogout, ...props } = this.props
    const style = {
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px',
    }

    return (
      <div onClick={triggerLogin} style={style} {...props}>
        { children }
      </div>
    )
  }
}

export default SocialLogin(Button)
