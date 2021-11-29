"use strict";(self.webpackChunkcircel=self.webpackChunkcircel||[]).push([[782],{83758:function(e,t,n){n.r(t);var l=n(67294),r=n(73935),a=n(23882),c=(n(25444),n(30027),n(39519)),o=n(57190);t.default=function(){return l.createElement("body",null,l.createElement(a.or,{pageType:"custom",pageName:"Sign up",content:l.createElement("div",{className:a.W2.gE},l.createElement("div",{className:a.W2.bz,id:"halvedPageHalf1",style:{backgroundColor:"white"}},l.createElement("br",null),l.createElement("br",null),l.createElement("h1",{className:a.W2.k9,style:{textAlign:"left"}},"Sign up"),l.createElement("input",{placeholder:"Email (will be your Circel ID)",style:{width:"30vw"},type:"email",id:"signupPageEmail"}),l.createElement("br",null),l.createElement("br",null),l.createElement("input",{placeholder:"Password",style:{width:"30vw"},type:"password",id:"signupPagePassword"}),l.createElement("br",null),l.createElement("br",null),l.createElement("br",null),l.createElement(a.KM,{text:"Sign up",onClick:function(){a.y1(document.getElementById("signupPageEmail").value,document.getElementById("signupPagePassword").value).then((function(e){"success"==e?window.open(window.location.href.split("=")[1]):(console.log(e),"auth/email-already-in-use"==e?r.render(l.createElement("span",null,"That email is already in use by a Circel account. Click 'Log in instead' to log in."),document.getElementById("errorRenderSpace")):"auth/weak-password"==e?r.render(l.createElement("span",null,"That password looks too weak - make sure it's over 6 characters long."),document.getElementById("errorRenderSpace")):r.render(l.createElement("span",null,"An error occurred (",l.createElement("code",null,e.split("/")[1]),")"),document.getElementById("errorRenderSpace")))}))}}),l.createElement(a.kq,{text:"Log in instead",onClick:function(){window.open("/login?next="+window.location.href.split("=")[1],"_self","_self")}}),l.createElement("br",null),l.createElement("br",null),l.createElement("p",{className:a.W2.os},"By continuing, you confirm you have read and agree to Circel's Terms."),l.createElement("br",null),l.createElement("br",null),l.createElement("span",{id:"errorRenderSpace",className:a.W2.os,style:{color:"var(--red)"}})),l.createElement("div",{className:a.W2.nf,id:"halvedPageSignUp2"},l.createElement("br",null),l.createElement("br",null),l.createElement("br",null),l.createElement("br",null),l.createElement("br",null),l.createElement("h1",{className:a.W2.k9,style:{fontSize:"2.5vw",color:"white"}},"Sign up a different way"),l.createElement(a.kq,{styles:{width:"25vw",textAlign:"left",color:"white"},onClick:function(){a.mN().then((function(e){"success"==e?window.open(window.location.href.split("=")[1],"_self"):(console.log(e),"auth/popup-blocked"==e?r.render(l.createElement("span",null,"You need to allow the popup to log in with Google."),document.getElementById("errorRenderSpace")):"auth/wrong-password"==e?r.render(l.createElement("span",null,"That password doesn't match your Circel ID - please try again."),document.getElementById("errorRenderSpace")):"auth/user-disabled"==e?r.render(l.createElement("span",null,"This Circel account has been disabled."),document.getElementById("errorRenderSpace")):r.render(l.createElement("span",null,"An error occurred (",l.createElement("code",null,e.split("/")[1]),")"),document.getElementById("errorRenderSpace")))}))},text:l.createElement("p",null," ",l.createElement(c.G,{icon:o.xYR})," Sign up with Google ")}),l.createElement("br",null),l.createElement("br",null),l.createElement(a.kq,{styles:{width:"25vw",textAlign:"left",color:"white"},onClick:function(){a.TG().then((function(e){"success"==e?window.open(window.location.href.split("=")[1],"_self"):(console.log(e),"auth/popup-blocked"==e?r.render(l.createElement("span",null,"You need to allow the popup to log in with Twitter."),document.getElementById("errorRenderSpace")):"auth/wrong-password"==e?r.render(l.createElement("span",null,"That password doesn't match your Circel ID - please try again."),document.getElementById("errorRenderSpace")):"auth/user-disabled"==e?r.render(l.createElement("span",null,"This Circel account has been disabled."),document.getElementById("errorRenderSpace")):r.render(l.createElement("span",null,"An error occurred (",l.createElement("code",null,e.split("/")[1]),")"),document.getElementById("errorRenderSpace")))}))},text:l.createElement("p",null," ",l.createElement(c.G,{icon:o.mdU})," Sign up with Twitter ")}),l.createElement("br",null),l.createElement("br",null)))}))}}}]);
//# sourceMappingURL=component---src-pages-signup-js-ffa76565e5f5ff442e00.js.map