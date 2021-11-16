import * as React from 'react'
import * as uniUX from '../components/uniux.js'
import * as firebaseSetup from '../components/firebasesetup.js'
import { Timeline } from 'react-twitter-widgets'

const Page = () => {
  return (
    <body>
    <uniUX.Main pageType={'website'} pageName={'Home'} content={
      <div>
        <div className={uniUX.styles.homepageWorkspaceCard}>
          <h1 style={uniUX.welcomeHeadingStyles}><span style={{color: 'rgb(109, 109, 109)'}}>New</span><br/><span style={{fontSize: '9vw', textShadow: 'color: #131313'}}>UniUX 3</span></h1>
          <p className={uniUX.styles.minorText}>A user experience like no other. Coming 2022.</p><br/><br/>
          <uniUX.PrimaryButton text='Watch CIRCELR21' clickFn={function(){window.open('https://www.youtube.com/channel/UClWJCTCgs8AnvgHtms5ei6Q', '_self')}}/>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>

        <h1 style={uniUX.welcomeHeadingStyles}>Here's what's happening at Circel.</h1>
        <p className={uniUX.styles.minorText}></p>
        <h2>Need to know</h2>
          <span className={uniUX.styles.pageTileRow}>
            <uniUX.SmallCard name='CIRCELR21' styles={{background: 'linear-gradient(5deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 70%)'}} content={<span>
            <p className={uniUX.styles.minorText}>
              The 2021 Circel event - watch it now.<br/><br/>Catch up on the Circel YouTube channel.
            </p>
            </span>}/>

            <uniUX.SmallCard name='Circel on social' styles={{background: 'linear-gradient(5deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 70%)'}} content={<span>
            <p className={uniUX.styles.minorText}>
              Follow us @circelofficial, @circelnews, @circeldesign, @circelsupport on Twitter.<br/><br/> Subscribe to us <a href='https://www.youtube.com/channel/UClWJCTCgs8AnvgHtms5ei6Q'>here on YouTube</a>.
            </p>
            </span>}/>
            
            <uniUX.SmallCard name='The Circel Discord server' styles={{background: 'linear-gradient(5deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 70%)'}} content={<span>
            <p className={uniUX.styles.minorText}>
              Join our brand new Discord server for chat, meeting the team, and news straight through Discord.<br/><br/><a href='https://discord.gg/2fN7FfWZ6P'>Join today!</a>
            </p>
            </span>}/>
          </span>


        <h2>Circel on Twitter</h2> 
        <div className={uniUX.styles.pageTileRow}>
          <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'circelofficial'
          }}
          options={{
            height: '400',
            width: '400'
          }}
          /> 
          <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'circelnews'
          }}
          options={{
            height: '400',
            width: '400'
          }}
          /> 
          <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'circeldesign'
          }}
          options={{
            height: '400',
            width: '400'
          }}
          /> 
          <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'circelsupport'
          }}
          options={{
            height: '400',
            width: '400'
          }}
          /> 
          <br/>
        </div>
        
      </div>
    }>
    </uniUX.Main>
    </body>
  )
}

export default Page
