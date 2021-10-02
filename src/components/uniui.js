import * as React from 'react'
import * as styles from './style.module.css'
import { Link } from 'gatsby'
import '@fontsource/inter'
import '@fontsource/inter/500.css'
import '@fontsource/inter/900.css'
import reactDom from 'react-dom'
import * as firebaseSetup from './firebasesetup.js'
import { Auth } from '@firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import { LogoNodejs } from 'react-ionicons'

var accountMenuOpen = false;
var userInfo;

// making a random number for variable UIs and other stuff
  const no = Math.random();
  var randomNumber
  if (no > 0.9){
    randomNumber = 10
  } else if (no > 0.8){
    randomNumber = 9
  } else if (no > 0.7){
    randomNumber = 8
  } else if (no > 0.6){
    randomNumber = 7
  } else if (no > 0.5){
    randomNumber = 6
  } else if (no > 0.4){
    randomNumber = 5
  } else if (no > 0.3){
    randomNumber = 4
  } else if (no > 0.2){
    randomNumber = 3
  } else if (no > 0.1){
    randomNumber = 2
  } else {
    randomNumber = 1
  }

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
      <div id='accountOptionsArea'>
          {/* account options box rendered here */}
      </div>

      {this.props.content}
    </div>
  }

  componentDidMount(){
    // basically page load functions etc
    const auth = firebaseSetup.firebaseAuth.getAuth();
    firebaseSetup.firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = user
        console.log('Welcome, ' + userInfo.email)
        reactDom.render(<div class={styles.topBarAcntLoggedInZone} onMouseDown={toggleAccountMenu}><DynamicText text={<span className={styles.topBarLink}>{userInfo.displayName}&ensp;<FAIcon icon={icons.faChevronDown}/></span>}/></div>, document.getElementById('accountArea'))
      } else {
        reactDom.render(<div class={styles.topBarBtnZone}><PrimaryButton text='Log in' clickFn={function(){window.open('/login?next=' + window.location.href, '_self')}}/></div>, document.getElementById('accountArea'))
      }
    });

    window.onresize = function(){
      if(accountMenuOpen){
        fadeInElementOnRender(
          <TopBarAccountOptions/>,
        document.getElementById('accountOptionsArea')
        )
        }
      
    }

    window.onclick = function(){
      if(accountMenuOpen){
        renderNothing(document.getElementById('accountOptionsArea'))
        accountMenuOpen = false
      }
    }

  }
}

// app layout types

class ColumnedApp extends React.Component{
  render(){
    return <div className={styles.threeColumnLayout}>

      <div className={styles.threeColumnLayoutColumn1}>
        {/* <h1></h1> */}
        <h1 style={{color: this.props.themeColour}}>{this.props.pageTitle}</h1>
        <div className={styles.inputDiv}>
          <FontAwesomeIcon icon={icons.faSearch} style={{color: 'gray', fontSize: '12px'}}/>
          <input placeholder={'Search ' + this.props.pageShortenedName}/>
        </div>

        <div id='appItemsSidebar'>

        </div>
      </div>

      <div className={styles.threeColumnLayoutColumn2}>
        {this.props.secondColumnContent}
      </div>

      <div className={styles.threeColumnLayoutColumn3}>
        {this.props.thirdColumnContent}
      </div>
      
    </div>
  }

  componentDidMount(){
    var listOfApps = []
    this.props.firstColumnAppItems.forEach(appItem => {
      listOfApps.push(<SidebarItem text={appItem[0]} icon={appItem[1]} iconColour={this.props.themeColour}/>)
    });
    reactDom.render(<span><br/> {listOfApps}</span>, document.getElementById('appItemsSidebar'))
  }
}

class FAIcon extends React.Component{
  render(){
    return <FontAwesomeIcon icon={this.props.icon} className={styles.fAIcon} style={this.props.style}/>
  }
}

// circel logo with CSS
class CircelLogo extends React.Component{
  render(){
    return <div className={styles.circelLogoCircle} style={{transform: 'scale(' + this.props.scale + ') rotate(225deg)', border: '1.2px solid ' + this.props.colour}}><div style={{backgroundColor: this.props.colour}} className={styles.circelLogoSemicircle}></div></div>
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
          </div>

        {/* button zone for sign in etc */}
          <div id='accountArea'>
          </div>
        </div>
      }




      // top bar for app pages such as Workspace
      else {
        return <div className={styles.topBar} id='topbar'>
      {/* CSS Circel logo */}
        <div className={styles.circelLogoCircle} title='Go to the Circel homepage' onClick={function(){window.open('/', '_self')}}><div className={styles.circelLogoSemicircle}></div></div>

      {/* navigation zone for links */}
        <div className={styles.topBarNavZone}>
          <div className={styles.topBarAppTitle}>
            {this.props.pageName}
          </div>
        </div>

      {/* button zone for sign in etc */}
        <div id='accountArea'>
          {/* account display name rendered here */}
        </div>
      </div>
      }
    }
}

class TopBarAccountOptions extends React.Component{
  render(){
    return <div class={styles.topBarAccountOptions}>
      <MenuItem text='My Circel' icon={icons.faHome} firstInList={true}/>
      <MenuItem text='Settings' icon={icons.faCog}/>
      <MenuItem text='Log out' icon={icons.faSignOutAlt} accentColour='red'/>
    </div>
  }
}

// menu item

class MenuItem extends React.Component{
  render(){
    if(!this.props.firstInList){
      return <span>
      <Hr/>
      <button class={styles.menuItem} style={this.props.styles} onClick={this.props.clickFn}>
      <div style={{display: 'grid', gridTemplateColumns: '50% 50%', color: this.props.accentColour}}>
        <div>
          {this.props.text}
        </div>

        <div style={{textAlign: 'right'}}>
          <FAIcon icon={this.props.icon}/>&nbsp;
        </div>
      </div>
      </button>
      </span>
    } 
    else{
        return <span>
      <button class={styles.menuItem} style={this.props.styles} onClick={this.props.clickFn}>
      <div style={{display: 'grid', gridTemplateColumns: '50% 50%'}}>
        <div>
          {this.props.text}
        </div>

        <div style={{textAlign: 'right'}}>
          <FAIcon icon={this.props.icon}/>&nbsp;
        </div>
      </div>
      </button>
      </span>
    }
  }
}

class SidebarItem extends React.Component{
  render(){
    return <button class={styles.sidebarItem} style={this.props.styles} onClick={this.props.clickFn}>
        <div style={{display: 'grid', gridTemplateColumns: '13% 87%'}}>

          <div style={{textAlign: 'left'}}>
          <LogoNodejs
          color={this.props.iconColour}
          />
            {/* <FAIcon icon={this.props.icon} style={{color: this.props.iconColour}}/>&nbsp; */}
          </div>

          <div>
            {this.props.text}
          </div>
        </div>
      </button>
  }
}

// button components

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

class DynamicText extends React.Component{
  render(){
    return <span className={styles.topBarLink}>{this.props.text}</span>
  }
}

// empty component

class Nothing extends React.Component{
  render(){
    return <div/>
  }
}

// hr that looks nice!

class Hr extends React.Component{
  render(){
    return <div className={styles.hR}/>
  }
}

// visual effect functions

function fadeInElementOnRender(elementForRender, placeForRender, totalFadeInTimeMs){
  // fades in element by gradually increasing opacity
  reactDom.render(<div style={{opacity: 0.1}}>{elementForRender}</div>, placeForRender)

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.15}}>{elementForRender}</div>, placeForRender)
  }, 0.5 *(totalFadeInTimeMs / 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.2}}>{elementForRender}</div>, placeForRender)
  }, 1 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.25}}>{elementForRender}</div>, placeForRender)
  }, 1.5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.3}}>{elementForRender}</div>, placeForRender)
  }, 2 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.35}}>{elementForRender}</div>, placeForRender)
  }, 2.5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.4}}>{elementForRender}</div>, placeForRender)
  }, 3 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.45}}>{elementForRender}</div>, placeForRender)
  }, 3.5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.5}}>{elementForRender}</div>, placeForRender)
  }, 4 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.55}}>{elementForRender}</div>, placeForRender)
  }, 4.5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.6}}>{elementForRender}</div>, placeForRender)
  }, 5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.65}}>{elementForRender}</div>, placeForRender)
  }, 5.5 * (totalFadeInTimeMs / 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.7}}>{elementForRender}</div>, placeForRender)
  }, 6 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.75}}>{elementForRender}</div>, placeForRender)
  }, 6.5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.8}}>{elementForRender}</div>, placeForRender)
  }, 7 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.85}}>{elementForRender}</div>, placeForRender)
  }, 7.5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.9}}>{elementForRender}</div>, placeForRender)
  }, 8 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.95}}>{elementForRender}</div>, placeForRender)
  }, 8.5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.97}}>{elementForRender}</div>, placeForRender)
  }, 9 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 0.98}}>{elementForRender}</div>, placeForRender)
  }, 9.5 *(totalFadeInTimeMs/ 10))

  setTimeout(function(){
    reactDom.render(<div style={{opacity: 1}}>{elementForRender}</div>, placeForRender)
  }, 10 *(totalFadeInTimeMs/ 10))
}

function renderNothing(placeForRender){
  reactDom.render(<Nothing/>, placeForRender)
}

// uniUI functions

function toggleAccountMenu(){
  if(!accountMenuOpen){
    // open the account options menu
    setTimeout(function(){  
      fadeInElementOnRender(
        <TopBarAccountOptions/>,
        document.getElementById('accountOptionsArea'), 140
      )
      accountMenuOpen = true
    
    }, 50
    )
  } else {
    // close it
    reactDom.render(
      <Nothing/>,
      document.getElementById('accountOptionsArea')
    )
    accountMenuOpen = false
  }
}

// Circel Accounts functions

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
  TopBar, PrimaryButton, SecondaryButton, CircelLogo, Main, ColumnedApp, SidebarItem,


  // third uniUI functions
  logIn, logInGoogle, logInTwitter, toggleAccountMenu,

  // other variables etc
  randomNumber,

}

// reactDom.render