import * as React from 'react'
import * as uniUI from '../components/uniui.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

const IndexPage = () => {
  return (
    <body>
    <uniUI.Main appPage={true} pageName={'Log in'} content={
      <div>
      <br/>
        <h1 className={uniUI.styles.bigPageHeader} style={{textAlign: 'left'}}>Log in</h1>

        <input placeholder='Circel ID' style={{width:400}} type='email' id='loginPageEmail'/><br/><br/>

        <input placeholder='Password' style={{width:400}} type='password' id='loginPagePassword'/><br/><br/><br/>

        <uniUI.PrimaryButton text='Log in' clickFn={function(){uniUI.logIn(document.getElementById('loginPageEmail').value, document.getElementById('loginPagePassword').value)}}/>

        <uniUI.SecondaryButton text='Sign up instead'/>


        <div className={uniUI.styles.pageCard} style={{left: '60vw', top: '20vh', width: '30vw', height: 'fit-content'}}>
          <h1 className={uniUI.styles.bigPageHeader} style={{fontSize: '2.5vw'}}>Log in a different way</h1>
          <uniUI.SecondaryButton styles={{width: 300}} clickFn={function(){uniUI.logInGoogle()}} text={<p>&ensp;<FontAwesomeIcon icon={brandIcons.faGoogle}/>&emsp;Log in with Google&ensp;</p>}/><br/><br/>
          <uniUI.SecondaryButton styles={{width: 300}} clickFn={function(){uniUI.logInTwitter()}} text={<p>&ensp;<FontAwesomeIcon icon={brandIcons.faTwitter}/>&emsp;Log in with Twitter&ensp;</p>}/><br/><br/>
          <p class={uniUI.styles.minorText}>Only essential data from Twitter and Google is used.<br/><br/> <Link to='/privacy' class={uniUI.styles.topBarLink}>Privacy at Circel {'->'}</Link></p>
        </div>
        </div>
    }id='main'>
    </uniUI.Main>
    </body>
  )
}

export default IndexPage
