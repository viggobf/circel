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
          <h1 style={uniUX.welcomeHeadingStyles}><span style={{color: 'rgb(109, 109, 109)'}}>12/11/21 18:00</span><br/><span style={{fontSize: '9vw', textShadow: 'color: #131313'}}>CIRCELR21</span></h1>
          <p className={uniUX.styles.minorText}>Circel's annual event, premiering on YouTube. You're invited. Nov 12 18:00 GMT. #circelr21</p><br/><br/>
          <uniUX.PrimaryButton text='Subscribe to Circel' clickFn={function(){window.open('https://www.youtube.com/channel/UClWJCTCgs8AnvgHtms5ei6Q', '_self')}}/>
          <uniUX.SecondaryButton text='Follow @circelnews for more' styles={{width: '200px'}} clickFn={function(){window.open('https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Ecircelnews&screen_name=circelnews', '_self')}}/>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>

        <h1 style={uniUX.welcomeHeadingStyles}>Here's what's happening at Circel.</h1>
        <p className={uniUX.styles.minorText}></p>
        <h2>Need to know</h2>
          <span className={uniUX.styles.pageTileRow}>
            <uniUX.SmallCard name='CIRCELR21' styles={{background: 'linear-gradient(5deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 70%)'}} content={<span>
            <p className={uniUX.styles.minorText}>
              The 2021 Circel event - it's happening.<br/><br/>Watch the live event keynote at 18:00 on November 12.
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
