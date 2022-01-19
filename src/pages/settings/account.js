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
        <h4>
          Your Profile
        </h4>

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

        <uniUX.LargeBr />

        <h4>
          Profile Settings
        </h4>
      </uniUX.Main>
    </body>
  }

  componentDidMount() {

    // function tryToRenderUserDetails() {
    //   try {
        
    //   } catch (error) {
    //     setTimeout(tryToRenderUserDetails, 50)
    //   }
    // }

    // tryToRenderUserDetails()
  }
}

export default Page  
