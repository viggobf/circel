import * as React from 'react'
import reactDom from 'react-dom'
import * as cUniUX from 'cuniux'; 
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import { appConfig } from '../../components/appConfigs/settings.js'

class Page extends React.Component {
  render() {
    return <body>
      <cUniUX.App pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.home} pageName={'Settings'}>
        {/* <h4>
          Account
        </h4>
        <cUniUX.FullWidthNavCard name='Account Settings' takeTo='/settings/account' children={<span>
          View your user profile, edit your account settings and more.
        </span>} />

        <cUniUX.FloatBr />

        <h4>
          Appearance
        </h4>
        <cUniUX.FullWidthNavCard name='Appearance Settings' takeTo='/settings/appearance' children={<span>
          Make UniUX yours.
        </span>} /> */}
      </cUniUX.App>
    </body>
  }

  componentDidMount() {
  }
}

export default Page