import * as React from "react"
import { Link } from "gatsby"
import * as uniUX from '../components/uniux.js'


const Page = () => {
    return (
        <body>
            <uniUX.Main pageType={'website'} pageName={'Design'} content={
                <div>
                    <br></br><br /><br /><br /><br />
                    <h1 className={uniUX.styles.bigPageHeader} style={{ textAlign: 'left' }}><span style={{ color: 'rgb(233, 233, 233)' }}>Circel Design</span><br />
                        <span style={{ fontSize: '9vw' }}>Coming Soon</span>
                    </h1>

                    <p className={uniUX.styles.minorText}>Circel Design will be here soon, but in the meantime you can have a glimpse at
                        the future of UniUX by watching <strong>CIRCELR21.</strong>
                    </p><br /><br />
                </div>
            }>
            </uniUX.Main>
        </body>
    )
}

export default Page
