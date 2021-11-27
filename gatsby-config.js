module.exports = {
  siteMetadata: {
    siteUrl: "https://www.circel.co",
    title: "Circel",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Circel",
        short_name: "Circel",
        icons: [{
          src: "images/icon.png",
            sizes: "113x113",
            type: "image/png"
          }],
        description: "Circel UniUX",
        lang: "en-US",
        start_url: "/",
        display: "standalone",
        background_color: "white",
        orientation: "any",
        theme_color: "grey",
        shortcuts: [
            {
                name: "Settings",
                short_name: "Settings",
                description: "Go to Settings",
                url: "/settings"
            },
            {
                name: "My Profile",
                short_name: "Profile",
                description: "Go to my Profile",
                url: "/people/me"
            }
        ]
      }
    },
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [`/settings/*`],
    //   },
    // },
    'gatsby-plugin-offline',
  ],
};
