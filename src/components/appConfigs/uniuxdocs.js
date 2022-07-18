import * as cUniUX from 'cuniux'
import ReactDom from 'react-dom'
import * as React from 'react'

var ICS = cUniUX.InlineCodeSnippet

class Tip extends React.Component {
    render() {
        return <cUniUX.FullWidthBarCard>
            <strong style={{ marginBottom: '0px' }}><cUniUX.FontAwesomeIcon icon={cUniUX.icons.faLightbulb} />&ensp;{this.props.name}</strong><br />

            <p style={{ marginBottom: '0', marginTop: '6px' }}>
                {this.props.children}
            </p>


        </cUniUX.FullWidthBarCard>
    }
}

class Instruction extends React.Component {
    render() {
        return <cUniUX.FullWidthBarCard>
            <h1 style={{ fontSize: '35px', marginTop: '0px' }}>{this.props.number}</h1>

            <p>
                {this.props.children}
            </p>
        </cUniUX.FullWidthBarCard>
    }
}


const appConfig = {
    parentProject: { name: 'Circel' },

    name: 'UniUX 3 Developer Documentation',
    shortenedName: 'UniUX Docs',
    appCode: 'UDD',
    icon: cUniUX.icons.faBookOpen,
    rootURL: 'uniuxdocs',
    initialAppData: {

    },
    design: {
        themeColour: cUniUX.colourPacks.turquoise
    },
    sections: ['Learn UniUX 3'],

    pageConfigs: {
        indexPage: {
            name: 'Welcome to UniUX 3',
            icon: cUniUX.icons.faBook,
            url: '',

            content: <span>
                <p>
                    Welcome to the UniUX 3 Developer Documentation! These pages are designed to provide an up-to-date tutorial on how you can go about
                    building a UniUX 3 app using the best techniques possible, and in the official Circel way. If you want any other sections to be added to
                    the collection, by all means give us feedback.<br /><br />

                    UniUX 3 is a UI library developed by Circel that is designed to let you build good-looking, unified and responsive apps in a fraction of the time
                    it would take by other methods. We've provided instructions for your first app in this new documentation, taking you through the
                    process of creating the traditional 'Hello, world!' app with UniUX-native components and functions.<br /><br />

                    Please note: UniUX 3 works somewhat differently to UniUX 4, and they are designed for different kinds of apps. This documentation is
                    related to UniUX 3 only. For more information, see the relevant page here in the docs.
                </p><br />

                <h4>Recommended Pages</h4>
                <cUniUX.PrimaryActionCard name='Getting Started' icon={cUniUX.icons.faArrowRight} onClick={function () { cUniUX.switchToPage(appConfig.pageConfigs.getStarted) }}>
                    The best place for beginners to start. Learn the basics of UniUX 3.
                </cUniUX.PrimaryActionCard>
            </span>
        },

        getStarted: {
            name: 'Getting Started',
            icon: cUniUX.icons.faArrowRight,
            url: '',
            section: 'Learn UniUX 3',
            pageOptionButtons: [['Copy Link', cUniUX.icons.faLink, 'default', function () { cUniUX.copyToClipboard(window.location.href.split('.co/')[0] + '.co/uniuxdocs?p=getting_started') }]],

            content: <span>
                <p>
                    UniUX 3, which we'll henceforth refer to as just UniUX, is easy for beginners to get started with. Below you'll find instructions for how to install the NodeJS module,
                    from your preferred package manager. You should find it to be a familiar experience, getting started, with the added simplicity of UniUX.<br /><br />
                </p>

                <Instruction number='1'>
                    UniUX apps rely on GatsbyJS to run. Gatsby is a way of creating React apps, used by Circel and others alike. If you haven't
                    already installed it globally, run <cUniUX.InlineCodeSnippet>npm install -g gatsby</cUniUX.InlineCodeSnippet> (for NPM) or <cUniUX.InlineCodeSnippet>yarn global add gatsby</cUniUX.InlineCodeSnippet>,
                    then create a new Gatsby project. The basics are below, but if you wish to learn more visit <cUniUX.Link to='https://www.gatsbyjs.com/docs/'>Gatsby's Docs</cUniUX.Link>.
                    To create a Gatsby project, once Gatsby is installed, run <cUniUX.InlineCodeSnippet>gatsby new</cUniUX.InlineCodeSnippet> or <cUniUX.InlineCodeSnippet>npm init gatsby</cUniUX.InlineCodeSnippet> in your desired
                    directory.
                </Instruction><cUniUX.FontAwesomeIcon style={{ textAlign: 'center', marginLeft: '48%' }} icon={cUniUX.icons.faChevronDown} /><br />



                <Instruction number='2'>
                    Once your new Gatsby project has been created, you are ready to continue. Make sure you are in your Gatsby project directory within your terminal.
                    As with any other NodeJS module, you'll first need to install UniUX. A global install is not necessary for this package. Run the
                    terminal command relevant to your package manager as below.<br /><br />

                    <strong>For NPM:&ensp;</strong><cUniUX.InlineCodeSnippet>npm install uniux</cUniUX.InlineCodeSnippet><br />
                    <strong>For Yarn:&ensp;</strong><cUniUX.InlineCodeSnippet>yarn add uniux</cUniUX.InlineCodeSnippet>
                </Instruction><cUniUX.FontAwesomeIcon style={{ textAlign: 'center', marginLeft: '48%' }} icon={cUniUX.icons.faChevronDown} /><br />

                <h3>What's Next</h3>
                <p>
                    Now you've initialized your Gatsby project and have installed the UniUX module, you're ready to start building your app.<br />
                </p>

                <cUniUX.Button type='primary' onClick={function () { cUniUX.switchToPage(appConfig.pageConfigs.appConfigs) }}>Continue&ensp;<cUniUX.FontAwesomeIcon icon={cUniUX.icons.faArrowRight} /></cUniUX.Button>

                {/* <cUniUX.CodeSnippet/> */}

            </span>
        },


        appConfigs: {
            name: 'Configure an App',
            url: '/',
            section: 'Learn UniUX 3',
            icon: cUniUX.icons.faThLarge,
            pageOptionButtons: [['Copy Link', cUniUX.icons.faLink, 'default', function () { cUniUX.copyToClipboard(window.location.href.split('.co/')[0] + '.co/uniuxdocs?p=configure_an_app') }]],

            content: <span>
                <p>
                    App configurations are at the heart of UniUX - without an app configuration, you're nowhere. From simple things like the name of your
                    UniUX app and a theme colour, to more advanced things like AutoFirebase Callback Functions and Authentication configuration, all
                    key parameters for your application are stored in one place, your app configuration map - inside a normal JavaScript file.
                </p>

                <Tip name='Advice'>
                    It may simply be common sense, but at this point we recommend you keep an organised file tree for your Gatsby/UniUX project.
                    We advise that you keep app configuration files in a separate directory, perhaps called 'appConfigs', outside of your Gatsby-generated
                    'pages' and 'images' directories, perhaps in a 'components' folder (always at SRC level).
                </Tip>

                <h3>Prerequisites:</h3>
                <p>
                    <ul>
                        <li>
                            Gatsby installed and a Gatsby project intialized. <cUniUX.AppInternalLink pageTo='getStarted'>Not there yet?</cUniUX.AppInternalLink>
                        </li>

                        <li>
                            The latest version of UniUX 3 installed in the Gatsby project. <cUniUX.AppInternalLink pageTo='getStarted'>Not there yet?</cUniUX.AppInternalLink>
                        </li>
                    </ul>
                </p>

                <h3>Creating your app configuration file</h3>
                <p>
                    Once you've got a directory in which to put your app configuration file(s), you can begin to create one. App configurations take the
                    form of a JavaScript map, that is usually the sole export of the file.<br /><br />

                    In order to use UniUX features, you'll need to import the UniUX module. At first, it makes things easier to use a blanket import,
                    importing everything so you can find your way around the module's features, functions and components with IntelliSense or similar
                    in your code editor, and not have to keep editing your imports - then limit your import to features you use later for efficiency.
                    However, you can import however you'd like - and you shouldn't see much noticable performance degradation either way.<br /><br />

                    Other imports necessary are React and ReactDOM, since you will likely need to use the JSX syntax that requires React in scope.<br /><br />

                    Once you've got all of your imports added, you're ready to continue. A code snippet of the different imports you'll need is below.<br /><br /><br />

                    <cUniUX.CodeSnippet codeAsString={`import * as UniUX from 'uniux'\nimport * as React from 'react'\nimport ReactDOM from 'react-dom'`} />
                    <br />

                    <p>
                        The next step is to create the app's configuration map. Create a map like you would do normally, then begin to add your essential
                        keys and values, as shown below. The attributes crucial to UniUX apps include, but aren't limited to, the app's parent project ('parentProject'), the
                        app name ('name'), and the individual app page configurations ('pageConfigs'). An example, basic app configuration (on our made-up app 'Circel Park Visitor Guide') is below. Please note,
                        this configurations assumes some prior imports, including the parent project configuration which is stored in a separate file.
                    </p>

                    <cUniUX.CodeSnippet codeAsString={`const appConfig = {
    parentProject: parentProjectConfig,
    
    name: 'Circel Park Visitor Guide',
    rootURL: 'visitorguide',
    appOptionButtons: [['Contact Support', uniUX.icons.faQuestionCircle, 'default', sendSupportRequest]],
    design: {
        themeColour: uniUX.colourPacks.green.darker
    },
    sections: ['Essential Information', 'Getting There', 'Meet the Team'],

    pageConfigs: {
        home: {
            name: 'Home',
            icon: uniUX.icons.faHome,
            url: '',
        },

        about: {
            name: 'About',
            section: 'Essential Information',
            icon: uniUX.icons.faInfoCircle,
            url: 'about'
        }
    }
}`} />
                </p><br />

                <h3>What does this all mean?</h3>

                <p>
                    Below we've given a guide of what every essential attribute shown above in the code snippet means, what it does, and why it's essential.
                    <cUniUX.LargeBr />
                    <ul>
                        <li>
                            <strong>Parent project</strong> - this links your app to your parent project configuration. Your parent project configuration
                            contains a few other attributes, which we'll also cover later.
                        </li>

                        <li>
                            <strong>Name</strong> - pretty self-explanatory; your app's name appears on the UniUX top bar and in other places you'd expect.
                        </li>

                        <li>
                            <strong>Root URL</strong> - this tells UniUX at what URL your app is, so links within the app work correctly and take users to the correct place.
                        </li>

                        <li>
                            <strong>App option buttons</strong> - these are buttons that appear alongside your parent project option buttons, at the top-right of the UniUX top bar.
                        </li>

                        <li>
                            <strong>Design & theme colour</strong> - define the theme colour for your app, either from a selection of UniUX-defined colour packs,
                            or create your own custom colour pack.
                        </li>

                        <li>
                            <strong>Sections</strong> - sections in UniUX allow you to organise your app's pages into different sections, each with a subtitle within the sidebar.
                        </li>

                        <li>
                            <strong>Page configurations</strong> - every attribute about pages other than the content of the page itself, is stored within a page configuration.
                            The name of the page is self-explanatory, and appears in the sidebar and page top bar; the section tells UniUX which section in which to place
                            the page out of your array of sections (case-sensitive); the icon, which you can select from FontAwesome (exported from UniUX),
                            appears in the sidebar and page top bar alongside the name; and the URL tells UniUX where the page is in relation to the index
                            of the app (for an index page, set it to an empty string).
                        </li>
                    </ul>
                    <br />
                    This isn't an exhaustive list of UniUX app configuration attributes. However, if you made an app with the above configuration, it would
                    work perfectly fine, and the result, when the app is running in a development server started with <cUniUX.InlineCodeSnippet>gatsby develop</cUniUX.InlineCodeSnippet>,
                    would look like this:<cUniUX.LargeBr />

                    <cUniUX.Image src='https://i.imgur.com/pLGeCnN.jpeg' width='100%' /><br />

                    As you can tell, this app is incomplete. The obvious part is the lack of page content, while in the sidebar there are empty sections,
                    which look ugly and confusing.<br /><br />

                    We can create page content easily. This, and other more detailed information related to pages is covered in the next page.<br /><br />

                </p>

                <h3>Put it into practice</h3>
                <p>
                    Here is, in a nutshell, how to create UniUX app configurations, step-by-step, assuming you've met the prerequisites at the top
                    of this page.<br />
                </p>

                <Instruction number='1'>
                    In your app configuration directory (src/components/appConfigs is recommended), create a new JavaScript file, import UniUX, React and ReactDOM.
                    Make sure to also export the app configuration map.
                </Instruction>

                <Instruction number='2'>
                    Add the following mandatory attributes, or keys and values, to your app config map - Project Configuration (<ICS noCopyBtn>projectConfig</ICS>), Name (<ICS noCopyBtn>name</ICS>),
                    Root URL (<ICS noCopyBtn>rootURL</ICS>), Theme Colour (<ICS noCopyBtn>design.themeColour</ICS>), and Pages (<ICS noCopyBtn>pageConfigs</ICS>).
                </Instruction><br />

                <h3>Wrap-up & what's next</h3>

                <p>
                    As we've said, app configurations are key to UniUX. Once you've got this essential tool under your belt, you're ready for anything with UniUX.

                    Once you've understood the concept of, and created, an app configuration, you're ready to move on and continue with your app, constructing your
                    pages and their content.
                </p>

                <cUniUX.Button type='primary' onClick={function () { cUniUX.switchToPage(appConfig.pageConfigs.appsAndPages) }}>Continue&ensp;<cUniUX.FontAwesomeIcon icon={cUniUX.icons.faArrowRight} /></cUniUX.Button>

            </span>
        },

        appsAndPages: {
            name: 'Building your Pages',
            url: '',
            icon: cUniUX.icons.faFile,
            section: 'Learn UniUX 3',
            pageOptionButtons: [['Copy Link', cUniUX.icons.faLink, 'default', function () { cUniUX.copyToClipboard(window.location.href.split('.co/')[0] + '.co/uniuxdocs?p=building_your_pages') }]],

            content: <span>
                <p>
                    Now you've written your app configuration(s), it's time to start building your app's pages, where the main content will be located.
                    While all of your app configuration is based in a unified app configuration file, your various pages are located in their own
                    files, which you should put in the <ICS noCopyBtn>pages</ICS> directory of your Gatsby/UniUX project.
                </p>

                <h3>Prerequisites:</h3>
                <p>
                    <ul>
                        <li>
                            Gatsby installed and a Gatsby project intialized. <cUniUX.AppInternalLink pageTo='getStarted'>Not there yet?</cUniUX.AppInternalLink>
                        </li>

                        <li>
                            The latest version of UniUX 3 installed in the Gatsby project. <cUniUX.AppInternalLink pageTo='getStarted'>Not there yet?</cUniUX.AppInternalLink>
                        </li>

                        <li>
                            An app configuration created for the app you want to make pages for. <cUniUX.AppInternalLink pageTo='appConfigs'>Not there yet?</cUniUX.AppInternalLink>
                        </li>
                    </ul>
                </p>

                <h3>Creating your page files</h3>

                <p>
                    Your page files are where you'll write your pages' content. In your <ICS noCopyBtn>pages</ICS> directory, create a new JavaScript
                    file.
                </p>

                <Tip name='Advice'>
                   If you want to learn more about Gatsby, which is the framework that UniUX depends on, it's worth visiting their official documentation.
                   You can find it <cUniUX.Link to='https://www.gatsbyjs.com/docs/'>here</cUniUX.Link>.
                </Tip>

                <p>
                    Locate and name that file appropriately. We'd always recommend you make sure you have an index (<ICS noCopyBtn>index.js</ICS>) file
                    so your users don't get confused at the empty root URL of your site, and also that your lower-level directories have names that match
                    the names of their app configuration files, for intuitiveness. Then, add the same basic imports as in your app configuration file,
                    like we did before. However this time, you also need to add an import for your app configuration file, which should export the app
                    config map. Here's an example code snippet of the necessary imports you'll need - of course, you'll need to tailor it to the location
                    of your page file in relation, to the app configuration, etc.
                </p>

                <cUniUX.CodeSnippet codeAsString={`import * as UniUX from 'uniux'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { appConfig } from '../components/appConfigs/parkVisitorGuide.js'`}/>

                <p>
                    Now we've imported the usual, as well as our app configuration, we're ready to write our page content. The essential React component
                    for your UniUX app is the <ICS noCopyBtn>Main</ICS>. If you've used the import <ICS noCopyBtn>import * as UniUX from 'uniux'</ICS>,
                    then you can simply use it like below. If you've chosen to only import the exports from UniUX that you need (which is fine), then
                    make sure you have it imported and ready to use in your page file. Below, we've provided a look at what your page file will look like,
                    now you've added your main component, and exported it. We've used a React function component for simplicity, but using class
                    components is also good, and helps if you want to use other built-in React functions like <ICS noCopyBtn>componentDidMount</ICS>.
                </p>

                <cUniUX.CodeSnippet codeAsString={`import * as UniUX from 'uniux'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { appConfig } from '../components/appConfigs/parkVisitorGuide.js'

const IndexPage = () => {
    return (
      <uniUX.Main pageType='columnedApp' appConfig={appConfig} page={appConfig.pageConfigs.home} >
        <p>
          <h1>
            Welcome to Circel Park!
          </h1>
  
          In this handy guide, you'll find essential and useful information for finding your way around Circel Park, and meeting the Circel team.
        </p>
      </uniUX.Main>
    )
  }
  
  export default IndexPage
  
`}/>

            <p>
                You'll notice we added three props to our Main component. The page type (<ICS noCopyBtn>pageType</ICS>) prop should always be set to
                <ICS noCopyBtn>'columnedApp'</ICS>; no other options are currently available. You should set your <ICS noCopyBtn>appConfig</ICS> to
                the app configuration map you imported at the top, so UniUX can use it to initialise your app - normally, it's just <ICS noCopyBtn>\appConfig</ICS>
                (in curly brackets of course). The <ICS noCopyBtn>page</ICS> prop should be set to the page you want to be initialised on that URL, 
                a valid page map always inside <ICS noCopyBtn>appConfig.pageConfigs</ICS>. For our example, we've used the app's homepage 
                (<ICS noCopyBtn>appConfig.pageConfigs.home</ICS>). As the page's children, you add content, using the normal JSX syntax.<br/><br/>

                You should create page files for every page configuration in your app configuration. If one doesn't exist for a page added
                in your app configuration, UniUX will still display a sidebar item. Comment one out if you want to make it later, to avoid user
                confusion.<br/><br/>

                Once you're ready to view your pages, run <ICS>gatsby develop</ICS> to run a local development server on your machine. Then, you'll
                be able to view them at their URLs, at localhost port 8000 or wherever else you choose.
            </p>

            <h3><i>UniUX Docs to be continued.</i></h3>

            </span>
        }
    }
}


export { appConfig }