import * as React from 'react'
import * as uniUX from '../components/uniux.js'
import * as firebaseSetup from '../components/firebasesetup.js'

const IndexPage = () => {
  return (
    <body>
    <uniUX.Main appPage={false} pageName={'Home'} content={
      <div>
        <div className={uniUX.styles.homepageWorkspaceCard}>
          <h1 style={uniUX.welcomeHeadingStyles}><span style={{color: 'rgb(109, 109, 109)'}}>Introducing</span><br/><span style={uniUX.circelWorkspaceTitleStyles}>Circel Workspace</span></h1>
          <p className={uniUX.styles.minorText}>Proper productivity for business and beyond. Free for everyone.</p><br/><br/>
          <uniUX.PrimaryButton text='Get started' clickFn={function(){window.open('/signup', '_self')}}/>
          <uniUX.SecondaryButton text='Learn more' clickFn={function(){window.open('/workspace', '_self')}}/>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>

        <h1 style={uniUX.welcomeHeadingStyles}>Welcome to Circel</h1>

        <div style={{height: 1000}}></div>
      </div>
    }>
    </uniUX.Main>
    </body>
  )
}

export default IndexPage
