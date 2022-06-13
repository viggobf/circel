import * as React from 'react'
import reactDom from 'react-dom'
import * as cUniUX from 'cuniux'; 
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import { appConfig } from '../components/appConfigs/home.js'

class Page extends React.Component {
  render() {
    return <body>
      <cUniUX.Main pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.go}>
        <h4>
          Coming soon
        </h4>
        <p>
          This page is yet to be worked on.
        </p>

      </cUniUX.Main>
    </body>
  }

  componentDidMount() {
    // const userAndSettings = cUniUX.getCFile('users', 'viggobf').then(function (result) {
    //   reactDom.render(<span>{result['name']}</span>, document.getElementById('settingsName'))
    // })
  }
}

export default Page
