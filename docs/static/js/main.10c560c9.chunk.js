(this["webpackJsonpts-docuflux-angelic-theme"]=this["webpackJsonpts-docuflux-angelic-theme"]||[]).push([[0],{162:function(e,t,n){},163:function(e,t,n){},164:function(e,t,n){},165:function(e,t,n){},166:function(e,t,n){},167:function(e,t,n){},168:function(e,t,n){},219:function(e,t,n){},269:function(e,t,n){"use strict";n.r(t),n.d(t,"useBasePath",(function(){return me}));var a=n(154),r=n(65),c=n(51),i=n.n(c),l=n(75),o=n(0),u=n.n(o),m=n(15),s=n.n(m),d=(n(162),n(97),n(126)),h=n(272),f=n(273),p=(n(274),n(275),n(288),n(40)),g=(n(276),n(277),n(278));var v=n(280),E=n(286),b=n(283),y=(n(163),n(164),n(290)),k=n(29),w=n(76),j=n(281),x=n(279),O=n(127),_=n.n(O),N=(n(165),n(166),n(167),n(168),n(103)),M=n.n(N),C=n(128),I=n.n(C);function P(e){var t;return null===(t=window)||void 0===t?void 0:t.js_beautify(e,{indent_size:"4",indent_char:" ",max_preserve_newlines:"5",preserve_newlines:!0,keep_array_indentation:!0,break_chained_methods:!1,indent_scripts:"keep",brace_style:"collapse,preserve-inline",space_before_conditional:!0,unescape_strings:!0,jslint_happy:!0,end_with_newline:!0,wrap_line_length:"0",indent_inner_html:!0,comma_first:!1,e4x:!0,indent_empty_lines:!0})}M.a.registerLanguage("typescript",I.a);var S=function(e){return u.a.createElement("div",{className:"markdown-body ".concat(e.narrow?"narrow":""),dangerouslySetInnerHTML:{__html:(t=e.markdown,_.a.setOptions({highlight:function(e){var t=x.a((function(){return M.a.highlight("typescript",e).value}));return p.c(t)?e:t}})(t))}});var t},F=n(60),R=n(14),A=v.a.Header,B=v.a.Content,L=v.a.Sider,T={home:{key:1,exact:!0,path:"/home",title:"Home"},documentation:{key:2,path:"/documentation",title:"Documentation"},documentationPage:{key:2,path:"/documentation/:fn",title:"Documentation"}},z=Object(R.l)({theme:localStorage.getItem("ts-prime-theme")||"dark"});Object(R.f)((function(){localStorage.setItem("ts-prime-theme",z.theme)}));var D=Object(F.a)((function(){var e,t=Object(k.f)(),n=me(),a=[null===(e=Object.values(T).find((function(e){return e.path===t.path})))||void 0===e?void 0:e.key.toString()].filter(p.b);return u.a.createElement(A,{className:"header"},u.a.createElement(w.b,{to:"/home"},u.a.createElement("div",{className:"logo"},u.a.createElement("img",{alt:"logo",style:{width:100,height:"auto"},src:"".concat(n,"/logo.svg")}))),u.a.createElement(E.a,{theme:"light",mode:"horizontal",defaultSelectedKeys:a},u.a.createElement(E.a.Item,{key:T.home.key},u.a.createElement(w.b,{to:T.home.path},T.home.title)),u.a.createElement(E.a.Item,{key:T.documentation.key},u.a.createElement(w.b,{to:T.documentation.path},T.documentation.title))),u.a.createElement("div",{className:"flex"}),u.a.createElement("div",{style:{paddingRight:20}},u.a.createElement(y.a,{onChange:function(e){z.theme="dark"===z.theme?"light":"dark"},checked:"light"===z.theme,checkedChildren:"Dark",unCheckedChildren:"Light"})),"dark"===z.theme?u.a.createElement("div",null,u.a.createElement("a",{href:"https://github.com/digimuza/ts-prime"},u.a.createElement("img",{alt:"Github",style:{width:"auto",height:"30px"},src:"".concat(n,"/github.white.svg")}))):u.a.createElement("div",null,u.a.createElement("a",{href:"https://github.com/digimuza/ts-prime"},u.a.createElement("img",{alt:"Github",style:{width:"auto",height:"30px"},src:"".concat(n,"/github.svg")}))))})),G=function(e){var t;return u.a.createElement(v.a,{id:e.id,className:"".concat(null!==(t=e.className)&&void 0!==t?t:""),style:{padding:"0 24px 24px"}},u.a.createElement(B,{className:"content",style:{padding:24,margin:0,minHeight:280}},e.children))},H=function(e){var t;return u.a.createElement(v.a,{className:"".concat(null!==(t=e.className)&&void 0!==t?t:""," view"),style:{height:"calc(100vh - 64px)",overflow:"hidden",overflowY:"auto"}},e.children)},K=function(){var e=Object(k.e)();return e.location.pathname.includes("/documentation")||null!=Object.values(T).find((function(t){return e.location.pathname===t.path}))||e.replace(T.home.path),null},J=Object(F.a)((function(e){var t=me(),n=j.a(z.theme,["dark","light"])?z.theme:"dark";return u.a.createElement(w.a,{basename:t},u.a.createElement(v.a,{className:"ts-prime-".concat(n)},u.a.createElement(D,null),u.a.createElement(k.a,T.home,u.a.createElement(H,null,u.a.createElement(G,null,u.a.createElement(b.a,null,u.a.createElement(S,{markdown:e.readme,narrow:!0}))))),u.a.createElement(k.a,T.documentation,u.a.createElement(H,null,u.a.createElement(L,{width:400,className:"site-layout-background"},e.sideMenu),u.a.createElement(G,{id:"main-view"},e.children))),u.a.createElement(k.a,T.documentation,u.a.createElement(H,null,u.a.createElement(L,{width:400,className:"site-layout-background"},e.sideMenu),u.a.createElement(G,{id:"main-view"},e.children))),u.a.createElement(K,null)))})),Y=n(285),q=n(291),U=n(79),W=n(287);function Q(e){switch(e.toLowerCase()){case"p":return"#fa8c16";case"array":return"#1890ff";case"number":return"#006d75";case"type":return"#08979c";case"string":return"#7cb305";case"object":return"#13c2c2";case"function":return"#0050b3";case"guard":return"#003a8c";case"utility":return"#9e1068";default:return}}var V=Object(F.a)((function(e){var t=Object(k.e)(),n=e.groupedMembers,a=Object(o.useMemo)((function(){return n.flatMap((function(e){return W.a(e.members,(function(e){return e.name})).filter((function(e){return"Function"===e.kind})).filter((function(e){return e.name.includes(te.search)})).map((function(e){return u.a.createElement(E.a.Item,{key:e.canonicalReferenceGroup},u.a.createElement("div",{onClick:function(){t.replace("/documentation/".concat(e.name)),ne("#link-".concat(e.name))},key:e.canonicalReference,style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},u.a.createElement("div",null,u.a.createElement("strong",null,e.name)),u.a.createElement("div",null,e.tags.map((function(e){return"Pipe"===e.value?"P":e.value})).map((function(e){return u.a.createElement(q.a,{key:e,color:Q(e)},e)})))))}))}))}),[te.search]);return u.a.createElement("div",{className:"side-bar-content",style:{height:"calc(100vh - 64px - 72px)",overflow:"hidden",overflowY:"auto"}},u.a.createElement(E.a,{mode:"inline",defaultSelectedKeys:["1"],defaultOpenKeys:["sub1"],style:{height:"90%",borderRight:0}},a,0===a.length&&u.a.createElement(o.Fragment,null,u.a.createElement("div",{style:{height:30}}),u.a.createElement(U.a,null)),u.a.createElement("div",{style:{height:100}})))})),X=n(284),Z=n(282),$=(n(219),function(e){return u.a.createElement(b.a,{id:"link-".concat(e.docMember.name),key:"link-".concat(e.docMember.name),title:u.a.createElement(X.a.Title,{level:4},e.docMember.name),style:{width:"100%"},extra:e.docMember.tags.map((function(e){return"Pipe"===e.value?"P":e.value})).map((function(e){return u.a.createElement(q.a,{key:e,color:Q(e)},e)}))},u.a.createElement(S,{markdown:e.docMember.members[0].comment.description}),u.a.createElement("div",{style:{height:10}}),e.docMember.members[0].comment.parsed.filter((function(e){return"@warning"===e.tag})).map((function(e){return Array.isArray(e.content)?u.a.createElement("div",{key:e.tag,className:"warning"},u.a.createElement("div",{className:"dot"},"WARNING"),u.a.createElement("div",{className:"warning-text"},u.a.createElement(S,{markdown:e.content.join("\n")}))):null})),u.a.createElement("div",{style:{height:10}}),e.docMember.members[0].comment.parsed.filter((function(e){return"@description"===e.tag})).map((function(e){return Array.isArray(e.content)?u.a.createElement(S,{key:e.tag,markdown:e.content.join("\n")}):null})),u.a.createElement("div",{style:{height:10}}),u.a.createElement("div",null,u.a.createElement("div",null,Z.a(e.docMember.members,1).map((function(e){if(null==e.comment.example)return null;var t=P(e.comment.example);return u.a.createElement("div",{key:e.canonicalReference},u.a.createElement(S,{markdown:"\n```typescript\n".concat(P(t),"\n```\n")}))})))),u.a.createElement("div",{style:{height:10}}))}),ee=n(289),te=Object(R.l)({search:""});function ne(e){return ae.apply(this,arguments)}function ae(){return(ae=Object(l.a)(i.a.mark((function e(t){var n,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a(Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ee.a((function(){return document.getElementById("main-view")}),1e3));case 1:case"end":return e.stop()}}),e)}))));case 2:if(n=e.sent,!p.c(n)){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,x.a(Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ee.a((function(){return document.querySelector(t)}),3e3));case 1:case"end":return e.stop()}}),e)}))));case 7:if(a=e.sent,!p.c(a)){e.next=10;break}return e.abrupt("return");case 10:r=a.getBoundingClientRect().top,n.scrollTo({top:r+n.scrollTop-100,behavior:"auto"});case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var re=Object(F.a)((function(e){var t=function(e){return d.a(e,f.a((function(e){var t=e.tags.find((function(e){return"@category"===e.tag}));return null==t?"utils":t.value.toLowerCase()})),g.a,h.a((function(e){var t=Object(r.a)(e,2);return{group:t[0],members:t[1]}})))}(e.documentation.filter((function(e){return"Function"===e.kind})));return Object(o.useEffect)((function(){var e=window.location.hash.split("/").splice(-1)[0];ne("#link-".concat(e))}),[]),u.a.createElement(J,{readme:e.readme,sideMenu:u.a.createElement(o.Fragment,null,u.a.createElement("div",{style:{padding:10}},u.a.createElement(Y.a,{size:"large",placeholder:"Search",onKeyUp:function(e){return te.search=e.currentTarget.value}})),u.a.createElement(V,{groupedMembers:t}))},t.map((function(e){return u.a.createElement("div",{key:e.group},u.a.createElement("div",{key:e.group},e.members.map((function(e){return u.a.createElement(o.Fragment,{key:e.canonicalReference},u.a.createElement($,{key:e.canonicalReference,docMember:e}),u.a.createElement("div",{style:{height:10}}))}))))})))})),ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,292)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))},ie=n(153),le=n.n(ie),oe=(n(268),function(){var e=Object(l.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ee.a((function(){var e,t;return null===(e=document.getElementsByName("basePath"))||void 0===e||null===(t=e.item(0))||void 0===t?void 0:t.getAttribute("content")}),3e3);case 2:return t=e.sent,e.next=5,le.a.get("".concat(t,"/data/data.json"));case 5:return n=e.sent,e.abrupt("return",n.data);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),ue=Object(o.createContext)("");function me(){return Object(o.useContext)(ue)}function se(e,t){var n=Object(o.useState)(void 0),c=Object(r.a)(n,2),i=c[0],l=c[1];return Object(o.useEffect)((function(){e().then((function(e){l(e)}))}),Object(a.a)(t||[])),i}var de=function(){var e=se((function(){return oe()})),t=se((function(){return ee.a((function(){var e,t;return null===(e=document.getElementsByName("basePath"))||void 0===e||null===(t=e.item(0))||void 0===t?void 0:t.getAttribute("content")}),3e3)}));return null==t||null==e?null:u.a.createElement(ue.Provider,{value:t},u.a.createElement(re,{key:"app",documentation:e.docs,readme:e.articles.readme}))};s.a.render(u.a.createElement(de,null),document.getElementById("root")),ce()}},[[269,1,2]]]);
//# sourceMappingURL=main.10c560c9.chunk.js.map