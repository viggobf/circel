import * as React from "react"
import { Link } from "gatsby"
import * as uniUX from 'uniux'


const Page = () => {
    return (
        <body>
            <uniUX.Main pageType={'website'} pageName={'Design'} content={
                <div>
                    <br/><br/><br/><br/><br/><br/><br/>
                    <h1 style={uniUX.welcomeHeadingStyles}><span style={{color: 'rgb(109, 109, 109)'}}>Introducing UniUX 3</span><br/><span style={{fontSize: '9vw', color: 'var(--red)'}}>Beauty meets Power</span></h1>
                    <p className={uniUX.styles.minorText}>Meet UniUX 3, a powerful, beautiful and unified user experience.</p><br/><br/>

                    <br/><br/><br/><br/>
                    <h1 className={uniUX.styles.bigPageHeader} style={{ textAlign: 'left' }}><span style={{ color: 'rgb(233, 233, 233)' }}>In three words?</span><br />
                        <span style={{ fontSize: '6vw' }}>Powerful. Beautiful. Unified.</span>
                    </h1>
                    <p className={uniUX.styles.minorText}>
                        We build our apps on UniUX, not the other way round. It's not an afterthought: our user experience means a lot
                        to us, so we want to make it shine and be easy to learn and remember.
                    </p><br/><br/>

                    <span className={uniUX.styles.pageTileRow}>
                        <uniUX.SmallCard name='Powerful' styles={{background: 'linear-gradient(5deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 70%)'}} content={<span>
                        <p className={uniUX.styles.minorText}>
                        UniUX 3 is built on ReactJS, opening new doors for speed, power and functionality.<br/><br/>
                        And now, that power is automatically there from the roots up with UniUX.<br/><br/>
                        We're also bringing UniUX to your phone with PWA support (coming soon) and a more responsive design.
                        </p>
                        </span>}/>

                        <uniUX.SmallCard name='Beautiful' styles={{background: 'linear-gradient(5deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 70%)'}} content={<span>
                        <p className={uniUX.styles.minorText}>
                        The complete redesign behind the scenes has by no means not been reflected on the front end.<br/><br/>
                        While retaining the basic layout of UniUX 2, our new look packs more colour, fluidness and responsiveness, while
                        not sacrificing speed and power.
                        </p>
                        </span>}/>
                        
                        <uniUX.SmallCard name='Unified' styles={{background: 'linear-gradient(5deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 70%)'}} content={<span>
                        <p className={uniUX.styles.minorText}>
                        Because we build our apps on UniUX, there's minimal disparity between layout features and user experience
                        of different UniUX apps and their pages.<br/><br/>
                        This helps the user to learn quickly, and helps Circel easily roll out
                        new features to generic parts of all apps with minimal disruption.
                        </p>
                        </span>}/>
                    </span>
                </div>
            }>
            </uniUX.Main>
        </body>
    )
}

export default Page
