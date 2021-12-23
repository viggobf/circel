import * as React from 'react'
import reactDom from 'react-dom'
import * as uniUX from 'uniux'
import { Link } from 'gatsby'
import * as firebaseSetup from '../../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import { appConfig } from '../../components/appConfigs/settings.js'

var currentUser;


class Page extends React.Component{
  render(){
    return <body>
    <uniUX.Main pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.appearance} pageName={'Settings'}>
      <h4>
        Coming Soon
      </h4>    
    </uniUX.Main>
    </body>
  }
  
  componentDidMount(){
  }
}

export default Page
