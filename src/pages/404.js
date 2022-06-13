import * as React from "react"
import { Link } from "gatsby"
import * as cUniUX from 'cuniux'; 


const Page = () => {
  return (
    <body>
    <main className={cUniUX.styles.page}>
      <cUniUX.TopBar pageName={'Home'}/>
      <title>Error 404</title>
      <br></br>
        <h1 className={cUniUX.styles.bigPageHeader} style={{textAlign: 'left'}}><span style={{color: 'rgb(233, 233, 233)'}}>Error 404</span><br/>Sorry, that page doesn't exist.</h1>

        <p className={cUniUX.styles.minorText}>Let's get you back on track. How about these?</p><br/><br/>
        <cUniUX.Button type='primary' text='Return to the Circel homepage' onClick={function(){window.open('/', '_self')}}/>

        <cUniUX.SecondaryButton text='Visit Circel Support' onClick={function(){window.open('/help', '_self')}}/>
    </main>
    </body>
  )
}

export default Page
