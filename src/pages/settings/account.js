import * as React from 'react'
import reactDom from 'react-dom'
import { appConfig } from '../../components/appConfigs/settings.js'
import * as cUniUX from 'cuniux';

import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'


var currentUser

class Page extends React.Component {
  render() {
    return <body>
      <cUniUX.App pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.account}>
        <h4>
          Your Profile
        </h4>

        <cUniUX.EventWrapper contextMenuOnLongPress={true} contextMenu={[['Change Profile Picture...', function () {
          cUniUX.dialog('Change Profile Picture', <div>
            <input placeholder='Paste an image URL' id='pfpUrlInput' />
          </div>, [['Save Profile Picture', function () { cUniUX.updateUserProfilePicture(document.getElementById('pfpUrlInput').value); document.getElementById('settingsPfp').src = document.getElementById('pfpUrlInput').value }, true]])
        }], ['Remove Profile Picture', function () { cUniUX.updateUserProfilePicture('https://www.inspirations.boutique/wp-content/uploads/2019/10/blank-person-profile.png') }]]}>
          <img onClick={function () {
            cUniUX.dialog('Edit Profile Picture', <div>
              <input placeholder='Paste an image URL' id='pfpUrlInput' />
            </div>, [['Save Profile Picture', function () { cUniUX.updateUserProfilePicture(document.getElementById('pfpUrlInput').value); document.getElementById('settingsPfp').src = document.getElementById('pfpUrlInput').value }, true]])
          }} className={cUniUX.styles.pfp} id='settingsPfp' style={{ float: 'left', width: '70px', height: '70px', marginRight: '15px', cursor: 'pointer' }}
            title='Profile Picture - click to edit'
          />
        </cUniUX.EventWrapper>
        <span style={{ float: 'left' }}>
          <h3 id='settingsName' style={{ marginTop: '8px', marginBottom: '8px' }} />
          <span className={cUniUX.styles.minorText} onClick={function(){cUniUX.dialog('Edit Name', <div>
            <input placeholder='Type a new name' id='newDisplayName'/>
          </div>)}} id='settingsAcntUsername' style={{}} />
        </span>
      </cUniUX.App>
    </body>
  }

  componentDidMount() {

  }
}

export default Page  
