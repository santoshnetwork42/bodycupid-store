// import React, { useEffect } from "react";
// import Script from "next/script";
// import { connect } from "react-redux";

// import { CUSTOMER_GLU_KEY } from "~/config";

// function CustomerGlu({ user }) {
//   useEffect(() => {
//     if (user) {
//       if (typeof window !== "undefined" && window.glu) {
//         window.glu.register(CUSTOMER_GLU_KEY, { userId: user.id }, {});
//       }
//     }
//   }, [user]);

//   return (
//     <>
//       <Script
//         strategy="afterInteractive"
//         type="text/javascript"
//         dangerouslySetInnerHTML={{
//           __html: `window["gluConfig"] = {
//             writeKey: "${CUSTOMER_GLU_KEY}",  //provided by CustomerGlu
//             userIdentification: {
//               userId: null
//             },
//             userAttributes: {
//               gluAttributes: {},        //add CG reserved user properties here (key-value pair)
//               customAttributes: {}      //add all your custom user properties here (key-value pair) 
//             },
//             onLoadError: function () {  //error handling function if SDK fails to load
//               console.log("error"); 
//             }
//           }`,
//         }}
//       />

//       <Script
//         strategy="afterInteractive"
//         type="text/javascript"
//         dangerouslySetInnerHTML={{
//           __html: `
//             (()=>{"use strict";!function(){const e=window.gluConfig||{},t=[],o={open:{returnPromise:!0,callMethod:"open"},close:{returnPromise:!1,callMethod:"close"},register:{returnPromise:!1,callMethod:"register"},listenToAnalytics:{returnPromise:!1,callMethod:"listenToAnalytics"},getCampaignDetails:{returnPromise:!0,callMethod:"getCampaignDetails"}},r=["open","close","register","listenToAnalytics","getCampaignDetails"],n={};for(let e=0;e<r.length;e++)n[r[e]]=function(){const n=o[r[e]],s=Array.prototype.slice.call(arguments);if(n.returnPromise)return new Promise(((e,o)=>{t.push({callMethod:n.callMethod,arguments:s.concat({resolve:e,reject:o}),isPromise:!0})}));t.push({callMethod:n.callMethod,arguments:s})};let s=document.createElement("script");s.type="text/javascript",s.async=!0,s.src="https://assets.customerglu.com/scripts/sdk/v4.6/sdk.js",s.onload=function(){const o=new window.CustomerGlu(e.writeKey,e.userIdentification,e.userAttributes);for(let e=0;e<t.length;e++)o[t[e].callMethod](...t[e].arguments);window.glu=o},s.onerror=function(){if(t&&t.length){for(let e=0;e<t.length;e++)t[e].isPromise&&t[e].arguments[t[e].arguments.length-1]("GLU_SDK_LOAD_ERROR");e.onLoadError&&e.onLoadError()}},document.getElementsByTagName("body")[0].appendChild(s),window.glu=n}()})();
//       `,
//         }}
//       />
//     </>
//   );
// }

// function mapStateToProps(state) {
//   return {
//     user: state.user.data,
//   };
// }

// export default connect(mapStateToProps)(CustomerGlu);
