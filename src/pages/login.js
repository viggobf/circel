import * as React from 'react'
import ReactDom from 'react-dom'
import * as ReactSpring from 'react-spring'
import * as uniUX from '../components/uniux.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

const Page = () => {
  return (
    <body>
      <uniUX.Main pageType={'semiApp'} pageName={'Log in'} content={
        <div className={uniUX.styles.halvedPageGrid}>
          <div className={uniUX.styles.halvedPageHalf}>
            <br /><br />
            <h1 className={uniUX.styles.bigPageHeader} style={{ textAlign: 'left' }}>Log in</h1>

            <input placeholder='Circel ID' style={{ width: '30vw' }} type='email' id='loginPageEmail' /><br /><br />

            <input placeholder='Password' style={{ width: '30vw' }} type='password' id='loginPagePassword' /><br /><br /><br />

            <uniUX.PrimaryButton text='Log in' clickFn={function () {
              uniUX.logIn(document.getElementById('loginPageEmail').value, document.getElementById('loginPagePassword').value).then(function (result) {
                if (result == 'success') {
                  window.open(window.location.href.split('=')[1], '_self')
                } else {
                  console.log(result)
                  if (result == 'auth/invalid-email') {
                    ReactDom.render(<span>That Circel ID doesn't match any Circel account.</span>, document.getElementById('errorRenderSpace'))
                  } else if (result == 'auth/wrong-password') {
                    ReactDom.render(<span>That password doesn't match your Circel ID - please try again.</span>, document.getElementById('errorRenderSpace'))
                  } else if (result == 'auth/user-disabled') {
                    ReactDom.render(<span>This Circel account has been disabled.</span>, document.getElementById('errorRenderSpace'))
                  } else {
                    ReactDom.render(<span>An error occurred (<code>{result.split('/')[1]}</code>)</span>, document.getElementById('errorRenderSpace'))
                  }
                }
              })
            }} />

            <uniUX.SecondaryButton text='Sign up instead' clickFn={function () { window.open('/signup?next=' + window.location.href.split('=')[1], '_self') }} />
            <br /><br />
            
            {/* password reset button */}
            <span id='resetPasswordBtn' style={{cursor: 'pointer'}} className={uniUX.styles.minorText} onClick={function(){
              ReactDom.render(<span>Loading...</span>, document.getElementById('resetPasswordBtn'))
              uniUX.resetPasswordEmail(document.getElementById('loginPageEmail').value).then(function(result){
                if(result == 'success'){  
                  ReactDom.render(<span>Password reset link sent to <em>{document.getElementById('loginPageEmail').value}</em>. Click to send again.</span>, document.getElementById('resetPasswordBtn'))
                } else {
                  ReactDom.render(<span>Password reset link couldn't be sent. Click to try again.</span>, document.getElementById('resetPasswordBtn'))
                }
              })
            }}>Forgot Password</span>
            <br/><br/>

            {/* place where errors are rendered */}
            <span id='errorRenderSpace' className={uniUX.styles.minorText} style={{ color: 'var(--red)' }}></span>
            
          </div>

          <div className={uniUX.styles.halvedPageHalfSignup1}>
            <br /><br /><br /><br /><br />
            <h1 className={uniUX.styles.bigPageHeader} style={{ fontSize: 'max(2.5vw, 30px)', color: 'white' }}>Log in a different way</h1>

            <uniUX.SecondaryButton styles={{ width: '25vw', textAlign: 'left', color: 'white' }} clickFn={function () { 
              uniUX.logInGoogle().then(function (result) {
                if (result == 'success') {
                  window.open(window.location.href.split('=')[1], '_self')
                } else {
                  console.log(result)
                  if (result == 'auth/popup-blocked') {
                    ReactDom.render(<span>You need to allow the popup to log in with Google.</span>, document.getElementById('errorRenderSpace'))
                  } else if (result == 'auth/wrong-password') {
                    ReactDom.render(<span>That password doesn't match your Circel ID - please try again.</span>, document.getElementById('errorRenderSpace'))
                  } else if (result == 'auth/user-disabled') {
                    ReactDom.render(<span>This Circel account has been disabled.</span>, document.getElementById('errorRenderSpace'))
                  } else {
                    ReactDom.render(<span>An error occurred (<code>{result.split('/')[1]}</code>)</span>, document.getElementById('errorRenderSpace'))
                  }
                }
              })
             }} text={<span>&ensp;<FontAwesomeIcon icon={brandIcons.faGoogle} />&emsp;Log in with Google&ensp;</span>} /><br /><br />

            <uniUX.SecondaryButton styles={{ width: '25vw', textAlign: 'left', color: 'white' }} clickFn={function () { 
              uniUX.logInTwitter().then(function (result) {
                if (result == 'success') {
                  window.open(window.location.href.split('=')[1], '_self')
                } else {
                  console.log(result)
                  if (result == 'auth/popup-blocked') {
                    ReactDom.render(<span>You need to allow the popup to log in with Twitter.</span>, document.getElementById('errorRenderSpace'))
                  } else if (result == 'auth/wrong-password') {
                    ReactDom.render(<span>That password doesn't match your Circel ID - please try again.</span>, document.getElementById('errorRenderSpace'))
                  } else if (result == 'auth/user-disabled') {
                    ReactDom.render(<span>This Circel account has been disabled.</span>, document.getElementById('errorRenderSpace'))
                  } else {
                    ReactDom.render(<span>An error occurred (<code>{result.split('/')[1]}</code>)</span>, document.getElementById('errorRenderSpace'))
                  }
                }
              })
             }} text={<span>&ensp;<FontAwesomeIcon icon={brandIcons.faTwitter} />&emsp;Log in with Twitter&ensp;</span>} /><br /><br />
          </div>
        </div>
      }>
      </uniUX.Main>
    </body>
  )
}

export default Page
