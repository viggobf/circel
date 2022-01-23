import * as React from 'react'
import reactDom from 'react-dom'
import { appConfig } from '../../components/appConfigs/settings.js'
import * as uniUX from 'uniux'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'


var currentUser

class Page extends React.Component {
  render() {
    return <body>
      <uniUX.Main pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.account}>
        <uniUX.EventWrapper onLongPress={function(){alert('hey')}} onShiftClick={function(){alert('hi')}}>
          <h4>
            Your Profile
          </h4>
        </uniUX.EventWrapper>
        <img onClick={function () {
          uniUX.dialog('Edit Profile Picture', <div>
            <label for='pfpUrlInput'>Paste your new profile picture's URL</label><br />
            <input placeholder='Image URL' id='pfpUrlInput' />
          </div>, ['Save Profile Picture', function () { uniUX.updateUserProfilePicture(document.getElementById('pfpUrlInput').value) }])
        }} className={uniUX.styles.pfp} id='settingsPfp' style={{ float: 'left', width: '70px', height: '70px', marginRight: '15px', cursor: 'pointer' }}
          title='Profile Picture - click to edit'
        />
        <span style={{ float: 'left' }}>
          <h3 id='settingsName' style={{ marginTop: '8px', marginBottom: '8px' }} />
          <span className={uniUX.styles.minorText} id='settingsAcntUsername' style={{}} />
        </span>

        {/* <uniUX.LargeBr />

        <h4>
          Profile Settings
        </h4>

        <uniUX.SmallCard title='Title' content={<div><strong>
          <h2>New Year, New Apps</h2>
        </strong>
          <p>
            The apps we're hyped for in 2022.
          </p>
        </div>}>
          heya
        </uniUX.SmallCard>


        <uniUX.LargeBr />

        <h4>
          Circel Connect
        </h4>

        <uniUX.FullWidthNavCard name={'Join Circel Connect'} content={
          <span>
            A network where everyone is productive in their own way.
          </span>
        } />

        <uniUX.FullWidthNavCard name={'Join Circel Connect'} content={
          <span>
            A network where everyone is productive in their own way.
          </span>
        } />

        <uniUX.FullWidthNavCard name={'Join Circel Connect'} content={
          <span>
            A network where everyone is productive in their own way.
          </span>
        } /> */}
      </uniUX.Main>
    </body>
  }

  componentDidMount() {

  }
}

export default Page  
