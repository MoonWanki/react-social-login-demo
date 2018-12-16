import React, { Component, Fragment } from 'react';
import SocialButton from './Components/socialButton';
import UserCard from './Components/userCard';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/themes/prism-okaidia.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.nodes = {}
  }

  state = {
    logged: false,
    user: {},
    currentProvider: '',
    jsx: 1
  }

  logout = () => {
    const { logged, currentProvider } = this.state;
    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  setNodeRef = (provider, node) => {
    if (node) {
      this.nodes[ provider ] = node
    }
  }

  onLoginSuccess = (user) => {
    this.setState({
      logged: true,
      currentProvider: user.provider,
      user
    })
  }

  onLoginFailure = (err) => {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutSuccess = () => {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutFailure = (err) => {
    console.error(err)
  }

  render() {
    Prism.highlightAll();
    return (
      <Fragment>
        <div className="App">
        {this.state.logged ?
         <UserCard user={this.state.user} logout={this.logout} />
        :
        <Fragment> 
          <SocialButton
            provider='kakao'
            appId='5cb0d5bd54536f37fc23b7bb8744ea16'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'kakao')}
          >
            <div style={{ background: 'gold', textAlign: 'center', padding: '20px 40px' }}>
              <b>Login with Kakao</b>
            </div>
          </SocialButton>
          <pre><code className="language-jsx">{`
  // kakao는 Redirect URL이 필요하지 않아요!
  <SocialButton
    provider='kakao'
    appId='5cb0d5bd54536f37fc23b7bb8744ea16'
    onLoginSuccess={this.onLoginSuccess}
    onLoginFailure={this.onLoginFailure}
    onLogoutSuccess={this.onLogoutSuccess}
  >
    <div style={{ background: 'gold', textAlign: 'center', padding: '20px 40px' }}>
      <b>Login with Kakao</b>
    </div>
  </SocialButton>
          `}
          </code></pre>
          <br/><br/>
          <SocialButton
            provider='naver'
            appId='dyVigYWN6Omwus7nNgrv'
            redirect='https://opensw.octopusfantasy.com'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'naver')}
          />
          <pre><code className="language-jsx">{`
  // 네이버 로그인 버튼 이미지는 SDK로부터 자체 제공됩니다.
  // 본 웹사이트는 '네이버 아이디로 로그인' 검수를 거치지 않았기 때문에 개발자만 로그인 가능한 상태입니다.
  <SocialButton
    provider='naver'
    appId='Wzrp65CQcHLALXh8OiIw'
    redirect='https://opensw.octopusfantasy.com'
    onLoginSuccess={this.onLoginSuccess}
    onLoginFailure={this.onLoginFailure}
    onLogoutSuccess={this.onLogoutSuccess}
  />
          `}
          </code></pre>
          <br/><br/>
          <SocialButton
            provider='snapchat'
            appId='951d3917-3aa7-4563-bf47-c2106dca2ca3'
            redirect='https://opensw.octopusfantasy.com'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            onLogoutFailure={this.onLogoutFailure}
            getInstance={this.setNodeRef.bind(this, 'snapchat')}
          />
            <pre><code className="language-jsx">{`
  // Snapchat 로그인 버튼 이미지는 SDK로부터 자체 제공됩니다.
  <SocialButton
    provider='snapchat'
    appId='951d3917-3aa7-4563-bf47-c2106dca2ca3'
    redirect='https://opensw.octopusfantasy.com'
    onLoginSuccess={this.onLoginSuccess}
    onLoginFailure={this.onLoginFailure}
    onLogoutSuccess={this.onLogoutSuccess}
    onLogoutFailure={this.onLogoutFailure}
  />
            `}
            </code></pre>
            <br/><br/>
          <SocialButton
            provider='yahoo'
            appId='dj0yJmk9dk5hTTQ2cjdmdkthJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWEy'
            redirect='https://opensw.octopusfantasy.com'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            onLogoutFailure={this.onLogoutFailure}
            getInstance={this.setNodeRef.bind(this, 'yahoo')}
          >
            <div style={{ background: 'purple', textAlign: 'center', color: 'white', padding: '20px 40px' }}>
              <b>Login with YAHOO!</b>
            </div>
          </SocialButton>
            <pre><code className="language-jsx">{`
  <SocialButton
    provider='yahoo'
    appId='dj0yJmk9dk5hTTQ2cjdmdkthJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWEy'
    redirect='https://opensw.octopusfantasy.com'
    onLoginSuccess={this.onLoginSuccess}
    onLoginFailure={this.onLoginFailure}
    onLogoutSuccess={this.onLogoutSuccess}
    onLogoutFailure={this.onLogoutFailure}
  >
    <div style={{ background: 'purple', textAlign: 'center', color: 'white', padding: '20px 40px' }}>
      <b>Login with YAHOO!</b>
    </div>
  </SocialButton>
            `}
            </code></pre>
            <br/><br/>
          </Fragment>
          }
        </div>
      </Fragment>
   );
  }
}

export default App;
