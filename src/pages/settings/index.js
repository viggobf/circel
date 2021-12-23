import * as React from 'react'
import reactDom from 'react-dom'
import * as uniUX from 'uniux'
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import { appConfig } from '../../components/appConfigs/settings.js'

class Page extends React.Component {
  render() {
    return <body>
      <uniUX.Main pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.home} pageName={'Settings'}>
        <h4>
          Account
        </h4>
        <uniUX.FullWidthNavCard name='Account Settings' takeTo='/settings/account' content={<span>
          View your user profile, edit your account settings and more.
        </span>} />

        <uniUX.FloatBr />

        <h4>
          Appearance
        </h4>
        <uniUX.FullWidthNavCard name='Appearance Settings' takeTo='/settings/appearance' content={<span>
          Make UniUX yours.
        </span>} />
      </uniUX.Main>
    </body>
  }

  componentDidMount() {
    const userAndSettings = uniUX.getDocFromFirestore('users', 'viggobf').then(function (result) {
      // reactDom.render(<span>{result['name']}</span>, document.getElementById('settingsName'))
    })
  }
}

export default Page
