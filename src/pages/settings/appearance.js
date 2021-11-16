
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
      <uniUX.ColumnedApp appShortenedName='Settings' themeColour={'var(--gray)'} appTitle='Settings' pageTitle='Appearance'
      pageOptionButtons={[['Save changes', icons.faSave, function(){alert('hi')}, true]]} backTo={function(){
        try{
          return this.props.location.state.backTo
        } catch(e) {
          return null
        }
        }()} firstColumnPageItems={
        uniUX.appsAndTheirPages.settings
      } secondColumnContent={
        <span>
        <h4>
          Coming Soon
        </h4>

        <p>This page is still being worked on.<br/><br/>Please check back soon!
        </p>
        
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
