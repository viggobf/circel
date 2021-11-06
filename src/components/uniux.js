import * as React from 'react'
import * as styles from './style.module.css'
import * as ReactSpring from 'react-spring'
import { Link } from 'gatsby'
import reactDom from 'react-dom'
import * as firebaseSetup from './firebasesetup.js'
import { Auth } from '@firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import LogoImage from '../images/icon.png'
import Favicon from 'react-favicon'

var accountMenuOpen = false;
var userInfo;
var inDev = false
var username
var loginRequired

// making a random number for variable UIs and other stuff
const no = Math.random();
var randomNumber
if (no > 0.9) {
  randomNumber = 10
} else if (no > 0.8) {
  randomNumber = 9
} else if (no > 0.7) {
  randomNumber = 8
} else if (no > 0.6) {
  randomNumber = 7
} else if (no > 0.5) {
  randomNumber = 6
} else if (no > 0.4) {
  randomNumber = 5
} else if (no > 0.3) {
  randomNumber = 4
} else if (no > 0.2) {
  randomNumber = 3
} else if (no > 0.1) {
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
  // textShadow: 'color: #131313',
  // letterSpacing: '.15em',
  // textShadow: '1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2'
}

// font with cool shadow for CIRCELR21 only
const circelrStyles = {
  fontSize: '9vw',
  textShadow: 'color: #131313',
  letterSpacing: '.15em',
  textShadow: '1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2'
}





/* component class definition

 - make sure to group component and its styles together and leave a reasonable gap between component groups
 - always use camel case for style definitions with capital letter beginning for components
 - try to add a single-line comment above the component especially if it's a bit more... obscure

-----------------------------------------------------------------------------------
*/

// page container

class Main extends React.Component {
  render() {
    if (this.props.inDev) {
      inDev = true
    }
    // get if page is app, semiApp (app with no login requirement, app layout), or website (no login requirement, top bar shown) and
    // render correct interface from that
    if (this.props.pageType == 'website') {
      loginRequired = false
      return <div className={styles.page} id='page' onScroll={function () {
        if (document.getElementById('page').scrollTop < 1) {
          document.getElementById('topbar').className = styles.topBarTop
        } else {
          document.getElementById('topbar').className = styles.topBar
        }
      }}>
        <Favicon url={LogoImage} />
        <title>{this.props.pageName} | Circel</title>
        <TopBar appPage={this.props.appPage} pageName={this.props.pageName} />
        <div id='accountOptionsArea'>
          {/* account options box rendered here */}
        </div>

        {this.props.content}
      </div>

    } else if (this.props.pageType == 'app') {
      loginRequired = true
      return <div className={styles.page}>
        <title>{this.props.pageName} | Circel</title>
        <Favicon url={LogoImage} />
        <div id='accountOptionsArea'>
          {/* account options box rendered here */}
        </div>

        {this.props.content}
      </div>

    } else if (this.props.pageType == 'semiApp') {
      loginRequired = false
      return <div className={styles.page}>
        <title>{this.props.pageName} | Circel</title>
        <Favicon url={LogoImage} />
        <div id='accountOptionsArea'>
          {/* account options box rendered here */}
        </div>

        {this.props.content}
      </div>
    } else {
      throwUniUXError(`UniUX Error 3: This page's pageType is not 'website', 'semiApp' or 'app', so UniUX.Main couldn't render.
      Please make sure pageType matches one of the stated values.`)
    }
  }

  componentDidMount() {
    // basically load page functions etc

    // get user info and add options box
    const auth = firebaseSetup.firebaseAuth.getAuth();
    firebaseSetup.firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = user
        console.log('Welcome, ' + userInfo.email)
        // add the account options box
        try {
          if (userInfo.displayName) {
            username = userInfo.displayName
          } else {
            username = 'Account'
          }
          if (this.props.pageType == 'website') {
            reactDom.render(<div class={styles.topBarAcntLoggedInZone} onMouseDown={toggleAccountMenu}><DynamicText text={<span className={styles.topBarLink}>{username}&ensp;<FontAwesomeIcon icon={icons.faChevronDown} /></span>} /></div>, document.getElementById('accountArea'))
          } else if (this.props.pageType == 'app') {
            reactDom.render(<div class={styles.topBarAcntLoggedInZone} onMouseDown={toggleAccountMenu}><DynamicText text={<span className={styles.topBarLink}>{username}&ensp;<FontAwesomeIcon icon={icons.faChevronDown} /></span>} /></div>, document.getElementById('appTopBarRightOptions'))
          } else if (this.props.pageType == 'semiApp') {
            reactDom.render(<div class={styles.topBarAcntLoggedInZone} onMouseDown={toggleAccountMenu}><DynamicText text={<span className={styles.topBarLink}>{username}&ensp;<FontAwesomeIcon icon={icons.faChevronDown} /></span>} /></div>, document.getElementById('accountArea'))
          }
        } catch (error) {
          // do nothing cos there's no place to put it
        }
      } else {
        if (loginRequired) {
          window.open('/login?next=' + window.location.href, '_self')
        }
        try {
          reactDom.render(<div class={styles.topBarBtnZone}><PrimaryButton text='Log in' clickFn={function () { window.open('/login?next=' + window.location.href, '_self') }} /></div>, document.getElementById('accountArea'))
        } catch (error) {
          // do nothing cos there's no place to put it
        }
      }
    });

    window.onresize = function () {
      if (accountMenuOpen) {
        fadeInElementOnRender(
          <TopBarAccountOptions />,
          document.getElementById('accountOptionsArea')
        )
      }

    }

    window.onclick = function () {
      if (accountMenuOpen) {
        renderNothing(document.getElementById('accountOptionsArea'))
        accountMenuOpen = false
      }
    }

  }
}

// app layout types

// error function
function throwUniUXError(errorMsg) {
  if (inDev == false) {
    throw Error(errorMsg + ` \n\nIf you are developing your app and do not wish to see these errors at this time, please add the inDev={true} attribute
    to your uniUX.Main component (even with inDev={true}, errors will still be logged to the Console).`)
  } else {
    console.error(errorMsg + ` \n\nThis error was not shown at runtime since you have inDev={true} on your uniUX.Main component - please
    however make sure you still address it before publishing, we recommend without inDev={true}`)
  }
}

class ColumnedApp extends React.Component {
  render() {
    if (this.props.themeColour && this.props.pageTitle && this.props.appShortenedName && this.props.firstColumnPageItems
      && this.props.secondColumnContent && this.props.appTitle) {

    } else {
      throwUniUXError(`UniUX Error 1: Some attributes of the app are missing. Please make sure you have included appTitle, pageTitle,
      themeColour, appShortenedName, firstColumnPageItems and secondColumnContent.`)
    }
    return <div className={styles.columnedLayout}>

      <div className={styles.columnedLayoutC1}>
        {/* <div className={styles.circelLogoCircle} title='Go to the Circel homepage' onClick={function(){window.open('/app', '_self')}}><div className={styles.circelLogoSemicircle}></div></div> */}
        <CircelLogo />

        <br />
        <h2 style={{ color: this.props.themeColour, marginTop: 10, marginBottom: 0 }}>{this.props.appTitle}</h2>

        <div id='appItemsSidebar'>

        </div>
      </div>

      <div className={styles.columnedLayoutC2} id={'column2'} onScroll={function () {
        if (document.getElementById('column2').scrollTop < 1) {
          document.getElementById('column2TopBar').className = styles.columnedLayoutTopBarTop
        } else {
          document.getElementById('column2TopBar').className = styles.columnedLayoutTopBar
        }

      }}>
        <div className={styles.columnedLayoutTopBarTop} id={'column2TopBar'}>
          <h3 style={{ marginTop: 4, width: '50%', float: 'left', textAlign: 'left' }}>{this.props.pageTitle}</h3>
          <div id='appTopBarRightOptions' style={{ marginTop: -4, width: '48%', float: 'left' }}></div>
        </div>
        {this.props.secondColumnContent}
      </div>
      <div id='accountOptionsArea'></div>
    </div>
  }

  componentDidMount() {
    var listOfApps = []
    var pageTitleMatchesASidebarItem
    this.props.firstColumnPageItems.forEach(appItem => {
      if (appItem[0] == this.props.pageTitle) {
        appItem.push(true)
        pageTitleMatchesASidebarItem = true
      }
      if (appItem[2]) {
        listOfApps.push(<SidebarItem text={appItem[0]} icon={appItem[1]} styles={{ backgroundColor: this.props.themeColour, color: 'white', boxShadow: '0px 4px 15px -4px rgba(0,0,0,0.15)' }} iconColour={'white'} />)
      } else {
        listOfApps.push(<SidebarItem text={appItem[0]} icon={appItem[1]} iconColour={'rgba(146,146,146)'} />)
      }
    });
    if (!pageTitleMatchesASidebarItem) {
      throwUniUXError(`UniUX Error 2: The Page Title does not match a page name in any sidebar item. Please make sure you are using one of the
      items in this page's sidebar as the Page Title.`)
    }
    reactDom.render(<span><br /> {listOfApps}</span>, document.getElementById('appItemsSidebar'))
  }
}

class OverviewCard extends React.Component {
  render() {
    return <div className={styles.overviewCard} style={this.props.styles}>
      <strong style={{ marginBottom: 5, fontSize: 'large' }}>{this.props.name}</strong>
      <br /><br />
      {this.props.content}
    </div>
  }
}

const appsAndTheirPages = {
  // so when sidebar item is added to one page in app, it is added to all for uniformity (and to save a job).
  // AlWAYS add an array here for the app, don't add arrays individually to every page. Reference the array of pages eg appsAndTheirPages.settings
  settings: [['Overview', icons.faList], ['Account', icons.faUser], ['Appearance', icons.faPaintBrush]]
}

// circel logo with CSS
class CircelLogo extends React.Component {
  render() {
    return <div className={styles.circelLogoCircle} style={{ transform: 'scale(' + this.props.scale + ') rotate(225deg)', border: '1.2px solid ' + this.props.colour }}><div style={{ backgroundColor: this.props.colour }} className={styles.circelLogoSemicircle}></div></div>
  }
}

// top bar, top of most pages. also the Circel logo with CSS, and styling the top bar nav link buttons


class TopBar extends React.Component {
  render() {
    // top bar for non-app pages such as Support
    if (!this.props.appPage) {
      return <div className={styles.topBar} id='topbar'>
        {/* CSS Circel logo */}
        <div className={styles.circelLogoCircle} title='Go to the Circel homepage' onClick={function () { window.open('/', '_self') }}><div className={styles.circelLogoSemicircle}></div></div>

        {/* since this is an app page */}
        <div className={styles.topBarNavZone}>
          <Link className={styles.topBarLink} to='/'>Home</Link>
          &emsp;&emsp;&emsp;&emsp;

          {/* <Link className={styles.topBarLink} to='/products'>Products</Link>
            &emsp;&emsp;&emsp;&emsp;

            <Link className={styles.topBarLink} to='/contact'>Support</Link>
            &emsp;&emsp;&emsp;&emsp;

            <Link className={styles.topBarLink} to='/support'>Docs</Link> */}
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
        <div className={styles.circelLogoCircle} title='Go to the Circel homepage' onClick={function () { window.open('/', '_self') }}><div className={styles.circelLogoSemicircle}></div></div>

        {/* navigation zone for links */}
        <div className={styles.topBarNavZoneApp}>
          <div className={styles.topBarAppTitle}>
            {/* {this.props.pageName} */}
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

class TopBarAccountOptions extends React.Component {
  render() {
    return <div class={styles.topBarAccountOptions}>
      <MenuItem text='My Circel' icon={icons.faHome} firstInList={true} />
      <MenuItem text='Settings' icon={icons.faCog} />
      <MenuItem text='Log out' icon={icons.faSignOutAlt} accentColour='red' clickFn={function () {
        if (!loginRequired) {
          logOut(false)
        } else {
          logOut(true)
        }
      }} />
    </div>
  }
}

// menu item

class MenuItem extends React.Component {
  render() {
    if (!this.props.firstInList) {
      return <span>
        <Hr />
        <button class={styles.menuItem} style={this.props.styles} onMouseUp={this.props.clickFn}>
          <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', color: this.props.accentColour }}>
            <div>
              {this.props.text}
            </div>

            <div style={{ textAlign: 'right' }}>
              {/* <FontAwesomeIcon icon={this.props.icon}/>&nbsp; */}
            </div>
          </div>
        </button>
      </span>
    }
    else {
      return <span>
        <button class={styles.menuItem} style={this.props.styles} onClick={this.props.clickFn}>
          <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
            <div>
              {this.props.text}
            </div>

            <div style={{ textAlign: 'right' }}>
              {/* <FontAwesomeIcon icon={this.props.icon}/>&nbsp; */}
            </div>
          </div>
        </button>
      </span>
    }
  }
}

class SidebarItem extends React.Component {
  render() {
    return <Link to={'/' + this.props.text}>
      <button class={styles.sidebarItem} style={this.props.styles}>
        <div style={{ display: 'grid', gridTemplateColumns: '25px 50px' }}>
          <div style={{ textAlign: 'left' }}>
            <FontAwesomeIcon style={{ color: this.props.iconColour }} icon={this.props.icon}
            />
          </div>

          <div style={{ fontWeight: 500 }}>
            {this.props.text}
          </div>
        </div>
      </button>
    </Link>
  }
}

// button components

class PrimaryButton extends React.Component {
  render() {
    return <button className={styles.primaryButton} style={this.props.styles} onClick={this.props.clickFn}>{this.props.text}</button>
  }
}

class SecondaryButton extends React.Component {
  render() {
    return <button className={styles.secondaryButton} style={this.props.styles} onClick={this.props.clickFn}>{this.props.text}</button>
  }
}

class DynamicText extends React.Component {
  render() {
    return <span className={styles.topBarLink}>{this.props.text}</span>
  }
}

class QuickSpan extends React.Component {
  render() {
    return <span>{this.props.text}</span>
  }
}

// empty component

class Nothing extends React.Component {
  render() {
    return <div />
  }
}

// hr that looks nice!

class Hr extends React.Component {
  render() {
    return <div className={styles.hR} />
  }
}

// visual effect functions

function fadeInElementOnRender(elementForRender, placeForRender, totalFadeInTimeMs) {
  // fades in element by gradually increasing opacity
  reactDom.render(<div style={{ opacity: '0', transition: 'opacity 0.5s' }} id='fadingIn'>{elementForRender}</div>, placeForRender)

  document.getElementById('fadingIn').style.opacity = '1'

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.15}}>{elementForRender}</div>, placeForRender)
  // }, 0.5 *(totalFadeInTimeMs / 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.2}}>{elementForRender}</div>, placeForRender)
  // }, 1 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.25}}>{elementForRender}</div>, placeForRender)
  // }, 1.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.3}}>{elementForRender}</div>, placeForRender)
  // }, 2 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.35}}>{elementForRender}</div>, placeForRender)
  // }, 2.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.4}}>{elementForRender}</div>, placeForRender)
  // }, 3 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.45}}>{elementForRender}</div>, placeForRender)
  // }, 3.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.5}}>{elementForRender}</div>, placeForRender)
  // }, 4 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.55}}>{elementForRender}</div>, placeForRender)
  // }, 4.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.6}}>{elementForRender}</div>, placeForRender)
  // }, 5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.65}}>{elementForRender}</div>, placeForRender)
  // }, 5.5 * (totalFadeInTimeMs / 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.7}}>{elementForRender}</div>, placeForRender)
  // }, 6 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.75}}>{elementForRender}</div>, placeForRender)
  // }, 6.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.8}}>{elementForRender}</div>, placeForRender)
  // }, 7 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.85}}>{elementForRender}</div>, placeForRender)
  // }, 7.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.9}}>{elementForRender}</div>, placeForRender)
  // }, 8 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.95}}>{elementForRender}</div>, placeForRender)
  // }, 8.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.97}}>{elementForRender}</div>, placeForRender)
  // }, 9 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 0.98}}>{elementForRender}</div>, placeForRender)
  // }, 9.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   reactDom.render(<div style={{opacity: 1}}>{elementForRender}</div>, placeForRender)
  // }, 10 *(totalFadeInTimeMs/ 10))
}

function renderNothing(placeForRender) {
  reactDom.render(<Nothing />, placeForRender)
}

// uniUX functions

function toggleAccountMenu() {
  if (!accountMenuOpen) {
    // open the account options menu
    setTimeout(function () {
      fadeInElementOnRender(
        <TopBarAccountOptions />,
        document.getElementById('accountOptionsArea'), 140
      )
      accountMenuOpen = true

    }, 50
    )
  } else {
    // close it
    reactDom.render(
      <Nothing />,
      document.getElementById('accountOptionsArea')
    )
    accountMenuOpen = false
  }
}

// Circel Accounts functions

async function logIn(email, password) {
  const auth = firebaseSetup.firebaseAuth.getAuth();

  try {
    const logInStatus = await firebaseSetup.firebaseAuth.signInWithEmailAndPassword(auth, email, password)
    if (logInStatus) {
      // logged in successfully, return that
      const user = logInStatus.user;
      return 'success'
    }
  } catch (error) {
    return error.code
  }
}

async function signUp(email, password) {
  const auth = firebaseSetup.firebaseAuth.getAuth();

  try {
    const signupStatus = await firebaseSetup.firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
    if (signupStatus) {
      // signed up successfully, return that
      const user = signupStatus.user;
      return 'success'
    }
  } catch (error) {
    return error.code
  }
}

async function resetPasswordEmail(email){
  const auth = firebaseSetup.firebaseAuth.getAuth();

  try {
    const passwordResetStatus = await firebaseSetup.firebaseAuth.sendPasswordResetEmail(auth, email)
    
    // password reset email link sent successfully, return that
    return 'success'
  } catch (error) {
    return error.code
  }
}

function logOut(takeToLoginPage) {
  firebaseSetup.firebaseAuth.signOut(firebaseSetup.firebaseAuth.getAuth()).then(function () {
    if (takeToLoginPage) {
      window.open('/login', '_self')
    }
  })
}

async function logInGoogle() {
  try {
    const provider = new firebaseSetup.firebaseAuth.GoogleAuthProvider()
    const auth = firebaseSetup.firebaseAuth.getAuth();
    const loginStatus = await firebaseSetup.firebaseAuth.signInWithPopup(auth, provider)
    if (loginStatus) {
      // logged in successfully, return that
      const user = loginStatus.user;
      return 'success'
    }
  } catch (error) {
    return error.code
  }
}

async function logInTwitter() {
  try {
    const provider = new firebaseSetup.firebaseAuth.TwitterAuthProvider()
    const auth = firebaseSetup.firebaseAuth.getAuth();
    const loginStatus = await firebaseSetup.firebaseAuth.signInWithPopup(auth, provider)
    if (loginStatus) {
      // logged in successfully, return that
      const user = loginStatus.user;
      return 'success'
    }
  } catch (error) {
    return error.code
  }
}


async function getDocFromFirestore(collection, documentName) {
  const docRef = firebaseSetup.firestore.doc(firebaseSetup.firestore.getFirestore(firebaseSetup.app), collection, documentName);
  const docGotten = await firebaseSetup.firestore.getDoc(docRef);

  if (docGotten.exists()) {
    console.log("Document data:", docGotten.data())
    return docGotten.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return 'No such document'
  }
}


// ze massive export
export {
  // first style objects
  welcomeHeadingStyles, circelrStyles, styles,



  // second react components
  TopBar, PrimaryButton, SecondaryButton, CircelLogo, Main, ColumnedApp, SidebarItem, OverviewCard, DynamicText, FontAwesomeIcon,


  // third uniUX functions
  logIn, signUp, logOut, resetPasswordEmail, logInGoogle, logInTwitter, toggleAccountMenu, getDocFromFirestore, fadeInElementOnRender,

  // other variables etc
  randomNumber, appsAndTheirPages, icons, brandIcons

}

// reactDom.render