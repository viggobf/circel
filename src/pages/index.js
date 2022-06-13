import * as React from 'react'
import reactDom from 'react-dom'
import * as cUniUX from 'cuniux'; 
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import {appConfig} from '../components/appConfigs/home.js'
// import {initializeApp} from '@firebase/app'
// import * as firebaseAuth from '@firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyDGFdDCD1ZwvOzbvtWNxseRpSfOOz5dAro",
//   authDomain: "circel-app.firebaseapp.com",
//   projectId: "circel-app",
//   storageBucket: "circel-app.appspot.com",
//   messagingSenderId: "121186697586",
//   appId: "1:121186697586:web:93874da3a21c182b219deb",
//   measurementId: "G-72PCDLGBEL"
// };
// const app = initializeApp(firebaseConfig)
// const auth = firebaseAuth.getAuth()

class Page extends React.Component {
  render() {
    return <body>
      <cUniUX.App pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.home}/>
    </body>
  }

  componentDidMount() {
  }
}

export default Page
