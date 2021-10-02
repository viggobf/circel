import * as React from "react"
import { Link } from "gatsby"
import * as uniUI from '../components/uniui.js'

// markup
const NotFoundPage = () => {
  return (
    <body>
    <main className={uniUI.styles.page}>
      <uniUI.TopBar pageName={'Home'}/>
      <title>Error 404</title>
      <br></br>
        <h1 className={uniUI.styles.bigPageHeader} style={{textAlign: 'left'}}><span style={{color: 'rgb(233, 233, 233)'}}>Error 404</span><br/>Sorry, that page doesn't exist.</h1>

        <p className={uniUI.styles.minorText}>Let's get you back on track. How about these?</p><br/><br/>
        <uniUI.PrimaryButton text='Return to the Circel homepage' clickFn={function(){window.open('/', '_self')}}/>

        <uniUI.SecondaryButton text='Visit Circel Support' clickFn={function(){window.open('/help', '_self')}}/>
    </main>
    </body>
  )
}

export default NotFoundPage
