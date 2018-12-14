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
      currentProvider: user._provider,
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
            redirect='http://localhost:3000'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'kakao')}
          >
            Login with Kakao
          </SocialButton>
          <pre><code className="language-jsx">{`
          <SocialButton
            provider='kakao'
            appId='5cb0d5bd54536f37fc23b7bb8744ea16'
            redirect='http://localhost:3000'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'kakao')}
          />
          `}
          </code></pre>
          <SocialButton
            autoCleanUri
            provider='naver'
            appId='Wzrp65CQcHLALXh8OiIw'
            // secretid='Mfx_1boen3'
            redirect='https://localhost:8080'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            onLogoutFailure={this.onLogoutFailure}
            getInstance={this.setNodeRef.bind(this, 'naver')}
          />
          <pre><code className="language-jsx">{`
          <SocialButton
            provider='naver'
            appId='Wzrp65CQcHLALXh8OiIw'
            redirect='https://localhost:8080'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            onLogoutFailure={this.onLogoutFailure}
            getInstance={this.setNodeRef.bind(this, 'naver')}
          />
          `}
          </code></pre>

          <SocialButton
            provider='snapchat'
            appId='951d3917-3aa7-4563-bf47-c2106dca2ca3'
            redirect='https://localhost:8080'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            onLogoutFailure={this.onLogoutFailure}
            getInstance={this.setNodeRef.bind(this, 'snapchat')}
          />
            <pre><code className="language-jsx">{`
            <SocialButton
              provider='snapchat'
              appId='951d3917-3aa7-4563-bf47-c2106dca2ca3'
              redirect='https://localhost:8080'
              onLoginSuccess={this.onLoginSuccess}
              onLoginFailure={this.onLoginFailure}
              onLogoutSuccess={this.onLogoutSuccess}
              onLogoutFailure={this.onLogoutFailure}
              getInstance={this.setNodeRef.bind(this, 'snapchat')}
            />
            `}
            </code></pre>

          <SocialButton
            provider='yahoo'
            appId='dj0yJmk9Tmx2Q3RIVGhUQkZZJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTMw'
            redirect='https://deepakaggarwal7.github.io/'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            onLogoutFailure={this.onLogoutFailure}
            getInstance={this.setNodeRef.bind(this, 'yahoo')}
          >
            Login with Yahoo
          </SocialButton>
            <pre><code className="language-jsx">{`
              <SocialButton
              provider='yahoo'
              appId='dj0yJmk9Tmx2Q3RIVGhUQkZZJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTMw'
              redirect='https://deepakaggarwal7.github.io/'
              onLoginSuccess={this.onLoginSuccess}
              onLoginFailure={this.onLoginFailure}
              onLogoutSuccess={this.onLogoutSuccess}
              onLogoutFailure={this.onLogoutFailure}
              getInstance={this.setNodeRef.bind(this, 'yahoo')}
            >
              Login with Yahoo
            </SocialButton>
            `}
            </code></pre>
          </Fragment>
          }
        </div>
      </Fragment>
   );
  }
}

export default App;
