import * as React from 'react'
import * as uniUI from '../components/uniui.js'
import * as firebaseSetup from '../components/firebasesetup.js'

const IndexPage = () => {
  return (
    <body>
    <uniUI.Main appPage={false} pageName={'Home'} content={
      <div>
        <div className={uniUI.styles.homepageWorkspaceCard}>
          <h1 style={uniUI.welcomeHeadingStyles}><span style={{color: 'rgb(109, 109, 109)'}}>Introducing</span><br/><span style={uniUI.circelWorkspaceTitleStyles}>Circel Workspace</span></h1>
          <p className={uniUI.styles.minorText}>Proper productivity for business and beyond. Free for everyone.</p><br/><br/>
          <uniUI.PrimaryButton text='Get started' clickFn={function(){window.open('/signup', '_self')}}/>
          <uniUI.SecondaryButton text='Learn more' clickFn={function(){window.open('/workspace', '_self')}}/>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>

        <h1 style={uniUI.welcomeHeadingStyles}>Welcome to Circel</h1>

        <div style={{height: 1000}}></div>
      </div>
    }id='main'>
    </uniUI.Main>
    </body>
  )
}

export default IndexPage
