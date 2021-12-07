import * as React from 'react'
import * as styles from './style.module.css'
import * as ReactSpring from 'react-spring'
import { Link, navigate } from 'gatsby'
import * as reactRouter from '@reach/router'
import { useHistory } from 'react-router-dom'
import ReactDom from 'react-dom'
import * as firebaseSetup from './firebasesetup.js'
import { Auth } from '@firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import LogoImage from '../images/icon.png'
import Favicon from 'react-favicon'


var accountMenuOpen = false;
var accountMenuOpened = false;
var userInfo;
var inDev = false;
var username;
var loginRequired;
var userInfo;
var urlTo;
var openAppSidebarItemRendered;
var sidebarItemDestination;
var columnedAppAppName;
var userEmail;
var pageUrl;
var pageOriginUrl;
var pagePathUrl;

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
    // get if page is app, custom (app with no login requirement, app layout), or website (no login requirement, top bar shown) and
    // render correct interface from that
    if (this.props.pageType === 'website') {
      loginRequired = false
      return <div className={styles.page} id='page' style={{ paddingLeft: '5vw' }} onScroll={function () {
        if (document.getElementById('page').scrollTop < 1) {
          document.getElementById('topbar').className = styles.topBarTop
        } else {
          document.getElementById('topbar').className = styles.topBar
        }
      }}>
        <Favicon url={LogoImage} />
        <title id='pageTitle'>Loading &#8226; Circel</title>
        <TopBar appPage={this.props.appPage} pageName={this.props.pageName} />
        <div id='dialogArea'>
          {/* account options box rendered here */}
        </div>

        {this.props.content}
      </div>






    } else if (this.props.pageType === 'app') {
      loginRequired = true
      return <span><div className={styles.page} style={{ opacity: '0', transition: 'opacity 0.5s' }} id='page'>
        <title id='pageTitle'>Loading &#8226; Circel</title>
        <Favicon url={LogoImage} />
        <div className={styles.circelAppTopBar}>
          <div style={{ float: 'left', width: '40px' }}>
            <CircelLogo scale='0.8' />
          </div>

          <div style={{ float: 'left', width: 'fit-content', paddingTop: '5px', textAlign: 'left' }} id=''>
            <h4 style={{ marginTop: 0, float: 'left', textAlign: 'left', color: 'gray' }}>{this.props.pageName}</h4>
          </div>

          {/* button zone for sign in etc */}
          <div id='accountArea' style={{ float: 'right', width: 'fit-content', paddingTop: '5px', marginRight: '2.4vw', textAlign: 'right' }}>
            <span class={styles.appTopBarButton} onMouseUp={toggleAccountMenu} style={{ fontSize: '14px' }}>Account&ensp;<FontAwesomeIcon icon={icons.faChevronDown} /></span>
          </div>
        </div>
        <div id='dialogArea'>
          {/* account options box etc rendered here */}
        </div>

        {this.props.content}
      </div>
        {/* loading screen, appears until componentDidMount finishes */}
        <div className={styles.loadingScreen} id='loadingScreen'>
          {/* <CircelLogo scale='1.8'/> */}
          <div className={styles.pageLoader} /><br />
          <span id='pageLoaderLongTimeText' />
        </div>
      </span>





    } else if (this.props.pageType === 'custom') {
      loginRequired = false
      return <span><div className={styles.page} style={{ opacity: '0', transition: 'opacity 0.5s' }} id='page'>
        <title id='pageTitle'>Loading &#8226; Circel</title>
        <Favicon url={LogoImage} />
        <div id='dialogArea'>
          {/* account options box rendered here */}
        </div>

        {this.props.content}
      </div>

        {/* loading overlay screen */}
        <div className={styles.loadingScreen} id='loadingScreen'>
          {/* <CircelLogo scale='1.8'/> */}
          <div className={styles.pageLoader} /><br />
          <span id='pageLoaderLongTimeText' />
        </div>
      </span>
    } else {
      throwUniUXError(`UniUX Error 3: This page's pageType is not 'website', 'custom' or 'app', so UniUX.Main couldn't render.
      Please make sure pageType matches one of the stated values.`)
    }
  }

  componentDidMount() {
    // set a timeout to add some text if loading taking ages, telling users how to get help/fix long load times
    setTimeout(function () {
      ReactDom.render(<span className={styles.minorText}>
        Issues with loading?<br />
        <Link to='/support'>Visit Support</Link><br />
        <a href='/support'>Check Circel status</a>
      </span>, document.getElementById('pageLoaderLongTimeText'))
    }, 8000)

    // load page functions etc
    // get user info and add options box
    const auth = firebaseSetup.firebaseAuth.getAuth();
    firebaseSetup.firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user) {
        userInfo = user
        userEmail = user.email
        console.log('Welcome, ' + userInfo.email)
        // add the account options box
        try {
          if (userInfo.displayName) {
            username = userInfo.displayName
          } else {
            username = 'Account'
          }
          if (this.props.pageType === 'website') {
            ReactDom.render(<span class={styles.appTopBarButton} onMouseUp={toggleAccountMenu} style={{ fontSize: '14px' }}>{username}&ensp;<FontAwesomeIcon icon={icons.faChevronDown} /></span>, document.getElementById('accountArea'))
          } else if (this.props.pageType === 'app') {
            ReactDom.render(<span class={styles.appTopBarButton} onMouseUp={toggleAccountMenu} style={{ fontSize: '14px' }}>{username}&ensp;<FontAwesomeIcon icon={icons.faChevronDown} /></span>, document.getElementById('accountArea'))
          } else if (this.props.pageType === 'custom') {
            ReactDom.render(<span class={styles.appTopBarButton} onMouseUp={toggleAccountMenu} style={{ fontSize: '14px' }}>{username}&ensp;<FontAwesomeIcon icon={icons.faChevronDown} /></span>, document.getElementById('accountArea'))
          }
        } catch (error) {
          // do nothing cos there's no place to put it
        }


        pageUrl = new URL(window.location.href)
        pageOriginUrl = pageUrl.origin.split('//')[1]
        pagePathUrl = pageUrl.pathname
        // get if the page is being viewed on the beta sites, if so, only allow CBP-enrolled email addresses
        if (pageOriginUrl === 'beta.circel.co' || pageOriginUrl === 'beta.app.circel.co' || pageOriginUrl === 'localhost:8000') {
          // this page is a beta page - get if the user is CBP-enrolled or not
          if (pagePathUrl === '/login/' || pagePathUrl === '/signup/') {
            try {
              document.getElementById('page').style.opacity = '1'
              document.getElementById('loadingScreen').style.opacity = '0'
              setTimeout(function () { document.getElementById('loadingScreen').style.display = 'none' }, 500)
            } catch (e) {
              // do nothing cos circel loading screen doesn't apply to this page
            }
          }



          else {
            if (user.email === 'viggobryantfrost@gmail.com' || user.email.split('@')[1] === 'circel.co') {
              try {
                document.getElementById('page').style.opacity = '1'
                document.getElementById('loadingScreen').style.opacity = '0'
                setTimeout(function () { document.getElementById('loadingScreen').style.display = 'none' }, 500)
              } catch (e) {
                // do nothing cos circel loading screen doesn't apply to this page
              }
            } else {
              // user not CBP-enrolled, don't allow them to view the beta page and show a get lost *cough cough* error message
              try {
                document.getElementById('loadingScreen').style.opacity = '0'
                document.getElementById('page').style.opacity = '1'
              } catch (err) {
                // do nothing, again no loading screen
              }
              // render a message - they aren't CBP-enrolled so can't view page
              ReactDom.render(<div>
                <br /><br />
                <h1 className={welcomeHeadingStyles} style={{ fontSize: '8vw' }}>This is a Closed Beta page.</h1>
                <p className={styles.minorText}>
                  Unfortunately only members of the Closed Beta Programme can access pages on <em>beta.circel.co</em> and <em>beta.app.circel.co</em>.
                  If you want to apply to join, you can do so <a href='https://forms.gle/bFQB5e3PKE9y8Nk86'>here</a>. If you're
                  already enrolled, make sure you're logged in with your enrolled account to access this site - log in <Link to='/login'>here</Link>.
                </p>
              </div>, document.getElementById('page'))
            }
          }

        } else {
          try {
            document.getElementById('page').style.opacity = '1'
            document.getElementById('loadingScreen').style.opacity = '0'
            setTimeout(function () { document.getElementById('loadingScreen').style.display = 'none' }, 500)
          } catch (e) {
            // do nothing cos circel loading screen doesn't apply to this page
          }
        }
      } else {
        pageUrl = new URL(window.location.href)
        pageOriginUrl = pageUrl.origin.split('//')[1]
        pagePathUrl = pageUrl.pathname
        if (pageOriginUrl === 'beta.circel.co' || pageOriginUrl === 'beta.app.circel.co' || pageOriginUrl === 'localhost:8000') {
          if (pagePathUrl === '/login/' || pagePathUrl === '/signup/') {
            try {
              document.getElementById('page').style.opacity = '1'
              document.getElementById('loadingScreen').style.opacity = '0'
              setTimeout(function () { document.getElementById('loadingScreen').style.display = 'none' }, 500)
            } catch (e) {
              // do nothing cos circel loading screen doesn't apply to this page
            }
          } else {
            // render a message - they aren't CBP-enrolled so can't view page
            try {
              document.getElementById('page').style.opacity = '1'
              document.getElementById('loadingScreen').style.opacity = '0'
            } catch (e) {
              // no loading screen
            }
            ReactDom.render(<div>
              <br /><br />
              <h1 className={welcomeHeadingStyles} style={{ fontSize: '8vw' }}>This is a Closed Beta page.</h1>
              <p className={styles.minorText}>
                Unfortunately only members of the Closed Beta Programme can access pages on <em>beta.circel.co</em> and <em>beta.app.circel.co</em>.
                If you want to apply to join, you can do so <a href='https://forms.gle/bFQB5e3PKE9y8Nk86'>here</a>.
              </p>
            </div>, document.getElementById('page'))
          }
        }
        if (loginRequired) {
          navigate('/login?next=' + window.location.href)
        }
        try {
          ReactDom.render(<div class={styles.topBarBtnZone}><PrimaryButton text='Log in' onClick={function () { navigate('/login?next=' + window.location.href) }} /></div>, document.getElementById('accountArea'))
        } catch (error) {
          // do nothing cos there's no place to put it
        }
      }


      // finished now. Don't put functions after this to ensure a smooth loading experience.

    });

    window.onresize = function () {
      if (accountMenuOpen) {
        fadeInElementOnRender(
          <TopBarAccountOptions />,
          document.getElementById('dialogArea')
        )
      }

    }

    window.onclick = function () {
      if (accountMenuOpen) {
        renderNothing(document.getElementById('dialogArea'))
        accountMenuOpen = false
      }
    }

    window.onkeydown = function (ev) {
      if (ev.key === 'Escape') {
        renderNothing(document.getElementById('dialogArea'))
        accountMenuOpen = false
      }
    }



    // page loading has finished, hide the loading overlay screen. don't put functions after this; please put
    // them before this comment to ensure a smooth loading experience.

  }
}

// app layout types

// error function
function throwUniUXError(errorMsg) {
  if (inDev === false) {
    throw Error(errorMsg + ` \n\nIf you are developing your app and do not wish to see these errors at this time, please add the inDev={true} attribute
    to your uniUX.Main component (even with inDev={true}, errors will still be logged to the Console).`)
  } else {
    console.error(errorMsg + ` \n\nThis error was not shown at runtime since you have inDev={true} on your uniUX.Main component - please
    however make sure you still address it before publishing, we recommend without inDev={true}`)
  }
}

class ColumnedApp extends React.Component {
  render() {
    var appConfig = this.props.appConfig
    if (appConfig.themeColour && this.props.page && appConfig.shortenedName && appConfig.pageConfigs
      && this.props.pageContent && appConfig.name) {
      // yey, we've got all the necessary props, lez continue
    } else {
      // uh oh, we're missing some props
      throwUniUXError(`UniUX Error 1: Some attributes of the app and/or page configuration are missing. Please make sure you have included the appConfig, pageTitle,
      pageContent and optionally pageOptionButtons in your page configuration, and for the app configuration, name, shortenedName, pageConfigs and themeColour.`)
    }

    var backButton = <Link><FontAwesomeIcon onClick={function () { window.history.back() }} icon={icons.faChevronLeft} style={{ cursor: 'pointer' }} /></Link>
    var forwardButton = <Link><FontAwesomeIcon onClick={function () { window.history.forward() }} icon={icons.faChevronRight} style={{ cursor: 'pointer' }} /></Link>

    return <div className={styles.columnedLayout}>

      <div className={styles.columnedLayoutC1}>
        <div id='appItemsSidebar' />
      </div>

      <div className={styles.columnedLayoutC2} style={{ backgroundColor: this.props.appConfig.themeColour.mostLight }} id={'column2'} onScroll={function () {
        if (document.getElementById('column2').scrollTop < 1) {
          document.getElementById('column2TopBar').className = styles.columnedLayoutTopBarTop
        } else {
          document.getElementById('column2TopBar').className = styles.columnedLayoutTopBar
        }

      }}>
        <div className={styles.columnedLayoutTopBarTop} id={'column2TopBar'}>
          <h3 style={{ marginTop: 4 }}>
            <FontAwesomeIcon icon={this.props.page.icon} style={{ fontSize: 'medium' }} />
            &emsp;
            {this.props.page.name}
          </h3>
          <div style={{ marginTop: 6, width: 'fit-content', textAlign: 'right', marginRight: '2.4vw', float: 'right' }}>
            <span id='appTopBarRightButtons' />
          </div>
        </div>
        {this.props.pageContent}
      </div>
      <div id='dialogArea'></div>
    </div>
  }

  componentDidMount() {
    // render the list of pages
    var listOfSidebarPages = []

    // turn our delivered object of page configurations into an array so we can cycle through it
    var pagesArray = []

    Object.values(this.props.appConfig.pageConfigs).forEach(function (value) {
      pagesArray.push([value.name, value.icon, value.url])
    })
    console.log(pagesArray)
    var pageTitleMatchesASidebarItem
    var themeColour = this.props.appConfig.themeColour
    columnedAppAppName = this.props.appConfig.name
    if (window.matchMedia('(display-mode: standalone)').matches) {
      ReactDom.render(this.props.page.name, document.getElementById('pageTitle'))
    } else {
      ReactDom.render(this.props.appConfig.name + ' / ' + this.props.page.name + ' • Circel', document.getElementById('pageTitle'))
    }
    listOfSidebarPages = []
    var thisProps = this.props
    pagesArray.forEach(function (appItem) {
      // make a URL for the sidebar item using the app's name and last bit of slug for this sidebar item
      urlTo = '/' + thisProps.appConfig.name.toLowerCase() + appItem[2]

      if (appItem[0] === thisProps.page.name) {
        listOfSidebarPages.push(<SidebarItem text={appItem[0]} icon={appItem[1]} styles={{ backgroundColor: themeColour.normal, color: 'white' }} iconColour={'white'} />)
        pageTitleMatchesASidebarItem = true
      } else {
        listOfSidebarPages.push(<SidebarItem text={appItem[0]} to={urlTo.toLowerCase()} icon={appItem[1]} iconColour={'gray'} />)
      }
    });
    if (!pageTitleMatchesASidebarItem) {
      throwUniUXError(`UniUX Error 2: The Page Title does not match a page name in any sidebar item. Please make sure you are using one of the
      items in this page's sidebar as the Page Title.`)
    }
    ReactDom.render(<span>{listOfSidebarPages}</span>, document.getElementById('appItemsSidebar'))


    // render the top right custom page buttons
    var listOfButtons = []
    this.props.pageOptionButtons.forEach(function (buttonItem) {
      // push to listOfButtons a button, change styling depending on button type
      if (buttonItem[3] === 'themeColour') {
        listOfButtons.push(<span onClick={buttonItem[2]} class={styles.appTopBarButton} style={{ fontSize: '14px', backgroundColor: themeColour.normal, color: 'white' }}><FontAwesomeIcon icon={buttonItem[1]} />&ensp;{buttonItem[0]}</span>)
      } else if (buttonItem[3] === 'success') {
        listOfButtons.push(<span onClick={buttonItem[2]} class={styles.appTopBarButton} style={{ fontSize: '14px' }}><FontAwesomeIcon icon={buttonItem[1]} />&ensp;{buttonItem[0]}</span>)
      }
    })
    listOfButtons.reverse()
    ReactDom.render(<span>{listOfButtons}</span>, document.getElementById('appTopBarRightButtons'))
  }

  componentWillUnmount() {
    // ReactDom.render(null, document.getElementById('appItemsSidebar'))
    document.getElementById('page').style.opacity = '0'
    document.getElementById('loadingScreen').opacity = '1'
  }
}

// link, making sure the current page is recorded so we can go back
class GatsbyLink extends React.Component {
  render() {
    return <Link to={this.props.to} state={{ backTo: window.location.href }}>
      {this.props.children}
    </Link>
  }
}

// a card
class SmallCard extends React.Component {
  render() {
    return <div className={styles.smallCard} style={this.props.styles}>
      <strong style={{ marginBottom: 5, fontSize: 'large' }}>{this.props.name}</strong>
      <br /><br />
      {this.props.content}
    </div>
  }
}

// 
class FullWidthNavCard extends React.Component {
  render() {
    const href = this.props.takeTo
    return <div className={styles.fullWidthNavCard} style={this.props.styles} onClick={function () { navigate(href) }}>
      <strong style={{ marginBottom: 5, fontSize: '19px', width: '80%', float: 'left' }}>{this.props.name}</strong>
      <strong style={{ marginBottom: 5, fontSize: 'large', width: '20%', float: 'left', textAlign: 'right' }}><FontAwesomeIcon icon={icons.faArrowRight} /></strong>

      <br /><br />
      <span className={styles.minorText}>{this.props.content}</span>
    </div>
  }
}

const colourPacks = {
  grey: {
    normal: 'rgb(146,146,146)',
    light: 'rgba(243, 243, 243, 0.5)',
    mostLight: 'rgba(243, 243, 243, 0.5)'
  },

  red: {
    normal: 'var(--red)',
    light: 'rgba(250, 243, 243, 0.5)',
    mostLight: 'rgba(248, 243, 243, 0.5)'
  },

  green: {
    normal: 'var(--green)',
    light: 'rgba(243, 253, 243, 0.5)',
    mostLight: 'rgba(243, 250, 243, 0.5)'
  },

  blue: {
    normal: 'var(--blue)',
    light: 'rgba(243, 243, 253, 0.5)',
    mostLight: 'rgba(243, 243, 250, 0.5)'
  },

  purple: {
    normal: 'purple',
    light: 'rgba(128, 0, 128, 0.2)',
    mostLight: 'rgba(128, 0, 128, 0.2)'
  },
}

const appConfigs = {
  // app configurations, these are referenced by the individual pages as one prop, ensuring consistency across pages and to make development easier.
  // always add app configurations here for production apps, consistency is key. You can also define one appConfig object in another file, as long as it's the same one used everywhere.
  // if you are developing an app, you can provide an object similar to those below for the appConfig.
  settings: {
    name: 'Settings',
    shortenedName: 'Settings',
    pageConfigs: {
      home: {
        name: 'Home',
        icon: icons.faHome,
        url: '/'
      },
      account: {
        name: 'Account',
        icon: icons.faUser,
        url: '/account'
      },
      appearance: {
        name: 'Appearance',
        icon: icons.faPaintBrush,
        url: '/appearance'
      },
    },
    themeColour: colourPacks.grey,
  }
}

// circel logo with CSS
class CircelLogo extends React.Component {
  render() {
    return <div className={styles.circelLogoCircle} style={{ transform: 'scale(' + this.props.scale + ') rotate(225deg)', border: '1.2px solid ' + this.props.configs }}><div style={{ backgroundColor: this.props.colour }} className={styles.circelLogoSemicircle}></div></div>
  }
}

// top bar, top of most pages. also the Circel logo with CSS, and styling the top bar nav link buttons


class TopBar extends React.Component {
  render() {
    // top bar for non-app pages such as Support
    if (!this.props.appPage) {
      return <div className={styles.topBar} id='topbar'>
        {/* CSS Circel logo */}
        <div style={{ float: 'left', width: '5%' }}>
          <div className={styles.circelLogoCircle} title='Go to the Circel homepage' onClick={function () { navigate('/') }}><div className={styles.circelLogoSemicircle}></div></div>
        </div>

        <div style={{ float: 'left', width: '55%', paddingTop: '5px', textAlign: 'left' }}>
          <Link className={styles.topBarLink} to='/'>Home</Link>
          &emsp;&emsp;&emsp;
          <Link className={styles.topBarLink} to='/design'>Design</Link>
          &emsp;&emsp;&emsp;
        </div>

        {/* button zone for sign in etc 
        */}
        <div id='accountArea' style={{ float: 'left', width: '37.5%', paddingTop: '5px', textAlign: 'right' }} />
      </div>
    }




    // top bar for app page; uniux apps
    else {
      return <div className={styles.topBar} id='topbar'>
        {/* CSS Circel logo */}
        <div className={styles.circelLogoCircle} title='Go to the Circel homepage' onClick={function () { navigate('/') }}><div className={styles.circelLogoSemicircle}></div></div>

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
      {/* <span style={{textTransform: 'uppercase', color: 'gray', fontWeight: 500, fontSize: 12, marginLeft: 18}}>Circel Account</span> */}
      {/* <h3 style={{marginLeft: 18, marginBottom: 0}} id='accountOptsDisplayName'/> */}
      <MenuItem text='Settings' icon={icons.faCog} onClick={function () { navigate('/settings') }} firstInList />
      <Hr />
      <MenuItem text='Log out' icon={icons.faSignOutAlt} accentColour='red' onClick={function () {
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
    var itemFontWeight;
    if (this.props.primaryItem){
      itemFontWeight = 'bold'
    } else {
      itemFontWeight = '700'
    }
    if (!this.props.firstInList) {
      return <span>
        <button class={styles.menuItem} onMouseUp={this.props.onClick}>
          <div style={{ display: 'grid', gridTemplateColumns: '10% 70% 20%', color: this.props.accentColour }}>
            <div style={{ textAlign: 'left' }}>
              {/* <FontAwesomeIcon icon={this.props.icon} />&nbsp; */}
            </div>

            <div style={{fontWeight: itemFontWeight}}>
              {this.props.text}
            </div>

          </div>
        </button>
      </span>
    }
    else {
      return <span>
        <button class={styles.menuItem} style={this.props.styles} onClick={this.props.onClick}>
          <div style={{ display: 'grid', gridTemplateColumns: '10% 70% 20%', color: this.props.accentColour }}>
            <div style={{ textAlign: 'left' }}>
              {/* <FontAwesomeIcon icon={this.props.icon} />&nbsp; */}
            </div>

            <div style={{fontWeight: itemFontWeight}}>
              {this.props.text}
            </div>

          </div>
        </button>
      </span>
    }
  }
}

class SidebarItem extends React.Component {
  render() {
    var thisProps = this.props
    return <button style={thisProps.styles} className={styles.sidebarItem} onContextMenu={function (ev) {
      // prevent the default context menu urrggghhhh
      ev.preventDefault();
      // open the context menu
      contextMenu(ev, [
        ["Open Page", function () { navigate(thisProps.to) }, false, true],
        ["Open in new tab", function () { window.open(thisProps.to, '_blank') }, true],
      ])
    }} onClick={function () { navigate(thisProps.to) }}>
      <div className={styles.sidebarItemInner}>
        <div className={styles.sidebarItemIcon}>
          <FontAwesomeIcon style={{ color: this.props.iconColour }} icon={this.props.icon} className={styles.sidebarItemIcon} />
        </div>

        <div style={{ fontWeight: 500 }} className={styles.sidebarItemText}>
          {this.props.text}
        </div>
      </div>

      {/* <span>
        <div className={styles.sidebarItemInner}>
          <div className={styles.sidebarItemIcon}>
            <FontAwesomeIcon style={{color: this.props.iconColour}} icon={this.props.icon} className={styles.sidebarItemIcon} />
          </div>

          <div style={{ fontWeight: 500 }} className={styles.sidebarItemText}>
            {this.props.text}
          </div>
        </div>
        </span> */}
    </button>
  }
}

// button components

class PrimaryButton extends React.Component {
  render() {
    return <button className={styles.primaryButton} style={this.props.styles} onClick={this.props.onClick}>{this.props.text}</button>
  }
}

class SecondaryButton extends React.Component {
  render() {
    return <button className={styles.secondaryButton} style={this.props.styles} onClick={this.props.onClick}>{this.props.text}</button>
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

// an element that breaks float:left, so i don't go insane

class FloatBr extends React.Component {
  render() {
    return <div style={{ clear: 'both' }} />
  }
}

class LargeBr extends React.Component {
  render() {
    return <span><div style={{ clear: 'both' }} /><br /></span>
  }
}

// visual effect functions

function fadeInElementOnRender(elementForRender, placeForRender, totalFadeInTimeMs) {
  // fades in element by gradually increasing opacity
  ReactDom.render(<div style={{ opacity: '1', transition: 'opacity 0.5s' }} id='fadingIn'>{elementForRender}</div>, placeForRender)

  // document.getElementById('fadingIn').style.opacity = '1'

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.15}}>{elementForRender}</div>, placeForRender)
  // }, 0.5 *(totalFadeInTimeMs / 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.2}}>{elementForRender}</div>, placeForRender)
  // }, 1 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.25}}>{elementForRender}</div>, placeForRender)
  // }, 1.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.3}}>{elementForRender}</div>, placeForRender)
  // }, 2 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.35}}>{elementForRender}</div>, placeForRender)
  // }, 2.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.4}}>{elementForRender}</div>, placeForRender)
  // }, 3 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.45}}>{elementForRender}</div>, placeForRender)
  // }, 3.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.5}}>{elementForRender}</div>, placeForRender)
  // }, 4 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.55}}>{elementForRender}</div>, placeForRender)
  // }, 4.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.6}}>{elementForRender}</div>, placeForRender)
  // }, 5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.65}}>{elementForRender}</div>, placeForRender)
  // }, 5.5 * (totalFadeInTimeMs / 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.7}}>{elementForRender}</div>, placeForRender)
  // }, 6 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.75}}>{elementForRender}</div>, placeForRender)
  // }, 6.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.8}}>{elementForRender}</div>, placeForRender)
  // }, 7 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.85}}>{elementForRender}</div>, placeForRender)
  // }, 7.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.9}}>{elementForRender}</div>, placeForRender)
  // }, 8 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.95}}>{elementForRender}</div>, placeForRender)
  // }, 8.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.97}}>{elementForRender}</div>, placeForRender)
  // }, 9 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 0.98}}>{elementForRender}</div>, placeForRender)
  // }, 9.5 *(totalFadeInTimeMs/ 10))

  // setTimeout(function(){
  //   ReactDom.render(<div style={{opacity: 1}}>{elementForRender}</div>, placeForRender)
  // }, 10 *(totalFadeInTimeMs/ 10))
}

function renderNothing(placeForRender) {
  ReactDom.render(<Nothing />, placeForRender)
}

// uniUX functions

function toggleAccountMenu() {
  if (!accountMenuOpen) {
    // open the account options menu
    setTimeout(function () {
      fadeInElementOnRender(
        <TopBarAccountOptions />,
        document.getElementById('dialogArea'), 140
      )
      accountMenuOpen = true

    }, 50
    )
  } else {
    // close it
    ReactDom.render(
      <Nothing />,
      document.getElementById('dialogArea')
    )
    accountMenuOpen = false
  }
}

function dialog(title, primaryButton, secondaryButton, tertiaryButton) {
  ReactDom.render(<span>
    {/* the blur overlay */}
    <div className={styles.blurOverlay} />

    {/* the dialog box */}
    <div className={styles.dialogBox}>
      <h3>{title}</h3>
    </div>
  </span>, document.getElementById('dialogArea'))
}

function contextMenu(event, items) {
  // get a React-usable array of the menu items
  var menuItems = []
  items.forEach(function (menuItem) {
    menuItems.push(<MenuItem text={menuItem[0]} onClick={function () {
      menuItem[1]();
      closeContextMenu()
    }} primaryItem={menuItem[3]} />)
    // if wanted, render a line (Hr) underneath the menu item
    if (menuItem[2] === true){
      menuItems.push(<Hr/>)
    }
  })
  ReactDom.render(
    <span>
      {/* the context menu with its item array */}
      <div className={styles.contextMenuBox} style={{ left: event.pageX, top: event.pageY }}>
        {menuItems}
      </div>
    </span>, document.getElementById('dialogArea'))
}

function closeContextMenu() {
  ReactDom.render(<Nothing/>, document.getElementById('dialogArea'))
}

function closeDialog() {
  ReactDom.render(<Nothing />)
}


// JS additional functions
async function getInnerArrayByFirstItem(array, item) {
  array.forEach(function (arrayItem) {
    if (arrayItem[0] === item) {
      // that inner array begins with the right item
      return arrayItem
    } else {
      // not the right inner array
    }
  })
}

// Circel Accounts functions. While we name Circel IDs as emails here,
// please name them as Circel IDs when the user can see (brand identity :)).

// login/signup
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
      return ['success', user]
    }
  } catch (error) {
    return error.code
  }
}

// password reset
async function resetPasswordEmail(email, continueUrl) {
  const auth = firebaseSetup.firebaseAuth.getAuth();

  try {
    const actionCodeSettings = {
      url: continueUrl,
    };
    const passwordResetStatus = await firebaseSetup.firebaseAuth.sendPasswordResetEmail(auth, email, actionCodeSettings)

    // password reset email link sent successfully, return that
    return 'success'
  } catch (error) {
    console.log(error.code)
    return error.code
  }
}

async function completeResetPassword(email, newPassword, oobCode) {
  const auth = firebaseSetup.firebaseAuth.getAuth();

  try {
    const passwordResetStatus = await firebaseSetup.firebaseAuth.confirmPasswordReset(auth, oobCode, newPassword)

    // password changed successfully, log them in, then return success
    const logInAfterResetStatus = await firebaseSetup.firebaseAuth.signInWithEmailAndPassword(auth, email, newPassword)
    if (logInAfterResetStatus) {
      // logged in after reset successfully, return that
      const user = logInAfterResetStatus.user;
      return 'success'
    }
  } catch (error) {
    return error.code
  }
}

async function verifyPasswordResetCode(oobCode) {
  const auth = firebaseSetup.firebaseAuth.getAuth();

  try {
    const passwordResetStatus = await firebaseSetup.firebaseAuth.verifyPasswordResetCode(auth, oobCode)

    // password changed successfully, return that
    return passwordResetStatus
  } catch (error) {
    return 'error'
  }
}

// circel id (email) verification
async function completeEmailVerification(email, oobCode) {
  const auth = firebaseSetup.firebaseAuth.getAuth();

  try {
    const emailVerifyStatus = await firebaseSetup.firebaseAuth.applyActionCode(auth, oobCode)

    // email verified successfully, return that
    return 'success'
  } catch (error) {
    return error.code
  }
}

// log out
function logOut(takeToLoginPage) {
  firebaseSetup.firebaseAuth.signOut(firebaseSetup.firebaseAuth.getAuth()).then(function () {
    if (takeToLoginPage) {
      navigate('/login')
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

async function getUserDetails() {
  const userDetails = firebaseSetup.firebaseAuth.getAuth().currentUser.displayName
  // const userDetails = 'h'

  return userDetails
}




async function getDocFromFirestore(collection, documentName) {
  const docRef = firebaseSetup.firestore.doc(firebaseSetup.firestore.getFirestore(firebaseSetup.app), collection, documentName);
  const docGotten = await firebaseSetup.firestore.getDoc(docRef);

  if (docGotten.exists()) {
    return docGotten.data()
  } else {
    // oop document unexistant
    return 'No such document'
  }
}

async function writeDocToFirestore(collection, documentName, newData) {
  const docRef = firebaseSetup.firestore.doc(firebaseSetup.firestore.getFirestore(firebaseSetup.app), collection, documentName);

  await firebaseSetup.firestore.setDoc(docRef, newData)

}


// ze massive export
export {
  // first style objects
  welcomeHeadingStyles, circelrStyles, styles,



  // second react components
  TopBar, PrimaryButton, SecondaryButton, CircelLogo, Main, ColumnedApp, SidebarItem, SmallCard, FullWidthNavCard, DynamicText, FontAwesomeIcon,
  Hr, FloatBr, LargeBr,


  // third uniUX functions
  logIn, signUp, logOut, resetPasswordEmail, completeResetPassword, verifyPasswordResetCode, getUserDetails,
  logInGoogle, logInTwitter, toggleAccountMenu, getDocFromFirestore, writeDocToFirestore, fadeInElementOnRender,
  dialog,

  // other variables etc
  randomNumber, appConfigs, icons, brandIcons, userInfo,

}
