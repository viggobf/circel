import * as React from 'react'
import reactDom from 'react-dom'
import * as uniUX from '../../components/uniux.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

class SettingsOverviewPage extends React.Component{
  render(){
    return <body>
    <uniUX.Main appPage={true} pageName={'Settings'} content={
      <uniUX.ColumnedApp appShortenedName='Settings' themeColour={'var(--gray)'} appTitle='Settings' pageTitle='Overview'
      pageOptionButtons={[['Save changes', icons.faSave, function(){alert('hi')}, true]]} firstColumnPageItems={
        uniUX.appsAndTheirPages.settings
      } secondColumnContent={
        <span>
        <h4>
          At A Glance
        </h4>
          <uniUX.OverviewCard name='Your Profile' styles={{background: 'linear-gradient(5deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 100%)'}} content={<span>
            Name: <span id='settingsName'></span>
          </span>}/>
        </span>
      }/>
    }>
    </uniUX.Main>
    </body>
  }
  
  componentDidMount(){
    const userAndSettings = uniUX.getDocFromFirestore('users', 'viggobf').then(function(result){
      reactDom.render(<span>{result['name']}</span>, document.getElementById('settingsName'))
    })
  }
}

export default SettingsOverviewPage
