import Promise from 'bluebird'

const load = ({ appId, redirect }) => new Promise((resolve, reject) => {
  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  js.src = `//developers.kakao.com/sdk/js/kakao.min.js`

  js.onload = () => {
    window.Kakao.init(appId)
    return resolve()
    // window.Kakao.Auth.createLoginButton({
    //   container: '#kakao-login-btn',
    //   success: function (authObj) {
    //     console.log(authObj)
    //     return resolve()
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //     return reject(err)
    //   }
    // })
  }

  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

const login = () => new Promise((resolve, reject) => {
  window.Kakao.Auth.login({
    success: function (authObj) {
      console.log(authObj)
      // window.Kakao.Auth.setAccessToken(authObj.access_token)
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: function (res) {
          console.log(res)
          return resolve({ ...authObj, ...res })
        },
        fail: function (error) {
          console.log(error)
          return reject(error)
        }
      })
    },
    fail: function (err) {
      console.log(err)
      return reject(err)
    }
  })
})

const generateUser = ({ access_token, id, properties }) => {
  return {
      id: id,
      name: properties.nickname,
      profilePicURL: properties.profile_image,
      accessToken: access_token,
  }
}

const logout = () => new Promise((resolve, reject) => {
  window.Kakao.Auth.logout(() => resolve())
})

export default {
  load,
  generateUser,
  login,
  logout
}
