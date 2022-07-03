import * as React from 'react'
import reactDom from 'react-dom'
import * as cUniUX from 'cuniux'; 
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import { appConfig } from '../../components/appConfigs/bugtrack.js'

class Page extends React.Component {
  render() {
    return <body>
      <cUniUX.App pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.indexPage}/>
    </body>
  }
}


export default Page