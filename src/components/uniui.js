import * as React from 'react'
import * as styles from './style.module.css'
import { Link } from 'gatsby'
import '@fontsource/inter'
import '@fontsource/inter/500.css'
import '@fontsource/inter/900.css'
import reactDom from 'react-dom'
import * as firebaseSetup from './firebasesetup.js'
import { Auth } from '@firebase/auth'


/* styling */

// basic styles for all pages. font is Inter


const welcomeHeadingStyles = {
  color: 'black',
  fontFamily: 'Inter',
  fontWeight: 900,
  fontSize: '4vw',
}

// font with linear gradient for Workspace titles
const circelWorkspaceTitleStyles = {
  background: '#000000',
  background: '-webkit-linear-gradient(to right, #000000 0%, #0614CF 70%)',
  background: '-moz-linear-gradient(to right, #000000 0%, #0614CF 70%)',
  background: 'linear-gradient(to right, #000000 0%, #0614CF 70%)',
  webkitBackgroundClip: 'text',
  webkitTextFillColor: 'transparent',
  // textShadow: '3px 3px 6px rgba(150, 150, 150, 0.54)',
  fontSize: '9vw',
}





/* component class definition

 - make sure to group component and its styles together and leave a reasonable gap between component groups
 - always use camel case for style definitions with capital letter beginning for components
 - try to add a single-line comment above the component especially if it's a bit more... obscure

-----------------------------------------------------------------------------------
*/

// page container

class Main extends React.Component{
  render(){
    return <div className={styles.page}>
      <title>{this.props.pageName} | Circel</title>
      <TopBar appPage={this.props.appPage} pageName={this.props.pageName}/>
      {this.props.content}
    </div>
  }

  componentDidMount(){
    const auth = firebaseSetup.firebaseAuth.getAuth();
    firebaseSetup.firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const userEmail = user.email;
        console.log('logged in')
      } else {
        // User is signed out
        // ...
      }
    });
  }
}

// circel logo with CSS

class CircelLogo extends React.Component{
  render(){
    return <div className={styles.circelLogoCircle}><div className={styles.circelLogoSemicircle}></div></div>
  }
}

// top bar, top of most pages. also the Circel logo with CSS, and styling the top bar nav link buttons


class TopBar extends React.Component{
    render(){
      
      // top bar for non-app pages such as Support
      if (!this.props.appPage){
        return <div className={styles.topBar} id='topbar'>
        {/* CSS Circel logo */}
          <div className={styles.circelLogoCircle} title='Go to the Circel homepage' onClick={function(){window.open('/', '_self')}}><div className={styles.circelLogoSemicircle}></div></div>

        {/* since this is an app page */}
          <div className={styles.topBarNavZone}>
            <Link className={styles.topBarLink} to='/'>Home</Link>
            &emsp;&emsp;&emsp;&emsp;

            <Link className={styles.topBarLink} to='/products'>Products</Link>
            &emsp;&emsp;&emsp;&emsp;

            <Link className={styles.topBarLink} to='/contact'>Support</Link>
            &emsp;&emsp;&emsp;&emsp;

            <Link className={styles.topBarLink} to='/support'>Docs</Link>
            &emsp;&emsp;&emsp;&emsp;
          </div>

        {/* button zone for sign in etc */}
          <div className={styles.topBarBtnZone}>
            {/* <SecondaryButton text='Log in'/> */}
            <PrimaryButton text='Log in' clickFn={function(){window.open('/login?next=' + window.location.href, '_self')}}/>
          </div>
        </div>


      // top bar for app pages such as Workspace
      } else {
        return <div className={styles.topBar} id='topbar'>
      {/* CSS Circel logo */}
        <div className={styles.circelLogoCircle} title='Go to the Circel homepage' onClick={function(){window.open('/', '_self')}}><div className={styles.circelLogoSemicircle}></div></div>

      {/* navigation zone for links */}
        <div className={styles.topBarNavZone}>
          <Link className={styles.topBarLink} to='/'>Home</Link>
          &emsp;&emsp;&emsp;&emsp;

          <Link className={styles.topBarLink} to='/products'>Products</Link>
          &emsp;&emsp;&emsp;&emsp;

          <Link className={styles.topBarLink} to='/contact'>Support</Link>
          &emsp;&emsp;&emsp;&emsp;

          <Link className={styles.topBarLink} to='/support'>Docs</Link>
          &emsp;&emsp;&emsp;&emsp;
        </div>

      {/* button zone for sign in etc */}
        <div className={styles.topBarBtnZone}>
          {/* <SecondaryButton text='Log in'/> */}
          <PrimaryButton text='Log in' clickFn={function(){window.open('/login?next=' + window.location.href, '_self')}}/>
        </div>
      </div>
        
      }
    }
}

// reactDom.render(TopBar, document.getElementById('main'))

// class LoginWindow extends React.Component{
//   constructor(props){
//     super(props)
//     window.loginWindow = this
//     this.state = {
//       open: 'inline-block'
//     }
//     // window.loginWindowDisplay = 'none'
//   }

//   openLoginWindow(){
//     this.setState({open: 'inline-block'})
//   }

//   render(){
//     return <div id='loginwindow' className={styles.twoHalfWindow} style={{display: this.state.open}} onClick={function(){document.getElementById('loginwindow').style.display = 'none'}}>

//     </div>
//   }

//   login(){
//     this.props.open = true
//   }
// }

// styles for all buttons (generic), to ensure consistency. *DO NOT* change styles in individual button styles objects if they
// are obviously styled here.

class PrimaryButton extends React.Component{
  render(){
    return <button className={styles.primaryButton} style={this.props.styles} onClick={this.props.clickFn}>{this.props.text}</button>
  }
}

class SecondaryButton extends React.Component{
  render(){
    return <button className={styles.secondaryButton} style={this.props.styles} onClick={this.props.clickFn}>{this.props.text}</button>
  }
}

// UniUI functions

function logIn(email, password){
  const auth = firebaseSetup.firebaseAuth.getAuth();
  firebaseSetup.firebaseAuth.signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('logged in')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      if (error.code === 'auth/user-not-found'){
        alert()
      }
    });
}

function logInGoogle(){
  const provider = new firebaseSetup.firebaseAuth.GoogleAuthProvider();
  const auth = firebaseSetup.firebaseAuth.getAuth();
  firebaseSetup.firebaseAuth.signInWithRedirect(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = firebaseSetup.firebaseAuth.GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('logged in with google')
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = firebaseSetup.firebaseAuth.GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode)
      // ...
    });
}

function logInTwitter(){
  const provider = new firebaseSetup.firebaseAuth.TwitterAuthProvider()
  const auth = firebaseSetup.firebaseAuth.getAuth();
  firebaseSetup.firebaseAuth.signInWithRedirect(auth, provider)
    .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential = firebaseSetup.firebaseAuth.TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;

      // The signed-in user info.
      const user = result.user;
      console.log('logged in with twitter')
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = firebaseSetup.firebaseAuth.TwitterAuthProvider.credentialFromError(error);
      console.log(errorCode)
      // ...
    });
}


// ze massive export
export {
  // first style objects
  welcomeHeadingStyles, circelWorkspaceTitleStyles, styles,



  // second react components
  TopBar, PrimaryButton, SecondaryButton, CircelLogo, Main,


  // third uniUI functions
  logIn, logInGoogle, logInTwitter

}

// reactDom.render