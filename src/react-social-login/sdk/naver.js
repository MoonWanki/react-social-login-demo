import Promise from 'bluebird'

let naverLogin;

const load = ({ appId, redirect }) => new Promise((resolve, reject) => {
  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  js.src = `https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js`

  js.onload = () => {
    naverLogin = new window.naver.LoginWithNaverId({
      clientId: appId,
      callbackUrl: redirect,
      isPopup: false,
      state: 'state',
      loginButton: {color: 'green', type: 3, height: 60}
    })
    naverLogin.init()
    naverLogin.getLoginStatus(function (status) {
      if (status) {
        return resolve(naverLogin.accessToken.accessToken);
      } else {
        return resolve()
      }
    })
  }
  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

/**
 * Check if user is logged in to app through GitHub.
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/#redirect-urls
 */
const checkLogin = () => new Promise((resolve, reject) => {
  naverLogin.getLoginStatus(function (status) {
    if (status) {
      return resolve(naverLogin.user);
    } else {
      return reject()
    }
  })
})

const login = () => new Promise((resolve, reject) => {
  return checkLogin().then(window.location.reload, reject);
})

const generateUser = ({ email, id, name, profile_image }) => {
  return {
      accessToken: naverLogin.accessToken.accessToken,
      id,
      name,
      profilePicURL: profile_image,
      email,
  }
}

const logout = () => new Promise((resolve, reject) => {
  naverLogin.logout();
  setTimeout(() => {
    window.location.href = '/';
  }, 500)
})

export default {
  checkLogin,
  generateUser,
  load,
  logout,
  login
}
