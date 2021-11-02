import * as React from 'react'
import * as uniUX from '../components/uniux.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

const SignupPage = () => {
  return (
    <body>
    <uniUX.Main pageType={'semiApp'} pageName={'Sign up'} content={
      <div className={uniUX.styles.halvedPageGrid}>
      <div className={uniUX.styles.halvedPageHalf} style={{backgroundColor: 'white'}}>
      <br/><br/>
        <h1 className={uniUX.styles.bigPageHeader} style={{textAlign: 'left'}}>Sign up</h1>

        <input placeholder='Circel ID' style={{width:'30vw'}} type='email' id='loginPageEmail'/><br/><br/>

        <input placeholder='Password' style={{width:'30vw'}} type='password' id='loginPagePassword'/><br/><br/><br/>

        <uniUX.PrimaryButton text='Sign up' clickFn={function(){uniUX.logIn(document.getElementById('loginPageEmail').value, document.getElementById('loginPagePassword').value)}}/>

        <uniUX.SecondaryButton text='Log in instead' clickFn={function(){window.open('/login', '_self')}}/><br/><br/>

        <p className={uniUX.styles.minorText}>By continuing, you confirm you have read and agree to Circel's Terms.</p>
      </div>

      <div className={uniUX.styles.halvedPageHalfSignup1}>
      <br/><br/><br/><br/><br/>
        <h1 className={uniUX.styles.bigPageHeader} style={{fontSize: '2.5vw', color: 'white'}}>Sign up a different way</h1>

        <uniUX.SecondaryButton styles={{width: '25vw', textAlign: 'left', color: 'white'}} clickFn={function(){uniUX.logInGoogle()}} text={<p>&ensp;<FontAwesomeIcon icon={brandIcons.faGoogle}/>&emsp;Log in with Google&ensp;</p>}/><br/><br/>

        <uniUX.SecondaryButton styles={{width: '25vw', textAlign: 'left', color: 'white'}} clickFn={function(){uniUX.logInTwitter()}} text={<p>&ensp;<FontAwesomeIcon icon={brandIcons.faTwitter}/>&emsp;Log in with Twitter&ensp;</p>}/><br/><br/>
      </div>
        </div>
    }>
    </uniUX.Main>
    </body>
  )
}

export default SignupPage
