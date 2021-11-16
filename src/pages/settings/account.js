
import * as React from 'react'
import reactDom from 'react-dom'
import * as uniUX from '../../components/uniux.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

var currentUser

class Page extends React.Component{
  render(){
    return <body>
    <uniUX.Main pageType={'app'} pageName={'Settings'} content={
      <uniUX.ColumnedApp appShortenedName='Settings' themeColour={'var(--gray)'} appTitle='Settings' pageTitle='Account'
      pageOptionButtons={[['Save changes', icons.faSave, function(){alert('hi')}, true]]} firstColumnPageItems={
        uniUX.appsAndTheirPages.settings
      } secondColumnContent={
        <span>
        <h4>
          Your Profile
        </h4>

        <img className={uniUX.styles.pfp} id='settingsPfp' style={{float: 'left', width: '70px', height: '70px', marginRight: '15px', cursor: 'pointer'}}
          title='Profile Picture - click to edit'
        />
        <span style={{float: 'left'}}>
          <h3 id='settingsName' style={{marginTop: '8px', marginBottom: '8px'}}/>
          <span className={uniUX.styles.minorText} id='settingsAcntUsername' style={{}}/>
        </span>

        <uniUX.LargeBr/>

        <h4>
          Profile Settings
        </h4>
        
        </span>
      }/>
    }>
    </uniUX.Main>
    </body>
  }
  
  componentDidMount(){

    function tryToRenderUserDetails(){
      try{
        currentUser = firebaseSetup.firebaseAuth.getAuth().currentUser
        reactDom.render(currentUser.displayName, document.getElementById('settingsName'))
        document.getElementById('settingsPfp').src = currentUser.photoURL
        uniUX.getDocFromFirestore('userSettings', currentUser.uid).then(function(result){
          reactDom.render(<span>{'@' + result['username']}</span>, document.getElementById('settingsAcntUsername'))
       })
      } catch (error) {
        setTimeout(tryToRenderUserDetails, 50)
      }
    }

    tryToRenderUserDetails()
  }
}

export default Page
