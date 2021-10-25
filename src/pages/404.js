import * as React from "react"
import { Link } from "gatsby"
import * as uniUX from '../components/uniux.js'

// markup
const NotFoundPage = () => {
  return (
    <body>
    <main className={uniUX.styles.page}>
      <uniUX.TopBar pageName={'Home'}/>
      <title>Error 404</title>
      <br></br>
        <h1 className={uniUX.styles.bigPageHeader} style={{textAlign: 'left'}}><span style={{color: 'rgb(233, 233, 233)'}}>Error 404</span><br/>Sorry, that page doesn't exist.</h1>

        <p className={uniUX.styles.minorText}>Let's get you back on track. How about these?</p><br/><br/>
        <uniUX.PrimaryButton text='Return to the Circel homepage' clickFn={function(){window.open('/', '_self')}}/>

        <uniUX.SecondaryButton text='Visit Circel Support' clickFn={function(){window.open('/help', '_self')}}/>
    </main>
    </body>
  )
}

export default NotFoundPage
