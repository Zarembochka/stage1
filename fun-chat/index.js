(()=>{"use strict";var t,e={d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};e.d({},{y:()=>d});class s{constructor(t){this.element=document.createElement(t.tag),this.createElement(t)}createElement(t){t.classNames.forEach((t=>{var e;return null===(e=this.element)||void 0===e?void 0:e.classList.add(t)})),t.text&&(this.element.textContent=t.text)}getElement(){return this.element}appendElement(t){var e;null===(e=this.element)||void 0===e||e.append(t)}removeElement(){this.element.remove()}}!function(t){t[t.home=0]="home",t[t.login=1]="login",t[t.main=2]="main"}(t||(t={}));const n={"/login":{path:"login",view:t.login},"/main":{path:"main",view:t.main}},r=new class{constructor(t){this.config=n,this.pathSegmentsToKeep=t,this.addListenerToWindow()}redirectToLogin(){this.goTo(this.config["/login"])}start(){const t=window.location.pathname;["/login","/main"].includes(t)?this.goTo(this.config["/login"]):this.redirectToLogin()}main(){this.goTo(this.config["/main"])}goTo(t){const e=window.location.pathname.split("/").slice(1,this.pathSegmentsToKeep+1).join("/");history.pushState({},"",`/${e}/${t.path}`),console.log(`/${e}/${t.path}`),d.render(t.view)}addListenerToWindow(){window.addEventListener("popstate",(()=>{console.log(window.location.pathname)})),window.addEventListener("DOMContentLoaded",(()=>{this.goTo(this.config["/login"])}))}}(2);function i(t,e,s){const n=t.value.trim();if(!1===e.test(n)){t.classList.remove("form__login__item-valid"),t.classList.add("form__login__item-notvalid");const e=t.nextElementSibling;return e&&(e.textContent=s),!1}return t.classList.add("form__login__item-valid"),!0}function a(t){return!(!function(t,e){if(!t.value.trim().length){t.classList.remove("form__login__item-valid"),t.classList.add("form__login__item-notvalid");const e=t.nextElementSibling;return e&&(e.textContent="The field is required!"),!1}return t.classList.add("form__login__item-valid"),!0}(t)||"text"===t.type&&!i(t,/^[a-zA-Z-]+$/,"Only English letters and the hyphen ara allowed")||!i(t,/.{4}/,"The field should contain minimal 4 characters"))}class o extends s{constructor(){super({tag:"form",classNames:["login__form"]}),this.user=this.createFormInputElement(["login__form__input"],"login_login","text"),this.password=this.createFormInputElement(["login__form__input","login__form__input-password"],"login_password","password"),this.btnLogin=this.createFormSubmitElement(),this.prepareForm()}createFormSubmitElement(){const t=new s({tag:"button",classNames:["btn","btn-login"],text:"Login"}).getElement();return t.addEventListener("click",(t=>this.login(t))),t}createFormInputElement(t,e,n){const r=new s({tag:"input",classNames:t}).getElement();return r.id=e,r.required=!0,r.type=n,r.addEventListener("focusin",(()=>function(t){t.classList.remove("form__login__item-notvalid");const e=t.nextElementSibling;e&&(e.textContent="")}(r))),r.addEventListener("focusout",(()=>function(t){a(t)}(r))),r}prepareForm(){const t=this.createFormItem("Login",this.user,"login_login"),e=this.createFormItem("Password",this.password,"login_password");this.getElement().append(t,e,this.btnLogin)}createFormItem(t,e,s){const n=this.createFormItemWrapper(),r=this.createFormLabel(t,s),i=this.createFormMessage();return n.append(r,e,i),n}createFormItemWrapper(){return new s({tag:"div",classNames:["login__form__item"]}).getElement()}createFormLabel(t,e){const n=new s({tag:"label",classNames:["login__form__item__label"],text:t}).getElement();return n.setAttribute("for",e),n}createFormMessage(){return new s({tag:"span",classNames:["login__form__item__message"]}).getElement()}login(t){t.preventDefault(),function(t){for(let e=0;e<t.length;e+=1)if(!a(t[e]))return!1;return!0}([this.user,this.password])&&r.main()}}class l{constructor(){this.container=new s({tag:"div",classNames:["container","container__login"]}).getElement(),this.loginForm=new o,this.createPage()}createPage(){this.container.append(this.loginForm.getElement())}getPage(){return this.container}}class c extends s{constructor(){super({tag:"footer",classNames:["footer"]}),this.rsschool=this.createFooterItem("https://rs.school/",'<svg class="footer__ico" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 552.8 205.3" width="100px"><style>.st0{fill:#fff}.st1{clip-path:url(#SVGID_2_)}.st2{clip-path:url(#SVGID_4_)}.st3{clip-path:url(#SVGID_6_)}.st4{clip-path:url(#SVGID_8_)}.st5{fill:#fff;stroke-width:4;stroke-miterlimit:10}.st6{clip-path:url(#SVGID_8_)}.st6,.st7{fill:none;stroke:#000;stroke-width:4;stroke-miterlimit:10}.st8,.st9{clip-path:url(#SVGID_10_)}.st9{fill:none;stroke:#000;stroke-width:4;stroke-miterlimit:10}</style><title>rs_school_js</title><path d="M285.4 68l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.9 3.6 6.9 5.4 12.2 5.4 3.9 0 7-.9 9.1-2.8 2-1.5 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.1-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4 6 4.2 9.6 11 10.7 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8s-5.3-2.8-9.2-2.8c-3.2 0-5.6.7-7.2 2-1.5 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.5 13.3 0 5.6-1.6 11.2-4.8 15.9-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8S286.1 77 285.4 68zM6.3 97.6V8.2h46.1c8.5 0 15.1.7 19.6 2.2 4.4 1.4 8.3 4.3 10.9 8.2 2.9 4.3 4.3 9.3 4.2 14.5.3 8.8-4.2 17.2-11.9 21.6-3 1.7-6.3 2.9-9.7 3.5 2.5.7 5 1.9 7.2 3.3 1.7 1.4 3.1 3 4.4 4.7 1.5 1.7 2.8 3.6 3.9 5.6l13.4 25.9H63L48.2 70.2c-1.9-3.5-3.5-5.8-5-6.9-2-1.4-4.4-2.1-6.8-2.1H34v36.3H6.3zM34 44.4h11.7c2.5-.2 4.9-.6 7.3-1.2 1.8-.3 3.4-1.3 4.5-2.8 2.7-3.6 2.3-8.7-1-11.8-1.8-1.5-5.3-2.3-10.3-2.3H34v18.1zM0 174.2l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.8 3.6 6.9 5.5 12.2 5.5 3.9 0 7-.9 9.1-2.8 2-1.6 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.2-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4s9.5 11 10.6 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8-2.2-1.9-5.3-2.8-9.2-2.7-3.2 0-5.6.7-7.2 2.1-1.6 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.6 13.2 0 5.6-1.7 11.1-4.8 15.8-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8-5.9-6-9.2-13.4-10-22.4z"/><path d="M133 167.2l24.2 7.3c-1.3 6.1-4 11.9-7.7 17-3.4 4.5-7.9 8-13 10.3-5.2 2.3-11.8 3.5-19.8 3.5-9.7 0-17.7-1.4-23.8-4.2-6.2-2.8-11.5-7.8-16-14.9-4.5-7.1-6.7-16.2-6.7-27.3 0-14.8 3.9-26.2 11.8-34.1s19-11.9 33.4-11.9c11.3 0 20.1 2.3 26.6 6.8 6.4 4.6 11.2 11.6 14.4 21l-24.4 5.4c-.6-2.1-1.5-4.2-2.7-6-1.5-2.1-3.4-3.7-5.7-4.9-2.3-1.2-4.9-1.7-7.5-1.7-6.3 0-11.1 2.5-14.4 7.6-2.5 3.7-3.8 9.6-3.8 17.6 0 9.9 1.5 16.7 4.5 20.4 3 3.7 7.2 5.5 12.7 5.5 5.3 0 9.3-1.5 12-4.4 2.7-3.1 4.7-7.4 5.9-13zm56.5-52.8h27.6v31.3h30.2v-31.3h27.8v89.4h-27.8v-36.2h-30.2v36.2h-27.6v-89.4z"/><path d="M271.3 159.1c0-14.6 4.1-26 12.2-34.1 8.1-8.1 19.5-12.2 34-12.2 14.9 0 26.3 4 34.4 12S364 144 364 158.4c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8s4.9-10.8 4.9-20.8c0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-.2-10 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5zm93.4-.1c0-14.6 4.1-26 12.2-34.1 8.1-8.1 19.5-12.2 34-12.2 14.9 0 26.4 4 34.4 12S485 144 485 158.4c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8 3.3-3.9 4.9-10.8 4.9-20.8 0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-.2-10.1 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5z"/><path d="M482.1 114.4h27.6v67.4h43.1v22H482v-89.4z"/><ellipse transform="rotate(-37.001 420.46 67.88)" class="st0" cx="420.5" cy="67.9" rx="63" ry="51.8"/><defs><ellipse id="SVGID_1_" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_" overflow="visible"/></clipPath><g class="st1"><path transform="rotate(-37.001 420.82 68.353)" class="st0" d="M330.9-14.2h179.8v165.1H330.9z"/><g id="Layer_2_1_"><defs><path id="SVGID_3_" transform="rotate(-37.001 420.82 68.353)" d="M330.9-14.2h179.8v165.1H330.9z"/></defs><clipPath id="SVGID_4_"><use xlink:href="#SVGID_3_" overflow="visible"/></clipPath><g id="Layer_1-2" class="st2"><ellipse transform="rotate(-37.001 420.46 67.88)" class="st0" cx="420.5" cy="67.9" rx="63" ry="51.8"/><defs><ellipse id="SVGID_5_" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/></defs><clipPath id="SVGID_6_"><use xlink:href="#SVGID_5_" overflow="visible"/></clipPath><g class="st3"><path transform="rotate(-37 420.799 68.802)" class="st0" d="M357.8 17h125.9v103.7H357.8z"/><defs><path id="SVGID_7_" transform="rotate(-37 420.799 68.802)" d="M357.8 17h125.9v103.7H357.8z"/></defs><clipPath id="SVGID_8_"><use xlink:href="#SVGID_7_" overflow="visible"/></clipPath><g class="st4"><ellipse transform="rotate(-37.001 420.46 67.88)" class="st5" cx="420.5" cy="67.9" rx="63" ry="51.8"/></g><path transform="rotate(-37 420.799 68.802)" class="st6" d="M357.8 17h125.9v103.7H357.8z"/><ellipse transform="rotate(-37.001 420.46 67.88)" class="st7" cx="420.5" cy="67.9" rx="63" ry="51.8"/><path transform="rotate(-37 420.799 68.802)" class="st0" d="M357.8 17h125.9v103.7H357.8z"/><defs><path id="SVGID_9_" transform="rotate(-37 420.799 68.802)" d="M357.8 17h125.9v103.7H357.8z"/></defs><clipPath id="SVGID_10_"><use xlink:href="#SVGID_9_" overflow="visible"/></clipPath><g class="st8"><ellipse transform="rotate(-37.001 420.46 67.88)" class="st5" cx="420.5" cy="67.9" rx="63" ry="51.8"/></g><path transform="rotate(-37 420.799 68.802)" class="st9" d="M357.8 17h125.9v103.7H357.8z"/><path transform="rotate(-37.001 420.82 68.353)" class="st7" d="M330.9-14.2h179.8v165.1H330.9z"/></g><ellipse transform="rotate(-37.001 420.46 67.88)" class="st7" cx="420.5" cy="67.9" rx="63" ry="51.8"/><path d="M392.4 61.3l10-7 12.3 17.5c2.1 2.8 3.7 5.8 4.9 9.1.7 2.5.5 5.2-.5 7.6-1.3 3-3.4 5.5-6.2 7.3-3.3 2.3-6.1 3.6-8.5 4-2.3.4-4.7 0-6.9-1-2.4-1.2-4.5-2.9-6.1-5.1l8.6-8c.7 1.1 1.6 2.1 2.6 2.9.7.5 1.5.8 2.4.8.7 0 1.4-.3 1.9-.7 1-.6 1.7-1.8 1.6-3-.3-1.7-1-3.4-2.1-4.7l-14-19.7zm30 11.1l9.1-7.2c1 1.2 2.3 2.1 3.7 2.6 2 .6 4.1.2 5.8-1.1 1.2-.8 2.2-1.9 2.6-3.3.6-1.8-.4-3.8-2.2-4.4-.3-.1-.6-.2-.9-.2-1.2-.1-3.3.4-6.4 1.7-5.1 2.1-9.1 2.9-12.1 2.6-2.9-.3-5.6-1.8-7.2-4.3-1.2-1.7-1.8-3.7-1.9-5.7 0-2.3.6-4.6 1.9-6.5 1.9-2.7 4.2-5 7-6.8 4.2-2.9 7.9-4.3 11.1-4.3 3.2 0 6.2 1.5 9 4.6l-9 7.1c-1.8-2.3-5.2-2.8-7.5-1l-.3.3c-1 .6-1.7 1.5-2.1 2.6-.3.8-.1 1.7.4 2.4.4.5 1 .9 1.7.9.8.1 2.2-.3 4.2-1.2 5-2.1 8.8-3.3 11.4-3.7 2.2-.4 4.5-.2 6.6.7 1.9.8 3.5 2.2 4.6 3.9 1.4 2 2.2 4.4 2.3 6.9.1 2.6-.6 5.1-2 7.3-1.8 2.7-4.1 5-6.8 6.8-5.5 3.8-10 5.4-13.6 4.8-3.9-.6-7.1-2.6-9.4-5.5z"/></g></g></g></svg>'),this.github=this.createFooterItem("https://github.com/Zarembochka",'<svg class="footer__ico" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="64px" height="64px"><path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"/></svg>'),this.year=this.createYear(),this.prepareFooter()}prepareFooter(){this.getElement().append(this.rsschool,this.year,this.github)}createFooterItem(t,e){const n=new s({tag:"a",classNames:["footer__item"]}).getElement();return n.href=t,n.setAttribute("target","_blank"),n.innerHTML=e,n}createYear(){return new s({tag:"span",classNames:["footer__item"],text:"2024"}).getElement()}}class h extends s{constructor(){super({tag:"header",classNames:["header"]}),this.title=this.createTitle(),this.btnLogout=this.createBtnLogout(),this.prepareHeader()}prepareHeader(){this.getElement().append(this.title,this.btnLogout)}createTitle(){return new s({tag:"h1",classNames:["header__title"],text:"Fun-chat"}).getElement()}createBtnLogout(){return new s({tag:"button",classNames:["btn","btn-logout"],text:"Logout"}).getElement()}setUserName(t){this.title.textContent=`Fun-chat: ${t}`}}class m extends s{constructor(){super({tag:"main",classNames:["main"]})}}class g{constructor(){this.container=new s({tag:"div",classNames:["container","container__main"]}).getElement(),this.header=new h,this.main=new m,this.footer=new c,this.createPage()}createPage(){this.container.append(this.header.getElement(),this.main.getElement(),this.footer.getElement())}getPage(){return this.container}}!function(t){if("/"===t.search[1]){const e=t.search.slice(1).split("&").map((function(t){return t.replace(/~and~/g,"&")})).join("?"),s=t.pathname.slice(0,-1)+e+t.hash;window.history.replaceState(null,"",s)}}(window.location);const d=new class{constructor(){this.loginPage=new l,this.mainPage=new g}renderPage(t){document.body.innerHTML="",document.body.append(t.getPage())}render(e){e!==t.login?this.renderPage(this.mainPage):this.renderPage(this.loginPage)}};r.start()})();