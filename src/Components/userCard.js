import React, { Component } from 'react'

import COLORS from '../utils/colors'
import { card as cardStyle } from '../utils/styles'

const Detail = ({ label, data }) => (
  <div style={{ fontSize: '.8rem' }}>
    <label style={{ color: COLORS.lightColor, paddingRight: '.25rem' }}>{label} :</label>
    <span>{data}</span>
  </div>
)

const AccessToken = ({ token }) => {
  const codeStyle = {
    fontFamily: 'monospace',
    wordWrap: 'break-word',
    margin: '.5em 0',
    padding: '.5em',
    fontSize: '85%',
    backgroundColor: 'rgba(27,31,35,0.05)',
    borderRadius: '3px'
  }

  return (
    <div style={{ fontSize: '.8rem' }}>
      <label style={{ color: COLORS.lightColor, paddingRight: '.25rem' }}>Access token :</label>
      <div style={codeStyle}>{token}</div>
    </div>
  )
}

export default class UserCard extends Component {

  render () {
    const { user: { id, email, accessToken, profilePicURL, name }, logout } = this.props

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'left'
      },
      avatar: {
        background: COLORS.background,
        boxShadow: '0 0 12px rgba(0,0,0,0.5)',
        border: `5px solid ${COLORS.white}`,
        borderRadius: '50%',
        height: '7em',
        width: '7em',
        zIndex: '1'
      },
      content: {
        ...cardStyle,
        marginTop: '-.75rem'
      },
      dataContainer: {
        padding: '1.5rem 2rem'
      },
      id: {
        fontSize: '.5rem',
        margin: '-.2rem 0'
      },
      name: {
        fontSize: '1.5rem',
        marginBottom: '.5rem'
      },
      button: {
        color: COLORS.red,
        border: 'none',
        width: '100%',
        padding: '.5rem',
        fontSize: '1em',
        textTransform: 'uppercase'
      }
    }

    const avatar = profilePicURL ||
      'https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png'

    return (
      <div style={styles.container}>
        <img style={styles.avatar} src={avatar} alt='avatar' />
        <div style={styles.content}>
          <div style={styles.dataContainer}>
            <div style={styles.id}>ID {id}</div>
            <div style={styles.name}>{name}</div>
            <Detail label='이메일' data={email} />
            <AccessToken token={accessToken} />
          </div>
          <button style={styles.button} onClick={logout}>Logout</button>
        </div>
      </div>
    )
  }
}
