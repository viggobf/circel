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
          src: 'static/icon-49de90316c75d48bf138b68c17db2553.png',
            sizes: "150x150",
            type: "image/png"
          }],
        description: "Circel UniUX - Progressive Web App",
        lang: "en-US",
        start_url: "/",
        display_override: ["fullscreen", "window-controls-overlay"],
        display: "fullscreen",
        background_color: "white",
        orientation: "any",
        theme_color: "white",
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
    'gatsby-plugin-offline',
  ],
};
