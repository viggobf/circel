import * as React from 'react'
import * as uniUX from '../components/uniux.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

const Page = () => {
  return (
    <body>
    <uniUX.Main appPage={true} pageName={'Log in'} content={
      <div className={uniUX.styles.halvedPageGrid}>
        <div className={uniUX.styles.halvedPageHalf}>
        <br/><br/>
        <h1 className={uniUX.styles.bigPageHeader} style={{textAlign: 'left'}}>Log in</h1>

        <input placeholder='Circel ID' style={{width:'30vw'}} type='email' id='loginPageEmail'/><br/><br/>

        <input placeholder='Password' style={{width:'30vw'}} type='password' id='loginPagePassword'/><br/><br/><br/>

        <uniUX.PrimaryButton text='Log in' clickFn={function(){uniUX.logIn(document.getElementById('loginPageEmail').value, document.getElementById('loginPagePassword').value)}}/>

        <uniUX.SecondaryButton text='Sign up instead' clickFn={function(){window.open('/signup', '_self')}}/>
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

export default Page
