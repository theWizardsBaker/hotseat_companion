(function(e){function t(t){for(var n,a,i=t[0],c=t[1],u=t[2],l=0,d=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&d.push(s[a][0]),s[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);p&&p(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,a=1;a<r.length;a++){var i=r[a];0!==s[i]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},a={app:0},s={app:0},o=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-581adbb8":"f2386f25"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(e){var t=[],r={"chunk-581adbb8":1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=new Promise((function(t,r){for(var n="css/"+({}[e]||e)+"."+{"chunk-581adbb8":"d43588ea"}[e]+".css",s=c.p+n,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var u=o[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===s))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],l=u.getAttribute("data-href");if(l===n||l===s)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var n=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete a[e],p.parentNode.removeChild(p),r(o)},p.href=s;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var n=s[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,r){n=s[e]=[t,r]}));t.push(n[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var r=s[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",d.name="ChunkLoadError",d.type=n,d.request=a,r[1](d)}s[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},1:function(e,t){},"3f39":function(e,t,r){"use strict";var n=r("da94"),a=r.n(n);a.a},"56d7":function(e,t,r){"use strict";r.r(t);r("4de4"),r("fb6a"),r("0d03"),r("d3b7"),r("25f0"),r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],staticClass:"hero is-dark"},[r("loading")],1),r("router-view",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],on:{toggleLoading:function(t){e.isLoading=!e.isLoading}}})],1)},s=[],o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"load-container"},[r("div",{staticClass:"loader"},[e._v(" Loading... ")])])}],c={name:"loading",data:function(){return{}}},u=c,l=(r("9404"),r("2877")),d=Object(l["a"])(u,o,i,!1,null,"1457225c",null),p=d.exports,f={name:"App",components:{Loading:p},data:function(){return{isLoading:!1}}},m=f,g=Object(l["a"])(m,a,s,!1,null,null,null),h=g.exports,y=r("8c4f"),v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"hero is-dark is-medium"},[r("div",{staticClass:"hero-body"},[r("h4",{staticClass:"title is-1 has-text-centered"},[e._v(" Hot Seat ")]),r("h4",{staticClass:"subtitle has-text-centered"},[e._v(" Start a new game or enter a game key to join another player's ")]),r("div",{staticClass:"columns is-mobile is-3 is-centered is-multiline"},e._l(e.gameOptions,(function(t){return r("div",{key:t.name,staticClass:"column is-narrow-mobile is-narrow-tablet"},[r("card",{attrs:{display:t.display},scopedSlots:e._u([{key:"title",fn:function(){return[e._v(" "+e._s(t.name)+" ")]},proxy:!0},{key:"content",fn:function(){return[e._v(" "+e._s(t.text)+" ")]},proxy:!0},{key:"footer",fn:function(){return[t.hasOwnProperty("userName")?r("div",{staticClass:"field"},[r("label",{staticClass:"label help"},[e._v("Name")]),r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"option.userName"}],staticClass:"input",class:{"is-danger":t.error},attrs:{type:"text",name:"room",length:"25",disabled:e.gameSelected},domProps:{value:t.userName},on:{input:function(r){r.target.composing||e.$set(t,"userName",r.target.value)}}})])]):e._e(),t.hasOwnProperty("gameKey")?r("div",{staticClass:"field"},[r("label",{staticClass:"label help"},[e._v("Game Key")]),r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.gameKey,expression:"option.gameKey"}],staticClass:"input",class:{"is-danger":t.error},attrs:{type:"text",name:"room",disabled:e.gameSelected,length:"10",hint:"game key"},domProps:{value:t.gameKey},on:{input:function(r){r.target.composing||e.$set(t,"gameKey",r.target.value)}}})])]):e._e(),r("div",{staticClass:"field"},[r("div",{staticClass:"control"},[r("button",{staticClass:"button is-fullwidth",attrs:{disabled:e.gameSelected},on:{click:function(r){return e.handleSelection(t)}}},[e._v(" "+e._s(e._f("capitalize")(t.action))+" Game ")])])])]},proxy:!0}],null,!0)})],1)})),0),r("div",{},[r("h3",{staticClass:"title is-4 has-text-danger has-text-centered"},[e._v(" "+e._s(e.errorMessage)+" ")])])])])},_=[],E=(r("a4d3"),r("7db0"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b"),r("2fa7")),b=r("ae8d"),O=r("2f62");function C(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?C(r,!0).forEach((function(t){Object(E["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):C(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w={name:"GameSelect",components:{Card:b["a"]},mounted:function(){for(var e=this,t=function(t){e.delay(800+300*t).then((function(){e.$set(e.gameOptions[t],"display",!0)}))},r=0;r<this.gameOptions.length;r++)t(r)},data:function(){return{gameSelected:!1,errorMessage:"",gameOptions:[{name:"Create Game",action:"create",text:"Create a new game.",error:!1,display:!1,userName:"",selected:!1,spectate:!1},{name:"Join Game",action:"join",text:"Join another user's game.",error:!1,display:!1,gameKey:"",userName:"",selected:!1,spectate:!1},{name:"Spectate Game",action:"spectate",text:"Watch another user's game.",error:!1,display:!1,gameKey:"",selected:!1,spectate:!0}]}},watch:{gameKey:function(e){e&&this.playGame()}},computed:S({},Object(O["c"])(["gameKey"]),{selectedOption:function(){return this.gameOptions.find((function(e){return e.selected}))}}),methods:{handleSelection:function(e){var t=this;if(this.errorMessage="",e.error=!1,e.hasOwnProperty("userName")&&(e.error=""==e.userName||0==e.userName.length),e.hasOwnProperty("gameKey")&&(e.error=e.error||""==e.gameKey||0==e.gameKey.length),!e.error){this.gameSelected=!0,e.selected=!0;var r={userId:null,name:e.userName,gameKey:e.gameKey,spectate:e.spectate},n="create"===e.action?"create_game":"join_game";this.$socket.client.emit(n,r,(function(n){n.error?t.showError(n.data.message):(r.userId=n.data.userId,r.gameKey=n.data.gameKey,t.$store.dispatch("create"===e.action?"newGame":"joinGame",r))}))}},playGame:function(){this.$router.push({name:"play",params:{gameKey:this.$store.getters.gameKey}})},showError:function(e){this.selectedOption.error=!0,this.selectedOption.selected=!1,this.errorMessage=e,this.gameSelected=!1}}},P=w,k=(r("e262"),Object(l["a"])(P,v,_,!1,null,"34a2a8ee",null)),I=k.exports;r("caad"),r("4e82"),r("b0c0"),r("2532");n["a"].use(O["a"]);var T=new O["a"].Store({state:{game:{key:null,host:!1,connected:!1,synced:!1,stage:0,round:0,hotseat:0},user:{id:"",spectator:!1},players:[],questions:[]},getters:{synced:function(e){var t=e.game;return t.synced},player:function(e){var t=e.players,r=e.user;return t.find((function(e){return e.userId===r.id}))},gameKey:function(e){var t=e.game;return t.key},activePlayers:function(e){var t=e.players,r=t.filter((function(e){return e.active}));return r.sort((function(e,t){return t.order-e.order}))},allPlayers:function(e){var t=e.players;return t.filter((function(e){return!e.spectator})).sort((function(e,t){return e.order-t.order}))},isHost:function(e){var t=e.game;return t.host},inGame:function(e){var t=e.game;return t.key&&t.connected},hotSeatPlayer:function(e){var t=e.game,r=e.players;return r.find((function(e){return e.order===t.hotseat}))},inHotSeat:function(e,t){var r=e.user,n=t.hotSeatPlayer;return!!n&&r.id===n.userId},currentQuestion:function(e){var t=e.questions;return t[t.length-1]},answers:function(e,t){var r=t.currentQuestion;return r?r.answers:[]},answersRemaining:function(e,t){var r=t.currentQuestion,n=t.activePlayers;return r&&n?n.length-r.answers.length:0},answerPicksRemaining:function(e,t){var r=t.currentQuestion,n=t.activePlayers,a=0;return r&&n&&r.answers.forEach((function(e){a+=e.picks.length})),n.length-1-a},gameWinner:function(e,t){var r=t.player,n=t.activePlayers,a=n.sort((function(e,t){return t.score-e.score}));return a.length>0?a[0].userId===r.userId:null}},mutations:{INCREMENT_STAGE:function(e,t){e.game.stage+=t},START_GAME:function(e,t){e.game={host:t.host,key:t.player.gameKey,score:0,round:0,stage:0,hotseat:0,connected:t.connected,synced:t.synced},e.user={id:t.player.userId,spectator:!1},e.players=[],e.questions=[]},ACTIVATE_PLAYERS:function(e){e.players.forEach((function(e){e.spectator||(e.active=!0)}))},QUIT_GAME:function(e,t){if(t){var r=e.players.find((function(t){return t.userId===e.user.id}));this._vm.$socket.client.emit("quit_game",{gameKey:e.game.key,user:e.user,name:r.name})}e.game={key:null,host:!1,connected:!1,synced:!1,stage:0,round:0,hotseat:0},e.user={id:"",spectator:!1},e.players=[],e.questions=[]},COMPUTE_SCORES:function(e,t){var r=[],a={};e.questions[e.questions.length-1].answers.forEach((function(e){e.correct?(a[e.player.userId]=4,r.push(e.player.userId)):(t.userId===e.player.userId&&e.picks.forEach((function(e){a.hasOwnProperty(e.userId)?a[e.userId]+=2:a[e.userId]=2})),a.hasOwnProperty(e.player.userId)?a[e.player.userId]+=e.picks.length:a[e.player.userId]=e.picks.length,e.extraPoints&&(a[e.player.userId]+=2))})),e.players.forEach((function(e){var t=0;t=r.length>0?r.includes(e.userId)?a[e.userId]:0:a[e.userId]||0,n["a"].set(e,"score",e.score+t),n["a"].set(e,"scoreChange",t)}))},SOCKET_REORDER_PLAYERS:function(e,t){e.players.forEach((function(e){e.order=t.playerOrder[e.userId]}))},SOCKET_ANSWERS_ADJUDICATED:function(e,t){for(var r=e.questions[e.questions.length-1].answers,a=r.length-1;a>0;a-=1){var s=Math.floor(Math.random()*(a+1)),o=r[a];t.correct.includes(o.player.userId)&&n["a"].set(o,"correct",!0),t.duplicates.includes(o.player.userId)&&n["a"].set(o,"duplicate",!0),t.extraPoints===o.player.userId&&n["a"].set(o,"extraPoints",!0),r[a]=r[s],r[s]=o}},SOCKET_ANSWER_SELECTED:function(e,t){e.questions[e.questions.length-1].answers.forEach((function(e){for(var r=0;r>e.picks.length;r++)if(e.picks[r].userId===e.player.userId){n["a"].delete(e.picks,r),r=e.picks.length;break}e.player.userId===t.answer.player.userId&&e.picks.push(t.player)}))},SOCKET_ANSWER_ADDED:function(e,t){t.picks=[],e.questions[e.questions.length-1].answers.push(t)},SOCKET_QUESTION_ADDED:function(e,t){t.answers=[],e.questions.push(t)},PLAYER_JOINED:function(e,t){n["a"].set(t,"order",e.players.length),n["a"].set(t,"score",0),n["a"].set(t,"hotseat",!1),n["a"].set(t,"active",!1),n["a"].set(t,"spectator",t.spectator||!1),e.players.push(t)},SOCKET_SEND_GAME_STATE:function(e,t){var r=e.game,n=e.questions,a=e.players;r.host&&this._vm.$socket.client.emit("game_state",{questions:n,players:a,stage:r.stage,round:r.round,gameKey:r.key})},SOCKET_GAME_STATE:function(e,t){e.game.host||(e.players=t.players,e.questions=t.questions,e.game.stage=t.stage,e.game.round=t.round,e.game.synced=!0)},SOCKET_PLAYER_ACTIVATE:function(e,t){var r=e.players,n=(e.game,r.find((function(e){return e.id===t.id})));n.active=!0},SOCKET_NEW_ROUND:function(e){e.game.round++,e.game.stage=0,e.game.hotseat++;var t=e.players.filter((function(e){return!e.spectator}));e.game.hotseat>=t.length&&(e.game.hotseat=0)},SOCKET_PLAYER_QUIT:function(e,t){var r=0;e.players.forEach((function(e,n){e.userId===t.user.id&&(r=n)})),n["a"].delete(e.players,r),e.players.length>0&&e.players[0].userId===e.user.id&&(e.game.host=!0),e.players.length>=e.game.hotseat&&(e.game.hotseat=e.players.length-1)}},actions:{newGame:function(e,t){var r=e.commit;r("START_GAME",{player:t,host:!0,connected:!0,synced:!0}),r("PLAYER_JOINED",t)},joinGame:function(e,t){var r=e.commit;r("START_GAME",{player:t,host:!1,connected:!0,synced:!1})},activatePlayers:function(e){var t=e.commit;t("ACTIVATE_PLAYERS")},incrementStage:function(e,t){var r=e.commit;r("INCREMENT_STAGE",t)},quitGame:function(e){var t=e.commit;t("QUIT_GAME",!0)},endGame:function(e){var t=e.commit;t("QUIT_GAME",!1)},computeScores:function(e){var t=e.commit,r=e.getters;t("COMPUTE_SCORES",r.hotSeatPlayer)},socket_playerJoined:function(e,t){var r=e.commit;r("PLAYER_JOINED",t)},socket_playerSpectate:function(e,t){var r=e.commit;r("PLAYER_JOINED",t)}}});n["a"].use(y["a"]);var A=[{path:"/",name:"gameselect",component:I},{path:"/play/:gameKey",name:"play",component:function(){return r.e("chunk-581adbb8").then(r.bind(null,"8363"))},meta:{requiresAuth:!0},beforeEnter:function(e,t,r){T.getters.inGame?r():r("/")}},{path:"*",redirect:{name:"gameselect"}}],N=new y["a"]({mode:"history",base:"/",routes:A}),x=N,K=r("8055"),j=r.n(K),G=r("f87c"),L=r("73e4"),R=r.n(L);r("fb98");n["a"].config.productionTip=!1;var D=j()("".concat("hotseat.justin-letourneau.dev"),{transports:["websocket","polling"]});n["a"].use(G["a"],D,{store:T}),n["a"].use(R.a,{timeout:4e3,progressBar:!0,layout:"topCenter"}),n["a"].filter("capitalize",(function(e){return e?(e=e.toString(),e.charAt(0).toUpperCase()+e.slice(1)):""})),n["a"].mixin({methods:{delay:function(e,t){return new Promise((function(r){setTimeout(r.bind(null,t),e)}))}}}),new n["a"]({router:x,store:T,render:function(e){return e(h)}}).$mount("#app")},9404:function(e,t,r){"use strict";var n=r("98fd"),a=r.n(n);a.a},"98fd":function(e,t,r){},a8b0:function(e,t,r){},ae8d:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card-container"},[r("div",{staticClass:"card",class:{flip:e.display}},[r("div",{staticClass:"box card-front"},[r("div",{staticClass:"playing-card-outline"},[r("h4",{staticClass:"title is-5 has-text-dark"},[e._t("title")],2),r("div",{staticClass:"playing-card-content"},[e._t("content")],2),r("div",{staticClass:"playing-card-footer"},[e._t("footer")],2),r("h6",{staticClass:"playing-card-brand"},[e._v(" hot seat ")])])]),e._m(0)])])},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box card-backing"},[r("h4",{staticClass:"title is-5"},[e._v("hot seat")]),r("div",{staticClass:"logo"},[e._v("🔥")])])}],s={name:"playing-card",props:{display:{type:Boolean,default:!1}},data:function(){return{}}},o=s,i=(r("3f39"),r("2877")),c=Object(i["a"])(o,n,a,!1,null,"570a19c6",null);t["a"]=c.exports},da94:function(e,t,r){},e262:function(e,t,r){"use strict";var n=r("a8b0"),a=r.n(n);a.a},fb98:function(e,t,r){}});
//# sourceMappingURL=app.370aa2aa.js.map