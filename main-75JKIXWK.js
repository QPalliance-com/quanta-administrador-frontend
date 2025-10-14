import{a as mn,b as vr,c as yr,d as vt,e as Cr,f as kr,h as fn,i as xr,j as _r,l as wr,n as gn,o as bn}from"./chunk-IRXEGMFQ.js";import{C as wn,a as _n,e as yt,f as Po,g as Vo,h as Ct,i as kt,j as Ho,k as xt,l as _t,m as jo,n as wt,o as No,p as Uo,q as St,r as Wo,s as Qo,t as It,u as qo,v as Ko,w as Mt,x as Go,y as Zo,z as Qe}from"./chunk-I3NZ4ALC.js";import{$ as Ui,$a as bt,A as Ei,B as Ti,C as ae,Ca as _o,D as $i,Da as le,E as Ri,F as ur,Fa as Xi,G as Ai,Ga as Yi,H as Fi,Ha as Ji,I as pr,Ia as oo,J as ct,Ja as hr,K as Di,Ka as en,L as Li,La as We,M as zi,Ma as on,N as Oi,Na as tn,O as Pi,Oa as rn,Ob as kn,P as Vi,Pa as Oo,Pb as xn,Q as mr,Qa as nn,R as dt,Ra as an,S as Hi,Sa as sn,T as je,U as ut,V as ji,W as Ni,X as N,Xa as ln,Y as pt,Za as gt,_ as mt,_a as wo,a as ki,ab as cn,b as ie,ba as Wi,bb as Be,c as Ye,ca as Qi,cb as dn,d as ne,da as ft,e as Ue,ea as xo,f as co,fb as un,g as yo,h as j,hb as pn,i as sr,j as xi,ja as qi,k as _i,ka as Ki,la as fr,m as wi,n as Je,na as se,nb as ht,o as lr,p as Si,q as Ii,qa as gr,qb as to,ra as br,rb as So,s as Co,sb as uo,ta as Gi,u as st,ua as Zi,ub as hn,v as pe,vb as vn,w as eo,wb as yn,x as lt,xb as Cn,y as Mi,ya as Me,z as Bi}from"./chunk-7TB3GOBM.js";import{$ as ni,$a as nr,Ab as I,Ba as Ce,Bb as a,C as mo,Ca as $o,D as ce,Da as nt,Db as fi,Dc as J,E as Q,Eb as xe,Ec as Ze,F as tr,Fa as no,Fb as be,G as Xr,Ga as Ne,Gb as bo,Gc as P,Hb as ar,Hc as Xe,I as rt,Ib as Ao,J as Yr,Jb as Fo,K as Jr,Kb as l,La as di,Lb as c,Lc as ko,M as ei,Mb as g,Mc as Ve,N as rr,Nb as te,Oa as ui,Ob as re,Oc as he,P as ir,Pb as Ae,Pc as zo,Qb as V,Qc as He,Rc as cr,S as oi,Sb as $,Tb as u,Tc as dr,U as ti,Ub as gi,V as ri,Vb as bi,W as ii,Wb as at,Xb as ee,Y as To,Yb as H,Z as Ke,Zb as _,_ as q,_b as w,a as p,aa as ai,ab as Oe,b as m,ba as it,bc as Do,ca as S,cb as d,cc as x,d as ll,da as ye,dc as _e,ec as Lo,fa as ge,fb as pi,fc as hi,g as Eo,gb as Ro,gc as we,ha as O,hb as ue,hc as Se,ia as v,ib as mi,ic as Ie,j as $e,jc as Pe,k as Ur,ka as fo,kc as ho,l as Wr,la as si,lc as X,m as Qr,mc as vo,n as qr,nb as E,o as Kr,ob as ke,oc as vi,q as W,qc as yi,r as Gr,ra as C,rb as Re,sa as k,ta as Ge,tb as b,u as Zr,ua as go,uc as ao,v as M,va as de,vc as so,wc as lo,x as oe,xa as li,yc as Ci,za as ci}from"./chunk-7YWYLAAE.js";var cl="@",dl=(()=>{class e{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=v(li);loadingSchedulerFn=v(ul,{optional:!0});_engine;constructor(o,r,i,n,s){this.doc=o,this.delegate=r,this.zone=i,this.animationType=n,this.moduleImpl=s}ngOnDestroy(){this._engine?.flush()}loadImpl(){let o=()=>this.moduleImpl??import("./chunk-RGGFMN47.js").then(i=>i),r;return this.loadingSchedulerFn?r=this.loadingSchedulerFn(o):r=o(),r.catch(i=>{throw new ai(5300,!1)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:n})=>{this._engine=i(this.animationType,this.doc);let s=new n(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(o,r){let i=this.delegate.createRenderer(o,r);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=!1);let n=new Sr(i);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(s=>{let f=s.createRenderer(o,r);n.use(f),this.scheduler??=this.injector.get(ci,null,{optional:!0}),this.scheduler?.notify(10)}).catch(s=>{n.use(i)}),n}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}componentReplaced(o){this._engine?.flush(),this.delegate.componentReplaced?.(o)}static \u0275fac=function(r){mi()};static \u0275prov=S({token:e,factory:e.\u0275fac})}return e})(),Sr=class{delegate;replay=[];\u0275type=1;constructor(t){this.delegate=t}use(t){if(this.delegate=t,this.replay!==null){for(let o of this.replay)o(t);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(t,o){return this.delegate.createElement(t,o)}createComment(t){return this.delegate.createComment(t)}createText(t){return this.delegate.createText(t)}get destroyNode(){return this.delegate.destroyNode}appendChild(t,o){this.delegate.appendChild(t,o)}insertBefore(t,o,r,i){this.delegate.insertBefore(t,o,r,i)}removeChild(t,o,r){this.delegate.removeChild(t,o,r)}selectRootElement(t,o){return this.delegate.selectRootElement(t,o)}parentNode(t){return this.delegate.parentNode(t)}nextSibling(t){return this.delegate.nextSibling(t)}setAttribute(t,o,r,i){this.delegate.setAttribute(t,o,r,i)}removeAttribute(t,o,r){this.delegate.removeAttribute(t,o,r)}addClass(t,o){this.delegate.addClass(t,o)}removeClass(t,o){this.delegate.removeClass(t,o)}setStyle(t,o,r,i){this.delegate.setStyle(t,o,r,i)}removeStyle(t,o,r){this.delegate.removeStyle(t,o,r)}setProperty(t,o,r){this.shouldReplay(o)&&this.replay.push(i=>i.setProperty(t,o,r)),this.delegate.setProperty(t,o,r)}setValue(t,o){this.delegate.setValue(t,o)}listen(t,o,r,i){return this.shouldReplay(o)&&this.replay.push(n=>n.listen(t,o,r,i)),this.delegate.listen(t,o,r,i)}shouldReplay(t){return this.replay!==null&&t.startsWith(cl)}},ul=new ge("");function Sn(e="animations"){return ui("NgAsyncAnimations"),fo([{provide:pi,useFactory:(t,o,r)=>new dl(t,o,r,e),deps:[ki,xi,$o]},{provide:di,useValue:e==="noop"?"NoopAnimations":"BrowserAnimations"}])}var ml={dispatch:!0,functional:!1,useEffectsErrorHandler:!0},Bt="__@ngrx/effects_create__";function R(e,t={}){let o=t.functional?e:e(),r=p(p({},ml),t);return Object.defineProperty(o,Bt,{value:r}),o}function fl(e){return Object.getOwnPropertyNames(e).filter(r=>e[r]&&e[r].hasOwnProperty(Bt)?e[r][Bt].hasOwnProperty("dispatch"):!1).map(r=>{let i=e[r][Bt];return p({propertyName:r},i)})}function gl(e){return fl(e)}function In(e){return Object.getPrototypeOf(e)}function bl(e){return!!e.constructor&&e.constructor.name!=="Object"&&e.constructor.name!=="Function"}function Mn(e){return typeof e=="function"}function hl(e){return e.filter(Mn)}function vl(e,t,o){let r=In(e),n=!!r&&r.constructor.name!=="Object"?r.constructor.name:null,s=gl(e).map(({propertyName:f,dispatch:T,useEffectsErrorHandler:h})=>{let L=typeof e[f]=="function"?e[f]():e[f],y=h?o(L,t):L;return T===!1?y.pipe(Yr()):y.pipe(oi()).pipe(M(Y=>({effect:e[f],notification:Y,propertyName:f,sourceName:n,sourceInstance:e})))});return mo(...s)}var yl=10;function Bn(e,t,o=yl){return e.pipe(Q(r=>(t&&t.handleError(r),o<=1?e:Bn(e,t,o-1))))}var ro=(()=>{class e extends Eo{constructor(o){super(),o&&(this.source=o)}lift(o){let r=new e;return r.source=this,r.operator=o,r}static{this.\u0275fac=function(r){return new(r||e)(O(dt))}}static{this.\u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function A(...e){return ce(t=>e.some(o=>typeof o=="string"?o===t.type:o.type===t.type))}var gp=new ge("@ngrx/effects Internal Root Guard"),bp=new ge("@ngrx/effects User Provided Effects"),hp=new ge("@ngrx/effects Internal Root Effects"),vp=new ge("@ngrx/effects Internal Root Effects Instances"),yp=new ge("@ngrx/effects Internal Feature Effects"),Cp=new ge("@ngrx/effects Internal Feature Effects Instance Groups"),Cl=new ge("@ngrx/effects Effects Error Handler",{providedIn:"root",factory:()=>Bn}),kl="@ngrx/effects/init",xl=Ri(kl);function _l(e,t){if(e.notification.kind==="N"){let o=e.notification.value;!wl(o)&&t.handleError(new Error(`Effect ${Sl(e)} dispatched an invalid action: ${Il(o)}`))}}function wl(e){return typeof e!="function"&&e&&e.type&&typeof e.type=="string"}function Sl({propertyName:e,sourceInstance:t,sourceName:o}){let r=typeof t[e]=="function";return!!o?`"${o}.${String(e)}${r?"()":""}"`:`"${String(e)}()"`}function Il(e){try{return JSON.stringify(e)}catch{return e}}var Ml="ngrxOnIdentifyEffects";function Bl(e){return Ir(e,Ml)}var El="ngrxOnRunEffects";function Tl(e){return Ir(e,El)}var $l="ngrxOnInitEffects";function Rl(e){return Ir(e,$l)}function Ir(e,t){return e&&t in e&&typeof e[t]=="function"}var En=(()=>{class e extends $e{constructor(o,r){super(),this.errorHandler=o,this.effectsErrorHandler=r}addEffects(o){this.next(o)}toActions(){return this.pipe(ir(o=>bl(o)?In(o):o),oe(o=>o.pipe(ir(Al))),oe(o=>{let r=o.pipe(ei(n=>Fl(this.errorHandler,this.effectsErrorHandler)(n)),M(n=>(_l(n,this.errorHandler),n.notification)),ce(n=>n.kind==="N"&&n.value!=null),Jr()),i=o.pipe(rt(1),ce(Rl),M(n=>n.ngrxOnInitEffects()));return mo(r,i)}))}static{this.\u0275fac=function(r){return new(r||e)(O(nt),O(Cl))}}static{this.\u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function Al(e){return Bl(e)?e.ngrxOnIdentifyEffects():""}function Fl(e,t){return o=>{let r=vl(o,e,t);return Tl(o)?o.ngrxOnRunEffects(r):r}}var Dl=(()=>{class e{get isStarted(){return!!this.effectsSubscription}constructor(o,r){this.effectSources=o,this.store=r,this.effectsSubscription=null}start(){this.effectsSubscription||(this.effectsSubscription=this.effectSources.toActions().subscribe(this.store))}ngOnDestroy(){this.effectsSubscription&&(this.effectsSubscription.unsubscribe(),this.effectsSubscription=null)}static{this.\u0275fac=function(r){return new(r||e)(O(En),O(je))}}static{this.\u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function Tn(...e){let t=e.flat(),o=hl(t);return fo([o,si(()=>{v(Li),v(zi,{optional:!0});let r=v(Dl),i=v(En),n=!r.isStarted;n&&r.start();for(let s of t){let f=Mn(s)?v(s):s;i.addEffects(f)}n&&v(je).dispatch(xl())})])}var Yo="PERFORM_ACTION",Ll="REFRESH",Ln="RESET",zn="ROLLBACK",On="COMMIT",Pn="SWEEP",Vn="TOGGLE_ACTION",zl="SET_ACTIONS_ACTIVE",Hn="JUMP_TO_STATE",jn="JUMP_TO_ACTION",Pr="IMPORT_STATE",Nn="LOCK_CHANGES",Un="PAUSE_RECORDING",Io=class{constructor(t,o){if(this.action=t,this.timestamp=o,this.type=Yo,typeof t.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},Mr=class{constructor(){this.type=Ll}},Br=class{constructor(t){this.timestamp=t,this.type=Ln}},Er=class{constructor(t){this.timestamp=t,this.type=zn}},Tr=class{constructor(t){this.timestamp=t,this.type=On}},$r=class{constructor(){this.type=Pn}},Rr=class{constructor(t){this.id=t,this.type=Vn}};var Ar=class{constructor(t){this.index=t,this.type=Hn}},Fr=class{constructor(t){this.actionId=t,this.type=jn}},Dr=class{constructor(t){this.nextLiftedState=t,this.type=Pr}},Lr=class{constructor(t){this.status=t,this.type=Nn}},zr=class{constructor(t){this.status=t,this.type=Un}};var Rt=new ge("@ngrx/store-devtools Options"),$n=new ge("@ngrx/store-devtools Initial Config");function Wn(){return null}var Ol="NgRx Store DevTools";function Pl(e){let t={maxAge:!1,monitor:Wn,actionSanitizer:void 0,stateSanitizer:void 0,name:Ol,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},o=typeof e=="function"?e():e,r=o.logOnly?{pause:!0,export:!0,test:!0}:!1,i=o.features||r||t.features;i.import===!0&&(i.import="custom");let n=Object.assign({},t,{features:i},o);if(n.maxAge&&n.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${n.maxAge}`);return n}function Rn(e,t){return e.filter(o=>t.indexOf(o)<0)}function Qn(e){let{computedStates:t,currentStateIndex:o}=e;if(o>=t.length){let{state:i}=t[t.length-1];return i}let{state:r}=t[o];return r}function Xo(e){return new Io(e,+Date.now())}function Vl(e,t){return Object.keys(t).reduce((o,r)=>{let i=Number(r);return o[i]=qn(e,t[i],i),o},{})}function qn(e,t,o){return m(p({},t),{action:e(t.action,o)})}function Hl(e,t){return t.map((o,r)=>({state:Kn(e,o.state,r),error:o.error}))}function Kn(e,t,o){return e(t,o)}function Gn(e){return e.predicate||e.actionsSafelist||e.actionsBlocklist}function jl(e,t,o,r){let i=[],n={},s=[];return e.stagedActionIds.forEach((f,T)=>{let h=e.actionsById[f];h&&(T&&Vr(e.computedStates[T],h,t,o,r)||(n[f]=h,i.push(f),s.push(e.computedStates[T])))}),m(p({},e),{stagedActionIds:i,actionsById:n,computedStates:s})}function Vr(e,t,o,r,i){let n=o&&!o(e,t.action),s=r&&!t.action.type.match(r.map(T=>An(T)).join("|")),f=i&&t.action.type.match(i.map(T=>An(T)).join("|"));return n||s||f}function An(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Zn(e){return{ngZone:e?v($o):null,connectInZone:e}}var At=(()=>{class e extends ct{static{this.\u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})()}static{this.\u0275prov=S({token:e,factory:e.\u0275fac})}}return e})(),Et={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},Or=new ge("@ngrx/store-devtools Redux Devtools Extension"),Xn=(()=>{class e{constructor(o,r,i){this.config=r,this.dispatcher=i,this.zoneConfig=Zn(this.config.connectInZone),this.devtoolsExtension=o,this.createActionStreams()}notify(o,r){if(this.devtoolsExtension)if(o.type===Yo){if(r.isLocked||r.isPaused)return;let i=Qn(r);if(Gn(this.config)&&Vr(i,o,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let n=this.config.stateSanitizer?Kn(this.config.stateSanitizer,i,r.currentStateIndex):i,s=this.config.actionSanitizer?qn(this.config.actionSanitizer,o,r.nextActionId):o;this.sendToReduxDevtools(()=>this.extensionConnection.send(s,n))}else{let i=m(p({},r),{stagedActionIds:r.stagedActionIds,actionsById:this.config.actionSanitizer?Vl(this.config.actionSanitizer,r.actionsById):r.actionsById,computedStates:this.config.stateSanitizer?Hl(this.config.stateSanitizer,r.computedStates):r.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,i,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new Eo(o=>{let r=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=r,r.init(),r.subscribe(i=>o.next(i)),r.unsubscribe}):qr}createActionStreams(){let o=this.createChangesObservable().pipe(ri()),r=o.pipe(ce(h=>h.type===Et.START)),i=o.pipe(ce(h=>h.type===Et.STOP)),n=o.pipe(ce(h=>h.type===Et.DISPATCH),M(h=>this.unwrapAction(h.payload)),tr(h=>h.type===Pr?this.dispatcher.pipe(ce(L=>L.type===mr),Zr(1e3),Xr(1e3),M(()=>h),Q(()=>W(h)),rt(1)):W(h))),f=o.pipe(ce(h=>h.type===Et.ACTION),M(h=>this.unwrapAction(h.payload))).pipe(Ke(i)),T=n.pipe(Ke(i));this.start$=r.pipe(Ke(i)),this.actions$=this.start$.pipe(To(()=>f)),this.liftedActions$=this.start$.pipe(To(()=>T))}unwrapAction(o){return typeof o=="string"?(0,eval)(`(${o})`):o}getExtensionConfig(o){let r={name:o.name,features:o.features,serialize:o.serialize,autoPause:o.autoPause??!1,trace:o.trace??!1,traceLimit:o.traceLimit??75};return o.maxAge!==!1&&(r.maxAge=o.maxAge),r}sendToReduxDevtools(o){try{o()}catch(r){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",r)}}static{this.\u0275fac=function(r){return new(r||e)(O(Or),O(Rt),O(At))}}static{this.\u0275prov=S({token:e,factory:e.\u0275fac})}}return e})(),$t={type:pr},Nl="@ngrx/store-devtools/recompute",Ul={type:Nl};function Yn(e,t,o,r,i){if(r)return{state:o,error:"Interrupted by an error up the chain"};let n=o,s;try{n=e(o,t)}catch(f){s=f.toString(),i.handleError(f)}return{state:n,error:s}}function Tt(e,t,o,r,i,n,s,f,T){if(t>=e.length&&e.length===n.length)return e;let h=e.slice(0,t),L=n.length-(T?1:0);for(let y=t;y<L;y++){let B=n[y],Y=i[B].action,z=h[y-1],F=z?z.state:r,De=z?z.error:void 0,Le=s.indexOf(B)>-1?z:Yn(o,Y,F,De,f);h.push(Le)}return T&&h.push(e[e.length-1]),h}function Wl(e,t){return{monitorState:t(void 0,{}),nextActionId:1,actionsById:{0:Xo($t)},stagedActionIds:[0],skippedActionIds:[],committedState:e,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function Ql(e,t,o,r,i={}){return n=>(s,f)=>{let{monitorState:T,actionsById:h,nextActionId:L,stagedActionIds:y,skippedActionIds:B,committedState:Y,currentStateIndex:z,computedStates:F,isLocked:De,isPaused:fe}=s||t;s||(h=Object.create(h));function Le(Z){let K=Z,qe=y.slice(1,K+1);for(let Te=0;Te<qe.length;Te++)if(F[Te+1].error){K=Te,qe=y.slice(1,K+1);break}else delete h[qe[Te]];B=B.filter(Te=>qe.indexOf(Te)===-1),y=[0,...y.slice(K+1)],Y=F[K].state,F=F.slice(K),z=z>K?z-K:0}function ze(){h={0:Xo($t)},L=1,y=[0],B=[],Y=F[z].state,z=0,F=[]}let U=0;switch(f.type){case Nn:{De=f.status,U=1/0;break}case Un:{fe=f.status,fe?(y=[...y,L],h[L]=new Io({type:"@ngrx/devtools/pause"},+Date.now()),L++,U=y.length-1,F=F.concat(F[F.length-1]),z===y.length-2&&z++,U=1/0):ze();break}case Ln:{h={0:Xo($t)},L=1,y=[0],B=[],Y=e,z=0,F=[];break}case On:{ze();break}case zn:{h={0:Xo($t)},L=1,y=[0],B=[],z=0,F=[];break}case Vn:{let{id:Z}=f;B.indexOf(Z)===-1?B=[Z,...B]:B=B.filter(qe=>qe!==Z),U=y.indexOf(Z);break}case zl:{let{start:Z,end:K,active:qe}=f,Te=[];for(let or=Z;or<K;or++)Te.push(or);qe?B=Rn(B,Te):B=[...B,...Te],U=y.indexOf(Z);break}case Hn:{z=f.index,U=1/0;break}case jn:{let Z=y.indexOf(f.actionId);Z!==-1&&(z=Z),U=1/0;break}case Pn:{y=Rn(y,B),B=[],z=Math.min(z,y.length-1);break}case Yo:{if(De)return s||t;if(fe||s&&Vr(s.computedStates[z],f,i.predicate,i.actionsSafelist,i.actionsBlocklist)){let K=F[F.length-1];F=[...F.slice(0,-1),Yn(n,f.action,K.state,K.error,o)],U=1/0;break}i.maxAge&&y.length===i.maxAge&&Le(1),z===y.length-1&&z++;let Z=L++;h[Z]=f,y=[...y,Z],U=y.length-1;break}case Pr:{({monitorState:T,actionsById:h,nextActionId:L,stagedActionIds:y,skippedActionIds:B,committedState:Y,currentStateIndex:z,computedStates:F,isLocked:De,isPaused:fe}=f.nextLiftedState);break}case pr:{U=0,i.maxAge&&y.length>i.maxAge&&(F=Tt(F,U,n,Y,h,y,B,o,fe),Le(y.length-i.maxAge),U=1/0);break}case mr:{if(F.filter(K=>K.error).length>0)U=0,i.maxAge&&y.length>i.maxAge&&(F=Tt(F,U,n,Y,h,y,B,o,fe),Le(y.length-i.maxAge),U=1/0);else{if(!fe&&!De){z===y.length-1&&z++;let K=L++;h[K]=new Io(f,+Date.now()),y=[...y,K],U=y.length-1,F=Tt(F,U,n,Y,h,y,B,o,fe)}F=F.map(K=>m(p({},K),{state:n(K.state,Ul)})),z=y.length-1,i.maxAge&&y.length>i.maxAge&&Le(y.length-i.maxAge),U=1/0}break}default:{U=1/0;break}}return F=Tt(F,U,n,Y,h,y,B,o,fe),T=r(T,f),{monitorState:T,actionsById:h,nextActionId:L,stagedActionIds:y,skippedActionIds:B,committedState:Y,currentStateIndex:z,computedStates:F,isLocked:De,isPaused:fe}}}var Fn=(()=>{class e{constructor(o,r,i,n,s,f,T,h){let L=Wl(T,h.monitor),y=Ql(T,L,f,h.monitor,h),B=mo(mo(r.asObservable().pipe(ii(1)),n.actions$).pipe(M(Xo)),o,n.liftedActions$).pipe(Kr(Qr)),Y=i.pipe(M(y)),z=Zn(h.connectInZone),F=new Wr(1);this.liftedStateSubscription=B.pipe(ni(Y),Dn(z),ti(({state:Le},[ze,U])=>{let Z=U(Le,ze);return ze.type!==Yo&&Gn(h)&&(Z=jl(Z,h.predicate,h.actionsSafelist,h.actionsBlocklist)),n.notify(ze,Z),{state:Z,action:ze}},{state:L,action:null})).subscribe(({state:Le,action:ze})=>{if(F.next(Le),ze.type===Yo){let U=ze.action;s.next(U)}}),this.extensionStartSubscription=n.start$.pipe(Dn(z)).subscribe(()=>{this.refresh()});let De=F.asObservable(),fe=De.pipe(M(Qn));Object.defineProperty(fe,"state",{value:$i(fe,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=o,this.liftedState=De,this.state=fe}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(o){this.dispatcher.next(o)}next(o){this.dispatcher.next(o)}error(o){}complete(){}performAction(o){this.dispatch(new Io(o,+Date.now()))}refresh(){this.dispatch(new Mr)}reset(){this.dispatch(new Br(+Date.now()))}rollback(){this.dispatch(new Er(+Date.now()))}commit(){this.dispatch(new Tr(+Date.now()))}sweep(){this.dispatch(new $r)}toggleAction(o){this.dispatch(new Rr(o))}jumpToAction(o){this.dispatch(new Fr(o))}jumpToState(o){this.dispatch(new Ar(o))}importState(o){this.dispatch(new Dr(o))}lockChanges(o){this.dispatch(new Lr(o))}pauseRecording(o){this.dispatch(new zr(o))}static{this.\u0275fac=function(r){return new(r||e)(O(At),O(ct),O(Pi),O(Xn),O(dt),O(nt),O(Di),O(Rt))}}static{this.\u0275prov=S({token:e,factory:e.\u0275fac})}}return e})();function Dn({ngZone:e,connectInZone:t}){return o=>t?new Eo(r=>o.subscribe({next:i=>e.run(()=>r.next(i)),error:i=>e.run(()=>r.error(i)),complete:()=>e.run(()=>r.complete())})):o}var ql=new ge("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function Kl(e,t){return!!e||t.monitor!==Wn}function Gl(){let e="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[e]<"u"?window[e]:null}function Zl(e){return e.state}function Jn(e={}){return fo([Xn,At,Fn,{provide:$n,useValue:e},{provide:ql,deps:[Or,Rt],useFactory:Kl},{provide:Or,useFactory:Gl},{provide:Rt,deps:[$n],useFactory:Pl},{provide:Hi,deps:[Fn],useFactory:Zl},{provide:Vi,useExisting:At}])}var ea=(()=>{class e extends nn{static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275cmp=E({type:e,selectors:[["BarsIcon"]],features:[Re],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["fill-rule","evenodd","clip-rule","evenodd","d","M13.3226 3.6129H0.677419C0.497757 3.6129 0.325452 3.54152 0.198411 3.41448C0.0713707 3.28744 0 3.11514 0 2.93548C0 2.75581 0.0713707 2.58351 0.198411 2.45647C0.325452 2.32943 0.497757 2.25806 0.677419 2.25806H13.3226C13.5022 2.25806 13.6745 2.32943 13.8016 2.45647C13.9286 2.58351 14 2.75581 14 2.93548C14 3.11514 13.9286 3.28744 13.8016 3.41448C13.6745 3.54152 13.5022 3.6129 13.3226 3.6129ZM13.3226 7.67741H0.677419C0.497757 7.67741 0.325452 7.60604 0.198411 7.479C0.0713707 7.35196 0 7.17965 0 6.99999C0 6.82033 0.0713707 6.64802 0.198411 6.52098C0.325452 6.39394 0.497757 6.32257 0.677419 6.32257H13.3226C13.5022 6.32257 13.6745 6.39394 13.8016 6.52098C13.9286 6.64802 14 6.82033 14 6.99999C14 7.17965 13.9286 7.35196 13.8016 7.479C13.6745 7.60604 13.5022 7.67741 13.3226 7.67741ZM0.677419 11.7419H13.3226C13.5022 11.7419 13.6745 11.6706 13.8016 11.5435C13.9286 11.4165 14 11.2442 14 11.0645C14 10.8848 13.9286 10.7125 13.8016 10.5855C13.6745 10.4585 13.5022 10.3871 13.3226 10.3871H0.677419C0.497757 10.3871 0.325452 10.4585 0.198411 10.5855C0.0713707 10.7125 0 10.8848 0 11.0645C0 11.2442 0.0713707 11.4165 0.198411 11.5435C0.325452 11.6706 0.497757 11.7419 0.677419 11.7419Z","fill","currentColor"]],template:function(r,i){r&1&&(Ge(),l(0,"svg",0),g(1,"path",1),c()),r&2&&(be(i.getClassNames()),I("aria-label",i.ariaLabel)("aria-hidden",i.ariaHidden)("role",i.role))},encapsulation:2})}return e})();var Ft=class e{constructor(t){this.router=t}goToHome(){this.router.navigate(["/"])}reloadPage(){window.location.reload()}static \u0275fac=function(o){return new(o||e)(ue(pe))};static \u0275cmp=E({type:e,selectors:[["app-not-found"]],decls:19,vars:0,consts:[[1,"min-h-screen","w-full","flex","items-center","justify-center","bg-gray-50","px-4"],[1,"max-w-md","w-full"],[1,"text-center","space-y-8","animate-fade-in"],[1,"flex","justify-center","animate-slide-up"],[1,"w-20","h-20","bg-red-100","rounded-full","flex","items-center","justify-center","shadow-inner"],["fill","none","stroke","currentColor","viewBox","0 0 24 24",1,"w-10","h-10","text-red-500"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","1.5","d","M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"],[1,"animate-slide-up",2,"animation-delay","0.1s"],[1,"text-7xl","font-extrabold","text-gray-800","mb-2","tracking-tight"],[1,"w-14","h-1","bg-red-400","mx-auto","rounded-full"],[1,"space-y-3","animate-slide-up",2,"animation-delay","0.2s"],[1,"text-2xl","font-semibold","text-gray-900"],[1,"text-gray-600","leading-relaxed","max-w-sm","mx-auto"],[1,"flex","flex-col","sm:flex-row","gap-3","justify-center","animate-slide-up",2,"animation-delay","0.3s"],["pButton","","type","button","label","Volver al inicio","icon","pi pi-home",1,"p-button-rounded","p-button-primary",3,"click"],["pButton","","type","button","label","Reintentar","icon","pi pi-refresh",1,"p-button-rounded","p-button-secondary",3,"click"]],template:function(o,r){o&1&&(l(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),Ge(),l(5,"svg",5),g(6,"path",6),c()()(),go(),l(7,"div",7)(8,"h1",8),x(9,"404"),c(),g(10,"div",9),c(),l(11,"div",10)(12,"h2",11),x(13,"P\xE1gina no encontrada"),c(),l(14,"p",12),x(15,"La p\xE1gina que buscas no existe o fue movida. Verifica la direcci\xF3n o vuelve al inicio."),c()(),l(16,"div",13)(17,"button",14),$("click",function(){return r.goToHome()}),c(),l(18,"button",15),$("click",function(){return r.reloadPage()}),c()()()()())},dependencies:[ae,Be,bt,wo],encapsulation:2})};var Dt=class e{constructor(t){this.router=t}goToHome(){this.router.navigate(["/"])}static \u0275fac=function(o){return new(o||e)(ue(pe))};static \u0275cmp=E({type:e,selectors:[["app-server-down"]],decls:18,vars:0,consts:[[1,"min-h-screen","w-full","flex","items-center","justify-center","bg-gray-50","px-4"],[1,"max-w-md","w-full"],[1,"text-center","space-y-8","animate-fade-in"],[1,"flex","justify-center","animate-slide-up"],[1,"w-16","h-16","bg-red-50","rounded-full","flex","items-center","justify-center"],["fill","none","stroke","currentColor","viewBox","0 0 24 24",1,"w-8","h-8","text-red-400"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","1.5","d","M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"],[1,"animate-slide-up",2,"animation-delay","0.1s"],[1,"text-7xl","font-light","text-gray-800","mb-2","tracking-tight"],[1,"w-12","h-0.5","bg-gray-300","mx-auto"],[1,"space-y-3","animate-slide-up",2,"animation-delay","0.2s"],[1,"text-xl","font-medium","text-gray-900"],[1,"text-gray-600","leading-relaxed","max-w-sm","mx-auto"],[1,"flex","flex-col","sm:flex-row","gap-3","justify-center","animate-slide-up",2,"animation-delay","0.3s"],["pButton","","type","button","label","Reintentar","icon","pi pi-refresh",1,"p-button-default",3,"click"]],template:function(o,r){o&1&&(l(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),Ge(),l(5,"svg",5),g(6,"path",6),c()()(),go(),l(7,"div",7)(8,"h1",8),x(9,"500"),c(),g(10,"div",9),c(),l(11,"div",10)(12,"h2",11),x(13,"Error interno del servidor"),c(),l(14,"p",12),x(15,"Estamos experimentando problemas t\xE9cnicos. Nuestro equipo ha sido notificado."),c()(),l(16,"div",13)(17,"button",14),$("click",function(){return r.goToHome()}),c()()()()())},dependencies:[Be,bt],encapsulation:2})};var me=class e{_config={primary:"mrp",surface:null,darkTheme:!1,menuMode:"static",menuTheme:"mrp",topbarTheme:"mrp",menuProfilePosition:"start"};_state={staticMenuDesktopInactive:!1,overlayMenuActive:!1,configSidebarVisible:!1,staticMenuMobileActive:!1,menuHoverActive:!1,rightMenuActive:!1,topbarMenuActive:!1,sidebarActive:!1,anchored:!1,activeMenuItem:null,overlaySubmenuActive:!1,menuProfileActive:!1};layoutConfig=Ne(this._config);layoutState=Ne(this._state);configUpdate=new $e;overlayOpen=new $e;menuSource=new $e;resetSource=new $e;menuSource$=this.menuSource.asObservable();resetSource$=this.resetSource.asObservable();configUpdate$=this.configUpdate.asObservable();overlayOpen$=this.overlayOpen.asObservable();isSidebarActive=P(()=>this.layoutState().overlayMenuActive||this.layoutState().staticMenuMobileActive);isDarkTheme=P(()=>this.layoutConfig().darkTheme);isOverlay=P(()=>this.layoutConfig().menuMode==="overlay");isSlim=P(()=>this.layoutConfig().menuMode==="slim");isSlimPlus=P(()=>this.layoutConfig().menuMode==="slim-plus");isHorizontal=P(()=>this.layoutConfig().menuMode==="horizontal");transitionComplete=Ne(!1);isSidebarStateChanged=P(()=>{let t=this.layoutConfig();return t.menuMode==="horizontal"||t.menuMode==="slim"||t.menuMode==="slim-plus"});initialized=!1;constructor(){Xe(()=>{this.layoutConfig()&&this.onConfigUpdate()}),Xe(()=>{let t=this.layoutConfig();if(!this.initialized||!t){this.initialized=!0;return}this.handleDarkModeTransition(t)}),Xe(()=>{this.isSidebarStateChanged()&&this.reset()})}handleDarkModeTransition(t){document.startViewTransition?this.startViewTransition(t):(this.toggleDarkMode(t),this.onTransitionEnd())}startViewTransition(t){document.startViewTransition(()=>{this.toggleDarkMode(t)}).ready.then(()=>{this.onTransitionEnd()}).catch(()=>{})}toggleDarkMode(t){(t||this.layoutConfig()).darkTheme?document.documentElement.classList.add("app-dark"):document.documentElement.classList.remove("app-dark")}onTransitionEnd(){this.transitionComplete.set(!0),setTimeout(()=>{this.transitionComplete.set(!1)})}onMenuToggle(){this.isOverlay()&&(this.layoutState.update(t=>m(p({},t),{overlayMenuActive:!this.layoutState().overlayMenuActive})),this.layoutState().overlayMenuActive&&this.overlayOpen.next(null)),this.isDesktop()?this.layoutState.update(t=>m(p({},t),{staticMenuDesktopInactive:!t.staticMenuDesktopInactive})):(this.layoutState.update(t=>m(p({},t),{staticMenuMobileActive:!t.staticMenuMobileActive})),this.layoutState().staticMenuMobileActive&&this.overlayOpen.next(null))}onMenuProfileToggle(){this.layoutState.update(t=>m(p({},t),{menuProfileActive:!t.menuProfileActive}))}openRightMenu(){this.layoutState.update(t=>m(p({},t),{rightMenuActive:!0}))}isDesktop(){return window.innerWidth>991}isMobile(){return!this.isDesktop()}onConfigUpdate(){this._config=p({},this.layoutConfig()),this.configUpdate.next(this.layoutConfig())}onMenuStateChange(t){this.menuSource.next(t)}reset(){this.resetSource.next(!0)}onOverlaySubmenuOpen(){this.overlayOpen.next(null)}activateMrpTheme(){this.layoutConfig.update(t=>m(p({},t),{menuTheme:"mrp",topbarTheme:"mrp",primary:"mrp"}))}restoreDefaultTheme(){this.layoutConfig.update(t=>m(p({},t),{menuTheme:"light",topbarTheme:"light",primary:"indigo"}))}hideConfigSidebar(){this.layoutState.update(t=>m(p({},t),{configSidebarVisible:!1}))}static \u0275fac=function(o){return new(o||e)};static \u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})};var Yl=["app-footer",""],Lt=class e{Year=new Date().getFullYear();_layoutService=v(me);static \u0275fac=function(o){return new(o||e)};static \u0275cmp=E({type:e,selectors:[["","app-footer",""]],attrs:Yl,decls:4,vars:2,consts:[[1,"layout-footer"],[1,"h-10","w-auto",3,"src"],["href","#","target","_blank","rel","noopener noreferrer",1,"text-primary","font-bold","hover:underline"]],template:function(o,r){o&1&&(l(0,"div",0),g(1,"img",1),l(2,"a",2),x(3),c()()),o&2&&(d(),at("src",r._layoutService.isDarkTheme()?"images/Logo-Quanta-Blanco.png":"images/Logo-Quanta-principal.png",Oe),d(2),Lo("QUANTA ",r.Year," "))},dependencies:[Be],encapsulation:2})};var ta=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ke({type:e});static \u0275inj=ye({})}return e})();var Jl=["menubar"],ec=e=>({"max-height":e,overflow:"auto"}),oc=(e,t)=>({"p-megamenu-root-list":e,"p-megamenu-submenu":t}),na=e=>({"p-megamenu-item-link":!0,"p-disabled":e}),tc=()=>({exact:!1}),rc=e=>({$implicit:e});function ic(e,t){if(e&1&&(l(0,"li",8),x(1),c()),e&2){let o=u(2);xe(o.getItemProp(o.submenu,"style")),a("ngClass",o.getSubmenuHeaderClass(o.submenu)),d(),Lo(" ",o.getItemLabel(o.submenu)," ")}}function nc(e,t){if(e&1&&g(0,"li",11),e&2){let o=u().$implicit,r=u(2);xe(r.getItemProp(o,"style")),a("ngClass",r.getSeparatorItemClass(o)),I("id",r.getItemId(o))("data-pc-section","separator")}}function ac(e,t){if(e&1&&g(0,"span",22),e&2){let o=u(4).$implicit,r=u(2);a("ngClass",r.getItemProp(o,"icon"))("ngStyle",r.getItemProp(o,"iconStyle")),I("data-pc-section","icon")("tabindex",-1)}}function sc(e,t){if(e&1&&(l(0,"span",23),x(1),c()),e&2){let o=u(4).$implicit,r=u(2);I("data-pc-section","label"),d(),Lo(" ",r.getItemLabel(o)," ")}}function lc(e,t){if(e&1&&g(0,"span",24),e&2){let o=u(4).$implicit,r=u(2);a("innerHTML",r.getItemLabel(o),nr),I("data-pc-section","label")}}function cc(e,t){if(e&1&&g(0,"p-badge",25),e&2){let o=u(4).$implicit,r=u(2);a("styleClass",r.getItemProp(o,"badgeStyleClass"))("value",r.getItemProp(o,"badge"))}}function dc(e,t){e&1&&g(0,"AngleDownIcon",27),e&2&&(a("ngClass","p-megamenu-submenu-icon"),I("data-pc-section","submenuicon")("aria-hidden",!0))}function uc(e,t){e&1&&g(0,"AngleRightIcon",27),e&2&&(a("ngClass","p-megamenu-submenu-icon"),I("data-pc-section","submenuicon")("aria-hidden",!0))}function pc(e,t){if(e&1&&b(0,uc,1,3,"AngleRightIcon",28),e&2){let o=u(8);a("ngIf",o.orientation==="vertical")}}function mc(e,t){if(e&1&&(te(0),b(1,dc,1,3,"AngleDownIcon",27)(2,pc,1,1,"AngleRightIcon",27),re()),e&2){let o=u(7);d(),bo(o.orientation==="horizontal"||o.mobileActive?1:2)}}function fc(e,t){}function gc(e,t){e&1&&b(0,fc,0,0,"ng-template",29),e&2&&a("data-pc-section","submenuicon")("aria-hidden",!0)}function bc(e,t){if(e&1&&(te(0),b(1,mc,3,1,"ng-container",14)(2,gc,1,2,null,26),re()),e&2){let o=u(6);d(),a("ngIf",!o.megaMenu.submenuIconTemplate&&!o.megaMenu._submenuIconTemplate),d(),a("ngTemplateOutlet",o.megaMenu.submenuIconTemplate||o.megaMenu._submenuIconTemplate)}}function hc(e,t){if(e&1&&(l(0,"a",18),b(1,ac,1,4,"span",19)(2,sc,2,2,"span",20)(3,lc,1,2,"ng-template",null,2,lo)(5,cc,1,2,"p-badge",21)(6,bc,3,2,"ng-container",14),c()),e&2){let o=Do(4),r=u(3).$implicit,i=u(2);a("target",i.getItemProp(r,"target"))("ngClass",X(11,na,i.getItemProp(r,"disabled"))),I("href",i.getItemProp(r,"url"),Oe)("data-automationid",i.getItemProp(r,"automationId"))("data-pc-section","action")("tabindex",-1),d(),a("ngIf",i.getItemProp(r,"icon")),d(),a("ngIf",i.getItemProp(r,"escape"))("ngIfElse",o),d(3),a("ngIf",i.getItemProp(r,"badge")),d(),a("ngIf",i.isItemGroup(r))}}function vc(e,t){if(e&1&&g(0,"span",22),e&2){let o=u(4).$implicit,r=u(2);a("ngClass",r.getItemProp(o,"icon"))("ngStyle",r.getItemProp(o,"iconStyle")),I("data-pc-section","icon")("tabindex",-1)}}function yc(e,t){if(e&1&&(l(0,"span",23),x(1),c()),e&2){let o=u(4).$implicit,r=u(2);d(),_e(r.getItemLabel(o))}}function Cc(e,t){if(e&1&&g(0,"span",24),e&2){let o=u(4).$implicit,r=u(2);a("innerHTML",r.getItemLabel(o),nr),I("data-pc-section","label")}}function kc(e,t){if(e&1&&g(0,"p-badge",25),e&2){let o=u(4).$implicit,r=u(2);a("styleClass",r.getItemProp(o,"badgeStyleClass"))("value",r.getItemProp(o,"badge"))}}function xc(e,t){e&1&&g(0,"AngleDownIcon",32),e&2&&(a("styleClass","p-megamenu-submenu-icon"),I("data-pc-section","submenuicon")("aria-hidden",!0))}function _c(e,t){e&1&&g(0,"AngleRightIcon",32),e&2&&(a("styleClass","p-megamenu-submenu-icon"),I("data-pc-section","submenuicon")("aria-hidden",!0))}function wc(e,t){if(e&1&&(te(0),b(1,xc,1,3,"AngleDownIcon",31)(2,_c,1,3,"AngleRightIcon",31),re()),e&2){let o=u(7);d(),a("ngIf",o.orientation==="horizontal"),d(),a("ngIf",o.orientation==="vertical")}}function Sc(e,t){}function Ic(e,t){e&1&&b(0,Sc,0,0,"ng-template",29),e&2&&a("data-pc-section","submenuicon")("aria-hidden",!0)}function Mc(e,t){if(e&1&&(te(0),b(1,wc,3,2,"ng-container",14)(2,Ic,1,2,null,26),re()),e&2){let o=u(6);d(),a("ngIf",!o.megaMenu.submenuIconTemplate&&!o.megaMenu._submenuIconTemplate),d(),a("ngTemplateOutlet",o.megaMenu.submenuIconTemplate||o.megaMenu._submenuIconTemplate)}}function Bc(e,t){if(e&1&&(l(0,"a",30),b(1,vc,1,4,"span",19)(2,yc,2,1,"span",20)(3,Cc,1,2,"ng-template",null,3,lo)(5,kc,1,2,"p-badge",21)(6,Mc,3,2,"ng-container",14),c()),e&2){let o=Do(4),r=u(3).$implicit,i=u(2);a("routerLink",i.getItemProp(r,"routerLink"))("queryParams",i.getItemProp(r,"queryParams"))("routerLinkActive","p-megamenu-item-link-active")("routerLinkActiveOptions",i.getItemProp(r,"routerLinkActiveOptions")||ho(20,tc))("target",i.getItemProp(r,"target"))("ngClass",X(21,na,i.getItemProp(r,"disabled")))("fragment",i.getItemProp(r,"fragment"))("queryParamsHandling",i.getItemProp(r,"queryParamsHandling"))("preserveFragment",i.getItemProp(r,"preserveFragment"))("skipLocationChange",i.getItemProp(r,"skipLocationChange"))("replaceUrl",i.getItemProp(r,"replaceUrl"))("state",i.getItemProp(r,"state")),I("data-automationid",i.getItemProp(r,"automationId"))("tabindex",-1)("data-pc-section","action"),d(),a("ngIf",i.getItemProp(r,"icon")),d(),a("ngIf",i.getItemProp(r,"escape"))("ngIfElse",o),d(3),a("ngIf",i.getItemProp(r,"badge")),d(),a("ngIf",i.isItemGroup(r))}}function Ec(e,t){if(e&1&&(te(0),b(1,hc,7,13,"a",16)(2,Bc,7,23,"a",17),re()),e&2){let o=u(2).$implicit,r=u(2);d(),a("ngIf",!r.getItemProp(o,"routerLink")),d(),a("ngIf",r.getItemProp(o,"routerLink"))}}function Tc(e,t){}function $c(e,t){e&1&&b(0,Tc,0,0,"ng-template")}function Rc(e,t){if(e&1&&(te(0),b(1,$c,1,0,null,33),re()),e&2){let o=u(2).$implicit,r=u(2);d(),a("ngTemplateOutlet",r.itemTemplate)("ngTemplateOutletContext",X(2,rc,o.item))}}function Ac(e,t){if(e&1){let o=V();l(0,"p-megamenu-sub",38),$("itemClick",function(i){C(o);let n=u(6);return k(n.itemClick.emit(i))})("itemMouseEnter",function(i){C(o);let n=u(6);return k(n.onItemMouseEnter(i))}),c()}if(e&2){let o=t.$implicit,r=u(6);a("id",r.getSubListId(o))("submenu",o)("items",o.items)("itemTemplate",r.itemTemplate)("mobileActive",r.mobileActive)("menuId",r.menuId)("focusedItemId",r.focusedItemId)("level",r.level+1)("root",!1)}}function Fc(e,t){if(e&1&&(l(0,"div",27),b(1,Ac,1,9,"p-megamenu-sub",37),c()),e&2){let o=t.$implicit,r=u(3).$implicit,i=u(2);a("ngClass",i.getColumnClass(r)),d(),a("ngForOf",o)}}function Dc(e,t){if(e&1&&(l(0,"div",34)(1,"div",35),b(2,Fc,2,2,"div",36),c()()),e&2){let o=u(2).$implicit;I("data-pc-section","panel"),d(),I("data-pc-section","grid"),d(),a("ngForOf",o.items)}}function Lc(e,t){if(e&1){let o=V();l(0,"li",12,1)(2,"div",13),$("click",function(i){C(o);let n=u().$implicit,s=u(2);return k(s.onItemClick(i,n))})("mouseenter",function(i){C(o);let n=u().$implicit,s=u(2);return k(s.onItemMouseEnter({$event:i,processedItem:n}))}),b(3,Ec,3,2,"ng-container",14)(4,Rc,2,4,"ng-container",14),c(),b(5,Dc,3,3,"div",15),c()}if(e&2){let o=u(),r=o.$implicit,i=o.index,n=u(2);be(n.getItemProp(r,"styleClass")),a("ngStyle",n.getItemProp(r,"style"))("ngClass",n.getItemClass(r))("tooltipOptions",n.getItemProp(r,"tooltipOptions")),I("id",n.getItemId(r))("data-pc-section","menuitem")("data-p-highlight",n.isItemActive(r))("data-p-focused",n.isItemFocused(r))("data-p-disabled",n.isItemDisabled(r))("aria-label",n.getItemLabel(r))("aria-disabled",n.isItemDisabled(r)||void 0)("aria-haspopup",n.isItemGroup(r)&&!n.getItemProp(r,"to")?"menu":void 0)("aria-expanded",n.isItemGroup(r)?n.isItemActive(r):void 0)("aria-level",n.level+1)("aria-setsize",n.getAriaSetSize())("aria-posinset",n.getAriaPosInset(i)),d(2),I("data-pc-section","content"),d(),a("ngIf",!n.itemTemplate),d(),a("ngIf",n.itemTemplate),d(),a("ngIf",n.isItemVisible(r)&&n.isItemGroup(r))}}function zc(e,t){if(e&1&&b(0,nc,1,5,"li",9)(1,Lc,6,21,"li",10),e&2){let o=t.$implicit,r=u(2);a("ngIf",r.isItemVisible(o)&&r.getItemProp(o,"separator")),d(),a("ngIf",r.isItemVisible(o)&&!r.getItemProp(o,"separator"))}}function Oc(e,t){if(e&1){let o=V();l(0,"ul",5,0),$("keydown",function(i){C(o);let n=u();return k(n.menuKeydown.emit(i))})("focus",function(i){C(o);let n=u();return k(n.menuFocus.emit(i))})("blur",function(i){C(o);let n=u();return k(n.menuBlur.emit(i))}),b(2,ic,2,4,"li",6)(3,zc,2,2,"ng-template",7),c()}if(e&2){let o=u();xe(X(11,ec,o.scrollHeight)),a("ngClass",vo(13,oc,o.root,!o.root))("tabindex",o.tabindex),I("role",o.root?"menubar":"menu")("id",o.id)("aria-orientation",o.orientation)("aria-activedescendant",o.focusedItemId)("data-pc-section",o.root?"root":"submenu"),d(2),a("ngIf",o.submenu),d(),a("ngForOf",o.items)}}var Pc=["start"],Vc=["end"],Hc=["menuicon"],jc=["submenuicon"],Nc=["item"],Uc=["button"],Wc=["buttonicon"],Qc=["menubutton"],qc=["rootmenu"],Kc=["container"],Gc=e=>({flexDirection:e}),Zc=(e,t,o,r)=>({"p-megamenu p-component":!0,"p-megamenu-mobile":e,"p-megamenu-mobile-active":t,"p-megamenu-horizontal":o,"p-megamenu-vertical":r});function Xc(e,t){e&1&&Ae(0)}function Yc(e,t){if(e&1&&(l(0,"div",9),b(1,Xc,1,0,"ng-container",6),c()),e&2){let o=u();d(),a("ngTemplateOutlet",o.startTemplate||o._startTemplate)}}function Jc(e,t){e&1&&g(0,"BarsIcon")}function ed(e,t){}function od(e,t){e&1&&b(0,ed,0,0,"ng-template")}function td(e,t){if(e&1){let o=V();l(0,"a",11,2),$("click",function(i){C(o);let n=u(2);return k(n.menuButtonClick(i))})("keydown",function(i){C(o);let n=u(2);return k(n.menuButtonKeydown(i))}),b(2,Jc,1,0,"BarsIcon",5)(3,od,1,0,null,6),c()}if(e&2){let o=u(2);I("aria-haspopup",!!(o.model.length&&o.model.length>0))("aria-expanded",o.mobileActive)("aria-controls",o.id)("aria-label",o.config.translation.aria.navigation),d(2),a("ngIf",!o.buttonIconTemplate&&!o._buttonIconTemplate),d(),a("ngTemplateOutlet",o.buttonIconTemplate||o._buttonIconTemplate)}}function rd(e,t){if(e&1&&(te(0),b(1,td,4,6,"a",10),re()),e&2){let o=u();d(),a("ngIf",o.model&&o.model.length>0)}}function id(e,t){e&1&&Ae(0)}function nd(e,t){e&1&&Ae(0)}function ad(e,t){if(e&1&&(l(0,"div",12),b(1,nd,1,0,"ng-container",6),c()),e&2){let o=u();d(),a("ngTemplateOutlet",o.endTemplate||o._endTemplate)}}var sd=({dt:e})=>`
.p-megamenu {
    position: relative;
    display: flex;
    align-items: center;
    background: ${e("megamenu.background")};
    border: 1px solid ${e("megamenu.border.color")};
    border-radius: ${e("megamenu.border.radius")};
    color: ${e("megamenu.color")};
    gap: ${e("megamenu.gap")};
}

.p-megamenu-start,
.p-megamenu-end {
    display: flex;
    align-items: center;
}

.p-megamenu-root-list {
    margin: 0;
    padding: 0;
    list-style: none;
    outline: 0 none;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: ${e("megamenu.gap")};
}

.p-megamenu-root-list > .p-megamenu-item > .p-menumega-item-content {
    border-radius: ${e("megamenu.base.item.border.radius")};
}

.p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content > .p-megamenu-item-link {
    padding: ${e("megamenu.base.item.padding")};
}

.p-megamenu-item-content {
    transition: background ${e("megamenu.transition.duration")}, color ${e("megamenu.transition.duration")};
    border-radius: ${e("megamenu.item.border.radius")};
    color: ${e("megamenu.item.color")};
}

.p-megamenu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: ${e("megamenu.item.padding")};
    gap: ${e("megamenu.item.gap")};
    user-select: none;
    outline: 0 none;
}

.p-megamenu-item-label {
    line-height: 1;
}

.p-megamenu-item-icon {
    color: ${e("megamenu.item.icon.color")};
}

.p-megamenu-submenu-icon {
    color: ${e("megamenu.submenu.icon.color")};
    font-size: ${e("megamenu.submenu.icon.size")};
    width: ${e("megamenu.submenu.icon.size")};
    height: ${e("megamenu.submenu.icon.size")};
}

.p-megamenu-item.p-focus > .p-megamenu-item-content {
    color: ${e("megamenu.item.focus.color")};
    background: ${e("megamenu.item.focus.background")};
}

.p-megamenu-item.p-focus > .p-megamenu-item-content .p-megamenu-item-icon {
    color: ${e("megamenu.item.icon.focus.color")};
}

.p-megamenu-item.p-focus > .p-megamenu-item-content .p-megamenu-submenu-icon {
    color: ${e("megamenu.submenu.icon.focus.color")};
}

.p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover {
    color: ${e("megamenu.item.focus.color")};
    background: ${e("megamenu.item.focus.background")};
}

.p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover .p-megamenu-item-icon {
    color: ${e("megamenu.item.icon.focus.color")};
}

.p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover .p-megamenu-submenu-icon {
    color: ${e("megamenu.submenu.icon.focus.color")};
}

.p-megamenu-item-active > .p-megamenu-item-content {
    color: ${e("megamenu.item.active.color")};
    background: ${e("megamenu.item.active.background")};
}

.p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-item-icon {
    color: ${e("megamenu.item.icon.active.color")};
}

.p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-submenu-icon {
    color: ${e("megamenu.submenu.icon.active.color")};
}

.p-megamenu-overlay {
    display: none;
    position: absolute;
    width: auto;
    z-index: 1;
    left: 0;
    min-width: 100%;
    padding: ${e("megamenu.overlay.padding")};
    background: ${e("megamenu.overlay.background")};
    color: ${e("megamenu.overlay.color")};
    border: 1px solid ${e("megamenu.overlay.border.color")};
    border-radius: ${e("megamenu.overlay.border.radius")};
    box-shadow: ${e("megamenu.overlay.shadow")};
}

.p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay {
    display: block;
}

.p-megamenu-submenu {
    margin: 0;
    list-style: none;
    padding: ${e("megamenu.submenu.padding")};
    min-width: 12.5rem;
    display: flex;
    flex-direction: column;
    gap: ${e("megamenu.submenu.gap")}
}

.p-megamenu-submenu-label {
    padding: ${e("megamenu.submenu.label.padding")};
    color: ${e("megamenu.submenu.label.color")};
    font-weight: ${e("megamenu.submenu.label.font.weight")};
    background: ${e("megamenu.submenu.label.background")};
}

.p-megamenu-separator {
    border-top: 1px solid ${e("megamenu.separator.border.color")};
}

.p-megamenu-horizontal {
    align-items: center;
    padding: ${e("megamenu.horizontal.orientation.padding")};
}

.p-megamenu-horizontal .p-megamenu-root-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${e("megamenu.horizontal.orientation.gap")};
}

.p-megamenu-horizontal .p-megamenu-end {
    margin-left: auto;
    align-self: center;
}

.p-megamenu-vertical {
    display: inline-flex;
    min-width: 12.5rem;
    flex-direction: column;
    align-items: stretch;
    padding: ${e("megamenu.vertical.orientation.padding")};
}

.p-megamenu-vertical .p-megamenu-root-list {
    align-items: stretch;
    flex-direction: column;
    gap: ${e("megamenu.vertical.orientation.gap")};
}

.p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay {
    left: 100%;
    top: 0;
}

.p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item-active >.p-megamenu-overlay:dir(rtl) {
    left: auto;
    right: 100%;
}

.p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon {
    margin-left: auto;
}

.p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon:dir(rtl) {
    margin-left: 0;
    margin-right: auto;
    transform: rotate(180deg);
}

.p-megamenu-grid {
    display: flex;
}

.p-megamenu-col-2,
.p-megamenu-col-3,
.p-megamenu-col-4,
.p-megamenu-col-6,
.p-megamenu-col-12 {
    flex: 0 0 auto;
    padding: ${e("megamenu.overlay.gap")};
}

.p-megamenu-col-2 {
    width: 16.6667%;
}

.p-megamenu-col-3 {
    width: 25%;
}

.p-megamenu-col-4 {
    width: 33.3333%;
}

.p-megamenu-col-6 {
    width: 50%;
}

.p-megamenu-col-12 {
    width: 100%;
}

.p-megamenu-button {
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: ${e("megamenu.mobile.button.size")};
    height: ${e("megamenu.mobile.button.size")};
    position: relative;
    color: ${e("megamenu.mobile.button.color")};
    border: 0 none;
    background: transparent;
    border-radius: ${e("megamenu.mobile.button.border.radius")};
    transition: background ${e("megamenu.transition.duration")}, color ${e("megamenu.transition.duration")}, outline-color ${e("megamenu.transition.duration")}, ox-shadow ${e("megamenu.transition.duration")};
    outline-color: transparent;
}

.p-megamenu-button:hover {
    color: ${e("megamenu.mobile.button.hover.color")};
    background: ${e("megamenu.mobile.button.hover.background")};
}

.p-megamenu-button:focus-visible {
    box-shadow: ${e("megamenu.mobile.button.focus.ring.shadow")};
    outline: ${e("megamenu.mobile.button.focus.ring.width")} ${e("megamenu.mobile.button.focus.ring.style")} ${e("megamenu.mobile.button.focus.ring.color")};
    outline-offset: ${e("megamenu.mobile.button.focus.ring.offset")};
}

.p-megamenu-mobile {
    display: flex;
}

.p-megamenu-mobile .p-megamenu-button {
    display: flex;
}

.p-megamenu-mobile .p-megamenu-root-list {
    position: absolute;
    display: none;
    flex-direction: column;
    top: 100%;
    left: 0;
    z-index: 1;
    width: 100%;
    padding: ${e("megamenu.submenu.padding")};
    gap: ${e("megamenu.submenu.gap")};
    background: ${e("megamenu.overlay.background")};
    border: 1px solid ${e("megamenu.overlay.border.color")};
    box-shadow: ${e("megamenu.overlay.shadow")};
}

.p-megamenu-mobile-active .p-megamenu-root-list {
    display: block;
}

.p-megamenu-mobile .p-megamenu-root-list .p-megamenu-item {
    width: 100%;
    position: static;
}

.p-megamenu-mobile .p-megamenu-overlay {
    position: static;
    border: 0 none;
    border-radius: 0;
    box-shadow: none;
}

.p-megamenu-mobile .p-megamenu-grid {
    flex-wrap: wrap;
    overflow: auto;
    max-height: 90%;
}

.p-megamenu-mobile .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon {
    margin-left: auto;
    transition: transform 0.2s;
}

.p-megamenu-mobile .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon:dir(rtl) {
    margin-left: 0;
    margin-right: auto;
}

.p-megamenu-mobile .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-submenu-icon {
    transform: rotate(-180deg);
}

/* For PrimeNG */
.p-megamenu-submenu-icon.p-iconwrapper {
    margin-left: auto;
}
`;var ld={root:({instance:e})=>["p-megamenu p-component",{"p-megamenu-mobile":e.queryMatches,"p-megamenu-mobile-active":e.mobileActive,"p-megamenu-horizontal":e.horizontal,"p-megamenu-vertical":e.vertical}],start:"p-megamenu-start",button:"p-megamenu-button",rootList:"p-megamenu-root-list",submenuLabel:({instance:e,processedItem:t})=>["p-megamenu-submenu-label",{"p-disabled":e.isItemDisabled(t)}],item:({instance:e,processedItem:t})=>["p-megamenu-item",{"p-megamenu-item-active":e.isItemActive(t),"p-focus":e.isItemFocused(t),"p-disabled":e.isItemDisabled(t)}],itemContent:"p-megamenu-item-content",itemLink:"p-megamenu-item-link",itemIcon:"p-megamenu-item-icon",itemLabel:"p-megamenu-item-label",submenuIcon:"p-megamenu-submenu-icon",overlay:"p-megamenu-overlay",grid:"p-megamenu-grid",column:({instance:e,processedItem:t})=>{let o=e.isItemGroup(t)?t.items.length:0,r;if(e.$parentInstance.queryMatches)r="p-megamenu-col-12";else switch(o){case 2:r="p-megamenu-col-6";break;case 3:r="p-megamenu-col-4";break;case 4:r="p-megamenu-col-3";break;case 6:r="p-megamenu-col-2";break;default:r="p-megamenu-col-12";break}return r},submenu:"p-megamenu-submenu",separator:"p-megamenu-separator",end:"p-megamenu-end"},ra=(()=>{class e extends oo{name="megamenu";theme=sd;classes=ld;static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275prov=S({token:e,factory:e.\u0275fac})}return e})();var cd=(()=>{class e extends We{id;items;itemTemplate;menuId;ariaLabel;ariaLabelledBy;level=0;focusedItemId;disabled=!1;orientation;activeItem;submenu;queryMatches=!1;mobileActive=!1;scrollHeight;tabindex=0;root=!1;itemClick=new Ce;itemMouseEnter=new Ce;menuFocus=new Ce;menuBlur=new Ce;menuKeydown=new Ce;menubarViewChild;megaMenu=v(it(()=>aa));onItemClick(o,r){this.getItemProp(r,"command",{originalEvent:o,item:r.item}),this.itemClick.emit({originalEvent:o,processedItem:r,isFocus:!0})}getItemProp(o,r,i=null){return o&&o.item?br(o.item[r],i):void 0}getItemId(o){return o.item&&o.item?.id?o.item.id:`${this.menuId}_${o.key}`}getSubListId(o){return`${this.getItemId(o)}_list`}getItemClass(o){return m(p({},this.getItemProp(o,"class")),{"p-megamenu-item":!0,"p-megamenu-item-active":this.isItemActive(o),"p-focus":this.isItemFocused(o),"p-disabled":this.isItemDisabled(o)})}getItemLabel(o){return this.getItemProp(o,"label")}getSeparatorItemClass(o){return m(p({},this.getItemProp(o,"class")),{"p-megamenu-separator":!0})}getColumnClass(o){let r=this.isItemGroup(o)?o.items.length:0,i;if(this.queryMatches)i="p-megamenu-col-12";else switch(r){case 2:i="p-megamenu-col-6";break;case 3:i="p-megamenu-col-4";break;case 4:i="p-megamenu-col-3";break;case 6:i="p-megamenu-col-2";break;default:i="p-megamenu-col-12";break}return i}getSubmenuHeaderClass(o){return p({"p-megamenu-submenu-label":!0,"p-disabled":this.isItemDisabled(o)},this.getItemProp(o,"class"))}isSubmenuVisible(o){return this.submenu&&!this.root?this.isItemVisible(o):!0}isItemVisible(o){return this.getItemProp(o,"visible")!==!1}isItemActive(o){return se(this.activeItem)?this.activeItem.key===o.key:!1}isItemDisabled(o){return this.getItemProp(o,"disabled")}isItemFocused(o){return this.focusedItemId===this.getItemId(o)}isItemGroup(o){return se(o.items)}getAriaSetSize(){return this.items.filter(o=>this.isItemVisible(o)&&!this.getItemProp(o,"separator")).length}getAriaPosInset(o){return o-this.items.slice(0,o).filter(r=>this.isItemVisible(r)&&this.getItemProp(r,"separator")).length+1}onItemMouseEnter(o){let{event:r,processedItem:i}=o;this.itemMouseEnter.emit({originalEvent:r,processedItem:i})}static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275cmp=E({type:e,selectors:[["p-megaMenuSub"],["p-megamenu-sub"]],viewQuery:function(r,i){if(r&1&&H(Jl,7),r&2){let n;_(n=w())&&(i.menubarViewChild=n.first)}},inputs:{id:"id",items:"items",itemTemplate:"itemTemplate",menuId:"menuId",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",level:[2,"level","level",Ze],focusedItemId:"focusedItemId",disabled:[2,"disabled","disabled",J],orientation:"orientation",activeItem:"activeItem",submenu:"submenu",queryMatches:[2,"queryMatches","queryMatches",J],mobileActive:[2,"mobileActive","mobileActive",J],scrollHeight:"scrollHeight",tabindex:[2,"tabindex","tabindex",Ze],root:[2,"root","root",J]},outputs:{itemClick:"itemClick",itemMouseEnter:"itemMouseEnter",menuFocus:"menuFocus",menuBlur:"menuBlur",menuKeydown:"menuKeydown"},features:[Re],decls:1,vars:1,consts:[["menubar",""],["listItem",""],["htmlLabel",""],["htmlRouteLabel",""],[3,"ngClass","style","tabindex","keydown","focus","blur",4,"ngIf"],[3,"keydown","focus","blur","ngClass","tabindex"],["role","presentation",3,"ngClass","style",4,"ngIf"],["ngFor","",3,"ngForOf"],["role","presentation",3,"ngClass"],["role","separator",3,"style","ngClass",4,"ngIf"],["role","menuitem","pTooltip","",3,"ngStyle","ngClass","class","tooltipOptions",4,"ngIf"],["role","separator",3,"ngClass"],["role","menuitem","pTooltip","",3,"ngStyle","ngClass","tooltipOptions"],[1,"p-megamenu-item-content",3,"click","mouseenter"],[4,"ngIf"],["class","p-megamenu-overlay",4,"ngIf"],["pRipple","",3,"target","ngClass",4,"ngIf"],["pRipple","",3,"routerLink","queryParams","routerLinkActive","routerLinkActiveOptions","target","ngClass","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state",4,"ngIf"],["pRipple","",3,"target","ngClass"],["class","p-megamenu-item-icon",3,"ngClass","ngStyle",4,"ngIf"],["class","p-megamenu-item-label",4,"ngIf","ngIfElse"],[3,"styleClass","value",4,"ngIf"],[1,"p-megamenu-item-icon",3,"ngClass","ngStyle"],[1,"p-megamenu-item-label"],[1,"p-megamenu-item-label",3,"innerHTML"],[3,"styleClass","value"],[4,"ngTemplateOutlet"],[3,"ngClass"],[3,"ngClass",4,"ngIf"],[3,"data-pc-section","aria-hidden"],["pRipple","",3,"routerLink","queryParams","routerLinkActive","routerLinkActiveOptions","target","ngClass","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state"],[3,"styleClass",4,"ngIf"],[3,"styleClass"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"p-megamenu-overlay"],[1,"p-megamenu-grid"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"id","submenu","items","itemTemplate","mobileActive","menuId","focusedItemId","level","root","itemClick","itemMouseEnter",4,"ngFor","ngForOf"],[3,"itemClick","itemMouseEnter","id","submenu","items","itemTemplate","mobileActive","menuId","focusedItemId","level","root"]],template:function(r,i){r&1&&b(0,Oc,4,16,"ul",4),r&2&&a("ngIf",i.isSubmenuVisible(i.submenu))},dependencies:[e,j,ie,Ye,ne,co,Ue,ae,eo,lt,gt,uo,So,an,sn,Oo,rn,le],encapsulation:2})}return e})(),aa=(()=>{class e extends We{set model(o){this._model=o,this._processedItems=this.createProcessedItems(this._model||[])}get model(){return this._model}style;styleClass;orientation="horizontal";id;ariaLabel;ariaLabelledBy;breakpoint="960px";scrollHeight="20rem";disabled=!1;tabindex=0;startTemplate;endTemplate;menuIconTemplate;submenuIconTemplate;itemTemplate;buttonTemplate;buttonIconTemplate;templates;menubuttonViewChild;rootmenu;container;_startTemplate;_endTemplate;_menuIconTemplate;_submenuIconTemplate;_itemTemplate;_buttonTemplate;_buttonIconTemplate;outsideClickListener;resizeListener;dirty=!1;focused=!1;activeItem=Ne(null);focusedItemInfo=Ne({index:-1,level:0,parentKey:"",item:null});searchValue="";searchTimeout;_processedItems;_model;_componentStyle=v(ra);matchMediaListener;query;queryMatches=!1;mobileActive=!1;get visibleItems(){let o=se(this.activeItem())?this.activeItem():null;return o?o.items.reduce((r,i)=>(i.forEach(n=>{n.items.forEach(s=>{r.push(s)})}),r),[]):this.processedItems}get processedItems(){return(!this._processedItems||!this._processedItems.length)&&(this._processedItems=this.createProcessedItems(this.model||[])),this._processedItems}get focusedItemId(){let o=this.focusedItemInfo();return o?.item&&o.item?.id?o.item.id:se(o.key)?`${this.id}_${o.key}`:null}constructor(){super(),Xe(()=>{let o=this.activeItem();se(o)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener())})}ngOnInit(){super.ngOnInit(),this.bindMatchMediaListener(),this.id=this.id||Zi("pn_id_")}ngAfterContentInit(){this.templates?.forEach(o=>{switch(o.getType()){case"start":this._startTemplate=o.template;break;case"end":this._endTemplate=o.template;break;case"menuicon":this._menuIconTemplate=o.template;break;case"submenuicon":this._submenuIconTemplate=o.template;break;case"item":this._itemTemplate=o.template;break;case"button":this._buttonTemplate=o.template;break;case"buttonicon":this._buttonIconTemplate=o.template;break;default:this._itemTemplate=o.template;break}})}bindMatchMediaListener(){if(sr(this.platformId)&&!this.matchMediaListener){let o=window.matchMedia(`(max-width: ${this.breakpoint})`);this.query=o,this.queryMatches=o.matches,this.matchMediaListener=()=>{this.queryMatches=o.matches,this.mobileActive=!1,this.cd.markForCheck()},o.addEventListener("change",this.matchMediaListener)}}unbindMatchMediaListener(){this.matchMediaListener&&(this.query.removeEventListener("change",this.matchMediaListener),this.matchMediaListener=null)}createProcessedItems(o,r=0,i={},n="",s){let f=[];return o&&o.forEach((T,h)=>{let L=(n!==""?n+"_":"")+(s!==void 0?s+"_":"")+h,y={item:T,index:h,level:r,key:L,parent:i,parentKey:n,columnIndex:s!==void 0?s:i.columnIndex!==void 0?i.columnIndex:h};y.items=r===0&&T.items&&T.items.length>0?T.items.map((B,Y)=>this.createProcessedItems(B,r+1,y,L,Y)):this.createProcessedItems(T.items,r+1,y,L),f.push(y)}),f}getItemProp(o,r){return o?br(o[r]):void 0}onItemClick(o){let{originalEvent:r,processedItem:i}=o,n=this.isProcessedItemGroup(i),s=fr(i.parent);if(this.isSelected(i)){let{index:T,key:h,parentKey:L,item:y}=i;this.activeItem.set(null),this.focusedItemInfo.set({index:T,key:h,parentKey:L,item:y}),this.dirty=!s,this.mobileActive||xo(this.rootmenu?.menubarViewChild?.nativeElement,{preventScroll:!0})}else n?this.onItemChange(o):this.hide(r)}onItemMouseEnter(o){!this.mobileActive&&this.dirty&&this.onItemChange(o)}menuButtonClick(o){this.toggle(o)}menuButtonKeydown(o){(o.code==="Enter"||o.code==="NumpadEnter"||o.code==="Space")&&this.menuButtonClick(o)}toggle(o){this.mobileActive?(this.mobileActive=!1,to.clear(this.rootmenu.el.nativeElement),this.hide()):(this.mobileActive=!0,to.set("menu",this.rootmenu.el.nativeElement,this.config.zIndex.menu),setTimeout(()=>{this.show()},0)),this.bindOutsideClickListener(),o.preventDefault()}show(){this.focusedItemInfo.set({index:this.findFirstFocusedItemIndex(),level:0,parentKey:""}),xo(this.rootmenu?.el.nativeElement)}scrollInView(o=-1){let r=o!==-1?`${this.id}_${o}`:this.focusedItemId,i;r===null&&this.queryMatches?i=this.menubuttonViewChild.nativeElement:i=ft(this.rootmenu?.menubarViewChild?.nativeElement,`li[id="${r}"]`),i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})}onItemChange(o){let{processedItem:r,isFocus:i}=o;if(fr(r))return;let{index:n,key:s,parentKey:f,items:T,item:h}=r,L=se(T);L&&this.activeItem.set(r),this.focusedItemInfo.set({index:n,key:s,parentKey:f,item:h}),L&&(this.dirty=!0),i&&xo(this.rootmenu?.menubarViewChild?.nativeElement)}hide(o,r){this.mobileActive&&(this.mobileActive=!1,setTimeout(()=>{xo(this.menubuttonViewChild?.nativeElement),this.scrollInView()},100)),this.activeItem.set(null),this.focusedItemInfo.set({index:-1,key:"",parentKey:"",item:null}),r&&xo(this.rootmenu?.menubarViewChild?.nativeElement),this.dirty=!1}onMenuFocus(o){if(this.focused=!0,this.focusedItemInfo().index===-1){let r=this.findFirstFocusedItemIndex(),i=this.findVisibleItem(r);this.focusedItemInfo.set({index:r,key:i.key,parentKey:i.parentKey,item:i.item})}}onMenuBlur(o){this.focused=!1,this.focusedItemInfo.set({index:-1,level:0,parentKey:"",item:null}),this.searchValue="",this.dirty=!1}onKeyDown(o){let r=o.metaKey||o.ctrlKey;switch(o.code){case"ArrowDown":this.onArrowDownKey(o);break;case"ArrowUp":this.onArrowUpKey(o);break;case"ArrowLeft":this.onArrowLeftKey(o);break;case"ArrowRight":this.onArrowRightKey(o);break;case"Home":this.onHomeKey(o);break;case"End":this.onEndKey(o);break;case"Space":this.onSpaceKey(o);break;case"Enter":this.onEnterKey(o);break;case"Escape":this.onEscapeKey(o);break;case"Tab":this.onTabKey(o);break;case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!r&&Gi(o.key)&&this.searchItems(o,o.key);break}}findFirstFocusedItemIndex(){let o=this.findSelectedItemIndex();return o<0?this.findFirstItemIndex():o}findFirstItemIndex(){return this.visibleItems.findIndex(o=>this.isValidItem(o))}findSelectedItemIndex(){return this.visibleItems.findIndex(o=>this.isValidSelectedItem(o))}isProcessedItemGroup(o){return o&&se(o.items)}isSelected(o){return se(this.activeItem())?this.activeItem().key===o.key:!1}isValidSelectedItem(o){return this.isValidItem(o)&&this.isSelected(o)}isValidItem(o){return!!o&&!this.isItemDisabled(o.item)&&!this.isItemSeparator(o.item)}isItemDisabled(o){return this.getItemProp(o,"disabled")}isItemSeparator(o){return this.getItemProp(o,"separator")}isItemMatched(o){return this.isValidItem(o)&&this.getProccessedItemLabel(o).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase())}isProccessedItemGroup(o){return o&&se(o.items)}searchItems(o,r){this.searchValue=(this.searchValue||"")+r;let i=-1,n=!1;return this.focusedItemInfo().index!==-1?(i=this.visibleItems.slice(this.focusedItemInfo().index).findIndex(s=>this.isItemMatched(s)),i=i===-1?this.visibleItems.slice(0,this.focusedItemInfo().index).findIndex(s=>this.isItemMatched(s)):i+this.focusedItemInfo().index):i=this.visibleItems.findIndex(s=>this.isItemMatched(s)),i!==-1&&(n=!0),i===-1&&this.focusedItemInfo().index===-1&&(i=this.findFirstFocusedItemIndex()),i!==-1&&this.changeFocusedItemInfo(o,i),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>{this.searchValue="",this.searchTimeout=null},500),n}getProccessedItemLabel(o){return o?this.getItemLabel(o.item):void 0}getItemLabel(o){return this.getItemProp(o,"label")}changeFocusedItemInfo(o,r){let i=this.findVisibleItem(r);if(se(i)){let{key:n,parentKey:s,item:f}=i;this.focusedItemInfo.set({index:r,key:n||"",parentKey:s,item:f})}this.scrollInView()}onArrowDownKey(o){if(this.orientation==="horizontal")if(se(this.activeItem())&&this.activeItem().key===this.focusedItemInfo().key){let{key:i,item:n}=this.activeItem();this.focusedItemInfo.set({index:-1,key:"",parentKey:i,item:n})}else{let i=this.findVisibleItem(this.focusedItemInfo().index);if(this.isProccessedItemGroup(i)){let{parentKey:s,key:f,item:T}=i;this.onItemChange({originalEvent:o,processedItem:i}),this.focusedItemInfo.set({index:-1,key:f,parentKey:s,item:T}),this.searchValue=""}}let r=this.focusedItemInfo().index!==-1?this.findNextItemIndex(this.focusedItemInfo().index):this.findFirstFocusedItemIndex();this.changeFocusedItemInfo(o,r),o.preventDefault()}onArrowRightKey(o){let r=this.findVisibleItem(this.focusedItemInfo().index);if(this.isProccessedItemGroup(r)){if(this.orientation==="vertical")if(se(this.activeItem())&&this.activeItem().key===r.key)this.focusedItemInfo.set({index:-1,key:"",parentKey:this.activeItem().key,item:r.item});else{let s=this.findVisibleItem(this.focusedItemInfo().index);this.isProccessedItemGroup(s)&&(this.onItemChange({originalEvent:o,processedItem:s}),this.focusedItemInfo.set({index:-1,key:s.key,parentKey:s.parentKey,item:s.item}),this.searchValue="")}let n=this.focusedItemInfo().index!==-1?this.findNextItemIndex(this.focusedItemInfo().index):this.findFirstFocusedItemIndex();this.changeFocusedItemInfo(o,n)}else{let n=r.columnIndex+1,s=this.visibleItems.findIndex(f=>f.columnIndex===n);s!==-1&&this.changeFocusedItemInfo(o,s)}o.preventDefault()}onArrowUpKey(o){if(o.altKey&&this.orientation==="horizontal"){if(this.focusedItemInfo().index!==-1){let r=this.findVisibleItem(this.focusedItemInfo().index);!this.isProccessedItemGroup(r)&&se(this.activeItem)&&(this.focusedItemInfo().index===0?(this.focusedItemInfo.set({index:this.activeItem().index,key:this.activeItem().key,parentKey:this.activeItem().parentKey,item:r.item}),this.activeItem.set(null)):this.changeFocusedItemInfo(o,this.findFirstItemIndex()))}o.preventDefault()}else{let r=this.focusedItemInfo().index!==-1?this.findPrevItemIndex(this.focusedItemInfo().index):this.findLastFocusedItemIndex();this.changeFocusedItemInfo(o,r),o.preventDefault()}}onArrowLeftKey(o){let r=this.findVisibleItem(this.focusedItemInfo().index);if(this.isProccessedItemGroup(r)){if(this.orientation==="horizontal"){let n=this.focusedItemInfo().index!==-1?this.findPrevItemIndex(this.focusedItemInfo().index):this.findLastFocusedItemIndex();this.changeFocusedItemInfo(o,n)}}else{this.orientation==="vertical"&&se(this.activeItem())&&r.columnIndex===0&&(this.focusedItemInfo.set({index:this.activeItem().index,key:this.activeItem().key,parentKey:this.activeItem().parentKey,item:r.item}),this.activeItem.set(null));let n=r.columnIndex-1,s=this.visibleItems.findIndex(f=>f.columnIndex===n);s!==-1&&this.changeFocusedItemInfo(o,s)}o.preventDefault()}onHomeKey(o){this.changeFocusedItemInfo(o,this.findFirstItemIndex()),o.preventDefault()}onEndKey(o){this.changeFocusedItemInfo(o,this.findLastItemIndex()),o.preventDefault()}onSpaceKey(o){this.onEnterKey(o)}onEscapeKey(o){se(this.activeItem())&&(this.focusedItemInfo.set({index:this.activeItem().index,key:this.activeItem().key,item:this.activeItem().item}),this.activeItem.set(null)),o.preventDefault()}onTabKey(o){if(this.focusedItemInfo().index!==-1){let r=this.findVisibleItem(this.focusedItemInfo().index);!this.isProccessedItemGroup(r)&&this.onItemChange({originalEvent:o,processedItem:r})}this.hide()}onEnterKey(o){if(this.focusedItemInfo().index!==-1){let r=ft(this.rootmenu?.el?.nativeElement,`li[id="${`${this.focusedItemId}`}"]`),i=r&&ft(r,'a[data-pc-section="action"]');i?i.click():r&&r.click();let n=this.visibleItems[this.focusedItemInfo().index];!this.isProccessedItemGroup(n)&&this.changeFocusedItemInfo(o,this.findFirstFocusedItemIndex())}o.preventDefault()}findVisibleItem(o){return se(this.visibleItems)?this.visibleItems[o]:null}findLastFocusedItemIndex(){let o=this.findSelectedItemIndex();return o<0?this.findLastItemIndex():o}findLastItemIndex(){return gr(this.visibleItems,o=>this.isValidItem(o))}findPrevItemIndex(o){let r=o>0?gr(this.visibleItems.slice(0,o),i=>this.isValidItem(i)):-1;return r>-1?r:o}findNextItemIndex(o){let r=o<this.visibleItems.length-1?this.visibleItems.slice(o+1).findIndex(i=>this.isValidItem(i)):-1;return r>-1?r+o+1:o}bindResizeListener(){this.resizeListener||(this.resizeListener=o=>{qi()||this.hide(o,!0),this.mobileActive=!1},window.addEventListener("resize",this.resizeListener))}bindOutsideClickListener(){sr(this.platformId)&&(this.outsideClickListener||(this.outsideClickListener=this.renderer.listen(this.document,"click",o=>{this.container?.nativeElement!==o.target&&!this.container?.nativeElement.contains(o.target)&&this.hide()})))}unbindOutsideClickListener(){this.outsideClickListener&&(this.outsideClickListener(),this.outsideClickListener=null)}unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)}ngOnDestroy(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener(),super.ngOnDestroy()}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=E({type:e,selectors:[["p-megaMenu"],["p-megamenu"],["p-mega-menu"]],contentQueries:function(r,i,n){if(r&1&&(ee(n,Pc,4),ee(n,Vc,4),ee(n,Hc,4),ee(n,jc,4),ee(n,Nc,4),ee(n,Uc,4),ee(n,Wc,4),ee(n,_o,4)),r&2){let s;_(s=w())&&(i.startTemplate=s.first),_(s=w())&&(i.endTemplate=s.first),_(s=w())&&(i.menuIconTemplate=s.first),_(s=w())&&(i.submenuIconTemplate=s.first),_(s=w())&&(i.itemTemplate=s.first),_(s=w())&&(i.buttonTemplate=s.first),_(s=w())&&(i.buttonIconTemplate=s.first),_(s=w())&&(i.templates=s)}},viewQuery:function(r,i){if(r&1&&(H(Qc,5),H(qc,5),H(Kc,5)),r&2){let n;_(n=w())&&(i.menubuttonViewChild=n.first),_(n=w())&&(i.rootmenu=n.first),_(n=w())&&(i.container=n.first)}},inputs:{model:"model",style:"style",styleClass:"styleClass",orientation:"orientation",id:"id",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",breakpoint:"breakpoint",scrollHeight:"scrollHeight",disabled:[2,"disabled","disabled",J],tabindex:[2,"tabindex","tabindex",Ze]},features:[Pe([ra]),Re],decls:8,vars:36,consts:[["container",""],["rootmenu",""],["menubutton",""],[3,"ngClass","ngStyle"],["class","p-megamenu-start",4,"ngIf"],[4,"ngIf"],[4,"ngTemplateOutlet"],[3,"itemClick","menuFocus","menuBlur","menuKeydown","itemMouseEnter","itemTemplate","items","menuId","root","orientation","ariaLabel","disabled","tabindex","activeItem","level","ariaLabelledBy","focusedItemId","mobileActive","queryMatches","scrollHeight"],["class","p-megamenu-end",4,"ngIf"],[1,"p-megamenu-start"],["role","button","tabindex","0","class","p-megamenu-button",3,"click","keydown",4,"ngIf"],["role","button","tabindex","0",1,"p-megamenu-button",3,"click","keydown"],[1,"p-megamenu-end"]],template:function(r,i){if(r&1){let n=V();l(0,"div",3,0),b(2,Yc,2,1,"div",4)(3,rd,2,1,"ng-container",5)(4,id,1,0,"ng-container",6),l(5,"p-megamenu-sub",7,1),$("itemClick",function(f){return C(n),k(i.onItemClick(f))})("menuFocus",function(f){return C(n),k(i.onMenuFocus(f))})("menuBlur",function(f){return C(n),k(i.onMenuBlur(f))})("menuKeydown",function(f){return C(n),k(i.onKeyDown(f))})("itemMouseEnter",function(f){return C(n),k(i.onItemMouseEnter(f))}),c(),b(7,ad,2,1,"div",8),c()}r&2&&(xe(X(29,Gc,i.orientation=="vertical"&&i.queryMatches?"row":"")),be(i.styleClass),a("ngClass",vi(31,Zc,i.queryMatches,i.mobileActive,i.orientation=="horizontal",i.orientation=="vertical"))("ngStyle",i.style),I("data-pc-section","root")("data-pc-name","megamenu")("id",i.id),d(2),a("ngIf",i.startTemplate||i._startTemplate),d(),a("ngIf",!i.buttonTemplate&&!i._buttonTemplate),d(),a("ngTemplateOutlet",i.buttonTemplate||i._buttonTemplate),d(),a("itemTemplate",i.itemTemplate||i._itemTemplate)("items",i.processedItems)("menuId",i.id)("root",!0)("orientation",i.orientation)("ariaLabel",i.ariaLabel)("disabled",i.disabled)("tabindex",i.disabled?-1:i.tabindex)("activeItem",i.activeItem())("level",0)("ariaLabelledBy",i.ariaLabelledBy)("focusedItemId",i.focused?i.focusedItemId:void 0)("mobileActive",i.mobileActive)("queryMatches",i.queryMatches)("scrollHeight",i.scrollHeight),I("id",i.id+"_list"),d(2),a("ngIf",i.endTemplate||i._endTemplate))},dependencies:[j,ie,ne,co,Ue,ae,cd,uo,ea,Oo,le],encapsulation:2,changeDetection:0})}return e})(),sa=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ke({type:e});static \u0275inj=ye({imports:[aa,le,le]})}return e})();var ve=Ai({source:"Menu",events:{"Load Menu":Fi(),"Load Menu Success":ur(),"Load Menu Failure":ur()}});var G={production:!0,apiUrl:"http://localhost:8000/api/v1/",environmentName:"development",useMockApi:!0};var Mo=class e{constructor(t){this.http=t}baseUrl=`${G.apiUrl}sys/menu`;getMenu(){return G.useMockApi?this.http.get("data/menu/menu.json"):this.http.get(this.baseUrl)}static \u0275fac=function(o){return new(o||e)(O(Je))};static \u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})};var Jo=class e{actions$=v(ro);menuService=v(Mo);messageService=v(Me);loadMenu$=R(()=>this.actions$.pipe(A(ve.loadMenu),To(()=>this.menuService.getMenu().pipe(M(t=>ve.loadMenuSuccess({menu:t.data})),Q(t=>(this.messageService.add({severity:"error",summary:"Error",detail:"Error al cargar el men\xFA",life:3e3}),W(ve.loadMenuFailure({error:t.message}))))))));loadMenuSuccessToast$=R(()=>this.actions$.pipe(A(ve.loadMenuSuccess),q(()=>{this.messageService.add({severity:"success",summary:"\xC9xito",detail:"Men\xFA cargado correctamente",life:3e3})})),{dispatch:!1});static \u0275fac=function(o){return new(o||e)};static \u0275prov=S({token:e,factory:e.\u0275fac})};var ud={menu:[],loading:!1,error:null},jr=pt(ud,N(ve.loadMenu,e=>m(p({},e),{loading:!0,error:null})),N(ve.loadMenuSuccess,(e,{menu:t})=>m(p({},e),{menu:t,loading:!1})),N(ve.loadMenuFailure,(e,{error:t})=>m(p({},e),{loading:!1,error:t})));var po={};ll(po,{selectMenuError:()=>fd,selectMenuItems:()=>pd,selectMenuLoading:()=>md,selectMenuState:()=>zt});var zt=ji("menu"),pd=ut(zt,e=>e.menu),md=ut(zt,e=>e.loading),fd=ut(zt,e=>e.error);var gd=["searchInput"],bd=["menuButton"],hd=["mobileMenuButton"],vd=["app-header",""],et=class e{store=v(je);router=v(pe);_layoutService=v(me);searchInput;menuButton;mobileMenuButton;items$=this.store.select(po.selectMenuItems);loading$=this.store.select(po.selectMenuLoading);constructor(){this.store.dispatch(ve.loadMenu())}toggleDarkMode(){this._layoutService.layoutConfig.update(t=>m(p({},t),{darkTheme:!t.darkTheme}))}onMenuButtonClick(){this._layoutService.onMenuToggle()}onRightMenuButtonClick(){this._layoutService.openRightMenu()}toggleConfigSidebar(){let t=this._layoutService.layoutState();this._layoutService.isSidebarActive()&&(t.overlayMenuActive=!1,t.overlaySubmenuActive=!1,t.staticMenuMobileActive=!1,t.menuHoverActive=!1,t.configSidebarVisible=!1),t.configSidebarVisible=!t.configSidebarVisible,this._layoutService.layoutState.set(p({},t))}focusSearchInput(){setTimeout(()=>{this.searchInput.nativeElement.focus()},150)}onTopbarMenuToggle(){this._layoutService.layoutState.update(t=>m(p({},t),{topbarMenuActive:!t.topbarMenuActive}))}goToNotifications(){this.router.navigate(["/settings/notifications"])}ngOnDestroy(){}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=E({type:e,selectors:[["","app-header",""]],viewQuery:function(o,r){if(o&1&&(H(gd,5),H(bd,5),H(hd,5)),o&2){let i;_(i=w())&&(r.searchInput=i.first),_(i=w())&&(r.menuButton=i.first),_(i=w())&&(r.mobileMenuButton=i.first)}},hostAttrs:[1,"layout-topbar"],attrs:vd,decls:13,vars:1,consts:[["menuButton",""],[1,"layout-topbar-start","flex-col"],["routerLink","/",1,"layout-topbar-logo"],["alt","Quanta Logo",1,"layout-topbar-logo-image","h-10","w-auto",3,"src"],[1,"layout-menu-button",3,"click"],[1,"pi","pi-chevron-right"],[1,"layout-topbar-end"],[1,"layout-topbar-actions-start"],[1,"layout-topbar-actions-end"],[1,"layout-topbar-items"]],template:function(o,r){if(o&1){let i=V();l(0,"div",1)(1,"a",2),g(2,"img",3),l(3,"p"),x(4,"Administrador"),c()(),l(5,"a",4,0),$("click",function(){return C(i),k(r.onMenuButtonClick())}),g(7,"i",5),c()(),l(8,"div",6),g(9,"div",7),l(10,"div",8)(11,"ul",9),g(12,"li"),c()()()}o&2&&(d(2),at("src",r._layoutService.isDarkTheme()?"images/Logo-Quanta-Blanco.png":"images/Logo-Quanta-principal.png",Oe))},dependencies:[ae,eo,j,ta,ht,Be,sa,Oo],styles:["[_nghost-%COMP%]     .p-overlaybadge .p-badge{outline-width:0px}"]})};var yd=({dt:e})=>`
.p-skeleton {
    overflow: hidden;
    background: ${e("skeleton.background")};
    border-radius: ${e("skeleton.border.radius")};
}

.p-skeleton::after {
    content: "";
    animation: p-skeleton-animation 1.2s infinite;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), ${e("skeleton.animation.background")}, rgba(255, 255, 255, 0));
}

[dir='rtl'] .p-skeleton::after {
    animation-name: p-skeleton-animation-rtl;
}

.p-skeleton-circle {
    border-radius: 50%;
}

.p-skeleton-animation-none::after {
    animation: none;
}

@keyframes p-skeleton-animation {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(100%);
    }
}

@keyframes p-skeleton-animation-rtl {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(-100%);
    }
}
`,Cd={root:{position:"relative"}},kd={root:({props:e})=>["p-skeleton p-component",{"p-skeleton-circle":e.shape==="circle","p-skeleton-animation-none":e.animation==="none"}]},la=(()=>{class e extends oo{name="skeleton";theme=yd;classes=kd;inlineStyles=Cd;static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275prov=S({token:e,factory:e.\u0275fac})}return e})();var xd=(()=>{class e extends We{styleClass;style;shape="rectangle";animation="wave";borderRadius;size;width="100%";height="1rem";_componentStyle=v(la);containerClass(){return{"p-skeleton p-component":!0,"p-skeleton-circle":this.shape==="circle","p-skeleton-animation-none":this.animation==="none"}}get containerStyle(){let o=this._componentStyle?.inlineStyles.root,r;return this.size?r=m(p(p({},this.style),o),{width:this.size,height:this.size,borderRadius:this.borderRadius}):r=p(m(p({},o),{width:this.width,height:this.height,borderRadius:this.borderRadius}),this.style),r}static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275cmp=E({type:e,selectors:[["p-skeleton"]],inputs:{styleClass:"styleClass",style:"style",shape:"shape",animation:"animation",borderRadius:"borderRadius",size:"size",width:"width",height:"height"},features:[Pe([la]),Re],decls:1,vars:7,consts:[[3,"ngClass","ngStyle"]],template:function(r,i){r&1&&g(0,"div",0),r&2&&(be(i.styleClass),a("ngClass",i.containerClass())("ngStyle",i.containerStyle),I("data-pc-name","skeleton")("aria-hidden",!0)("data-pc-section","root"))},dependencies:[j,ie,Ue,le],encapsulation:2,changeDetection:0})}return e})(),ca=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ke({type:e});static \u0275inj=ye({imports:[xd,le,le]})}return e})();var wd=["app-menu-profile",""],Sd=(e,t)=>({"pi-angle-down":e,"pi-angle-up":t}),Id=()=>["/auth/login2"],Md=e=>["/settings/users/user-info",e];function Bd(e,t){if(e&1){let o=V();te(0),l(1,"button",1),$("click",function(){C(o);let i=u();return k(i.toggleMenu())}),g(2,"img",2),l(3,"span",3)(4,"strong"),x(5),c(),l(6,"small"),x(7),c()(),g(8,"i",4),c(),re()}if(e&2){let o=t.ngIf,r=u();d(),a("tooltipDisabled",r.isTooltipDisabled()),d(),a("src",(o==null?null:o.imageUrl)||"assets/images/avatar.png",Oe),d(3),hi("",o==null?null:o.names," ",o==null?null:o.lastNames,""),d(2),_e((o==null?null:o.position)||"Usuario"),d(),a("ngClass",vo(6,Sd,r.menuProfilePosition()==="start"||r.isHorizontal(),r.menuProfilePosition()==="end"&&!r.isHorizontal()))}}function Ed(e,t){if(e&1&&(l(0,"button",10),g(1,"i",11),l(2,"span"),x(3,"Perfil"),c()()),e&2){let o=t.ngIf;a("routerLink",X(1,Md,o.id))}}function Td(e,t){if(e&1&&(l(0,"ul")(1,"li",5),b(2,Ed,4,3,"button",6),ao(3,"async"),c(),l(4,"li",7)(5,"button",8),g(6,"i",9),l(7,"span"),x(8,"Cerrar sesi\xF3n"),c()()()()),e&2){let o=u();a("@menu",o.isHorizontal()?"overlay":"inline"),d(),a("tooltipDisabled",o.isTooltipDisabled()),d(),a("ngIf",so(3,5,o.user$)),d(2),a("tooltipDisabled",o.isTooltipDisabled())("routerLink",ho(7,Id))}}var Ot=class e{destroy$=new $e;_layoutService=v(me);store=v(je);user$=this.store.select(gn);loading$=this.store.select(bn);renderer=v(Ro);el=v(no);isHorizontal=P(()=>this._layoutService.isHorizontal()&&this._layoutService.isDesktop());menuProfileActive=P(()=>this._layoutService.layoutState().menuProfileActive);menuProfilePosition=P(()=>this._layoutService.layoutConfig().menuProfilePosition);isTooltipDisabled=P(()=>!this._layoutService.isSlim());subscription;outsideClickListener;constructor(){this.store.dispatch(vt({id:2})),this.subscription=this._layoutService.overlayOpen$.pipe(Ke(this.destroy$)).subscribe(()=>{this.isHorizontal()&&this.menuProfileActive()&&this._layoutService.layoutState.update(t=>m(p({},t),{menuProfileActive:!1}))}),Xe(()=>{this.isHorizontal()&&this.menuProfileActive()&&!this.outsideClickListener&&this.bindOutsideClickListener(),!this.menuProfileActive()&&this.isHorizontal()&&this.unbindOutsideClickListener()})}bindOutsideClickListener(){this.isHorizontal()&&(this.outsideClickListener=this.renderer.listen(document,"click",t=>{this.menuProfileActive()&&!(this.el.nativeElement.isSameNode(t.target)||this.el.nativeElement.contains(t.target))&&this._layoutService.layoutState.update(r=>m(p({},r),{menuProfileActive:!1}))}))}unbindOutsideClickListener(){this.outsideClickListener&&(this.outsideClickListener(),this.outsideClickListener=null)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.subscription.unsubscribe(),this.unbindOutsideClickListener()}toggleMenu(){this._layoutService.onMenuProfileToggle()}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=E({type:e,selectors:[["","app-menu-profile",""]],hostAttrs:[1,"layout-menu-profile"],attrs:wd,decls:3,vars:4,consts:[[4,"ngIf"],["pTooltip","Profile",3,"click","tooltipDisabled"],["alt","avatar",2,"width","32px","height","32px",3,"src"],[1,"text-start"],[1,"layout-menu-profile-toggler","pi","pi-fw",3,"ngClass"],["pTooltip","Profile",3,"tooltipDisabled"],[3,"routerLink",4,"ngIf"],["pTooltip","Logout",3,"tooltipDisabled","routerLink"],[1,"p-link"],[1,"pi","pi-power-off","pi-fw"],[3,"routerLink"],[1,"pi","pi-user","pi-fw"]],template:function(o,r){o&1&&(b(0,Bd,9,9,"ng-container",0),ao(1,"async"),b(2,Td,9,8,"ul",0)),o&2&&(a("ngIf",so(1,2,r.user$)),d(2),a("ngIf",r.menuProfileActive()))},dependencies:[j,ie,ne,yo,uo,So,Be,ae,eo,ca],encapsulation:2,data:{animation:[ko("menu",[He("void => inline",[he({height:0}),Ve("400ms cubic-bezier(0.86, 0, 0.07, 1)",he({opacity:1,height:"*"}))]),He("inline => void",[Ve("400ms cubic-bezier(0.86, 0, 0.07, 1)",he({opacity:0,height:"0"}))]),He("void => overlay",[he({opacity:0,transform:"scaleY(0.8)"}),Ve(".12s cubic-bezier(0, 0, 0.2, 1)")]),He("overlay => void",[Ve(".1s linear",he({opacity:0}))])])]}})};var $d=["submenu"],Rd=["app-menuitem",""],Ad=()=>({paths:"exact",queryParams:"ignored",matrixParams:"ignored",fragment:"ignored"});function Fd(e,t){if(e&1&&(l(0,"div",5)(1,"span"),x(2),c(),g(3,"i",6),c()),e&2){let o=u();d(2),_e(o.item.label)}}function Dd(e,t){e&1&&g(0,"i",11)}function Ld(e,t){if(e&1){let o=V();l(0,"a",7),$("click",function(i){C(o);let n=u();return k(n.itemClick(i))})("mouseenter",function(){C(o);let i=u();return k(i.onMouseEnter())}),g(1,"i",8),l(2,"span",9),x(3),c(),b(4,Dd,1,0,"i",10),c()}if(e&2){let o=u();a("ngClass",o.item.class)("pTooltip",o.item.label)("tooltipDisabled",!(o.isSlim()&&o.root&&!o.active)),I("href",o.item.url,Oe)("target",o.item.target),d(),a("ngClass",o.item.icon),d(2),_e(o.item.label),d(),a("ngIf",o.item.items)}}function zd(e,t){e&1&&g(0,"i",11)}function Od(e,t){if(e&1){let o=V();l(0,"a",12),$("click",function(i){C(o);let n=u();return k(n.itemClick(i))})("mouseenter",function(){C(o);let i=u();return k(i.onMouseEnter())}),g(1,"i",8),l(2,"span",9),x(3),c(),b(4,zd,1,0,"i",10),c()}if(e&2){let o=u();a("ngClass",o.item.class)("routerLink",o.item.routerLink)("routerLinkActiveOptions",o.item.routerLinkActiveOptions||ho(16,Ad))("fragment",o.item.fragment)("queryParamsHandling",o.item.queryParamsHandling)("preserveFragment",o.item.preserveFragment)("skipLocationChange",o.item.skipLocationChange)("replaceUrl",o.item.replaceUrl)("state",o.item.state)("queryParams",o.item.queryParams)("pTooltip",o.item.label)("tooltipDisabled",!(o.isSlim()&&o.root)),I("target",o.item.target),d(),a("ngClass",o.item.icon),d(2),_e(o.item.label),d(),a("ngIf",o.item.items)}}function Pd(e,t){if(e&1&&g(0,"li",14),e&2){let o=t.$implicit,r=t.index,i=u(2);be(o.badgeClass),a("item",o)("index",r)("parentKey",i.key)}}function Vd(e,t){if(e&1){let o=V();l(0,"ul",null,0),$("@children.done",function(i){C(o);let n=u();return k(n.onSubmenuAnimated(i))}),b(2,Pd,1,5,"ng-template",13),c()}if(e&2){let o=u();a("@children",o.submenuAnimation),d(2),a("ngForOf",o.item.items)}}var Pt=class e{constructor(t,o){this.layoutService=t;this.router=o;this.menuSourceSubscription=this.layoutService.menuSource$.subscribe(r=>{Promise.resolve(null).then(()=>{r.routeEvent?this.active=!!(r.key===this.key||r.key.startsWith(this.key+"-")):r.key!==this.key&&!r.key.startsWith(this.key+"-")&&(this.active=!1)})}),this.menuResetSubscription=this.layoutService.resetSource$.subscribe(()=>{this.active=!1}),this.router.events.pipe(ce(r=>r instanceof Co)).subscribe(r=>{this.isSlimPlus()||this.isSlim()||this.isHorizontal()?this.active=!1:this.item.routerLink&&this.updateActiveStateFromRoute()})}item;index;root;parentKey;submenu;get activeClass(){return this.active}active=!1;menuSourceSubscription;menuResetSubscription;key="";get submenuAnimation(){return this.layoutService.isDesktop()&&(this.layoutService.isHorizontal()||this.layoutService.isSlim()||this.layoutService.isSlimPlus())?this.active?"visible":"hidden":this.root||this.active?"expanded":"collapsed"}isSlim=P(()=>this.layoutService.isSlim());isSlimPlus=P(()=>this.layoutService.isSlimPlus());isHorizontal=P(()=>this.layoutService.isHorizontal());get isDesktop(){return this.layoutService.isDesktop()}get isMobile(){return this.layoutService.isMobile()}ngOnInit(){this.key=this.parentKey?this.parentKey+"-"+this.index:String(this.index),!(this.isSlimPlus()||this.isSlim()||this.isHorizontal())&&this.item.routerLink&&this.updateActiveStateFromRoute()}ngAfterViewChecked(){this.root&&this.active&&this.isDesktop&&(this.isHorizontal()||this.isSlim()||this.isSlimPlus())&&this.calculatePosition(this.submenu?.nativeElement,this.submenu?.nativeElement.parentElement)}updateActiveStateFromRoute(){this.router.isActive(this.item.routerLink[0],{paths:"exact",queryParams:"ignored",matrixParams:"ignored",fragment:"ignored"})&&this.layoutService.onMenuStateChange({key:this.key,routeEvent:!0})}onSubmenuAnimated(t){if(t.toState==="visible"&&this.isDesktop&&(this.isHorizontal()||this.isSlim()||this.isSlimPlus())){let o=t.element,r=o.parentElement;this.calculatePosition(o,r)}}calculatePosition(t,o){if(t){let{left:r,top:i}=o.getBoundingClientRect(),[n,s]=[window.innerWidth,window.innerHeight],[f,T]=[t.offsetWidth,t.offsetHeight],h=on.calculateScrollbarWidth(),y=document.querySelector(".layout-topbar")?.offsetHeight||0;if(t.style.top="",t.style.left="",this.layoutService.isHorizontal()){let B=r+f+h;t.style.left=n<B?`${r-(B-n)}px`:`${r}px`}else if(this.layoutService.isSlim()||this.layoutService.isSlimPlus()){let B=i-y,Y=B+T+y;t.style.top=s<Y?`${B-(Y-s)}px`:`${B}px`}}}itemClick(t){if(this.item.disabled){t.preventDefault();return}(this.root&&this.isSlim()||this.isHorizontal()||this.isSlimPlus())&&this.layoutService.layoutState.update(o=>m(p({},o),{menuHoverActive:!o.menuHoverActive})),this.item.command&&this.item.command({originalEvent:t,item:this.item}),this.item.items?(this.active=!this.active,this.root&&this.active&&(this.isSlim()||this.isHorizontal()||this.isSlimPlus())&&this.layoutService.onOverlaySubmenuOpen()):(this.layoutService.isMobile()&&this.layoutService.layoutState.update(o=>m(p({},o),{staticMenuMobileActive:!1})),(this.isSlim()||this.isHorizontal()||this.isSlimPlus())&&(this.layoutService.reset(),this.layoutService.layoutState.update(o=>m(p({},o),{menuHoverActive:!1})))),this.layoutService.onMenuStateChange({key:this.key})}onMouseEnter(){this.root&&(this.isSlim()||this.isHorizontal()||this.isSlimPlus())&&this.layoutService.isDesktop()&&this.layoutService.layoutState().menuHoverActive&&(this.active=!0,this.layoutService.onMenuStateChange({key:this.key}))}ngOnDestroy(){this.menuSourceSubscription&&this.menuSourceSubscription.unsubscribe(),this.menuResetSubscription&&this.menuResetSubscription.unsubscribe()}static \u0275fac=function(o){return new(o||e)(ue(me),ue(pe))};static \u0275cmp=E({type:e,selectors:[["","app-menuitem",""]],viewQuery:function(o,r){if(o&1&&H($d,5),o&2){let i;_(i=w())&&(r.submenu=i.first)}},hostVars:4,hostBindings:function(o,r){o&2&&fi("layout-root-menuitem",r.root)("active-menuitem",r.activeClass)},inputs:{item:"item",index:"index",root:"root",parentKey:"parentKey"},attrs:Rd,decls:5,vars:4,consts:[["submenu",""],["class","layout-menuitem-root-text",4,"ngIf"],["tabindex","0","pRipple","",3,"ngClass","pTooltip","tooltipDisabled","click","mouseenter",4,"ngIf"],["routerLinkActive","active-route","tabindex","0","pRipple","",3,"ngClass","routerLink","routerLinkActiveOptions","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state","queryParams","pTooltip","tooltipDisabled","click","mouseenter",4,"ngIf"],[4,"ngIf"],[1,"layout-menuitem-root-text"],[1,"layout-menuitem-root-icon","pi","pi-fw","pi-ellipsis-h"],["tabindex","0","pRipple","",3,"click","mouseenter","ngClass","pTooltip","tooltipDisabled"],[1,"layout-menuitem-icon",3,"ngClass"],[1,"layout-menuitem-text"],["class","pi pi-fw pi-angle-down layout-submenu-toggler",4,"ngIf"],[1,"pi","pi-fw","pi-angle-down","layout-submenu-toggler"],["routerLinkActive","active-route","tabindex","0","pRipple","",3,"click","mouseenter","ngClass","routerLink","routerLinkActiveOptions","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state","queryParams","pTooltip","tooltipDisabled"],["ngFor","",3,"ngForOf"],["app-menuitem","",3,"item","index","parentKey"]],template:function(o,r){o&1&&(te(0),b(1,Fd,4,1,"div",1)(2,Ld,5,8,"a",2)(3,Od,5,17,"a",3)(4,Vd,3,2,"ul",4),re()),o&2&&(d(),a("ngIf",r.root&&r.item.visible!==!1),d(),a("ngIf",(!r.item.routerLink||r.item.items)&&r.item.visible!==!1),d(),a("ngIf",r.item.routerLink&&!r.item.items&&r.item.visible!==!1),d(),a("ngIf",r.item.items&&r.item.visible!==!1))},dependencies:[e,j,ie,Ye,ne,ae,eo,lt,wo,gt,uo,So],encapsulation:2,data:{animation:[ko("children",[zo("collapsed",he({height:"0"})),zo("expanded",he({height:"*"})),zo("hidden",he({display:"none"})),zo("visible",he({display:"block"})),He("collapsed <=> expanded",Ve("400ms cubic-bezier(0.86, 0, 0.07, 1)"))])]}})};var Hd=["menuContainer"];function jd(e,t){if(e&1&&g(0,"li",5),e&2){let o=u(),r=o.$implicit,i=o.index;a("item",r)("index",i)("root",!0)}}function Nd(e,t){e&1&&g(0,"li",6)}function Ud(e,t){if(e&1&&(te(0),b(1,jd,1,3,"li",3)(2,Nd,1,0,"li",4),re()),e&2){let o=t.$implicit;d(),a("ngIf",!o.separator),d(),a("ngIf",o.separator)}}var ot=class e{constructor(t){this.menuService=t}store=v(je);el=v(no);menu$=this.store.select(po.selectMenuItems);menuContainer;ngOnInit(){this.store.dispatch(ve.loadMenu())}static \u0275fac=function(o){return new(o||e)(ue(Mo))};static \u0275cmp=E({type:e,selectors:[["app-menu"],["","app-menu",""]],viewQuery:function(o,r){if(o&1&&H(Hd,5),o&2){let i;_(i=w())&&(r.menuContainer=i.first)}},decls:4,vars:3,consts:[["menuContainer",""],[1,"layout-menu"],[4,"ngFor","ngForOf"],["app-menuitem","",3,"item","index","root",4,"ngIf"],["class","menu-separator",4,"ngIf"],["app-menuitem","",3,"item","index","root"],[1,"menu-separator"]],template:function(o,r){o&1&&(l(0,"ul",1,0),b(2,Ud,3,2,"ng-container",2),ao(3,"async"),c()),o&2&&(d(2),a("ngForOf",so(3,1,r.menu$)))},dependencies:[j,Ye,ne,yo,Pt,ae],encapsulation:2})};var Wd=["menuProfileStart"],Qd=["menuProfileEnd"],qd=["menuContainer"],Kd=["app-sidebar",""];function Gd(e,t){e&1&&g(0,"div",19,1)}var tt=class e{el=v(no);_layoutService=v(me);appMenu;menuProfileStart;menuProfileEnd;menuContainer;overlayMenuActive=P(()=>this._layoutService.layoutState().overlayMenuActive);menuProfilePosition=P(()=>this._layoutService.layoutConfig().menuProfilePosition);anchored=P(()=>this._layoutService.layoutState().anchored);timeout;resetOverlay(){this.overlayMenuActive()&&this._layoutService.layoutState.update(t=>m(p({},t),{overlayMenuActive:!1}))}onMouseEnter(){this.anchored()||(this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this._layoutService.layoutState.update(t=>m(p({},t),{sidebarActive:!0})))}onMouseLeave(){this.anchored()||this.timeout||(this.timeout=setTimeout(()=>this._layoutService.layoutState.update(t=>m(p({},t),{sidebarActive:!1})),300))}anchor(){this._layoutService.layoutState.update(t=>m(p({},t),{anchored:!t.anchored}))}ngOnDestroy(){this.resetOverlay()}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=E({type:e,selectors:[["","app-sidebar",""]],viewQuery:function(o,r){if(o&1&&(H(ot,5),H(Wd,5),H(Qd,5),H(qd,5)),o&2){let i;_(i=w())&&(r.appMenu=i.first),_(i=w())&&(r.menuProfileStart=i.first),_(i=w())&&(r.menuProfileEnd=i.first),_(i=w())&&(r.menuContainer=i.first)}},attrs:Kd,decls:18,vars:1,consts:[["menuContainer",""],["menuProfileStart",""],[1,"layout-sidebar",3,"mouseenter","mouseleave"],[1,"layout-sidebar-top"],["href","/"],["width","167","height","32","viewBox","0 0 167 32","fill","none","xmlns","http://www.w3.org/2000/svg",1,"layout-sidebar-logo"],["d","M76.5469 5.25V20.7812C76.5365 22.3125 76.1979 23.6458 75.5312 24.7812C74.8646 25.9167 73.9219 26.7917 72.7031 27.4062C71.4948 28.0104 70.1042 28.3125 68.5312 28.3125C66.1354 28.3125 64.2135 27.6615 62.7656 26.3594C61.3281 25.0469 60.5833 23.2344 60.5312 20.9219V5.25H62.4375V20.6406C62.4375 22.5573 62.9844 24.0469 64.0781 25.1094C65.1719 26.1615 66.6562 26.6875 68.5312 26.6875C70.4062 26.6875 71.8854 26.1562 72.9688 25.0938C74.0625 24.0312 74.6094 22.5521 74.6094 20.6562V5.25H76.5469Z","fill","var(--topbar-item-text-color)"],["d","M83.8438 26.375H95.0781V28H81.9062V5.25H83.8438V26.375Z","fill","var(--topbar-item-text-color)"],["d","M109.906 6.89062H102.109V28H100.188V6.89062H92.4062V5.25H109.906V6.89062Z","fill","var(--topbar-item-text-color)"],["d","M115.938 28H114.016V5.25H115.938V28Z","fill","var(--topbar-item-text-color)"],["d","M124.672 5.25L133.062 25.3281L141.484 5.25H144.047V28H142.125V18.0938L142.281 7.9375L133.812 28H132.328L123.891 8.01562L124.047 18.0312V28H122.125V5.25H124.672Z","fill","var(--topbar-item-text-color)"],["d","M162.375 21.625H152.047L149.703 28H147.688L156.297 5.25H158.125L166.734 28H164.734L162.375 21.625ZM152.641 19.9844H161.766L157.203 7.59375L152.641 19.9844Z","fill","var(--topbar-item-text-color)"],["fill-rule","evenodd","clip-rule","evenodd","d","M39.9709 8.57017C39.9112 8.42729 39.7717 8.33484 39.617 8.33484H37.5093L38.657 6.95037C38.752 6.83653 38.7711 6.67837 38.7083 6.54466C38.6455 6.41095 38.5106 6.32537 38.362 6.32537H15.2326L8.67361 0.10518C8.54643 -0.0147766 8.35336 -0.0346421 8.20625 0.0585729L4.52643 2.36221L4.52336 2.36526L4.51953 2.36679L0.17315 5.21978C0.162424 5.22666 0.157061 5.23735 0.147101 5.24576C0.125649 5.26257 0.107261 5.28091 0.0904059 5.30154C0.0750829 5.31987 0.0628245 5.33821 0.0513322 5.35884C0.0390738 5.381 0.0306461 5.40316 0.0229846 5.42684C0.015323 5.45129 0.0107261 5.47574 0.00766152 5.50172C0.00689537 5.51471 0 5.5254 0 5.53916C0 5.55138 0.00536306 5.56055 0.00689537 5.57278C0.00919382 5.59799 0.0145569 5.62168 0.0222184 5.64689C0.0298799 5.6721 0.0383076 5.69579 0.0513322 5.71948C0.0566952 5.72941 0.0574614 5.74011 0.0635906 5.75004C0.0689537 5.75844 0.0789137 5.7615 0.0850429 5.76914C0.111858 5.80352 0.14327 5.83179 0.180046 5.85471C0.193836 5.86312 0.204563 5.87382 0.218353 5.88069C0.268919 5.90514 0.324082 5.92119 0.383842 5.92119H5.61743L6.79883 8.86052L6.80036 8.86281V8.8651L14.4864 27.2292L9.94925 31.3353C9.83203 31.4415 9.79219 31.608 9.84965 31.7555C9.90635 31.903 10.0489 32 10.2067 32H16.7389C16.7895 32 16.8393 31.9893 16.886 31.9702C16.9327 31.9511 16.9749 31.9228 17.0101 31.8877L20.444 28.4502C20.4486 28.4555 20.4501 28.4624 20.4555 28.4678L23.707 31.8808C23.7798 31.958 23.8756 31.9794 23.9867 32C29.8899 31.9671 38.8462 31.9373 39.2676 31.9809C39.3074 31.9939 39.348 32 39.3886 32C39.5197 32 39.6476 31.9335 39.7189 31.8182C39.9403 31.459 39.9387 31.4552 28.6265 20.2603L39.8874 8.98888C39.9977 8.87733 40.0299 8.71305 39.9709 8.57017ZM37.5483 7.08867L36.5163 8.33484H17.3518L16.0379 7.08867H37.5483ZM8.36178 0.862361L16.2409 8.33484H7.41329L5.20447 2.83898L8.36178 0.862361ZM1.66178 5.15636L4.54864 3.2615L5.3102 5.15636H1.66178ZM21.0102 27.9406C21.0002 27.9299 20.9864 27.9253 20.9757 27.9169L23.7201 25.1701V30.7844L21.0102 27.9406ZM38.5045 31.213C37.058 31.1916 33.464 31.1825 24.4862 31.2321V24.6513C24.4862 24.581 24.4617 24.5183 24.4288 24.461L28.0864 20.7997C31.6934 24.3701 36.7998 29.4519 38.5045 31.213ZM16.8722 30.9425L7.72894 9.0989H36.6006C36.6282 9.10501 36.6558 9.11342 36.6834 9.11342C36.7056 9.11342 36.7263 9.10272 36.7485 9.0989H38.6945L16.8722 30.9425Z","fill","var(--topbar-item-text-color)"],["width","41","height","32","viewBox","0 0 41 32","fill","none","xmlns","http://www.w3.org/2000/svg",1,"layout-sidebar-logo-slim"],["fill-rule","evenodd","clip-rule","evenodd","d","M40.7209 8.57017C40.6612 8.42729 40.5217 8.33484 40.367 8.33484H38.2593L39.407 6.95037C39.502 6.83653 39.5211 6.67837 39.4583 6.54466C39.3955 6.41095 39.2606 6.32537 39.112 6.32537H15.9826L9.42361 0.10518C9.29643 -0.0147766 9.10336 -0.0346421 8.95625 0.0585729L5.27643 2.36221L5.27336 2.36526L5.26953 2.36679L0.92315 5.21978C0.912424 5.22666 0.907061 5.23735 0.897101 5.24576C0.875649 5.26257 0.857261 5.28091 0.840406 5.30154C0.825083 5.31987 0.812825 5.33821 0.801332 5.35884C0.789074 5.381 0.780646 5.40316 0.772985 5.42684C0.765323 5.45129 0.760726 5.47574 0.757662 5.50172C0.756895 5.51471 0.75 5.5254 0.75 5.53916C0.75 5.55138 0.755363 5.56055 0.756895 5.57278C0.759194 5.59799 0.764557 5.62168 0.772218 5.64689C0.77988 5.6721 0.788308 5.69579 0.801332 5.71948C0.806695 5.72941 0.807461 5.74011 0.813591 5.75004C0.818954 5.75844 0.828914 5.7615 0.835043 5.76914C0.861858 5.80352 0.89327 5.83179 0.930046 5.85471C0.943836 5.86312 0.954563 5.87382 0.968353 5.88069C1.01892 5.90514 1.07408 5.92119 1.13384 5.92119H6.36743L7.54883 8.86052L7.55036 8.86281V8.8651L15.2364 27.2292L10.6993 31.3353C10.582 31.4415 10.5422 31.608 10.5997 31.7555C10.6564 31.903 10.7989 32 10.9567 32H17.4889C17.5395 32 17.5893 31.9893 17.636 31.9702C17.6827 31.9511 17.7249 31.9228 17.7601 31.8877L21.194 28.4502C21.1986 28.4555 21.2001 28.4624 21.2055 28.4678L24.457 31.8808C24.5298 31.958 24.6256 31.9794 24.7367 32C30.6399 31.9671 39.5962 31.9373 40.0176 31.9809C40.0574 31.9939 40.098 32 40.1386 32C40.2697 32 40.3976 31.9335 40.4689 31.8182C40.6903 31.459 40.6887 31.4552 29.3765 20.2603L40.6374 8.98888C40.7477 8.87733 40.7799 8.71305 40.7209 8.57017ZM38.2983 7.08867L37.2663 8.33484H18.1018L16.7879 7.08867H38.2983ZM9.11178 0.862361L16.9909 8.33484H8.16329L5.95447 2.83898L9.11178 0.862361ZM2.41178 5.15636L5.29864 3.2615L6.0602 5.15636H2.41178ZM21.7602 27.9406C21.7502 27.9299 21.7364 27.9253 21.7257 27.9169L24.4701 25.1701V30.7844L21.7602 27.9406ZM39.2545 31.213C37.808 31.1916 34.214 31.1825 25.2362 31.2321V24.6513C25.2362 24.581 25.2117 24.5183 25.1788 24.461L28.8364 20.7997C32.4434 24.3701 37.5498 29.4519 39.2545 31.213ZM17.6222 30.9425L8.47894 9.0989H37.3506C37.3782 9.10501 37.4058 9.11342 37.4334 9.11342C37.4556 9.11342 37.4763 9.10272 37.4985 9.0989H39.4445L17.6222 30.9425Z","fill","var(--topbar-item-text-color)"],["type","button",1,"layout-sidebar-anchor",3,"click"],["app-menu-profile","",4,"ngIf"],[1,"layout-menu-container"],["app-menu",""],["app-menu-profile",""]],template:function(o,r){if(o&1){let i=V();l(0,"div",2),$("mouseenter",function(){return C(i),k(r.onMouseEnter())})("mouseleave",function(){return C(i),k(r.onMouseLeave())}),l(1,"div",3)(2,"a",4),Ge(),l(3,"svg",5),g(4,"path",6)(5,"path",7)(6,"path",8)(7,"path",9)(8,"path",10)(9,"path",11)(10,"path",12),c(),l(11,"svg",13),g(12,"path",14),c()(),go(),l(13,"button",15),$("click",function(){return C(i),k(r.anchor())}),c()(),b(14,Gd,2,0,"div",16),l(15,"div",17,0),g(17,"div",18),c()()}o&2&&(d(14),a("ngIf",r.menuProfilePosition()==="start"))},dependencies:[ot,j,ne,Ot],encapsulation:2})};var Zd=["app-breadcrumb",""];function Xd(e,t){if(e&1&&(l(0,"li"),g(1,"i",3),c(),l(2,"li")(3,"span"),x(4),c()()),e&2){let o=t.$implicit;d(4),_e(o.label)}}var Vt=class e{constructor(t){this.router=t;this.router.events.pipe(ce(o=>o instanceof Co),Ke(this.destroy$)).subscribe(o=>{let r=this.router.routerState.snapshot.root,i=[];this.addBreadcrumb(r,[],i),this._breadcrumbs$.next(i)})}destroy$=new $e;_breadcrumbs$=new Ur([]);breadcrumbs$=this._breadcrumbs$.asObservable();ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}addBreadcrumb(t,o,r){let i=o.concat(t.url.map(f=>f.path)),n=t.data.breadcrumb,s=t.parent&&t.parent.data?t.parent.data.breadcrumb:null;n&&n!==s&&r.push({label:t.data.breadcrumb,url:"/"+i.join("/")}),t.firstChild&&this.addBreadcrumb(t.firstChild,i,r)}static \u0275fac=function(o){return new(o||e)(ue(pe))};static \u0275cmp=E({type:e,selectors:[["","app-breadcrumb",""]],hostAttrs:[1,"layout-breadcrumb-container"],attrs:Zd,decls:6,vars:3,consts:[[1,"layout-breadcrumb"],[1,"pi","pi-home"],["ngFor","",3,"ngForOf"],[1,"pi","pi-angle-right"]],template:function(o,r){o&1&&(l(0,"nav",0)(1,"ol")(2,"li"),g(3,"i",1),c(),b(4,Xd,5,1,"ng-template",2),ao(5,"async"),c()()),o&2&&(d(4),a("ngForOf",so(5,1,r.breadcrumbs$)))},dependencies:[j,Ye,yo,ae,Be,wo],encapsulation:2})};var da={root:{transitionDuration:"{transition.duration}"},panel:{borderWidth:"0",borderColor:"{content.border.color}"},header:{color:"{text.color}",hoverColor:"{text.color}",activeColor:"{text.color}",padding:"1.25rem",fontWeight:"600",borderRadius:"0",borderWidth:"0",borderColor:"{content.border.color}",background:"{content.background}",hoverBackground:"{content.hover.background}",activeBackground:"{content.background}",activeHoverBackground:"{content.background}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"},toggleIcon:{color:"{text.muted.color}",hoverColor:"{text.muted.color}",activeColor:"{text.muted.color}",activeHoverColor:"{text.muted.color}"},first:{topBorderRadius:"{content.border.radius}",borderWidth:"0"},last:{bottomBorderRadius:"{content.border.radius}",activeBottomBorderRadius:"0"}},content:{borderWidth:"0",borderColor:"{content.border.color}",background:"{content.background}",color:"{text.color}",padding:"0 1.25rem 1.25rem 1.25rem"},css:({dt:e})=>`
.p-accordionpanel {
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: margin ${e("accordion.transition.duration")};
}

.p-accordionpanel-active {
    margin: 1rem 0;
}

.p-accordionpanel:first-child {
    border-start-start-radius: ${e("content.border.radius")};
    border-start-end-radius: ${e("content.border.radius")};
    margin-top: 0;
}

.p-accordionpanel:last-child {
    border-end-start-radius: ${e("content.border.radius")};
    border-end-end-radius: ${e("content.border.radius")};
    margin-bottom: 0;
}

.p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
    background: ${e("navigation.item.active.background")};
}
`};var ua={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}"},overlay:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},list:{padding:"{list.padding}",gap:"{list.gap}"},option:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},optionGroup:{background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},dropdown:{width:"3rem",sm:{width:"2.5rem"},lg:{width:"3.5rem"},borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",borderRadius:"{form.field.border.radius}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},chip:{borderRadius:"{border.radius.sm}"},emptyMessage:{padding:"{list.option.padding}"},colorScheme:{light:{chip:{focusBackground:"{surface.300}",focusColor:"{surface.950}"},dropdown:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}"}},dark:{chip:{focusBackground:"{surface.600}",focusColor:"{surface.0}"},dropdown:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}"}}},css:({dt:e})=>`
.p-autocomplete-dropdown:focus-visible {
    background: ${e("autocomplete.dropdown.hover.background")}
    border-color: ${e("autocomplete.dropdown.hover.border.color")};
    color: ${e("autocomplete.dropdown.hover.color")};
}

.p-variant-filled.p-autocomplete-input-multiple {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid transparent;
    background: ${e("autocomplete.filled.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("autocomplete.focus.border.color")}, ${e("autocomplete.focus.border.color")}), linear-gradient(to bottom, ${e("autocomplete.border.color")}, ${e("autocomplete.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}

.p-autocomplete:not(.p-disabled):hover .p-variant-filled.p-autocomplete-input-multiple {
    background: ${e("autocomplete.filled.hover.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("autocomplete.focus.border.color")}, ${e("autocomplete.focus.border.color")}), linear-gradient(to bottom, ${e("autocomplete.hover.border.color")}, ${e("autocomplete.hover.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-autocomplete:not(.p-disabled).p-focus .p-variant-filled.p-autocomplete-input-multiple {
    outline: 0 none;
    background: ${e("autocomplete.filled.focus.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("autocomplete.focus.border.color")}, ${e("autocomplete.focus.border.color")}), linear-gradient(to bottom, ${e("autocomplete.border.color")}, ${e("autocomplete.border.color")});
    background-size: 100% 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-autocomplete:not(.p-disabled).p-focus:hover .p-variant-filled.p-autocomplete-input-multiple {
    background-image: linear-gradient(to bottom, ${e("autocomplete.focus.border.color")}, ${e("autocomplete.focus.border.color")}), linear-gradient(to bottom, ${e("autocomplete.hover.border.color")}, ${e("autocomplete.hover.border.color")});
}

.p-autocomplete.p-invalid .p-autocomplete-input-multiple {
    background-image: linear-gradient(to bottom, ${e("autocomplete.invalid.border.color")}, ${e("autocomplete.invalid.border.color")}), linear-gradient(to bottom, ${e("autocomplete.invalid.border.color")}, ${e("autocomplete.invalid.border.color")});
}

.p-autocomplete.p-invalid.p-focus .p-autocomplete-input-multiple  {
    background-image: linear-gradient(to bottom, ${e("autocomplete.invalid.border.color")}, ${e("autocomplete.invalid.border.color")}), linear-gradient(to bottom, ${e("autocomplete.invalid.border.color")}, ${e("autocomplete.invalid.border.color")});
}

.p-autocomplete-option {
    transition: none;
}

.p-autocomplete:has(.p-variant-filled) .p-autocomplete-dropdown {
    border-top-color: transparent;
    border-right-color: transparent;
}
`};var pa={root:{width:"2rem",height:"2rem",fontSize:"1rem",background:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},icon:{size:"1rem"},group:{borderColor:"{content.background}",offset:"-0.75rem"},lg:{width:"3rem",height:"3rem",fontSize:"1.5rem",icon:{size:"1.5rem"},group:{offset:"-1rem"}},xl:{width:"4rem",height:"4rem",fontSize:"2rem",icon:{size:"2rem"},group:{offset:"-1.5rem"}}};var ma={root:{borderRadius:"{border.radius.md}",padding:"0 0.5rem",fontSize:"0.75rem",fontWeight:"700",minWidth:"1.5rem",height:"1.5rem"},dot:{size:"0.5rem"},sm:{fontSize:"0.625rem",minWidth:"1.25rem",height:"1.25rem"},lg:{fontSize:"0.875rem",minWidth:"1.75rem",height:"1.75rem"},xl:{fontSize:"1rem",minWidth:"2rem",height:"2rem"},colorScheme:{light:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.100}",color:"{surface.600}"},success:{background:"{green.500}",color:"{surface.0}"},info:{background:"{sky.500}",color:"{surface.0}"},warn:{background:"{orange.500}",color:"{surface.0}"},danger:{background:"{red.500}",color:"{surface.0}"},contrast:{background:"{surface.950}",color:"{surface.0}"}},dark:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.800}",color:"{surface.300}"},success:{background:"{green.400}",color:"{green.950}"},info:{background:"{sky.400}",color:"{sky.950}"},warn:{background:"{orange.400}",color:"{orange.950}"},danger:{background:"{red.400}",color:"{red.950}"},contrast:{background:"{surface.0}",color:"{surface.950}"}}}};var fa={primitive:{borderRadius:{none:"0",xs:"2px",sm:"4px",md:"6px",lg:"8px",xl:"12px"},emerald:{50:"#E8F6F1",100:"#C5EBE1",200:"#9EDFCF",300:"#76D3BD",400:"#58C9AF",500:"#3BBFA1",600:"#35AF94",700:"#2D9B83",800:"#268873",900:"#1A6657",950:"#0d3329"},green:{50:"#E8F5E9",100:"#C8E6C9",200:"#A5D6A7",300:"#81C784",400:"#66BB6A",500:"#4CAF50",600:"#43A047",700:"#388E3C",800:"#2E7D32",900:"#1B5E20",950:"#0e2f10"},lime:{50:"#F9FBE7",100:"#F0F4C3",200:"#E6EE9C",300:"#DCE775",400:"#D4E157",500:"#CDDC39",600:"#C0CA33",700:"#AFB42B",800:"#9E9D24",900:"#827717",950:"#413c0c"},red:{50:"#FFEBEE",100:"#FFCDD2",200:"#EF9A9A",300:"#E57373",400:"#EF5350",500:"#F44336",600:"#E53935",700:"#D32F2F",800:"#C62828",900:"#B71C1C",950:"#5c0e0e"},orange:{50:"#FFF3E0",100:"#FFE0B2",200:"#FFCC80",300:"#FFB74D",400:"#FFA726",500:"#FF9800",600:"#FB8C00",700:"#F57C00",800:"#EF6C00",900:"#E65100",950:"#732900"},amber:{50:"#FFF8E1",100:"#FFECB3",200:"#FFE082",300:"#FFD54F",400:"#FFCA28",500:"#FFC107",600:"#FFB300",700:"#FFA000",800:"#FF8F00",900:"#FF6F00",950:"#803800"},yellow:{50:"#FFFDE7",100:"#FFF9C4",200:"#FFF59D",300:"#FFF176",400:"#FFEE58",500:"#FFEB3B",600:"#FDD835",700:"#FBC02D",800:"#F9A825",900:"#F57F17",950:"#7b400c"},teal:{50:"#E0F2F1",100:"#B2DFDB",200:"#80CBC4",300:"#4DB6AC",400:"#26A69A",500:"#009688",600:"#00897B",700:"#00796B",800:"#00695C",900:"#004D40",950:"#002720"},cyan:{50:"#E0F7FA",100:"#B2EBF2",200:"#80DEEA",300:"#4DD0E1",400:"#26C6DA",500:"#00BCD4",600:"#00ACC1",700:"#0097A7",800:"#00838F",900:"#006064",950:"#003032"},sky:{50:"#E1F5FE",100:"#B3E5FC",200:"#81D4FA",300:"#4FC3F7",400:"#29B6F6",500:"#03A9F4",600:"#039BE5",700:"#0288D1",800:"#0277BD",900:"#01579B",950:"#012c4e"},blue:{50:"#E3F2FD",100:"#BBDEFB",200:"#90CAF9",300:"#64B5F6",400:"#42A5F5",500:"#2196F3",600:"#1E88E5",700:"#1976D2",800:"#1565C0",900:"#0D47A1",950:"#072451"},indigo:{50:"#E8EAF6",100:"#C5CAE9",200:"#9FA8DA",300:"#7986CB",400:"#5C6BC0",500:"#3F51B5",600:"#3949AB",700:"#303F9F",800:"#283593",900:"#1A237E",950:"#0d123f"},violet:{50:"#EDE7F6",100:"#D1C4E9",200:"#B39DDB",300:"#9575CD",400:"#7E57C2",500:"#673AB7",600:"#5E35B1",700:"#512DA8",800:"#4527A0",900:"#311B92",950:"#190e49"},purple:{50:"#F3E5F5",100:"#E1BEE7",200:"#CE93D8",300:"#BA68C8",400:"#AB47BC",500:"#9C27B0",600:"#8E24AA",700:"#7B1FA2",800:"#6A1B9A",900:"#4A148C",950:"#250a46"},fuchsia:{50:"#FDE6F3",100:"#FBC1E3",200:"#F897D1",300:"#F56DBF",400:"#F34DB2",500:"#F12DA5",600:"#E0289D",700:"#CC2392",800:"#B81E88",900:"#951777",950:"#4b0c3c"},pink:{50:"#FCE4EC",100:"#F8BBD0",200:"#F48FB1",300:"#F06292",400:"#EC407A",500:"#E91E63",600:"#D81B60",700:"#C2185B",800:"#AD1457",900:"#880E4F",950:"#440728"},rose:{50:"#FFF0F0",100:"#FFD9D9",200:"#FFC0C0",300:"#FFA7A7",400:"#FF8E8E",500:"#FF7575",600:"#FF5252",700:"#FF3838",800:"#F71C1C",900:"#D50000",950:"#3E0000"},slate:{50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"},gray:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"},zinc:{50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b"},neutral:{50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a"},stone:{50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09"}},semantic:{transitionDuration:"0.2s",focusRing:{width:"0",style:"none",color:"unset",offset:"0"},disabledOpacity:"0.38",iconSize:"1rem",anchorGutter:"0",primary:{50:"{emerald.50}",100:"{emerald.100}",200:"{emerald.200}",300:"{emerald.300}",400:"{emerald.400}",500:"{emerald.500}",600:"{emerald.600}",700:"{emerald.700}",800:"{emerald.800}",900:"{emerald.900}",950:"{emerald.950}"},formField:{paddingX:"0.75rem",paddingY:"0.75rem",sm:{fontSize:"0.875rem",paddingX:"0.625rem",paddingY:"0.625rem"},lg:{fontSize:"1.125rem",paddingX:"0.825rem",paddingY:"0.825rem"},borderRadius:"{border.radius.sm}",focusRing:{width:"2px",style:"solid",color:"{primary.color}",offset:"-2px",shadow:"none"},transitionDuration:"{transition.duration}"},list:{padding:"0.5rem 0",gap:"0",header:{padding:"0.75rem 1rem"},option:{padding:"0.75rem 1rem",borderRadius:"{border.radius.none}"},optionGroup:{padding:"0.75rem 1rem",fontWeight:"700"}},content:{borderRadius:"{border.radius.sm}"},mask:{transitionDuration:"0.15s"},navigation:{list:{padding:"0.5rem 0",gap:"0"},item:{padding:"0.75rem 1rem",borderRadius:"{border.radius.none}",gap:"0.5rem"},submenuLabel:{padding:"0.75rem 1rem",fontWeight:"700"},submenuIcon:{size:"0.875rem"}},overlay:{select:{borderRadius:"{border.radius.sm}",shadow:"0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)"},popover:{borderRadius:"{border.radius.sm}",padding:"1rem",shadow:"0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12)"},modal:{borderRadius:"{border.radius.sm}",padding:"1.5rem",shadow:"0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12)"},navigation:{shadow:"0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)"}},colorScheme:{light:{focusRing:{shadow:"0 0 1px 4px {surface.200}"},surface:{0:"#ffffff",50:"{slate.50}",100:"{slate.100}",200:"{slate.200}",300:"{slate.300}",400:"{slate.400}",500:"{slate.500}",600:"{slate.600}",700:"{slate.700}",800:"{slate.800}",900:"{slate.900}",950:"{slate.950}"},primary:{color:"{primary.500}",contrastColor:"#ffffff",hoverColor:"{primary.400}",activeColor:"{primary.300}"},highlight:{background:"color-mix(in srgb, {primary.color}, transparent 88%)",focusBackground:"color-mix(in srgb, {primary.color}, transparent 76%)",color:"{primary.700}",focusColor:"{primary.800}"},mask:{background:"rgba(0,0,0,0.32)",color:"{surface.200}"},formField:{background:"{surface.0}",disabledBackground:"{surface.300}",filledBackground:"{surface.100}",filledHoverBackground:"{surface.200}",filledFocusBackground:"{surface.100}",borderColor:"{surface.400}",hoverBorderColor:"{surface.900}",focusBorderColor:"{primary.color}",invalidBorderColor:"{red.800}",color:"{surface.900}",disabledColor:"{surface.600}",placeholderColor:"{surface.600}",invalidPlaceholderColor:"{red.800}",floatLabelColor:"{surface.600}",floatLabelFocusColor:"{primary.600}",floatLabelActiveColor:"{surface.600}",floatLabelInvalidColor:"{form.field.invalid.placeholder.color}",iconColor:"{surface.600}",shadow:"none"},text:{color:"{surface.900}",hoverColor:"{surface.900}",mutedColor:"{surface.600}",hoverMutedColor:"{surface.600}"},content:{background:"{surface.0}",hoverBackground:"{surface.100}",borderColor:"{surface.300}",color:"{text.color}",hoverColor:"{text.hover.color}"},overlay:{select:{background:"{surface.0}",borderColor:"{surface.0}",color:"{text.color}"},popover:{background:"{surface.0}",borderColor:"{surface.0}",color:"{text.color}"},modal:{background:"{surface.0}",borderColor:"{surface.0}",color:"{text.color}"}},list:{option:{focusBackground:"{surface.100}",selectedBackground:"{highlight.background}",selectedFocusBackground:"{highlight.focus.background}",color:"{text.color}",focusColor:"{text.hover.color}",selectedColor:"{highlight.color}",selectedFocusColor:"{highlight.focus.color}",icon:{color:"{surface.600}",focusColor:"{surface.600}"}},optionGroup:{background:"transparent",color:"{text.color}"}},navigation:{item:{focusBackground:"{surface.100}",activeBackground:"{surface.200}",color:"{text.color}",focusColor:"{text.hover.color}",activeColor:"{text.hover.color}",icon:{color:"{surface.600}",focusColor:"{surface.600}",activeColor:"{surface.600}"}},submenuLabel:{background:"transparent",color:"{text.color}"},submenuIcon:{color:"{surface.600}",focusColor:"{surface.600}",activeColor:"{surface.600}"}}},dark:{focusRing:{shadow:"0 0 1px 4px {surface.700}"},surface:{0:"#ffffff",50:"{zinc.50}",100:"{zinc.100}",200:"{zinc.200}",300:"{zinc.300}",400:"{zinc.400}",500:"{zinc.500}",600:"{zinc.600}",700:"{zinc.700}",800:"{zinc.800}",900:"{zinc.900}",950:"{zinc.950}"},primary:{color:"{primary.400}",contrastColor:"{surface.900}",hoverColor:"{primary.300}",activeColor:"{primary.200}"},highlight:{background:"color-mix(in srgb, {primary.400}, transparent 84%)",focusBackground:"color-mix(in srgb, {primary.400}, transparent 76%)",color:"rgba(255,255,255,.87)",focusColor:"rgba(255,255,255,.87)"},mask:{background:"rgba(0,0,0,0.6)",color:"{surface.200}"},formField:{background:"{surface.950}",disabledBackground:"{surface.700}",filledBackground:"{surface.800}",filledHoverBackground:"{surface.700}",filledFocusBackground:"{surface.800}",borderColor:"{surface.600}",hoverBorderColor:"{surface.400}",focusBorderColor:"{primary.color}",invalidBorderColor:"{red.300}",color:"{surface.0}",disabledColor:"{surface.400}",placeholderColor:"{surface.400}",invalidPlaceholderColor:"{red.300}",floatLabelColor:"{surface.400}",floatLabelFocusColor:"{primary.color}",floatLabelActiveColor:"{surface.400}",floatLabelInvalidColor:"{form.field.invalid.placeholder.color}",iconColor:"{surface.400}",shadow:"none"},text:{color:"{surface.0}",hoverColor:"{surface.0}",mutedColor:"{surface.400}",hoverMutedColor:"{surface.400}"},content:{background:"{surface.900}",hoverBackground:"{surface.800}",borderColor:"{surface.700}",color:"{text.color}",hoverColor:"{text.hover.color}"},overlay:{select:{background:"{surface.900}",borderColor:"{surface.900}",color:"{text.color}"},popover:{background:"{surface.900}",borderColor:"{surface.900}",color:"{text.color}"},modal:{background:"{surface.900}",borderColor:"{surface.900}",color:"{text.color}"}},list:{option:{focusBackground:"{surface.800}",selectedBackground:"{highlight.background}",selectedFocusBackground:"{highlight.focus.background}",color:"{text.color}",focusColor:"{text.hover.color}",selectedColor:"{highlight.color}",selectedFocusColor:"{highlight.focus.color}",icon:{color:"{surface.400}",focusColor:"{surface.400}"}},optionGroup:{background:"transparent",color:"{text.muted.color}"}},navigation:{item:{focusBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{text.color}",focusColor:"{text.hover.color}",activeColor:"{text.hover.color}",icon:{color:"{surface.400}",focusColor:"{surface.400}",activeColor:"{surface.400}"}},submenuLabel:{background:"transparent",color:"{text.muted.color}"},submenuIcon:{color:"{surface.400}",focusColor:"{surface.400}",activeColor:"{surface.400}"}}}}}};var ga={root:{borderRadius:"{content.border.radius}"}};var ba={root:{padding:"1rem",background:"{content.background}",gap:"0.5rem",transitionDuration:"{transition.duration}"},item:{color:"{text.muted.color}",hoverColor:"{text.color}",borderRadius:"{content.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",hoverColor:"{navigation.item.icon.focus.color}"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},separator:{color:"{navigation.item.icon.color}"}};var ha={root:{borderRadius:"{form.field.border.radius}",roundedBorderRadius:"2rem",gap:"0.5rem",paddingX:"1rem",paddingY:"0.625rem",iconOnlyWidth:"3rem",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}",iconOnlyWidth:"2.5rem"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}",iconOnlyWidth:"3.5rem"},label:{fontWeight:"500"},raisedShadow:"0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"},badgeSize:"1rem",transitionDuration:"{form.field.transition.duration}"},colorScheme:{light:{root:{primary:{background:"{primary.color}",hoverBackground:"{primary.hover.color}",activeBackground:"{primary.active.color}",borderColor:"{primary.color}",hoverBorderColor:"{primary.hover.color}",activeBorderColor:"{primary.active.color}",color:"{primary.contrast.color}",hoverColor:"{primary.contrast.color}",activeColor:"{primary.contrast.color}",focusRing:{color:"{primary.color}",shadow:"none"}},secondary:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",borderColor:"{surface.100}",hoverBorderColor:"{surface.200}",activeBorderColor:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}",focusRing:{color:"{surface.600}",shadow:"none"}},info:{background:"{sky.500}",hoverBackground:"{sky.400}",activeBackground:"{sky.300}",borderColor:"{sky.500}",hoverBorderColor:"{sky.400}",activeBorderColor:"{sky.300}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{sky.500}",shadow:"none"}},success:{background:"{green.500}",hoverBackground:"{green.400}",activeBackground:"{green.300}",borderColor:"{green.500}",hoverBorderColor:"{green.400}",activeBorderColor:"{green.300}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{green.500}",shadow:"none"}},warn:{background:"{orange.500}",hoverBackground:"{orange.400}",activeBackground:"{orange.300}",borderColor:"{orange.500}",hoverBorderColor:"{orange.400}",activeBorderColor:"{orange.300}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{orange.500}",shadow:"none"}},help:{background:"{purple.500}",hoverBackground:"{purple.400}",activeBackground:"{purple.300}",borderColor:"{purple.500}",hoverBorderColor:"{purple.400}",activeBorderColor:"{purple.300}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{purple.500}",shadow:"none"}},danger:{background:"{red.500}",hoverBackground:"{red.400}",activeBackground:"{red.300}",borderColor:"{red.500}",hoverBorderColor:"{red.400}",activeBorderColor:"{red.300}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{red.500}",shadow:"none"}},contrast:{background:"{surface.950}",hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.950}",hoverBorderColor:"{surface.800}",activeBorderColor:"{surface.700}",color:"{surface.0}",hoverColor:"{surface.0}",activeColor:"{surface.0}",focusRing:{color:"{surface.950}",shadow:"none"}}},outlined:{primary:{hoverBackground:"{primary.50}",activeBackground:"{primary.100}",borderColor:"{primary.color}",color:"{primary.color}"},secondary:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.600}",color:"{surface.600}"},success:{hoverBackground:"{green.50}",activeBackground:"{green.100}",borderColor:"{green.500}",color:"{green.500}"},info:{hoverBackground:"{sky.50}",activeBackground:"{sky.100}",borderColor:"{sky.500}",color:"{sky.500}"},warn:{hoverBackground:"{orange.50}",activeBackground:"{orange.100}",borderColor:"{orange.500}",color:"{orange.500}"},help:{hoverBackground:"{purple.50}",activeBackground:"{purple.100}",borderColor:"{purple.500}",color:"{purple.500}"},danger:{hoverBackground:"{red.50}",activeBackground:"{red.100}",borderColor:"{red.500}",color:"{red.500}"},contrast:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.950}",color:"{surface.950}"},plain:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.900}",color:"{surface.900}"}},text:{primary:{hoverBackground:"{primary.50}",activeBackground:"{primary.100}",color:"{primary.color}"},secondary:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.600}"},success:{hoverBackground:"{green.50}",activeBackground:"{green.100}",color:"{green.500}"},info:{hoverBackground:"{sky.50}",activeBackground:"{sky.100}",color:"{sky.500}"},warn:{hoverBackground:"{orange.50}",activeBackground:"{orange.100}",color:"{orange.500}"},help:{hoverBackground:"{purple.50}",activeBackground:"{purple.100}",color:"{purple.500}"},danger:{hoverBackground:"{red.50}",activeBackground:"{red.100}",color:"{red.500}"},contrast:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.950}"},plain:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.900}"}},link:{color:"{primary.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"}},dark:{root:{primary:{background:"{primary.color}",hoverBackground:"{primary.hover.color}",activeBackground:"{primary.active.color}",borderColor:"{primary.color}",hoverBorderColor:"{primary.hover.color}",activeBorderColor:"{primary.active.color}",color:"{primary.contrast.color}",hoverColor:"{primary.contrast.color}",activeColor:"{primary.contrast.color}",focusRing:{color:"{primary.color}",shadow:"none"}},secondary:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",borderColor:"{surface.800}",hoverBorderColor:"{surface.700}",activeBorderColor:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}",focusRing:{color:"{surface.300}",shadow:"none"}},info:{background:"{sky.400}",hoverBackground:"{sky.300}",activeBackground:"{sky.200}",borderColor:"{sky.400}",hoverBorderColor:"{sky.300}",activeBorderColor:"{sky.200}",color:"{sky.950}",hoverColor:"{sky.950}",activeColor:"{sky.950}",focusRing:{color:"{sky.400}",shadow:"none"}},success:{background:"{green.400}",hoverBackground:"{green.300}",activeBackground:"{green.200}",borderColor:"{green.400}",hoverBorderColor:"{green.300}",activeBorderColor:"{green.200}",color:"{green.950}",hoverColor:"{green.950}",activeColor:"{green.950}",focusRing:{color:"{green.400}",shadow:"none"}},warn:{background:"{orange.400}",hoverBackground:"{orange.300}",activeBackground:"{orange.200}",borderColor:"{orange.400}",hoverBorderColor:"{orange.300}",activeBorderColor:"{orange.200}",color:"{orange.950}",hoverColor:"{orange.950}",activeColor:"{orange.950}",focusRing:{color:"{orange.400}",shadow:"none"}},help:{background:"{purple.400}",hoverBackground:"{purple.300}",activeBackground:"{purple.200}",borderColor:"{purple.400}",hoverBorderColor:"{purple.300}",activeBorderColor:"{purple.200}",color:"{purple.950}",hoverColor:"{purple.950}",activeColor:"{purple.950}",focusRing:{color:"{purple.400}",shadow:"none"}},danger:{background:"{red.400}",hoverBackground:"{red.300}",activeBackground:"{red.200}",borderColor:"{red.400}",hoverBorderColor:"{red.300}",activeBorderColor:"{red.200}",color:"{red.950}",hoverColor:"{red.950}",activeColor:"{red.950}",focusRing:{color:"{red.400}",shadow:"none"}},contrast:{background:"{surface.0}",hoverBackground:"{surface.100}",activeBackground:"{surface.200}",borderColor:"{surface.0}",hoverBorderColor:"{surface.100}",activeBorderColor:"{surface.200}",color:"{surface.950}",hoverColor:"{surface.950}",activeColor:"{surface.950}",focusRing:{color:"{surface.0}",shadow:"none"}}},outlined:{primary:{hoverBackground:"color-mix(in srgb, {primary.color}, transparent 96%)",activeBackground:"color-mix(in srgb, {primary.color}, transparent 84%)",borderColor:"{primary.700}",color:"{primary.color}"},secondary:{hoverBackground:"rgba(255,255,255,0.04)",activeBackground:"rgba(255,255,255,0.16)",borderColor:"{surface.700}",color:"{surface.400}"},success:{hoverBackground:"color-mix(in srgb, {green.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {green.400}, transparent 84%)",borderColor:"{green.700}",color:"{green.400}"},info:{hoverBackground:"color-mix(in srgb, {sky.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {sky.400}, transparent 84%)",borderColor:"{sky.700}",color:"{sky.400}"},warn:{hoverBackground:"color-mix(in srgb, {orange.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {orange.400}, transparent 84%)",borderColor:"{orange.700}",color:"{orange.400}"},help:{hoverBackground:"color-mix(in srgb, {purple.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {purple.400}, transparent 84%)",borderColor:"{purple.700}",color:"{purple.400}"},danger:{hoverBackground:"color-mix(in srgb, {red.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {red.400}, transparent 84%)",borderColor:"{red.700}",color:"{red.400}"},contrast:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.500}",color:"{surface.0}"},plain:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.600}",color:"{surface.0}"}},text:{primary:{hoverBackground:"color-mix(in srgb, {primary.color}, transparent 96%)",activeBackground:"color-mix(in srgb, {primary.color}, transparent 84%)",color:"{primary.color}"},secondary:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.400}"},success:{hoverBackground:"color-mix(in srgb, {green.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {green.400}, transparent 84%)",color:"{green.400}"},info:{hoverBackground:"color-mix(in srgb, {sky.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {sky.400}, transparent 84%)",color:"{sky.400}"},warn:{hoverBackground:"color-mix(in srgb, {orange.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {orange.400}, transparent 84%)",color:"{orange.400}"},help:{hoverBackground:"color-mix(in srgb, {purple.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {purple.400}, transparent 84%)",color:"{purple.400}"},danger:{hoverBackground:"color-mix(in srgb, {red.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {red.400}, transparent 84%)",color:"{red.400}"},contrast:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.0}"},plain:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.0}"}},link:{color:"{primary.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"}}},css:({dt:e})=>`
.p-button:focus-visible {
    background: ${e("button.primary.active.background")};
    border-color: ${e("button.primary.active.background")};
}

.p-button-secondary:focus-visible {
    background: ${e("button.secondary.active.background")};
    border-color: ${e("button.secondary.active.background")};
}

.p-button-success:focus-visible {
    background: ${e("button.success.active.background")};
    border-color: ${e("button.success.active.background")};
}

.p-button-info:focus-visible {
    background: ${e("button.info.active.background")};
    border-color: ${e("button.info.active.background")};
}

.p-button-warn:focus-visible {
    background: ${e("button.warn.active.background")};
    border-color: ${e("button.warn.active.background")};
}

.p-button-help:focus-visible {
    background: ${e("button.help.active.background")};
    border-color: ${e("button.help.active.background")};
}

.p-button-danger:focus-visible {
    background: ${e("button.danger.active.background")};
    border-color: ${e("button.danger.active.background")};
}

.p-button-contrast:focus-visible {
    background: ${e("button.contrast.active.background")};
    border-color: ${e("button.contrast.active.background")};
}

.p-button-link:focus-visible {
    background: color-mix(in srgb, ${e("primary.color")}, transparent 84%);
    border-color: transparent;
}

.p-button-text:focus-visible {
    background: ${e("button.text.primary.active.background")};
    border-color: transparent;
}

.p-button-secondary.p-button-text:focus-visible {
    background: ${e("button.text.secondary.active.background")};
    border-color: transparent;
}

.p-button-success.p-button-text:focus-visible {
    background: ${e("button.text.success.active.background")};
    border-color: transparent;
}

.p-button-info.p-button-text:focus-visible {
    background: ${e("button.text.info.active.background")};
    border-color: transparent;
}

.p-button-warn.p-button-text:focus-visible {
    background: ${e("button.text.warn.active.background")};
    border-color: transparent;
}

.p-button-help.p-button-text:focus-visible {
    background: ${e("button.text.help.active.background")};
    border-color: transparent;
}

.p-button-danger.p-button-text:focus-visible {
    background: ${e("button.text.danger.active.background")};
    border-color: transparent;
}

.p-button-contrast.p-button-text:focus-visible {
    background: ${e("button.text.contrast.active.background")};
    border-color: transparent;
}

.p-button-plain.p-button-text:focus-visible {
    background: ${e("button.text.plain.active.background")};
    border-color: transparent;
}

.p-button-outlined:focus-visible {
    background: ${e("button.outlined.primary.active.background")};
}

.p-button-secondary.p-button-outlined:focus-visible {
    background: ${e("button.outlined.secondary.active.background")};
    border-color: ${e("button.outlined.secondary.border.color")};
}

.p-button-success.p-button-outlined:focus-visible {
    background: ${e("button.outlined.success.active.background")};
}

.p-button-info.p-button-outlined:focus-visible {
    background: ${e("button.outlined.info.active.background")};
}

.p-button-warn.p-button-outlined:focus-visible {
    background: ${e("button.outlined.warn.active.background")};
}

.p-button-help.p-button-outlined:focus-visible {
    background: ${e("button.outlined.help.active.background")};
}

.p-button-danger.p-button-outlined:focus-visible {
    background: ${e("button.outlined.danger.active.background")};
}

.p-button-contrast.p-button-outlined:focus-visible {
    background: ${e("button.outlined.contrast.active.background")};
}

.p-button-plain.p-button-outlined:focus-visible {
    background: ${e("button.outlined.plain.active.background")};
}
`};var va={root:{background:"{content.background}",borderRadius:"{content.border.radius}",color:"{content.color}",shadow:"0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)"},body:{padding:"1.5rem",gap:"0.75rem"},caption:{gap:"0.5rem"},title:{fontSize:"1.25rem",fontWeight:"500"},subtitle:{color:"{text.muted.color}"}};var ya={root:{transitionDuration:"{transition.duration}"},content:{gap:"0.25rem"},indicatorList:{padding:"1rem",gap:"1rem"},indicator:{width:"1.25rem",height:"1.25rem",borderRadius:"50%",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},colorScheme:{light:{indicator:{background:"{surface.200}",hoverBackground:"{surface.300}",activeBackground:"{primary.color}"}},dark:{indicator:{background:"{surface.700}",hoverBackground:"{surface.600}",activeBackground:"{primary.color}"}}},css:({dt:e})=>`
.p-carousel-indicator-button:hover {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("text.color")}, transparent 96%)
}

.p-carousel-indicator-button:focus-visible {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("text.color")}, transparent 96%);
}

.p-carousel-indicator-active .p-carousel-indicator-button:hover {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("carousel.indicator.active.background")}, transparent 92%);
}

.p-carousel-indicator-active .p-carousel-indicator-button:focus-visible {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("carousel.indicator.active.background")}, transparent 84%);
}
`};var Ca={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},dropdown:{width:"2.5rem",color:"{form.field.icon.color}"},overlay:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},list:{padding:"{list.padding}",gap:"{list.gap}",mobileIndent:"1rem"},option:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}",icon:{color:"{list.option.icon.color}",focusColor:"{list.option.icon.focus.color}",size:"0.875rem"}},clearIcon:{color:"{form.field.icon.color}"},css:({dt:e})=>`
.p-cascadeselect.p-variant-filled {
    border-end-start-radius: 0
    border-end-end-radius: 0;
    border: 1px solid transparent;
    background: ${e("cascadeselect.filled.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("cascadeselect.focus.border.color")}, ${e("cascadeselect.focus.border.color")}), linear-gradient(to bottom, ${e("cascadeselect.border.color")}, ${e("cascadeselect.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}

.p-cascadeselect.p-variant-filled:not(.p-disabled):hover {
    background: ${e("cascadeselect.filled.hover.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("cascadeselect.focus.border.color")}, ${e("cascadeselect.focus.border.color")}), linear-gradient(to bottom, ${e("cascadeselect.hover.border.color")}, ${e("cascadeselect.hover.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-cascadeselect.p-variant-filled:not(.p-disabled).p-focus {
    outline: 0 none;
    background: ${e("cascadeselect.filled.focus.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("cascadeselect.focus.border.color")}, ${e("cascadeselect.focus.border.color")}), linear-gradient(to bottom, ${e("cascadeselect.border.color")}, ${e("cascadeselect.border.color")});
    background-size: 100% 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-cascadeselect.p-variant-filled:not(.p-disabled).p-focus:hover {
    background-image: linear-gradient(to bottom, ${e("cascadeselect.focus.border.color")}, ${e("cascadeselect.focus.border.color")}), linear-gradient(to bottom, ${e("cascadeselect.hover.border.color")}, ${e("cascadeselect.hover.border.color")});
}

.p-cascadeselect.p-variant-filled.p-invalid {
    background-image: linear-gradient(to bottom, ${e("cascadeselect.invalid.border.color")}, ${e("cascadeselect.invalid.border.color")}), linear-gradient(to bottom, ${e("cascadeselect.invalid.border.color")}, ${e("cascadeselect.invalid.border.color")});
}

.p-cascadeselect.p-variant-filled.p-invalid:not(.p-disabled).p-focus  {
    background-image: linear-gradient(to bottom, ${e("cascadeselect.invalid.border.color")}, ${e("cascadeselect.invalid.border.color")}), linear-gradient(to bottom, ${e("cascadeselect.invalid.border.color")}, ${e("cascadeselect.invalid.border.color")});
}

.p-cascadeselect-option {
    transition: none;
}
`};var ka={root:{borderRadius:"{border.radius.xs}",width:"18px",height:"18px",background:"{form.field.background}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.color}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",checkedBorderColor:"{primary.color}",checkedHoverBorderColor:"{primary.color}",checkedFocusBorderColor:"{primary.color}",checkedDisabledBorderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",shadow:"{form.field.shadow}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"},transitionDuration:"{form.field.transition.duration}",sm:{width:"14px",height:"14px"},lg:{width:"22px",height:"22px"}},icon:{size:"0.875rem",color:"{form.field.color}",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}",disabledColor:"{form.field.disabled.color}",sm:{size:"0.75rem"},lg:{size:"1rem"}},css:({dt:e})=>`
.p-checkbox {
    border-radius: 50%;
    transition: box-shadow ${e("checkbox.transition.duration")};
}

.p-checkbox-box {
    border-width: 2px;
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("text.color")}, transparent 96%);
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("text.color")}, transparent 88%);
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("checkbox.checked.background")}, transparent 92%);
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("checkbox.checked.background")}, transparent 84%);
}

.p-checkbox-checked .p-checkbox-box:before  {
    content: "";
    position: absolute;
    top: var(--p-md-check-icon-t);
    left: 2px;
    border-right: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transform: rotate(45deg);
    transform-origin: 0% 100%;
    animation: p-md-check 125ms 50ms linear forwards;
}

.p-checkbox-checked .p-checkbox-icon {
    display: none;
}

.p-checkbox {
    --p-md-check-icon-t: 10px;
    --p-md-check-icon-w: 6px;
    --p-md-check-icon-h: 12px;
}

.p-checkbox-sm {
    --p-md-check-icon-t: 8px;
    --p-md-check-icon-w: 4px;
    --p-md-check-icon-h: 10px;
}

.p-checkbox-lg {
    --p-md-check-icon-t: 12px;
    --p-md-check-icon-w: 8px;
    --p-md-check-icon-h: 16px;
}

@keyframes p-md-check {
    0%{
      width: 0;
      height: 0;
      border-color: ${e("checkbox.icon.checked.color")};
      transform: translate3d(0,0,0) rotate(45deg);
    }
    33%{
      width: var(--p-md-check-icon-w);
      height: 0;
      transform: translate3d(0,0,0) rotate(45deg);
    }
    100%{
      width: var(--p-md-check-icon-w);
      height: var(--p-md-check-icon-h);
      border-color: ${e("checkbox.icon.checked.color")};
      transform: translate3d(0,calc(-1 * var(--p-md-check-icon-h)),0) rotate(45deg);
    }
}
`};var xa={root:{borderRadius:"2rem",paddingX:"0.75rem",paddingY:"0.75rem",gap:"0.5rem",transitionDuration:"{transition.duration}"},image:{width:"2.25rem",height:"2.25rem"},icon:{size:"1rem"},removeIcon:{size:"1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}"}},colorScheme:{light:{root:{background:"{surface.200}",color:"{surface.900}"},icon:{color:"{surface.600}"},removeIcon:{color:"{surface.600}",focusRing:{shadow:"0 0 1px 4px {surface.300}"}}},dark:{root:{background:"{surface.700}",color:"{surface.0}"},icon:{color:"{surface.0}"},removeIcon:{color:"{surface.0}",focusRing:{shadow:"0 0 1px 4px {surface.600}"}}}}};var _a={root:{transitionDuration:"{transition.duration}"},preview:{width:"2rem",height:"2rem",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},panel:{shadow:"{overlay.popover.shadow}",borderRadius:"{overlay.popover.borderRadius}"},colorScheme:{light:{panel:{background:"{surface.800}",borderColor:"{surface.900}"},handle:{color:"{surface.0}"}},dark:{panel:{background:"{surface.900}",borderColor:"{surface.700}"},handle:{color:"{surface.0}"}}}};var wa={icon:{size:"2rem",color:"{overlay.modal.color}"},content:{gap:"1rem"}};var Sa={root:{background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",color:"{overlay.popover.color}",borderRadius:"{overlay.popover.border.radius}",shadow:"{overlay.popover.shadow}",gutter:"10px",arrowOffset:"1.25rem"},content:{padding:"{overlay.popover.padding}",gap:"1rem"},icon:{size:"1.5rem",color:"{overlay.popover.color}"},footer:{gap:"0.5rem",padding:"0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}"}};var Ia={root:{background:"{content.background}",borderColor:"transparent",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},list:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},item:{focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},submenu:{mobileIndent:"1rem"},submenuIcon:{size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},separator:{borderColor:"{content.border.color}"}};var Ma={root:{transitionDuration:"{transition.duration}"},header:{background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},headerCell:{background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{datatable.border.color}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",gap:"0.5rem",padding:"0.75rem 1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},columnTitle:{fontWeight:"600"},row:{background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},bodyCell:{borderColor:"{datatable.border.color}",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},footerCell:{background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},columnFooter:{fontWeight:"600"},footer:{background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},dropPoint:{color:"{primary.color}"},columnResizer:{width:"0.5rem"},resizeIndicator:{width:"1px",color:"{primary.color}"},sortIcon:{color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",size:"0.875rem"},loadingIcon:{size:"2rem"},rowToggleButton:{hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",selectedHoverColor:"{primary.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},filter:{inlineGap:"0.5rem",overlaySelect:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},overlayPopover:{background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",borderRadius:"{overlay.popover.border.radius}",color:"{overlay.popover.color}",shadow:"{overlay.popover.shadow}",padding:"{overlay.popover.padding}",gap:"0.5rem"},rule:{borderColor:"{content.border.color}"},constraintList:{padding:"{list.padding}",gap:"{list.gap}"},constraint:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",separator:{borderColor:"{content.border.color}"},padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"}},paginatorTop:{borderColor:"{datatable.border.color}",borderWidth:"0 0 1px 0"},paginatorBottom:{borderColor:"{datatable.border.color}",borderWidth:"0 0 1px 0"},colorScheme:{light:{root:{borderColor:"{content.border.color}"},row:{stripedBackground:"{surface.50}"},bodyCell:{selectedBorderColor:"{primary.100}"}},dark:{root:{borderColor:"{surface.800}"},row:{stripedBackground:"{surface.950}"},bodyCell:{selectedBorderColor:"{primary.900}"}}},css:({dt:e})=>`
.p-datatable-header-cell,
.p-datatable-tbody > tr {
    transition: none
}
`};var Ba={root:{borderColor:"transparent",borderWidth:"0",borderRadius:"0",padding:"0"},header:{background:"{content.background}",color:"{content.color}",borderColor:"{content.border.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",borderRadius:"0"},content:{background:"{content.background}",color:"{content.color}",borderColor:"transparent",borderWidth:"0",padding:"0",borderRadius:"0"},footer:{background:"{content.background}",color:"{content.color}",borderColor:"{content.border.color}",borderWidth:"1px 0 0 0",padding:"0.75rem 1rem",borderRadius:"0"},paginatorTop:{borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},paginatorBottom:{borderColor:"{content.border.color}",borderWidth:"1px 0 0 0"}};var Ea={root:{transitionDuration:"{transition.duration}"},panel:{background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.popover.shadow}",padding:"0.5rem"},header:{background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",padding:"0 0 0.5rem 0"},title:{gap:"0.5rem",fontWeight:"700"},dropdown:{width:"3rem",sm:{width:"2.5rem"},lg:{width:"3.5rem"},borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",borderRadius:"{form.field.border.radius}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"n\u0131ne"}},inputIcon:{color:"{form.field.icon.color}"},selectMonth:{hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",padding:"0.5rem 0.75rem",borderRadius:"{content.border.radius}"},selectYear:{hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",padding:"0.5rem 0.75rem",borderRadius:"{content.border.radius}"},group:{borderColor:"{content.border.color}",gap:"{overlay.popover.padding}"},dayView:{margin:"0.5rem 0 0 0"},weekDay:{padding:"0.5rem",fontWeight:"700",color:"{content.color}"},date:{hoverBackground:"{content.hover.background}",selectedBackground:"{primary.color}",rangeSelectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{primary.contrast.color}",rangeSelectedColor:"{highlight.color}",width:"2.5rem",height:"2.5rem",borderRadius:"50%",padding:"0.125rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},monthView:{margin:"0.5rem 0 0 0"},month:{padding:"0.625rem",borderRadius:"{content.border.radius}"},yearView:{margin:"0.5rem 0 0 0"},year:{padding:"0.625rem",borderRadius:"{content.border.radius}"},buttonbar:{padding:"0.5rem 0 0 0",borderColor:"{content.border.color}"},timePicker:{padding:"0.5rem 0 0 0",borderColor:"{content.border.color}",gap:"0.5rem",buttonGap:"0.25rem"},colorScheme:{light:{dropdown:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}"},today:{background:"{surface.200}",color:"{surface.900}"}},dark:{dropdown:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}"},today:{background:"{surface.700}",color:"{surface.0}"}}},css:({dt:e})=>`
.p-datepicker-header {
    justify-content: start
}

.p-datepicker-title {
    order: 1;
}

.p-datepicker-prev-button {
    order: 2;
    margin-inline-start: auto;
}

.p-datepicker-next-button {
    order: 2;
    margin-inline-start: 0.5rem;
}

.p-datepicker-select-month:focus-visible {
    background: ${e("datepicker.select.month.hover.background")};
    color: ${e("datepicker.select.month.hover.color")};
    outline: 0 none;
}

.p-datepicker-select-year:focus-visible {
    background: ${e("datepicker.select.year.hover.background")};
    color: ${e("datepicker.select.year.hover.color")};
    outline: 0 none;
}

.p-datepicker-dropdown:focus-visible {
    outline: 0 none;
    background: ${e("datepicker.dropdown.hover.background")};
    border-color: ${e("datepicker.dropdown.hover.border.color")};
    color: ${e("datepicker.dropdown.hover.color")};
}

.p-datepicker:has(.p-variant-filled) .p-datepicker-dropdown {
    border-top-color: transparent;
    border-right-color: transparent;
}
`};var Ta={root:{background:"{overlay.modal.background}",borderColor:"{overlay.modal.border.color}",color:"{overlay.modal.color}",borderRadius:"{overlay.modal.border.radius}",shadow:"{overlay.modal.shadow}"},header:{padding:"{overlay.modal.padding}",gap:"0.5rem"},title:{fontSize:"1.25rem",fontWeight:"600"},content:{padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"},footer:{padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}",gap:"0.5rem"}};var $a={root:{borderColor:"{content.border.color}"},content:{background:"{content.background}",color:"{text.color}"},horizontal:{margin:"1rem 0",padding:"0 1rem",content:{padding:"0 0.5rem"}},vertical:{margin:"0 1rem",padding:"0.5rem 0",content:{padding:"0.5rem 0"}}};var Ra={root:{background:"rgba(255, 255, 255, 0.1)",borderColor:"rgba(255, 255, 255, 0.2)",padding:"0.5rem",borderRadius:"{border.radius.xl}"},item:{borderRadius:"{content.border.radius}",padding:"0.5rem",size:"3rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}}};var Aa={root:{background:"{overlay.modal.background}",borderColor:"{overlay.modal.border.color}",color:"{overlay.modal.color}",shadow:"{overlay.modal.shadow}"},header:{padding:"{overlay.modal.padding}"},title:{fontSize:"1.5rem",fontWeight:"600"},content:{padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"},footer:{padding:"{overlay.modal.padding}"}};var Fa={toolbar:{background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}"},toolbarItem:{color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},overlay:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}",padding:"{list.padding}"},overlayOption:{focusBackground:"{list.option.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},content:{background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},css:({dt:e})=>`
.p-editor .p-editor-toolbar {
    padding: 0.75rem
}
`};var Da={root:{background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",padding:"0 1.25rem 1.25rem 1.25rem",transitionDuration:"{transition.duration}"},legend:{background:"{content.background}",hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",borderRadius:"{content.border.radius}",borderWidth:"1px",borderColor:"transparent",padding:"0.75rem 1rem",gap:"0.5rem",fontWeight:"600",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},toggleIcon:{color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}"},content:{padding:"0"},css:({dt:e})=>`
.p-fieldset-toggle-button:focus-visible {
    background: ${e("navigation.item.active.background")}

}
`};var La={root:{background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",transitionDuration:"{transition.duration}"},header:{background:"transparent",color:"{text.color}",padding:"1.25rem",borderColor:"unset",borderWidth:"0",borderRadius:"0",gap:"0.5rem"},content:{highlightBorderColor:"{primary.color}",padding:"0 1.25rem 1.25rem 1.25rem",gap:"1rem"},file:{padding:"1rem",gap:"1rem",borderColor:"{content.border.color}",info:{gap:"0.5rem"}},fileList:{gap:"0.5rem"},progressbar:{height:"0.25rem"},basic:{gap:"0.5rem"}};var za={root:{color:"{form.field.float.label.color}",focusColor:"{form.field.float.label.focus.color}",activeColor:"{form.field.float.label.active.color}",invalidColor:"{form.field.float.label.invalid.color}",transitionDuration:"0.2s",positionX:"{form.field.padding.x}",positionY:"{form.field.padding.y}",fontWeight:"500",active:{fontSize:"0.75rem",fontWeight:"400"}},over:{active:{top:"-1.25rem"}},in:{input:{paddingTop:"1.5rem",paddingBottom:"0.5rem"},active:{top:"0.5rem"}},on:{borderRadius:"{border.radius.xs}",active:{background:"{form.field.background}",padding:"0 0.125rem"}}};var Oa={root:{borderWidth:"1px",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",transitionDuration:"{transition.duration}"},navButton:{background:"rgba(255, 255, 255, 0.1)",hoverBackground:"rgba(255, 255, 255, 0.2)",color:"{surface.100}",hoverColor:"{surface.0}",size:"3rem",gutter:"0.5rem",prev:{borderRadius:"50%"},next:{borderRadius:"50%"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},navIcon:{size:"1.5rem"},thumbnailsContent:{background:"{content.background}",padding:"1rem 0.25rem"},thumbnailNavButton:{size:"2rem",borderRadius:"50%",gutter:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},thumbnailNavButtonIcon:{size:"1rem"},caption:{background:"rgba(0, 0, 0, 0.5)",color:"{surface.100}",padding:"1rem"},indicatorList:{gap:"0.5rem",padding:"1rem"},indicatorButton:{width:"1rem",height:"1rem",activeBackground:"{primary.color}",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},insetIndicatorList:{background:"rgba(0, 0, 0, 0.5)"},insetIndicatorButton:{background:"rgba(255, 255, 255, 0.4)",hoverBackground:"rgba(255, 255, 255, 0.6)",activeBackground:"rgba(255, 255, 255, 0.9)"},closeButton:{size:"3rem",gutter:"0.5rem",background:"rgba(255, 255, 255, 0.1)",hoverBackground:"rgba(255, 255, 255, 0.2)",color:"{surface.50}",hoverColor:"{surface.0}",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},closeButtonIcon:{size:"1.5rem"},colorScheme:{light:{thumbnailNavButton:{hoverBackground:"{surface.100}",color:"{surface.600}",hoverColor:"{surface.700}"},indicatorButton:{background:"{surface.200}",hoverBackground:"{surface.300}"}},dark:{thumbnailNavButton:{hoverBackground:"{surface.700}",color:"{surface.400}",hoverColor:"{surface.0}"},indicatorButton:{background:"{surface.700}",hoverBackground:"{surface.600}"}}}};var Pa={icon:{color:"{form.field.icon.color}"}};var Va={root:{color:"{form.field.float.label.color}",focusColor:"{form.field.float.label.focus.color}",invalidColor:"{form.field.float.label.invalid.color}",transitionDuration:"0.2s",positionX:"{form.field.padding.x}",top:"0.5rem",fontSize:"0.75rem",fontWeight:"400"},input:{paddingTop:"1.5rem",paddingBottom:"0.5rem"}};var Ha={root:{transitionDuration:"{transition.duration}"},preview:{icon:{size:"1.5rem"},mask:{background:"{mask.background}",color:"{mask.color}"}},toolbar:{position:{left:"auto",right:"1rem",top:"1rem",bottom:"auto"},blur:"8px",background:"rgba(255,255,255,0.1)",borderColor:"rgba(255,255,255,0.2)",borderWidth:"1px",borderRadius:"30px",padding:".5rem",gap:"0.5rem"},action:{hoverBackground:"rgba(255,255,255,0.1)",color:"{surface.50}",hoverColor:"{surface.0}",size:"3rem",iconSize:"1.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}}};var ja={handle:{size:"20px",hoverSize:"40px",background:"rgba(255,255,255,0.4)",hoverBackground:"rgba(255,255,255,0.6)",borderColor:"unset",hoverBorderColor:"unset",borderWidth:"0",borderRadius:"50%",transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"rgba(255,255,255,0.3)",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}}};var Na={root:{padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{content.border.radius}",gap:"0.5rem"},text:{fontWeight:"500"},icon:{size:"1rem"},colorScheme:{light:{info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"}},dark:{info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"}}}};var Ua={root:{padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{transition.duration}"},display:{hoverBackground:"{content.hover.background}",hoverColor:"{content.hover.color}"}};var Wa={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}"},chip:{borderRadius:"{border.radius.sm}"},colorScheme:{light:{chip:{focusBackground:"{surface.200}",color:"{surface.800}"}},dark:{chip:{focusBackground:"{surface.700}",color:"{surface.0}"}}}};var Qa={addon:{background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.icon.color}",borderRadius:"{form.field.border.radius}",padding:"0.75rem",minWidth:"3rem"},css:({dt:e})=>`
.p-inputgroup:has(.p-variant-filled) .p-inputgroupaddon {
    border-block-start-color: ${e("inputtext.filled.background")};
    border-inline-color: ${e("inputtext.filled.background")};
    background: ${e("inputtext.filled.background")} no-repeat;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
    `};var qa={root:{transitionDuration:"{transition.duration}"},button:{width:"3rem",borderRadius:"{form.field.border.radius}",verticalPadding:"{form.field.padding.y}"},colorScheme:{light:{button:{background:"transparent",hoverBackground:"{surface.100}",activeBackground:"{surface.200}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",color:"{surface.400}",hoverColor:"{surface.500}",activeColor:"{surface.600}"}},dark:{button:{background:"transparent",hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",color:"{surface.400}",hoverColor:"{surface.300}",activeColor:"{surface.200}"}}},css:({dt:e})=>`
.p-inputnumber-stacked .p-inputnumber-button-group {
    top: 2px;
    right: 2px;
    height: calc(100% - 4px);
}

.p-inputnumber-horizontal:has(.p-variant-filled) .p-inputnumber-button {
    border-block-start-color: ${e("inputtext.filled.background")};
    border-inline-color: ${e("inputtext.filled.background")};
    background: ${e("inputtext.filled.background")} no-repeat;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
} 
    
.p-inputnumber-vertical:has(.p-variant-filled) .p-inputnumber-button {
    border-block-color: ${e("inputtext.filled.background")};
    border-inline-color: ${e("inputtext.filled.background")};
    background: ${e("inputtext.filled.background")} no-repeat;
} 

.p-inputnumber-vertical:has(.p-variant-filled) .p-inputnumber-increment-button {
    border-block-end: 1px solid ${e("inputtext.border.color")}
}
`};var Ka={root:{gap:"0.5rem"},input:{width:"3rem",sm:{width:"2.5rem"},lg:{width:"3.5rem"}}};var Ga={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},css:({dt:e})=>`
.p-inputtext.p-variant-filled {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid transparent;
    background: ${e("inputtext.filled.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("inputtext.focus.border.color")}, ${e("inputtext.focus.border.color")}), linear-gradient(to bottom, ${e("inputtext.border.color")}, ${e("inputtext.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}

.p-inputtext.p-variant-filled:enabled:hover {
    background: ${e("inputtext.filled.hover.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("inputtext.focus.border.color")}, ${e("inputtext.focus.border.color")}), linear-gradient(to bottom, ${e("inputtext.hover.border.color")}, ${e("inputtext.hover.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-inputtext.p-variant-filled:enabled:focus {
    outline: 0 none;
    background: ${e("inputtext.filled.focus.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("inputtext.focus.border.color")}, ${e("inputtext.focus.border.color")}), linear-gradient(to bottom, ${e("inputtext.border.color")}, ${e("inputtext.border.color")});
    background-size: 100% 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-inputtext.p-variant-filled:enabled:hover:focus {
    background-image: linear-gradient(to bottom, ${e("inputtext.focus.border.color")}, ${e("inputtext.focus.border.color")}), linear-gradient(to bottom, ${e("inputtext.hover.border.color")}, ${e("inputtext.hover.border.color")});
}

.p-inputtext.p-variant-filled.p-invalid {
    background-image: linear-gradient(to bottom, ${e("inputtext.invalid.border.color")}, ${e("inputtext.invalid.border.color")}), linear-gradient(to bottom, ${e("inputtext.invalid.border.color")}, ${e("inputtext.invalid.border.color")});
}

.p-inputtext.p-variant-filled.p-invalid:enabled:focus {
    background-image: linear-gradient(to bottom, ${e("inputtext.invalid.border.color")}, ${e("inputtext.invalid.border.color")}), linear-gradient(to bottom, ${e("inputtext.invalid.border.color")}, ${e("inputtext.invalid.border.color")});
}
`};var Za={root:{transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},value:{background:"{primary.color}"},range:{background:"{content.border.color}"},text:{color:"{text.muted.color}"}};var Xa={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",borderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",shadow:"{form.field.shadow}",borderRadius:"{form.field.border.radius}",transitionDuration:"{form.field.transition.duration}"},list:{padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},option:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},optionGroup:{background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},checkmark:{color:"{list.option.color}",gutterStart:"-0.375rem",gutterEnd:"0.375rem"},emptyMessage:{padding:"{list.option.padding}"},colorScheme:{light:{option:{stripedBackground:"{surface.50}"}},dark:{option:{stripedBackground:"{surface.900}"}}},css:({dt:e})=>`
.p-listbox-option {
    transition: none
}
`};var Ya={root:{background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",verticalOrientation:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},horizontalOrientation:{padding:"0.5rem 0.75rem",gap:"0.5rem"},transitionDuration:"{transition.duration}"},baseItem:{borderRadius:"{content.border.radius}",padding:"{navigation.item.padding}"},item:{focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},overlay:{padding:"0",background:"{content.background}",borderColor:"transparent",borderRadius:"{content.border.radius}",color:"{content.color}",shadow:"{overlay.navigation.shadow}",gap:"0.5rem"},submenu:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},submenuLabel:{padding:"{navigation.submenu.label.padding}",fontWeight:"{navigation.submenu.label.font.weight}",background:"{navigation.submenu.label.background.}",color:"{navigation.submenu.label.color}"},submenuIcon:{size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},separator:{borderColor:"{content.border.color}"},mobileButton:{borderRadius:"50%",size:"2.5rem",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",hoverBackground:"{content.hover.background}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},css:({dt:e})=>`
.p-megamenu-button:focus-visible {
    background: ${e("navigation.item.active.background")}
}
`};var Ja={root:{background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},list:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},item:{focusBackground:"{navigation.item.focus.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}"}},submenuLabel:{padding:"{navigation.submenu.label.padding}",fontWeight:"{navigation.submenu.label.font.weight}",background:"{navigation.submenu.label.background}",color:"{navigation.submenu.label.color}"},separator:{borderColor:"{content.border.color}"},css:({dt:e})=>`
.p-menu-overlay {
    border-color: transparent
}
`};var es={root:{background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",padding:"0.5rem 0.75rem",transitionDuration:"{transition.duration}"},baseItem:{borderRadius:"{content.border.radius}",padding:"{navigation.item.padding}"},item:{focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},submenu:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}",background:"{content.background}",borderColor:"transparent",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",mobileIndent:"1rem",icon:{size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"}},separator:{borderColor:"{content.border.color}"},mobileButton:{borderRadius:"50%",size:"2.5rem",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",hoverBackground:"{content.hover.background}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},css:({dt:e})=>`
.p-menubar-button:focus-visible {
    background: ${e("navigation.item.active.background")}
}
`};var os={root:{borderRadius:"{content.border.radius}",borderWidth:"0",transitionDuration:"{transition.duration}"},content:{padding:"1rem 1.25rem",gap:"0.5rem",sm:{padding:"0.625rem 0.625rem"},lg:{padding:"0.825rem 0.825rem"}},text:{fontSize:"1rem",fontWeight:"500",sm:{fontSize:"0.875rem"},lg:{fontSize:"1.125rem"}},icon:{size:"1.25rem",sm:{size:"1rem"},lg:{size:"1.5rem"}},closeButton:{width:"2rem",height:"2rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"}},closeIcon:{size:"1rem",sm:{size:"0.875rem"},lg:{size:"1.125rem"}},outlined:{root:{borderWidth:"1px"}},simple:{content:{padding:"0"}},colorScheme:{light:{info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",shadow:"none",closeButton:{hoverBackground:"{blue.100}",focusRing:{color:"{blue.600}",shadow:"none"}},outlined:{color:"{blue.600}",borderColor:"{blue.600}"},simple:{color:"{blue.600}"}},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",shadow:"none",closeButton:{hoverBackground:"{green.100}",focusRing:{color:"{green.600}",shadow:"none"}},outlined:{color:"{green.600}",borderColor:"{green.600}"},simple:{color:"{green.600}"}},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.900}",shadow:"none",closeButton:{hoverBackground:"{yellow.100}",focusRing:{color:"{yellow.600}",shadow:"none"}},outlined:{color:"{yellow.900}",borderColor:"{yellow.900}"},simple:{color:"{yellow.900}"}},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",shadow:"none",closeButton:{hoverBackground:"{red.100}",focusRing:{color:"{red.600}",shadow:"none"}},outlined:{color:"{red.600}",borderColor:"{red.600}"},simple:{color:"{red.600}"}},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",shadow:"none",closeButton:{hoverBackground:"{surface.200}",focusRing:{color:"{surface.600}",shadow:"none"}},outlined:{color:"{surface.600}",borderColor:"{surface.600}"},simple:{color:"{surface.600}"}},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",shadow:"none",closeButton:{hoverBackground:"{surface.800}",focusRing:{color:"{surface.50}",shadow:"none"}},outlined:{color:"{surface.950}",borderColor:"{surface.950}"},simple:{color:"{surface.950}"}}},dark:{info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",shadow:"none",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{blue.500}",shadow:"none"}},outlined:{color:"{blue.500}",borderColor:"{blue.500}"},simple:{color:"{blue.500}"}},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",shadow:"none",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{green.500}",shadow:"none"}},outlined:{color:"{green.500}",borderColor:"{green.500}"},simple:{color:"{green.500}"}},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",shadow:"none",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{yellow.500}",shadow:"none"}},outlined:{color:"{yellow.500}",borderColor:"{yellow.500}"},simple:{color:"{yellow.500}"}},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",shadow:"none",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{red.500}",shadow:"none"}},outlined:{color:"{red.500}",borderColor:"{red.500}"},simple:{color:"{red.500}"}},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",shadow:"none",closeButton:{hoverBackground:"{surface.700}",focusRing:{color:"{surface.300}",shadow:"none"}},outlined:{color:"{surface.400}",borderColor:"{surface.400}"},simple:{color:"{surface.400}"}},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",shadow:"none",closeButton:{hoverBackground:"{surface.100}",focusRing:{color:"{surface.950}",shadow:"none"}},outlined:{color:"{surface.0}",borderColor:"{surface.0}"},simple:{color:"{surface.0}"}}}}};var ts={root:{borderRadius:"{content.border.radius}",gap:"1rem"},meters:{background:"{content.border.color}",size:"0.5rem"},label:{gap:"0.5rem"},labelMarker:{size:"0.5rem"},labelIcon:{size:"1rem"},labelList:{verticalGap:"0.5rem",horizontalGap:"1rem"}};var rs={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},dropdown:{width:"2.5rem",color:"{form.field.icon.color}"},overlay:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},list:{padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},option:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}",gap:"0.75rem"},optionGroup:{background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},chip:{borderRadius:"{border.radius.sm}"},clearIcon:{color:"{form.field.icon.color}"},emptyMessage:{padding:"{list.option.padding}"},css:({dt:e})=>`
.p-multiselect.p-variant-filled {
    border-end-start-radius: 0
    border-end-end-radius: 0;
    border: 1px solid transparent;
    background: ${e("multiselect.filled.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("multiselect.focus.border.color")}, ${e("multiselect.focus.border.color")}), linear-gradient(to bottom, ${e("multiselect.border.color")}, ${e("multiselect.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}

.p-multiselect.p-variant-filled:not(.p-disabled):hover {
    background: ${e("multiselect.filled.hover.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("multiselect.focus.border.color")}, ${e("multiselect.focus.border.color")}), linear-gradient(to bottom, ${e("multiselect.hover.border.color")}, ${e("multiselect.hover.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-multiselect.p-variant-filled:not(.p-disabled).p-focus {
    outline: 0 none;
    background: ${e("multiselect.filled.focus.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("multiselect.focus.border.color")}, ${e("multiselect.focus.border.color")}), linear-gradient(to bottom, ${e("multiselect.border.color")}, ${e("multiselect.border.color")});
    background-size: 100% 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-multiselect.p-variant-filled:not(.p-disabled).p-focus:hover {
    background-image: linear-gradient(to bottom, ${e("multiselect.focus.border.color")}, ${e("multiselect.focus.border.color")}), linear-gradient(to bottom, ${e("multiselect.hover.border.color")}, ${e("multiselect.hover.border.color")});
}

.p-multiselect.p-variant-filled.p-invalid {
    background-image: linear-gradient(to bottom, ${e("multiselect.invalid.border.color")}, ${e("multiselect.invalid.border.color")}), linear-gradient(to bottom, ${e("multiselect.invalid.border.color")}, ${e("multiselect.invalid.border.color")});
}

.p-multiselect.p-variant-filled.p-invalid:not(.p-disabled).p-focus  {
    background-image: linear-gradient(to bottom, ${e("multiselect.invalid.border.color")}, ${e("multiselect.invalid.border.color")}), linear-gradient(to bottom, ${e("multiselect.invalid.border.color")}, ${e("multiselect.invalid.border.color")});
}

.p-multiselect-option {
    transition: none;
}
`};var is={root:{gap:"1.125rem"},controls:{gap:"0.5rem"}};var ns={root:{gutter:"0.75rem",transitionDuration:"{transition.duration}"},node:{background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{content.border.color}",color:"{content.color}",selectedColor:"{highlight.color}",hoverColor:"{content.hover.color}",padding:"1rem 1.25rem",toggleablePadding:"1rem 1.25rem 1.5rem 1.25rem",borderRadius:"{content.border.radius}"},nodeToggleButton:{background:"{content.background}",hoverBackground:"{content.hover.background}",borderColor:"{content.border.color}",color:"{text.muted.color}",hoverColor:"{text.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},connector:{color:"{content.border.color}",borderRadius:"{content.border.radius}",height:"24px"}};var as={root:{outline:{width:"2px",color:"{content.background}"}}};var ss={root:{padding:"0.5rem 1rem",gap:"0.25rem",borderRadius:"{content.border.radius}",background:"{content.background}",color:"{content.color}",transitionDuration:"{transition.duration}"},navButton:{background:"transparent",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedColor:"{highlight.color}",width:"2.5rem",height:"2.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},currentPageReport:{color:"{text.muted.color}"},jumpToPageInput:{maxWidth:"2.5rem"}};var ls={root:{background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},header:{background:"transparent",color:"{text.color}",padding:"1.25rem",borderColor:"{content.border.color}",borderWidth:"0",borderRadius:"0"},toggleableHeader:{padding:"0.5rem 1.25rem"},title:{fontWeight:"600"},content:{padding:"0 1.25rem 1.25rem 1.25rem"},footer:{padding:"0 1.25rem 1.25rem 1.25rem"}};var cs={root:{gap:"0",transitionDuration:"{transition.duration}"},panel:{background:"{content.background}",borderColor:"{content.border.color}",borderWidth:"0",color:"{content.color}",padding:"0",borderRadius:"0",first:{borderWidth:"0",topBorderRadius:"{content.border.radius}"},last:{borderWidth:"0",bottomBorderRadius:"{content.border.radius}"}},item:{focusBackground:"{navigation.item.focus.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",gap:"0.5rem",padding:"{navigation.item.padding}",borderRadius:"{content.border.radius}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}"}},submenu:{indent:"1rem"},submenuIcon:{color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}"},css:({dt:e})=>`
.p-panelmenu-panel {
    box-shadow: 0 0 0 1px ${e("panelmenu.panel.border.color")}
    transition: margin ${e("panelmenu.transition.duration")};
}

.p-panelmenu-panel:has(.p-panelmenu-header-active) {
    margin: 1rem 0;
}

.p-panelmenu-panel:first-child {
    border-start-start-radius: ${e("content.border.radius")};
    border-start-end-radius: ${e("content.border.radius")};
    margin-top: 0;
}

.p-panelmenu-panel:last-child {
    border-end-start-radius: ${e("content.border.radius")};
    border-end-end-radius: ${e("content.border.radius")};
    margin-bottom: 0;
}

.p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
    background: ${e("navigation.item.active.background")};
}
`};var ds={meter:{background:"{content.border.color}",borderRadius:"{content.border.radius}",height:".75rem"},icon:{color:"{form.field.icon.color}"},overlay:{background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",borderRadius:"{overlay.popover.border.radius}",color:"{overlay.popover.color}",padding:"{overlay.popover.padding}",shadow:"{overlay.popover.shadow}"},content:{gap:"0.5rem"},colorScheme:{light:{strength:{weakBackground:"{red.500}",mediumBackground:"{amber.500}",strongBackground:"{green.500}"}},dark:{strength:{weakBackground:"{red.400}",mediumBackground:"{amber.400}",strongBackground:"{green.400}"}}}};var us={root:{gap:"1.125rem"},controls:{gap:"0.5rem"}};var ps={root:{background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",color:"{overlay.popover.color}",borderRadius:"{overlay.popover.border.radius}",shadow:"{overlay.popover.shadow}",gutter:"10px",arrowOffset:"1.25rem"},content:{padding:"{overlay.popover.padding}"}};var ms={root:{background:"{content.border.color}",borderRadius:"{content.border.radius}",height:"1rem"},value:{background:"{primary.color}"},label:{color:"{primary.contrast.color}",fontSize:"0.75rem",fontWeight:"600"}};var fs={colorScheme:{light:{root:{colorOne:"{red.500}",colorTwo:"{blue.500}",colorThree:"{green.500}",colorFour:"{yellow.500}"}},dark:{root:{colorOne:"{red.400}",colorTwo:"{blue.400}",colorThree:"{green.400}",colorFour:"{yellow.400}"}}}};var gs={root:{width:"20px",height:"20px",background:"{form.field.background}",checkedBackground:"{primary.contrast.color}",checkedHoverBackground:"{primary.contrast.color}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",checkedBorderColor:"{primary.color}",checkedHoverBorderColor:"{primary.color}",checkedFocusBorderColor:"{primary.color}",checkedDisabledBorderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",shadow:"{form.field.shadow}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"},transitionDuration:"{form.field.transition.duration}",sm:{width:"16px",height:"16px"},lg:{width:"24px",height:"24px"}},icon:{size:"10px",checkedColor:"{primary.color}",checkedHoverColor:"{primary.color}",disabledColor:"{form.field.disabled.color}",sm:{size:"8px"},lg:{size:"12px"}},css:({dt:e})=>`
.p-radiobutton {
    border-radius: 50%;
    transition: box-shadow ${e("radiobutton.transition.duration")};
}

.p-radiobutton-box {
    border-width: 2px;
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("text.color")}, transparent 96%);
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("text.color")}, transparent 88%);
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("radiobutton.checked.border.color")}, transparent 92%);
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("radiobutton.checked.border.color")}, transparent 84%);
}
`};var bs={root:{gap:"0.5rem",transitionDuration:"{transition.duration}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},icon:{size:"1.125rem",color:"{text.muted.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"},css:({dt:e})=>`
.p-rating:not(.p-disabled):not(.p-readonly) .p-rating-option:hover {
    background: color-mix(in srgb, ${e("rating.icon.color")}, transparent 96%)
    box-shadow: 0 0 1px 8px color-mix(in srgb, ${e("rating.icon.color")}, transparent 96%);
}

.p-rating:not(.p-disabled):not(.p-readonly) .p-rating-option-active:hover {
    background: color-mix(in srgb, ${e("rating.icon.active.color")}, transparent 92%);
    box-shadow: 0 0 1px 8px color-mix(in srgb, ${e("rating.icon.active.color")}, transparent 92%);
}

.p-rating-option.p-focus-visible {
    background: color-mix(in srgb, ${e("rating.icon.active.color")}, transparent 84%);
    box-shadow: 0 0 1px 8px color-mix(in srgb, ${e("rating.icon.active.color")}, transparent 84%);
}
`};var hs={colorScheme:{light:{root:{background:"rgba(0,0,0,0.1)"}},dark:{root:{background:"rgba(255,255,255,0.3)"}}}};var vs={root:{transitionDuration:"{transition.duration}"},bar:{size:"9px",borderRadius:"{border.radius.sm}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},colorScheme:{light:{bar:{background:"{surface.200}"}},dark:{bar:{background:"{surface.700}"}}}};var ys={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},dropdown:{width:"2.5rem",color:"{form.field.icon.color}"},overlay:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},list:{padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},option:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},optionGroup:{background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},clearIcon:{color:"{form.field.icon.color}"},checkmark:{color:"{list.option.color}",gutterStart:"-0.375rem",gutterEnd:"0.375rem"},emptyMessage:{padding:"{list.option.padding}"},css:({dt:e})=>`
.p-select.p-variant-filled {
    border-end-start-radius: 0
    border-end-end-radius: 0;
    border: 1px solid transparent;
    background: ${e("select.filled.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("select.focus.border.color")}, ${e("select.focus.border.color")}), linear-gradient(to bottom, ${e("select.border.color")}, ${e("select.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}

.p-select.p-variant-filled:not(.p-disabled):hover {
    background: ${e("select.filled.hover.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("select.focus.border.color")}, ${e("select.focus.border.color")}), linear-gradient(to bottom, ${e("select.hover.border.color")}, ${e("select.hover.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-select.p-variant-filled:not(.p-disabled).p-focus {
    outline: 0 none;
    background: ${e("select.filled.focus.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("select.focus.border.color")}, ${e("select.focus.border.color")}), linear-gradient(to bottom, ${e("select.border.color")}, ${e("select.border.color")});
    background-size: 100% 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-select.p-variant-filled:not(.p-disabled).p-focus:hover {
    background-image: linear-gradient(to bottom, ${e("select.focus.border.color")}, ${e("select.focus.border.color")}), linear-gradient(to bottom, ${e("select.hover.border.color")}, ${e("select.hover.border.color")});
}

.p-select.p-variant-filled.p-invalid {
    background-image: linear-gradient(to bottom, ${e("select.invalid.border.color")}, ${e("select.invalid.border.color")}), linear-gradient(to bottom, ${e("select.invalid.border.color")}, ${e("select.invalid.border.color")});
}

.p-select.p-variant-filled.p-invalid:not(.p-disabled).p-focus  {
    background-image: linear-gradient(to bottom, ${e("select.invalid.border.color")}, ${e("select.invalid.border.color")}), linear-gradient(to bottom, ${e("select.invalid.border.color")}, ${e("select.invalid.border.color")});
}

.p-select-option {
    transition: none;
}
`};var Cs={root:{borderRadius:"{form.field.border.radius}"},colorScheme:{light:{root:{invalidBorderColor:"{form.field.invalid.border.color}"}},dark:{root:{invalidBorderColor:"{form.field.invalid.border.color}"}}}};var ks={root:{borderRadius:"{content.border.radius}"},colorScheme:{light:{root:{background:"{surface.200}",animationBackground:"rgba(255,255,255,0.4)"}},dark:{root:{background:"rgba(255, 255, 255, 0.06)",animationBackground:"rgba(255, 255, 255, 0.04)"}}}};var xs={root:{transitionDuration:"{transition.duration}"},track:{background:"{content.border.color}",borderRadius:"{border.radius.xs}",size:"2px"},range:{background:"{primary.color}"},handle:{width:"18px",height:"18px",borderRadius:"50%",background:"{primary.color}",hoverBackground:"{primary.color}",content:{borderRadius:"50%",background:"{primary.color}",hoverBackground:"{primary.color}",width:"18px",height:"18px",shadow:"0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12)"},focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},css:({dt:e})=>`
.p-slider-handle {
    transition: box-shadow ${e("slider.transition.duration")}
}

.p-slider:not(.p-disabled) .p-slider-handle:hover {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("slider.handle.background")}, transparent 92%);
}

.p-slider-handle:focus-visible,
.p-slider:not(.p-disabled) .p-slider-handle:focus:hover {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("slider.handle.background")}, transparent 84%);
}
`};var _s={root:{gap:"0.5rem",transitionDuration:"{transition.duration}"}};var ws={root:{borderRadius:"{form.field.border.radius}",roundedBorderRadius:"2rem",raisedShadow:"0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)"}};var Ss={root:{background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",transitionDuration:"{transition.duration}"},gutter:{background:"{content.border.color}"},handle:{size:"24px",background:"transparent",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}}};var Is={root:{transitionDuration:"{transition.duration}"},separator:{background:"{content.border.color}",activeBackground:"{primary.color}",margin:"0 0 0 1.625rem",size:"2px"},step:{padding:"0.5rem",gap:"1rem"},stepHeader:{padding:"0.75rem 1rem",borderRadius:"{content.border.radius}",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"},gap:"0.5rem"},stepTitle:{color:"{text.muted.color}",activeColor:"{text.color}",fontWeight:"500"},stepNumber:{activeBackground:"{primary.color}",activeBorderColor:"{primary.color}",activeColor:"{primary.contrast.color}",size:"2rem",fontSize:"1.143rem",fontWeight:"500",borderRadius:"50%",shadow:"none"},steppanels:{padding:"0.875rem 0.5rem 1.125rem 0.5rem"},steppanel:{background:"{content.background}",color:"{content.color}",padding:"0",indent:"1rem"},colorScheme:{light:{stepNumber:{background:"{surface.400}",borderColor:"{surface.400}",color:"{surface.0}"}},dark:{stepNumber:{background:"{surface.200}",borderColor:"{surface.200}",color:"{surface.900}"}}},css:({dt:e})=>`
.p-step-header:focus-visible {
    background: ${e("navigation.item.active.background")}
}
`};var Ms={root:{transitionDuration:"{transition.duration}"},separator:{background:"{content.border.color}"},itemLink:{borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},gap:"0.5rem"},itemLabel:{color:"{text.muted.color}",activeColor:"{primary.color}",fontWeight:"500"},itemNumber:{background:"{content.background}",activeBackground:"{content.background}",borderColor:"{content.border.color}",activeBorderColor:"{content.border.color}",color:"{text.muted.color}",activeColor:"{primary.color}",size:"2rem",fontSize:"1.143rem",fontWeight:"500",borderRadius:"50%",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"}};var Bs={root:{transitionDuration:"{transition.duration}"},tablist:{borderWidth:"0 0 1px 0",background:"{content.background}",borderColor:"{content.border.color}"},item:{background:"transparent",hoverBackground:"transparent",activeBackground:"transparent",borderWidth:"0 0 1px 0",borderColor:"{content.border.color}",hoverBorderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}",padding:"1rem 1.125rem",fontWeight:"600",margin:"0 0 -1px 0",gap:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},itemIcon:{color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},activeBar:{height:"1px",bottom:"-1px",background:"{primary.color}"}};var Es={root:{transitionDuration:"{transition.duration}"},tablist:{borderWidth:"0 0 1px 0",background:"{content.background}",borderColor:"{content.border.color}"},tab:{background:"transparent",hoverBackground:"{content.hover.background}",activeBackground:"transparent",borderWidth:"0 0 1px 0",borderColor:"{content.border.color}",hoverBorderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.color}",hoverColor:"{text.color}",activeColor:"{primary.color}",padding:"1rem 1.25rem",fontWeight:"600",margin:"0 0 -1px 0",gap:"0.5rem",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},tabpanel:{background:"{content.background}",color:"{content.color}",padding:"1.25rem 1.25rem 1.25rem 1.25rem",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},navButton:{background:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",width:"3rem",shadow:"none",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"}},activeBar:{height:"2px",bottom:"-1px",background:"{primary.color}"},css:({dt:e})=>`


.p-tabs-scrollable .p-tab {
    flex-grow: 0
}

.p-tab-active {
    --p-ripple-background: color-mix(in srgb, ${e("primary.color")}, transparent 90%)
}

.p-tab:not(.p-disabled):focus-visible {
    background: ${e("navigation.item.active.background")};
}

.p-tablist-nav-button:focus-visible {
    background: ${e("navigation.item.active.background")};
}
`};var Ts={root:{transitionDuration:"{transition.duration}"},tabList:{background:"{content.background}",borderColor:"{content.border.color}"},tab:{borderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},tabPanel:{background:"{content.background}",color:"{content.color}"},navButton:{background:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}"},colorScheme:{light:{navButton:{shadow:"0px 0px 10px 50px rgba(255, 255, 255, 0.6)"}},dark:{navButton:{shadow:"0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"}}}};var $s={root:{fontSize:"0.875rem",fontWeight:"700",padding:"0.25rem 0.5rem",gap:"0.25rem",borderRadius:"{content.border.radius}",roundedBorderRadius:"{border.radius.xl}"},icon:{size:"0.75rem"},colorScheme:{light:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.100}",color:"{surface.600}"},success:{background:"{green.500}",color:"{surface.0}"},info:{background:"{sky.500}",color:"{surface.0}"},warn:{background:"{orange.500}",color:"{surface.0}"},danger:{background:"{red.500}",color:"{surface.0}"},contrast:{background:"{surface.950}",color:"{surface.0}"}},dark:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.800}",color:"{surface.300}"},success:{background:"{green.400}",color:"{green.950}"},info:{background:"{sky.400}",color:"{sky.950}"},warn:{background:"{orange.400}",color:"{orange.950}"},danger:{background:"{red.400}",color:"{red.950}"},contrast:{background:"{surface.0}",color:"{surface.950}"}}}};var Rs={root:{background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.color}",height:"18rem",padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{form.field.border.radius}"},prompt:{gap:"0.25rem"},commandResponse:{margin:"2px 0"}};var As={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},css:({dt:e})=>`
.p-textarea.p-variant-filled {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid transparent;
    background: ${e("textarea.filled.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("textarea.focus.border.color")}, ${e("textarea.focus.border.color")}), linear-gradient(to bottom, ${e("textarea.border.color")}, ${e("textarea.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}

.p-textarea.p-variant-filled:enabled:hover {
    background: ${e("textarea.filled.hover.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("textarea.focus.border.color")}, ${e("textarea.focus.border.color")}), linear-gradient(to bottom, ${e("textarea.hover.border.color")}, ${e("textarea.hover.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-textarea.p-variant-filled:enabled:focus {
    outline: 0 none;
    background: ${e("textarea.filled.focus.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("textarea.focus.border.color")}, ${e("textarea.focus.border.color")}), linear-gradient(to bottom, ${e("textarea.border.color")}, ${e("textarea.border.color")});
    background-size: 100% 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-textarea.p-variant-filled:enabled:hover:focus {
    background-image: linear-gradient(to bottom, ${e("textarea.focus.border.color")}, ${e("textarea.focus.border.color")}), linear-gradient(to bottom, ${e("textarea.hover.border.color")}, ${e("textarea.hover.border.color")});
}

.p-textarea.p-variant-filled.p-invalid {
    background-image: linear-gradient(to bottom, ${e("textarea.invalid.border.color")}, ${e("textarea.invalid.border.color")}), linear-gradient(to bottom, ${e("textarea.invalid.border.color")}, ${e("textarea.invalid.border.color")});
}

.p-textarea.p-variant-filled.p-invalid:enabled:focus {
    background-image: linear-gradient(to bottom, ${e("textarea.invalid.border.color")}, ${e("textarea.invalid.border.color")}), linear-gradient(to bottom, ${e("textarea.invalid.border.color")}, ${e("textarea.invalid.border.color")});
}
`};var Fs={root:{background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},list:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},item:{focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},submenu:{mobileIndent:"1rem"},submenuIcon:{size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},separator:{borderColor:"{content.border.color}"},css:({dt:e})=>`
.p-tieredmenu-overlay {
    border-color: transparent
}
`};var Ds={event:{minHeight:"5rem"},horizontal:{eventContent:{padding:"1rem 0"}},vertical:{eventContent:{padding:"0 1rem"}},eventMarker:{size:"1.5rem",borderRadius:"50%",borderWidth:"2px",background:"{primary.color}",content:{borderRadius:"50%",size:"0",background:"{primary.color}",insetShadow:"none"}},eventConnector:{color:"{content.border.color}",size:"2px"},colorScheme:{light:{eventMarker:{borderColor:"{surface.0}"}},dark:{eventMarker:{borderColor:"{surface.900}"}}}};var Ls={root:{width:"25rem",borderRadius:"{content.border.radius}",borderWidth:"0",transitionDuration:"{transition.duration}"},icon:{size:"1.25rem"},content:{padding:"{overlay.popover.padding}",gap:"0.5rem"},text:{gap:"0.5rem"},summary:{fontWeight:"500",fontSize:"1rem"},detail:{fontWeight:"500",fontSize:"0.875rem"},closeButton:{width:"2rem",height:"2rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"}},closeIcon:{size:"1rem"},colorScheme:{light:{root:{blur:"0"},info:{background:"{blue.50}",borderColor:"{blue.200}",color:"{blue.600}",detailColor:"{surface.700}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"{blue.100}",focusRing:{color:"{blue.600}",shadow:"none"}}},success:{background:"{green.50}",borderColor:"{green.200}",color:"{green.600}",detailColor:"{surface.700}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"{green.100}",focusRing:{color:"{green.600}",shadow:"none"}}},warn:{background:"{yellow.50}",borderColor:"{yellow.200}",color:"{yellow.900}",detailColor:"{surface.700}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"{yellow.100}",focusRing:{color:"{yellow.600}",shadow:"none"}}},error:{background:"{red.50}",borderColor:"{red.200}",color:"{red.600}",detailColor:"{surface.700}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"{red.100}",focusRing:{color:"{red.600}",shadow:"none"}}},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",detailColor:"{surface.700}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"{surface.200}",focusRing:{color:"{surface.600}",shadow:"none"}}},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",detailColor:"{surface.0}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"{surface.800}",focusRing:{color:"{surface.50}",shadow:"none"}}}},dark:{root:{blur:"10px"},info:{background:"color-mix(in srgb, {blue.500}, transparent 36%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{surface.0}",detailColor:"{blue.100}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{blue.500}",shadow:"none"}}},success:{background:"color-mix(in srgb, {green.500}, transparent 36%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{surface.0}",detailColor:"{green.100}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{green.500}",shadow:"none"}}},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 36%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{surface.0}",detailColor:"{yellow.50}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{yellow.500}",shadow:"none"}}},error:{background:"color-mix(in srgb, {red.500}, transparent 36%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{surface.0}",detailColor:"{red.100}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{red.500}",shadow:"none"}}},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",detailColor:"{surface.0}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"{surface.700}",focusRing:{color:"{surface.300}",shadow:"none"}}},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",detailColor:"{surface.950}",shadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",closeButton:{hoverBackground:"{surface.100}",focusRing:{color:"{surface.950}",shadow:"none"}}}}}};var zs={root:{padding:"0.75rem 1rem",borderRadius:"{form.field.border.radius}",gap:"0.5rem",fontWeight:"500",background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.color}",hoverColor:"{form.field.color}",checkedColor:"{form.field.color}",checkedBorderColor:"{form.field.border.color}",disabledBackground:"{form.field.disabled.background}",disabledBorderColor:"{form.field.disabled.background}",disabledColor:"{form.field.disabled.color}",invalidBorderColor:"{form.field.invalid.border.color}",focusRing:{width:"0",style:"none",offset:"0",color:"unset",shadow:"none"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",padding:"0.625rem 0.75rem"},lg:{fontSize:"{form.field.lg.font.size}",padding:"0.875rem 1.25rem"}},icon:{color:"{text.muted.color}",hoverColor:"{text.muted.color}",checkedColor:"{text.muted.color}",disabledColor:"{form.field.disabled.color}"},content:{checkedBackground:"transparent",checkedShadow:"none",padding:"0",borderRadius:"0",sm:{padding:"0"},lg:{padding:"0"}},colorScheme:{light:{root:{hoverBackground:"{surface.100}",checkedBackground:"{surface.200}"}},dark:{root:{hoverBackground:"{surface.800}",checkedBackground:"{surface.700}"}}},css:({dt:e})=>`
.p-togglebutton:focus-visible {
    background: ${e("togglebutton.hover.background")}
}
`};var Os={root:{width:"2.75rem",height:"1rem",borderRadius:"30px",gap:"0px",shadow:"none",focusRing:{width:"0",style:"none",color:"unset",offset:"0",shadow:"none"},borderWidth:"1px",borderColor:"transparent",hoverBorderColor:"transparent",checkedBorderColor:"transparent",checkedHoverBorderColor:"transparent",invalidBorderColor:"{form.field.invalid.border.color}",transitionDuration:"{form.field.transition.duration}",slideDuration:"0.2s"},handle:{borderRadius:"50%",size:"1.5rem"},colorScheme:{light:{root:{background:"{surface.300}",disabledBackground:"{surface.400}",hoverBackground:"{surface.300}",checkedBackground:"{primary.200}",checkedHoverBackground:"{primary.200}"},handle:{background:"{surface.0}",disabledBackground:"{surface.200}",hoverBackground:"{surface.0}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}"}},dark:{root:{background:"{surface.700}",disabledBackground:"{surface.600}",hoverBackground:"{surface.700}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.color}"},handle:{background:"{surface.400}",disabledBackground:"{surface.500}",hoverBackground:"{surface.300}",checkedBackground:"{primary.200}",checkedHoverBackground:"{primary.200}",color:"{surface.800}",hoverColor:"{surface.900}",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}"}}},css:({dt:e})=>`
.p-toggleswitch-handle {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("text.color")}, transparent 96%), 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-handle {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("text.color")}, transparent 88%), 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("toggleswitch.handle.checked.background")}, transparent 92%), 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible).p-toggleswitch-checked .p-toggleswitch-handle {
    box-shadow: 0 0 1px 10px color-mix(in srgb, ${e("toggleswitch.handle.checked.background")}, transparent 84%), 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
`};var Ps={root:{color:"{content.color}",borderRadius:"{content.border.radius}",gap:"0.5rem",padding:"1rem"},colorScheme:{light:{root:{background:"{surface.100}",borderColor:"{surface.100}"}},dark:{root:{background:"{surface.800}",borderColor:"{surface.800}"}}}};var Vs={root:{background:"{surface.600}",color:"{surface.0}",maxWidth:"12.5rem",gutter:"0.25rem",shadow:"{overlay.popover.shadow}",padding:"0.5rem 0.75rem",borderRadius:"{overlay.popover.border.radius}"}};var Hs={root:{background:"{content.background}",color:"{content.color}",padding:"1rem",gap:"2px",indent:"2rem",transitionDuration:"{transition.duration}"},node:{padding:"0.5rem 0.75rem",borderRadius:"{border.radius.xs}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{text.color}",hoverColor:"{text.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},gap:"0.5rem"},nodeIcon:{color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedColor:"{highlight.color}"},nodeToggleButton:{borderRadius:"50%",size:"2rem",hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedHoverColor:"{primary.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},loadingIcon:{size:"2rem"},filter:{margin:"0 0 0.75rem 0"},css:({dt:e})=>`
.p-tree-node-content {
    transition: none
}
`};var js={root:{background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},dropdown:{width:"2.5rem",color:"{form.field.icon.color}"},overlay:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},tree:{padding:"{list.padding}"},emptyMessage:{padding:"{list.option.padding}"},chip:{borderRadius:"{border.radius.sm}"},clearIcon:{color:"{form.field.icon.color}"},css:({dt:e})=>`
.p-treeselect.p-variant-filled {
    border-end-start-radius: 0
    border-end-end-radius: 0;
    border: 1px solid transparent;
    background: ${e("treeselect.filled.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("treeselect.focus.border.color")}, ${e("treeselect.focus.border.color")}), linear-gradient(to bottom, ${e("treeselect.border.color")}, ${e("treeselect.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}

.p-treeselect.p-variant-filled:not(.p-disabled):hover {
    background: ${e("treeselect.filled.hover.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("treeselect.focus.border.color")}, ${e("treeselect.focus.border.color")}), linear-gradient(to bottom, ${e("treeselect.hover.border.color")}, ${e("treeselect.hover.border.color")});
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-treeselect.p-variant-filled:not(.p-disabled).p-focus {
    outline: 0 none;
    background: ${e("treeselect.filled.focus.background")} no-repeat;
    background-image: linear-gradient(to bottom, ${e("treeselect.focus.border.color")}, ${e("treeselect.focus.border.color")}), linear-gradient(to bottom, ${e("treeselect.border.color")}, ${e("treeselect.border.color")});
    background-size: 100% 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    background-origin: border-box;
    border-color: transparent;
}

.p-treeselect.p-variant-filled:not(.p-disabled).p-focus:hover {
    background-image: linear-gradient(to bottom, ${e("treeselect.focus.border.color")}, ${e("treeselect.focus.border.color")}), linear-gradient(to bottom, ${e("treeselect.hover.border.color")}, ${e("treeselect.hover.border.color")});
}

.p-treeselect.p-variant-filled.p-invalid {
    background-image: linear-gradient(to bottom, ${e("treeselect.invalid.border.color")}, ${e("treeselect.invalid.border.color")}), linear-gradient(to bottom, ${e("treeselect.invalid.border.color")}, ${e("treeselect.invalid.border.color")});
}

.p-treeselect.p-variant-filled.p-invalid:not(.p-disabled).p-focus  {
    background-image: linear-gradient(to bottom, ${e("treeselect.invalid.border.color")}, ${e("treeselect.invalid.border.color")}), linear-gradient(to bottom, ${e("treeselect.invalid.border.color")}, ${e("treeselect.invalid.border.color")});
}
`};var Ns={root:{transitionDuration:"{transition.duration}"},header:{background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem"},headerCell:{background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{treetable.border.color}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",gap:"0.5rem",padding:"0.75rem 1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},columnTitle:{fontWeight:"600"},row:{background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},bodyCell:{borderColor:"{treetable.border.color}",padding:"0.75rem 1rem",gap:"0.5rem"},footerCell:{background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",padding:"0.75rem 1rem"},columnFooter:{fontWeight:"600"},footer:{background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem"},columnResizer:{width:"0.5rem"},resizeIndicator:{width:"1px",color:"{primary.color}"},sortIcon:{color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",size:"0.875rem"},loadingIcon:{size:"2rem"},nodeToggleButton:{hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",selectedHoverColor:"{primary.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},paginatorTop:{borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},paginatorBottom:{borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},colorScheme:{light:{root:{borderColor:"{content.border.color}"},bodyCell:{selectedBorderColor:"{primary.100}"}},dark:{root:{borderColor:"{surface.800}"},bodyCell:{selectedBorderColor:"{primary.900}"}}},css:({dt:e})=>`
.p-treetable-header-cell,
.p-treetable-tbody > tr {
    transition: none
}
`};var Us={loader:{mask:{background:"{content.background}",color:"{text.muted.color}"},icon:{size:"2rem"}}};var Ht=m(p({},fa),{components:{accordion:da,autocomplete:ua,avatar:pa,badge:ma,blockui:ga,breadcrumb:ba,button:ha,datepicker:Ea,card:va,carousel:ya,cascadeselect:Ca,checkbox:ka,chip:xa,colorpicker:_a,confirmdialog:wa,confirmpopup:Sa,contextmenu:Ia,dataview:Ba,datatable:Ma,dialog:Ta,divider:$a,dock:Ra,drawer:Aa,editor:Fa,fieldset:Da,fileupload:La,iftalabel:Va,floatlabel:za,galleria:Oa,iconfield:Pa,image:Ha,imagecompare:ja,inlinemessage:Na,inplace:Ua,inputchips:Wa,inputgroup:Qa,inputnumber:qa,inputotp:Ka,inputtext:Ga,knob:Za,listbox:Xa,megamenu:Ya,menu:Ja,menubar:es,message:os,metergroup:ts,multiselect:rs,orderlist:is,organizationchart:ns,overlaybadge:as,popover:ps,paginator:ss,password:ds,panel:ls,panelmenu:cs,picklist:us,progressbar:ms,progressspinner:fs,radiobutton:gs,rating:bs,scrollpanel:vs,select:ys,selectbutton:Cs,skeleton:ks,slider:xs,speeddial:_s,splitter:Ss,splitbutton:ws,stepper:Is,steps:Ms,tabmenu:Bs,tabs:Es,tabview:Ts,textarea:As,tieredmenu:Fs,tag:$s,terminal:Rs,timeline:Ds,togglebutton:zs,toggleswitch:Os,tree:Hs,treeselect:js,treetable:Ns,toast:Ls,toolbar:Ps,virtualscroller:Us,tooltip:Vs,ripple:hs},css:({dt:e})=>`

    `});var Yd=["header"],Jd=["footer"],eu=["content"],ou=["closeicon"],tu=["headless"],ru=["maskRef"],iu=["container"],nu=["closeButton"],au=["*"],su=(e,t,o,r,i,n)=>({"p-drawer":!0,"p-drawer-active":e,"p-drawer-left":t,"p-drawer-right":o,"p-drawer-top":r,"p-drawer-bottom":i,"p-drawer-full":n}),lu=(e,t)=>({transform:e,transition:t}),cu=e=>({value:"visible",params:e});function du(e,t){e&1&&Ae(0)}function uu(e,t){if(e&1&&b(0,du,1,0,"ng-container",4),e&2){let o=u(2);a("ngTemplateOutlet",o.headlessTemplate||o._headlessTemplate)}}function pu(e,t){e&1&&Ae(0)}function mu(e,t){if(e&1&&(l(0,"div"),x(1),c()),e&2){let o=u(3);be(o.cx("title")),d(),_e(o.header)}}function fu(e,t){e&1&&g(0,"TimesIcon"),e&2&&I("data-pc-section","closeicon")}function gu(e,t){}function bu(e,t){e&1&&b(0,gu,0,0,"ng-template")}function hu(e,t){if(e&1&&b(0,fu,1,1,"TimesIcon",8)(1,bu,1,0,null,4),e&2){let o=u(4);a("ngIf",!o.closeIconTemplate&&!o._closeIconTemplate),d(),a("ngTemplateOutlet",o.closeIconTemplate||o._closeIconTemplate)}}function vu(e,t){if(e&1){let o=V();l(0,"p-button",9),$("onClick",function(i){C(o);let n=u(3);return k(n.close(i))})("keydown.enter",function(i){C(o);let n=u(3);return k(n.close(i))}),b(1,hu,2,2,"ng-template",null,1,lo),c()}if(e&2){let o=u(3);a("ngClass",o.cx("closeButton"))("buttonProps",o.closeButtonProps)("ariaLabel",o.ariaCloseLabel),I("data-pc-section","closebutton")("data-pc-group-section","iconcontainer")}}function yu(e,t){e&1&&Ae(0)}function Cu(e,t){e&1&&Ae(0)}function ku(e,t){if(e&1&&(te(0),l(1,"div",5),b(2,Cu,1,0,"ng-container",4),c(),re()),e&2){let o=u(3);d(),a("ngClass",o.cx("footer")),I("data-pc-section","footer"),d(),a("ngTemplateOutlet",o.footerTemplate||o._footerTemplate)}}function xu(e,t){if(e&1&&(l(0,"div",5),b(1,pu,1,0,"ng-container",4)(2,mu,2,3,"div",6)(3,vu,3,5,"p-button",7),c(),l(4,"div",5),bi(5),b(6,yu,1,0,"ng-container",4),c(),b(7,ku,3,3,"ng-container",8)),e&2){let o=u(2);a("ngClass",o.cx("header")),I("data-pc-section","header"),d(),a("ngTemplateOutlet",o.headerTemplate||o._headerTemplate),d(),a("ngIf",o.header),d(),a("ngIf",o.showCloseIcon&&o.closable),d(),a("ngClass",o.cx("content")),I("data-pc-section","content"),d(2),a("ngTemplateOutlet",o.contentTemplate||o._contentTemplate),d(),a("ngIf",o.footerTemplate||o._footerTemplate)}}function _u(e,t){if(e&1){let o=V();l(0,"div",3,0),$("@panelState.start",function(i){C(o);let n=u();return k(n.onAnimationStart(i))})("@panelState.done",function(i){C(o);let n=u();return k(n.onAnimationEnd(i))})("keydown",function(i){C(o);let n=u();return k(n.onKeyDown(i))}),b(2,uu,1,1,"ng-container")(3,xu,8,9),c()}if(e&2){let o=u();xe(o.style),be(o.styleClass),a("ngClass",yi(9,su,o.visible,o.position==="left"&&!o.fullScreen,o.position==="right"&&!o.fullScreen,o.position==="top"&&!o.fullScreen,o.position==="bottom"&&!o.fullScreen,o.fullScreen||o.position==="full"))("@panelState",X(19,cu,vo(16,lu,o.transformOptions,o.transitionOptions))),I("data-pc-name","sidebar")("data-pc-section","root"),d(2),bo(o.headlessTemplate||o._headlessTemplate?2:3)}}var wu=({dt:e})=>`
.p-drawer {
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    transform: translate3d(0px, 0px, 0px);
    position: fixed;
    transition: transform 0.3s;
    background: ${e("drawer.background")};
    color: ${e("drawer.color")};
    border: 1px solid ${e("drawer.border.color")};
    box-shadow: ${e("drawer.shadow")};
}

.p-drawer-content {
    overflow-y: auto;
    flex-grow: 1;
    padding: ${e("drawer.content.padding")};
}

.p-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: ${e("drawer.header.padding")};
}

.p-drawer-footer {
    padding: ${e("drawer.header.padding")};
}

.p-drawer-title {
    font-weight: ${e("drawer.title.font.weight")};
    font-size: ${e("drawer.title.font.size")};
}

.p-drawer-full .p-drawer {
    transition: none;
    transform: none;
    width: 100vw !important;
    height: 100vh !important;
    max-height: 100%;
    top: 0px !important;
    left: 0px !important;
    border-width: 1px;
}

.p-drawer-left .p-drawer {
    align-self: start;
    width: 20rem;
    height: 100%;
    border-right-width: 1px;
}

.p-drawer-right .p-drawer {
    align-self: end;
    width: 20rem;
    height: 100%;
    border-left-width: 1px;
}

.p-drawer-top .p-drawer {
    height: 10rem;
    width: 100%;
    border-bottom-width: 1px;
}

.p-drawer-bottom .p-drawer {
    height: 10rem;
    width: 100%;
    border-top-width: 1px;
}

.p-drawer-left .p-drawer-content,
.p-drawer-right .p-drawer-content,
.p-drawer-top .p-drawer-content,
.p-drawer-bottom .p-drawer-content {
    width: 100%;
    height: 100%;
}

.p-drawer-open {
    display: flex;
}

.p-drawer-top {
    justify-content: flex-start;
}

.p-drawer-bottom {
    justify-content: flex-end;
}

.p-drawer {
    position: fixed;
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
}

.p-drawer-content {
    position: relative;
    overflow-y: auto;
    flex-grow: 1;
}

.p-drawer-header {
    display: flex;
    align-items: center;
}

.p-drawer-footer {
    margin-top: auto;
}

.p-drawer-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
}

.p-drawer-full {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: none;
    transition: none;
}

.p-drawer-mask {
    background-color: rgba(0, 0, 0, 0.4);
    transition-duration: 0.2s;
}

.p-overlay-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask:dir(rtl) {
    flex-direction: row-reverse;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation 150ms forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation 150ms forwards;
}

@keyframes p-overlay-mask-enter-animation {
    from {
        background-color: transparent;
    }
    to {
        background-color: rgba(0, 0, 0, 0.4);
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background-color: rgba(0, 0, 0, 0.4);
    }
    to {
        background-color: transparent;
    }
}
`,Su={mask:({instance:e})=>({position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",flexDirection:"column",alignItems:e.position==="top"?"flex-start":e.position==="bottom"?"flex-end":"center"})},Iu={mask:({instance:e})=>({"p-drawer-mask":!0,"p-overlay-mask p-overlay-mask-enter":e.modal,"p-drawer-open":e.containerVisible,"p-drawer-full":e.fullScreen,[`p-drawer-${e.position}`]:!!e.position}),root:({instance:e})=>({"p-drawer p-component":!0,"p-drawer-full":e.fullScreen}),header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},Ws=(()=>{class e extends oo{name="drawer";theme=wu;classes=Iu;inlineStyles=Su;static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275prov=S({token:e,factory:e.\u0275fac})}return e})();var Mu=cr([he({transform:"{{transform}}",opacity:0}),Ve("{{transition}}")]),Bu=cr([Ve("{{transition}}",he({transform:"{{transform}}",opacity:0}))]),Nr=(()=>{class e extends We{appendTo="body";blockScroll=!1;style;styleClass;ariaCloseLabel;autoZIndex=!0;baseZIndex=0;modal=!0;closeButtonProps={severity:"secondary",text:!0,rounded:!0};dismissible=!0;showCloseIcon=!0;closeOnEscape=!0;transitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";get visible(){return this._visible}set visible(o){this._visible=o}get position(){return this._position}set position(o){if(this._position=o,o==="full"){this.transformOptions="none";return}switch(o){case"left":this.transformOptions="translate3d(-100%, 0px, 0px)";break;case"right":this.transformOptions="translate3d(100%, 0px, 0px)";break;case"bottom":this.transformOptions="translate3d(0px, 100%, 0px)";break;case"top":this.transformOptions="translate3d(0px, -100%, 0px)";break}}get fullScreen(){return this._fullScreen}set fullScreen(o){this._fullScreen=o,o&&(this.transformOptions="none")}header;maskStyle;closable=!0;onShow=new Ce;onHide=new Ce;visibleChange=new Ce;maskRef;containerViewChild;closeButtonViewChild;initialized;_visible;_position="left";_fullScreen=!1;container;transformOptions="translate3d(-100%, 0px, 0px)";mask;maskClickListener;documentEscapeListener;animationEndListener;_componentStyle=v(Ws);ngAfterViewInit(){super.ngAfterViewInit(),this.initialized=!0}headerTemplate;footerTemplate;contentTemplate;closeIconTemplate;headlessTemplate;_headerTemplate;_footerTemplate;_contentTemplate;_closeIconTemplate;_headlessTemplate;templates;ngAfterContentInit(){this.templates?.forEach(o=>{switch(o.getType()){case"content":this._contentTemplate=o.template;break;case"header":this._headerTemplate=o.template;break;case"footer":this._footerTemplate=o.template;break;case"closeicon":this._closeIconTemplate=o.template;break;case"headless":this._headlessTemplate=o.template;break;default:this._contentTemplate=o.template;break}})}onKeyDown(o){o.code==="Escape"&&this.hide(!1)}show(){this.container.setAttribute(this.attrSelector,""),this.autoZIndex&&to.set("modal",this.container,this.baseZIndex||this.config.zIndex.modal),this.modal&&this.enableModality(),this.onShow.emit({}),this.visibleChange.emit(!0)}hide(o=!0){o&&this.onHide.emit({}),this.modal&&this.disableModality()}close(o){this.hide(),this.visibleChange.emit(!1),o.preventDefault()}enableModality(){let o=this.document.querySelectorAll(".p-drawer-active"),r=o.length,i=r==1?String(parseInt(this.container.style.zIndex)-1):String(parseInt(o[r-1].style.zIndex)-1);this.mask||(this.mask=this.renderer.createElement("div"),this.renderer.setStyle(this.mask,"zIndex",i),Ki(this.mask,"style",this.maskStyle),mt(this.mask,"p-overlay-mask p-drawer-mask p-overlay-mask-enter"),this.dismissible&&(this.maskClickListener=this.renderer.listen(this.mask,"click",n=>{this.dismissible&&this.close(n)})),this.renderer.appendChild(this.document.body,this.mask),this.blockScroll&&Ui())}disableModality(){this.mask&&(mt(this.mask,"p-overlay-mask-leave"),this.animationEndListener=this.renderer.listen(this.mask,"animationend",this.destroyModal.bind(this)))}destroyModal(){this.unbindMaskClickListener(),this.mask&&this.renderer.removeChild(this.document.body,this.mask),this.blockScroll&&Wi(),this.unbindAnimationEndListener(),this.mask=null}onAnimationStart(o){switch(o.toState){case"visible":this.container=o.element,this.appendContainer(),this.show(),this.closeOnEscape&&this.bindDocumentEscapeListener();break}}onAnimationEnd(o){switch(o.toState){case"void":this.hide(!1),to.clear(this.container),this.unbindGlobalListeners();break}}appendContainer(){this.appendTo&&(this.appendTo==="body"?this.renderer.appendChild(this.document.body,this.container):Qi(this.appendTo,this.container))}bindDocumentEscapeListener(){let o=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentEscapeListener=this.renderer.listen(o,"keydown",r=>{r.which==27&&parseInt(this.container.style.zIndex)===to.get(this.container)&&this.close(r)})}unbindDocumentEscapeListener(){this.documentEscapeListener&&(this.documentEscapeListener(),this.documentEscapeListener=null)}unbindMaskClickListener(){this.maskClickListener&&(this.maskClickListener(),this.maskClickListener=null)}unbindGlobalListeners(){this.unbindMaskClickListener(),this.unbindDocumentEscapeListener()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.initialized=!1,this.visible&&this.modal&&this.destroyModal(),this.appendTo&&this.container&&this.renderer.appendChild(this.el.nativeElement,this.container),this.container&&this.autoZIndex&&to.clear(this.container),this.container=null,this.unbindGlobalListeners(),this.unbindAnimationEndListener()}static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275cmp=E({type:e,selectors:[["p-drawer"]],contentQueries:function(r,i,n){if(r&1&&(ee(n,Yd,4),ee(n,Jd,4),ee(n,eu,4),ee(n,ou,4),ee(n,tu,4),ee(n,_o,4)),r&2){let s;_(s=w())&&(i.headerTemplate=s.first),_(s=w())&&(i.footerTemplate=s.first),_(s=w())&&(i.contentTemplate=s.first),_(s=w())&&(i.closeIconTemplate=s.first),_(s=w())&&(i.headlessTemplate=s.first),_(s=w())&&(i.templates=s)}},viewQuery:function(r,i){if(r&1&&(H(ru,5),H(iu,5),H(nu,5)),r&2){let n;_(n=w())&&(i.maskRef=n.first),_(n=w())&&(i.containerViewChild=n.first),_(n=w())&&(i.closeButtonViewChild=n.first)}},inputs:{appendTo:"appendTo",blockScroll:[2,"blockScroll","blockScroll",J],style:"style",styleClass:"styleClass",ariaCloseLabel:"ariaCloseLabel",autoZIndex:[2,"autoZIndex","autoZIndex",J],baseZIndex:[2,"baseZIndex","baseZIndex",Ze],modal:[2,"modal","modal",J],closeButtonProps:"closeButtonProps",dismissible:[2,"dismissible","dismissible",J],showCloseIcon:[2,"showCloseIcon","showCloseIcon",J],closeOnEscape:[2,"closeOnEscape","closeOnEscape",J],transitionOptions:"transitionOptions",visible:"visible",position:"position",fullScreen:"fullScreen",header:"header",maskStyle:"maskStyle",closable:[2,"closable","closable",J]},outputs:{onShow:"onShow",onHide:"onHide",visibleChange:"visibleChange"},features:[Pe([Ws]),Re],ngContentSelectors:au,decls:1,vars:1,consts:[["container",""],["icon",""],["role","complementary",3,"ngClass","style","class","keydown",4,"ngIf"],["role","complementary",3,"keydown","ngClass"],[4,"ngTemplateOutlet"],[3,"ngClass"],[3,"class",4,"ngIf"],[3,"ngClass","buttonProps","ariaLabel","onClick","keydown.enter",4,"ngIf"],[4,"ngIf"],[3,"onClick","keydown.enter","ngClass","buttonProps","ariaLabel"]],template:function(r,i){r&1&&(gi(),b(0,_u,4,21,"div",2)),r&2&&a("ngIf",i.visible)},dependencies:[j,ie,ne,co,cn,ln,le],encapsulation:2,data:{animation:[ko("panelState",[He("void => visible",[dr(Mu)]),He("visible => void",[dr(Bu)])])]},changeDetection:0})}return e})(),Qs=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ke({type:e});static \u0275inj=ye({imports:[Nr,le,le]})}return e})();var Tu=["handle"],$u=["input"],Ru=e=>({checked:e});function Au(e,t){e&1&&Ae(0)}function Fu(e,t){if(e&1&&b(0,Au,1,0,"ng-container",4),e&2){let o=u();a("ngTemplateOutlet",o.handleTemplate||o._handleTemplate)("ngTemplateOutletContext",X(2,Ru,o.checked()))}}var Du=({dt:e})=>`
.p-toggleswitch {
    display: inline-block;
    width: ${e("toggleswitch.width")};
    height: ${e("toggleswitch.height")};
}

.p-toggleswitch-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border-radius: ${e("toggleswitch.border.radius")};
}

.p-toggleswitch-slider {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-width: ${e("toggleswitch.border.width")};
    border-style: solid;
    border-color: ${e("toggleswitch.border.color")};
    background: ${e("toggleswitch.background")};
    transition: background ${e("toggleswitch.transition.duration")}, color ${e("toggleswitch.transition.duration")}, border-color ${e("toggleswitch.transition.duration")}, outline-color ${e("toggleswitch.transition.duration")}, box-shadow ${e("toggleswitch.transition.duration")};
    border-radius: ${e("toggleswitch.border.radius")};
    outline-color: transparent;
    box-shadow: ${e("toggleswitch.shadow")};
}

.p-toggleswitch-handle {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${e("toggleswitch.handle.background")};
    color: ${e("toggleswitch.handle.color")};
    width: ${e("toggleswitch.handle.size")};
    height: ${e("toggleswitch.handle.size")};
    inset-inline-start: ${e("toggleswitch.gap")};
    margin-block-start: calc(-1 * calc(${e("toggleswitch.handle.size")} / 2));
    border-radius: ${e("toggleswitch.handle.border.radius")};
    transition: background ${e("toggleswitch.transition.duration")}, color ${e("toggleswitch.transition.duration")}, inset-inline-start ${e("toggleswitch.slide.duration")}, box-shadow ${e("toggleswitch.slide.duration")};
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
    background: ${e("toggleswitch.checked.background")};
    border-color: ${e("toggleswitch.checked.border.color")};
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
    background: ${e("toggleswitch.handle.checked.background")};
    color: ${e("toggleswitch.handle.checked.color")};
    inset-inline-start: calc(${e("toggleswitch.width")} - calc(${e("toggleswitch.handle.size")} + ${e("toggleswitch.gap")}));
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
    background: ${e("toggleswitch.hover.background")};
    border-color: ${e("toggleswitch.hover.border.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
    background: ${e("toggleswitch.handle.hover.background")};
    color: ${e("toggleswitch.handle.hover.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
    background: ${e("toggleswitch.checked.hover.background")};
    border-color: ${e("toggleswitch.checked.hover.border.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
    background: ${e("toggleswitch.handle.checked.hover.background")};
    color: ${e("toggleswitch.handle.checked.hover.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: ${e("toggleswitch.focus.ring.shadow")};
    outline: ${e("toggleswitch.focus.ring.width")} ${e("toggleswitch.focus.ring.style")} ${e("toggleswitch.focus.ring.color")};
    outline-offset: ${e("toggleswitch.focus.ring.offset")};
}

.p-toggleswitch.p-invalid > .p-toggleswitch-slider {
    border-color: ${e("toggleswitch.invalid.border.color")};
}

.p-toggleswitch.p-disabled {
    opacity: 1;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider {
    background: ${e("toggleswitch.disabled.background")};
}

.p-toggleswitch.p-disabled .p-toggleswitch-handle {
    background: ${e("toggleswitch.handle.disabled.background")};
}

/* For PrimeNG */

p-toggleSwitch.ng-invalid.ng-dirty > .p-toggleswitch > .p-toggleswitch-slider,
p-toggle-switch.ng-invalid.ng-dirty > .p-toggleswitch > .p-toggleswitch-slider,
p-toggleswitch.ng-invalid.ng-dirty > .p-toggleswitch > .p-toggleswitch-slider {
    border-color: ${e("toggleswitch.invalid.border.color")};
}`,Lu={root:{position:"relative"}},zu={root:({instance:e})=>({"p-toggleswitch p-component":!0,"p-toggleswitch-checked":e.checked(),"p-disabled":e.disabled,"p-invalid":e.invalid}),input:"p-toggleswitch-input",slider:"p-toggleswitch-slider",handle:"p-toggleswitch-handle"},qs=(()=>{class e extends oo{name="toggleswitch";theme=Du;classes=zu;inlineStyles=Lu;static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275prov=S({token:e,factory:e.\u0275fac})}return e})();var Ou={provide:dn,useExisting:it(()=>Ks),multi:!0},Ks=(()=>{class e extends We{style;styleClass;tabindex;inputId;name;disabled;readonly;trueValue=!0;falseValue=!1;ariaLabel;ariaLabelledBy;autofocus;onChange=new Ce;input;handleTemplate;_handleTemplate;modelValue=!1;focused=!1;onModelChange=()=>{};onModelTouched=()=>{};_componentStyle=v(qs);templates;ngAfterContentInit(){this.templates.forEach(o=>{switch(o.getType()){case"handle":this._handleTemplate=o.template;break;default:this._handleTemplate=o.template;break}})}onClick(o){!this.disabled&&!this.readonly&&(this.modelValue=this.checked()?this.falseValue:this.trueValue,this.onModelChange(this.modelValue),this.onChange.emit({originalEvent:o,checked:this.modelValue}),this.input.nativeElement.focus())}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}writeValue(o){this.modelValue=o,this.cd.markForCheck()}registerOnChange(o){this.onModelChange=o}registerOnTouched(o){this.onModelTouched=o}setDisabledState(o){this.disabled=o,this.cd.markForCheck()}checked(){return this.modelValue===this.trueValue}static \u0275fac=(()=>{let o;return function(i){return(o||(o=de(e)))(i||e)}})();static \u0275cmp=E({type:e,selectors:[["p-toggleswitch"],["p-toggleSwitch"],["p-toggle-switch"]],contentQueries:function(r,i,n){if(r&1&&(ee(n,Tu,4),ee(n,_o,4)),r&2){let s;_(s=w())&&(i.handleTemplate=s.first),_(s=w())&&(i.templates=s)}},viewQuery:function(r,i){if(r&1&&H($u,5),r&2){let n;_(n=w())&&(i.input=n.first)}},inputs:{style:"style",styleClass:"styleClass",tabindex:[2,"tabindex","tabindex",Ze],inputId:"inputId",name:"name",disabled:[2,"disabled","disabled",J],readonly:[2,"readonly","readonly",J],trueValue:"trueValue",falseValue:"falseValue",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",autofocus:[2,"autofocus","autofocus",J]},outputs:{onChange:"onChange"},features:[Pe([Ou,qs]),Re],decls:6,vars:23,consts:[["input",""],[3,"click","ngClass","ngStyle"],["type","checkbox","role","switch",3,"focus","blur","ngClass","checked","disabled","pAutoFocus"],[3,"ngClass"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(r,i){if(r&1){let n=V();l(0,"div",1),$("click",function(f){return C(n),k(i.onClick(f))}),l(1,"input",2,0),$("focus",function(){return C(n),k(i.onFocus())})("blur",function(){return C(n),k(i.onBlur())}),c(),l(3,"span",3)(4,"div",3),b(5,Fu,1,4,"ng-container"),c()()()}r&2&&(xe(i.sx("root")),be(i.styleClass),a("ngClass",i.cx("root"))("ngStyle",i.style),I("data-pc-name","toggleswitch")("data-pc-section","root"),d(),a("ngClass",i.cx("input"))("checked",i.checked())("disabled",i.disabled)("pAutoFocus",i.autofocus),I("id",i.inputId)("aria-checked",i.checked())("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("name",i.name)("tabindex",i.tabindex)("data-pc-section","hiddenInput"),d(2),a("ngClass",i.cx("slider")),I("data-pc-section","slider"),d(),a("ngClass",i.cx("handle")),d(),bo(i.handleTemplate||i._handleTemplate?5:-1))},dependencies:[j,ie,co,Ue,tn,le],encapsulation:2,changeDetection:0})}return e})(),Gs=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ke({type:e});static \u0275inj=ye({imports:[Ks,le,le]})}return e})();var Nt=e=>({"background-color":e}),Xs=e=>({"outline-primary":e}),Ys=e=>({"text-white":e}),Zs=(e,t)=>t.name;function Pu(e,t){if(e&1){let o=V();l(0,"button",10),$("click",function(){C(o);let i=u();return k(i.toggleConfigSidebar())}),g(1,"i",11),c()}}function Vu(e,t){if(e&1){let o=V();l(0,"button",12),$("click",function(i){let n=C(o).$implicit,s=u();return k(s.updateColors(i,"primary",n))}),c()}if(e&2){let o=t.$implicit,r=u();xe(X(4,Nt,(o==null?null:o.name)==="noir"?"var(--text-color)":o==null||o.palette==null?null:o.palette[500])),a("title",o.name)("ngClass",X(6,Xs,o.name===r.selectedPrimaryColor()))}}function Hu(e,t){if(e&1){let o=V();l(0,"button",12),$("click",function(i){let n=C(o).$implicit,s=u();return k(s.updateColors(i,"surface",n))}),c()}if(e&2){let o=t.$implicit,r=u();xe(X(4,Nt,o==null||o.palette==null?null:o.palette[500])),a("title",o.name)("ngClass",X(6,Xs,r.selectedSurface()?r.selectedSurface()===o.name:r.isDarkTheme()?o.name==="zinc":o.name==="slate"))}}function ju(e,t){e&1&&(l(0,"p"),x(1,"Menu themes are only available in light mode by design as large surfaces can emit too much brightness in dark mode."),c())}function Nu(e,t){if(e&1&&g(0,"i",38),e&2){let o=u(4);a("ngClass",X(1,Ys,o.menuTheme!=="light"))}}function Uu(e,t){if(e&1){let o=V();l(0,"button",36),$("click",function(){let i=C(o).$implicit,n=u(3);return k(n.changeMenuTheme(i.name))}),b(1,Nu,1,3,"i",37),c()}if(e&2){let o=t.$implicit,r=u(3);a("ngStyle",X(2,Nt,o.color)),d(),a("ngIf",r.menuTheme===o.name)}}function Wu(e,t){if(e&1&&(l(0,"div",5),Ao(1,Uu,2,4,"button",35,ar),c()),e&2){let o=u(2);d(),Fo(o.menuThemes)}}function Qu(e,t){if(e&1&&g(0,"i",38),e&2){let o=u(3);a("ngClass",X(1,Ys,o.topbarTheme!=="light"))}}function qu(e,t){if(e&1){let o=V();l(0,"button",36),$("click",function(){let i=C(o).$implicit,n=u(2);return k(n.changeTopbarTheme(i.name))}),b(1,Qu,1,3,"i",37),c()}if(e&2){let o=t.$implicit,r=u(2);a("ngStyle",X(2,Nt,o.color)),d(),a("ngIf",r.topbarTheme===o.name)}}function Ku(e,t){if(e&1){let o=V();te(0),l(1,"div",7)(2,"span",4),x(3,"Menu Type"),c(),l(4,"div",13)(5,"div",14)(6,"div",15)(7,"p-radio-button",16),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuMode,i)||(n.menuMode=i),k(i)}),c(),l(8,"label",17),x(9,"Static"),c()(),l(10,"div",15)(11,"p-radio-button",18),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuMode,i)||(n.menuMode=i),k(i)}),c(),l(12,"label",19),x(13,"Overlay"),c()()(),l(14,"div",14)(15,"div",15)(16,"p-radio-button",20),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuMode,i)||(n.menuMode=i),k(i)}),c(),l(17,"label",21),x(18,"Slim"),c()(),l(19,"div",15)(20,"p-radio-button",22),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuMode,i)||(n.menuMode=i),k(i)}),c(),l(21,"label",23),x(22,"Slim+"),c()()(),l(23,"div",14)(24,"div",15)(25,"p-radio-button",24),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuMode,i)||(n.menuMode=i),k(i)}),c(),l(26,"label",25),x(27,"Reveal"),c()(),l(28,"div",15)(29,"p-radio-button",26),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuMode,i)||(n.menuMode=i),k(i)}),c(),l(30,"label",27),x(31,"Drawer"),c()()(),l(32,"div",14)(33,"div",15)(34,"p-radio-button",28),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuMode,i)||(n.menuMode=i),k(i)}),c(),l(35,"label",29),x(36,"Horizontal"),c()()()()(),l(37,"div",7)(38,"span",4),x(39,"Menu Profile"),c(),l(40,"div",13)(41,"div",14)(42,"div",15)(43,"p-radio-button",30),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuProfilePosition,i)||(n.menuProfilePosition=i),k(i)}),c(),l(44,"label",31),x(45,"Start"),c()(),l(46,"div",15)(47,"p-radio-button",32),Ie("ngModelChange",function(i){C(o);let n=u();return Se(n.menuProfilePosition,i)||(n.menuProfilePosition=i),k(i)}),c(),l(48,"label",33),x(49,"End"),c()()()()(),l(50,"div",7)(51,"span",4),x(52,"Menu Themes"),c(),b(53,ju,2,0,"p",34)(54,Wu,3,0,"ng-template",null,0,lo),c(),l(56,"div",7)(57,"span",4),x(58,"Topbar Themes"),c(),l(59,"div",5),Ao(60,qu,2,4,"button",35,ar),c()(),re()}if(e&2){let o=Do(55),r=u();d(7),we("ngModel",r.menuMode),d(4),we("ngModel",r.menuMode),d(5),we("ngModel",r.menuMode),d(4),we("ngModel",r.menuMode),d(5),we("ngModel",r.menuMode),d(4),we("ngModel",r.menuMode),d(5),we("ngModel",r.menuMode),d(9),we("ngModel",r.menuProfilePosition),d(4),we("ngModel",r.menuProfilePosition),d(6),a("ngIf",r.isDarkTheme())("ngIfElse",o),d(7),Fo(r.topbarThemes)}}var jt=class e{simple=!1;router=v(pe);config=v(hr);_layoutService=v(me);primeng=v(hr);themeOptions=[{name:"Light",value:!1},{name:"Dark",value:!0}];menuThemes=[{name:"indigo",color:"#3F51B5"},{name:"quanta",color:"#ea5c9e"},{name:"light",color:"#FDFEFF"},{name:"dark",color:"#434B54"},{name:"indigo",color:"#1A237E"},{name:"bluegrey",color:"#37474F"},{name:"brown",color:"#4E342E"},{name:"cyan",color:"#006064"},{name:"green",color:"#2E7D32"},{name:"deeppurple",color:"#4527A0"},{name:"deeporange",color:"#BF360C"},{name:"pink",color:"#880E4F"},{name:"purple",color:"#6A1B9A"},{name:"teal",color:"#00695C"}];topbarThemes=[{name:"quanta",color:"#ea5c9e"},{name:"lightblue",color:"#2E88FF"},{name:"dark",color:"#363636"},{name:"white",color:"#FDFEFF"},{name:"blue",color:"#1565C0"},{name:"deeppurple",color:"#4527A0"},{name:"purple",color:"#6A1B9A"},{name:"pink",color:"#AD1457"},{name:"cyan",color:"#0097A7"},{name:"teal",color:"#00796B"},{name:"green",color:"#43A047"},{name:"lightgreen",color:"#689F38"},{name:"lime",color:"#AFB42B"},{name:"yellow",color:"#FBC02D"},{name:"amber",color:"#FFA000"},{name:"orange",color:"#FB8C00"},{name:"deeporange",color:"#D84315"},{name:"brown",color:"#5D4037"},{name:"grey",color:"#616161"},{name:"bluegrey",color:"#546E7A"},{name:"indigo",color:"#3F51B5"}];surfaces=[{name:"slate",palette:{0:"#ffffff",50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"}},{name:"gray",palette:{0:"#ffffff",50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"}},{name:"zinc",palette:{0:"#ffffff",50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b"}},{name:"neutral",palette:{0:"#ffffff",50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a"}},{name:"stone",palette:{0:"#ffffff",50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09"}},{name:"soho",palette:{0:"#ffffff",50:"#ececec",100:"#dedfdf",200:"#c4c4c6",300:"#adaeb0",400:"#97979b",500:"#7f8084",600:"#6a6b70",700:"#55565b",800:"#3f4046",900:"#2c2c34",950:"#16161d"}},{name:"viva",palette:{0:"#ffffff",50:"#f3f3f3",100:"#e7e7e8",200:"#cfd0d0",300:"#b7b8b9",400:"#9fa1a1",500:"#87898a",600:"#6e7173",700:"#565a5b",800:"#3e4244",900:"#262b2c",950:"#0e1315"}},{name:"ocean",palette:{0:"#ffffff",50:"#fbfcfc",100:"#F7F9F8",200:"#EFF3F2",300:"#DADEDD",400:"#B1B7B6",500:"#828787",600:"#5F7274",700:"#415B61",800:"#29444E",900:"#183240",950:"#0c1920"}}];selectedPrimaryColor=P(()=>this._layoutService.layoutConfig().primary);get menuMode(){return this._layoutService.layoutConfig().menuMode}set menuMode(t){this._layoutService.layoutConfig.update(o=>m(p({},o),{menuMode:t}))}get menuTheme(){return this._layoutService.layoutConfig().menuTheme}set menuTheme(t){this._layoutService.layoutConfig.update(o=>m(p({},o),{menuTheme:t}))}get topbarTheme(){return this._layoutService.layoutConfig().topbarTheme}set topbarTheme(t){this._layoutService.layoutConfig.update(o=>m(p({},o),{topbarTheme:t}))}get menuProfilePosition(){return this._layoutService.layoutConfig().menuProfilePosition}set menuProfilePosition(t){this._layoutService.layoutConfig.update(o=>m(p({},o),{menuProfilePosition:t}))}get darkTheme(){return this._layoutService.layoutConfig().darkTheme}set darkTheme(t){this._layoutService.layoutConfig.update(o=>m(p({},o),{menuTheme:t?"dark":"light",darkTheme:t}))}get visible(){return this._layoutService.layoutState().configSidebarVisible}set visible(t){this._layoutService.layoutState.update(o=>m(p({},o),{configSidebarVisible:t}))}isDarkTheme=P(()=>this._layoutService.layoutConfig().darkTheme);selectedSurface=P(()=>this._layoutService.layoutConfig().surface);primaryColors=P(()=>{let t=Ht.primitive,o=["emerald","green","lime","orange","amber","yellow","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"],r=[{name:"noir",palette:{}}];return o.forEach(i=>{r.push({name:i,palette:t?.[i]})}),r});onLayoutThemeChange(t){this._layoutService.layoutConfig.update(o=>m(p({},o),{layoutTheme:t}))}getPresetExt(){let t=this.primaryColors().find(o=>o.name===this.selectedPrimaryColor())||{};return t.name==="noir"?{semantic:{primary:{50:"{surface.50}",100:"{surface.100}",200:"{surface.200}",300:"{surface.300}",400:"{surface.400}",500:"{surface.500}",600:"{surface.600}",700:"{surface.700}",800:"{surface.800}",900:"{surface.900}",950:"{surface.950}"},colorScheme:{light:{primary:{color:"{primary.950}",contrastColor:"#ffffff",hoverColor:"{primary.800}",activeColor:"{primary.700}"},highlight:{background:"{primary.950}",focusBackground:"{primary.700}",color:"#ffffff",focusColor:"#ffffff"}},dark:{primary:{color:"{primary.50}",contrastColor:"{primary.950}",hoverColor:"{primary.200}",activeColor:"{primary.300}"},highlight:{background:"{primary.50}",focusBackground:"{primary.300}",color:"{primary.950}",focusColor:"{primary.950}"}}}}}:{semantic:{primary:t.palette,colorScheme:{light:{primary:{color:"{primary.500}",contrastColor:"#ffffff",hoverColor:"{primary.600}",activeColor:"{primary.700}"},highlight:{background:"{primary.50}",focusBackground:"{primary.100}",color:"{primary.700}",focusColor:"{primary.800}"}},dark:{primary:{color:"{primary.400}",contrastColor:"{surface.900}",hoverColor:"{primary.300}",activeColor:"{primary.200}"},highlight:{background:"color-mix(in srgb, {primary.400}, transparent 84%)",focusBackground:"color-mix(in srgb, {primary.400}, transparent 76%)",color:"rgba(255,255,255,.87)",focusColor:"rgba(255,255,255,.87)"}}}}}}updateColors(t,o,r){o==="primary"?this._layoutService.layoutConfig.update(i=>m(p({},i),{primary:r.name})):o==="surface"&&this._layoutService.layoutConfig.update(i=>m(p({},i),{surface:r.name})),this.applyTheme(o,r),t.stopPropagation()}applyTheme(t,o){t==="primary"?Yi(this.getPresetExt()):t==="surface"&&Ji(o.palette)}changeMenuTheme(t){this.menuTheme=t}changeTopbarTheme(t){this.topbarTheme=t}toggleConfigSidebar(){this._layoutService.layoutState.update(t=>m(p({},t),{configSidebarVisible:!t.configSidebarVisible}))}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=E({type:e,selectors:[["app-configurator"]],inputs:{simple:[2,"simple","simple",J]},decls:20,vars:7,consts:[["menu_theme_selector",""],["class","layout-config-button config-link","type","button",3,"click",4,"ngIf"],["position","right","styleClass","layout-config-sidebar w-80","header","Settings",3,"visibleChange","onHide","visible","transitionOptions"],[1,"flex","flex-col","gap-4"],[1,"text-lg","font-semibold"],[1,"pt-2","flex","gap-2","flex-wrap"],["type","button",1,"cursor-pointer","w-6","h-6","rounded-full","flex","flex-shrink-0","items-center","justify-center","p-0","outline-none","outline-offset-1",3,"title","ngClass","style"],[1,"flex","flex-col","gap-2"],["optionLabel","name","optionValue","value",3,"ngModelChange","ngModel","options","allowEmpty"],[4,"ngIf"],["type","button",1,"layout-config-button","config-link",3,"click"],[1,"pi","pi-cog"],["type","button",1,"cursor-pointer","w-6","h-6","rounded-full","flex","flex-shrink-0","items-center","justify-center","p-0","outline-none","outline-offset-1",3,"click","title","ngClass"],[1,"flex","flex-wrap","flex-col","gap-3"],[1,"flex"],[1,"flex","items-center","gap-2","w-1/2"],["name","menuMode","value","static",3,"ngModelChange","ngModel"],["for","static"],["name","menuMode","value","overlay",3,"ngModelChange","ngModel"],["for","overlay"],["name","menuMode","value","slim",3,"ngModelChange","ngModel"],["for","slim"],["name","menuMode","value","slim-plus","inputId","slim-plus",3,"ngModelChange","ngModel"],["for","slim-plus"],["name","menuMode","value","reveal",3,"ngModelChange","ngModel"],["for","reveal"],["name","menuMode","value","drawer","inputId","drawer",3,"ngModelChange","ngModel"],["for","drawer"],["name","menuMode","value","horizontal",3,"ngModelChange","ngModel"],["for","horizontal"],["name","menuProfilePosition","value","start",3,"ngModelChange","ngModel"],["for","start"],["name","menuProfilePosition","value","end",3,"ngModelChange","ngModel"],["for","end"],[4,"ngIf","ngIfElse"],["type","button",1,"cursor-pointer","w-6","h-6","rounded-full","flex","flex-shrink-0","items-center","justify-center","p-0","outline-none","outline-offset-1","shadow",3,"ngStyle"],["type","button",1,"cursor-pointer","w-6","h-6","rounded-full","flex","flex-shrink-0","items-center","justify-center","p-0","outline-none","outline-offset-1","shadow",3,"click","ngStyle"],["class","pi pi-check text-lg",3,"ngClass",4,"ngIf"],[1,"pi","pi-check","text-lg",3,"ngClass"]],template:function(o,r){o&1&&(b(0,Pu,2,0,"button",1),l(1,"p-drawer",2),Ie("visibleChange",function(n){return Se(r.visible,n)||(r.visible=n),n}),$("onHide",function(){return r._layoutService.hideConfigSidebar()}),l(2,"div",3)(3,"div")(4,"span",4),x(5,"Primary"),c(),l(6,"div",5),Ao(7,Vu,1,8,"button",6,Zs),c()(),l(9,"div")(10,"span",4),x(11,"Surface"),c(),l(12,"div",5),Ao(13,Hu,1,8,"button",6,Zs),c()(),l(15,"div",7)(16,"span",4),x(17,"Color Scheme"),c(),l(18,"p-selectbutton",8),Ie("ngModelChange",function(n){return Se(r.darkTheme,n)||(r.darkTheme=n),n}),c()(),b(19,Ku,62,11,"ng-container",9),c()()),o&2&&(a("ngIf",r.simple),d(),we("visible",r.visible),a("transitionOptions",".3s cubic-bezier(0, 0, 0.2, 1)"),d(6),Fo(r.primaryColors()),d(6),Fo(r.surfaces),d(5),we("ngModel",r.darkTheme),a("options",r.themeOptions)("allowEmpty",!1),d(),a("ngIf",!r.simple))},dependencies:[j,ie,ne,Ue,ht,un,pn,vn,hn,Qs,Nr,Gs,Cn,yn],encapsulation:2})};var Ut=class e{constructor(t,o,r){this.layoutService=t;this.renderer=o;this.router=r;this.overlayMenuOpenSubscription=this.layoutService.overlayOpen$.subscribe(()=>{this.menuOutsideClickListener||(this.menuOutsideClickListener=this.renderer.listen("document","click",i=>{!(this.appSidebar.appMenu.el.nativeElement.isSameNode(i.target)||this.appSidebar.appMenu.el.nativeElement.contains(i.target)||this.appTopbar.menuButton.nativeElement.isSameNode(i.target)||this.appTopbar.menuButton.nativeElement.contains(i.target))&&this.hideMenu()})),(this.layoutService.isSlim()||this.layoutService.isSlimPlus())&&!this.menuScrollListener&&(this.menuScrollListener=this.renderer.listen(this.appSidebar.appMenu.menuContainer.nativeElement,"scroll",i=>{this.layoutService.isDesktop()&&this.hideMenu()})),this.layoutService.layoutState().staticMenuMobileActive&&this.blockBodyScroll()}),this.router.events.pipe(ce(i=>i instanceof Co)).subscribe(()=>{this.hideMenu()})}overlayMenuOpenSubscription;menuOutsideClickListener;menuScrollListener;appSidebar;appTopbar;blockBodyScroll(){document.body.classList?document.body.classList.add("blocked-scroll"):document.body.className+=" blocked-scroll"}unblockBodyScroll(){document.body.classList?document.body.classList.remove("blocked-scroll"):document.body.className=document.body.className.replace(new RegExp("(^|\\b)"+"blocked-scroll".split(" ").join("|")+"(\\b|$)","gi")," ")}hideMenu(){this.layoutService.layoutState.update(t=>m(p({},t),{overlayMenuActive:!1,staticMenuMobileActive:!1,menuHoverActive:!1})),this.layoutService.reset(),this.menuOutsideClickListener&&(this.menuOutsideClickListener(),this.menuOutsideClickListener=null),this.menuScrollListener&&(this.menuScrollListener(),this.menuScrollListener=null),this.unblockBodyScroll()}containerClass=P(()=>{let t=this.layoutService.layoutConfig(),o=this.layoutService.layoutState();return{"layout-overlay":t.menuMode==="overlay","layout-static":t.menuMode==="static","layout-slim":t.menuMode==="slim","layout-slim-plus":t.menuMode==="slim-plus","layout-horizontal":t.menuMode==="horizontal","layout-reveal":t.menuMode==="reveal","layout-drawer":t.menuMode==="drawer","layout-sidebar-dark":t.darkTheme,"layout-static-inactive":o.staticMenuDesktopInactive&&t.menuMode==="static","layout-overlay-active":o.overlayMenuActive,"layout-mobile-active":o.staticMenuMobileActive,"layout-topbar-menu-active":o.topbarMenuActive,"layout-menu-profile-active":o.rightMenuActive,"layout-sidebar-active":o.sidebarActive,"layout-sidebar-anchored":o.anchored,[`layout-topbar-${t.topbarTheme}`]:!0,[`layout-menu-${t.menuTheme}`]:!0,[`layout-menu-profile-${t.menuProfilePosition}`]:!0}});ngOnDestroy(){this.overlayMenuOpenSubscription&&this.overlayMenuOpenSubscription.unsubscribe(),this.menuOutsideClickListener&&this.menuOutsideClickListener()}static \u0275fac=function(o){return new(o||e)(ue(me),ue(Ro),ue(pe))};static \u0275cmp=E({type:e,selectors:[["app-main-layout"]],viewQuery:function(o,r){if(o&1&&(H(tt,5),H(et,5)),o&2){let i;_(i=w())&&(r.appSidebar=i.first),_(i=w())&&(r.appTopbar=i.first)}},features:[Pe([Me])],decls:9,vars:1,consts:[[1,"layout-container",3,"ngClass"],["app-header",""],["app-sidebar",""],[1,"layout-content-wrapper"],["app-breadcrumb",""],[1,"layout-content"],["app-footer",""]],template:function(o,r){o&1&&(l(0,"div",0),g(1,"div",1)(2,"div",2),l(3,"div",3),g(4,"div",4),l(5,"div",5),g(6,"router-outlet"),c(),g(7,"div",6),c()(),g(8,"app-configurator")),o&2&&a("ngClass",r.containerClass())},dependencies:[j,ie,ae,st,et,Lt,tt,Vt,jt],encapsulation:2})};var Js=[{path:"",component:Ut,children:[{path:"users",data:{breadcrumb:"Usuarios"},loadChildren:()=>import("./chunk-F7DIFSPG.js").then(e=>e.usersRoutes)},{path:"company-360",data:{breadcrumb:"Compa\xF1\xEDa 360"},loadChildren:()=>import("./chunk-G6JPCRND.js").then(e=>e.company360Routes)}]},{path:"not-found",component:Ft},{path:"server-error",component:Dt},{path:"**",redirectTo:"not-found"}];var Gu={50:"#fbe4f0",100:"#f7c2de",200:"#f397c3",300:"#ef6da7",400:"#eb488f",500:"#D62974",600:"#b81e5a",700:"#a81e5a",800:"#9e2e5d",900:"#7d1b41",950:"#4a0b22"},el=Xi(Ht,{semantic:{colorScheme:{light:{surface:{0:"#ffffff",50:"{zinc.50}",100:"{zinc.100}",200:"{zinc.200}",300:"{zinc.300}",400:"{zinc.400}",500:"{zinc.500}",600:"{zinc.600}",700:"{zinc.700}",800:"{zinc.800}",900:"{zinc.900}",950:"{zinc.950}"}},dark:{surface:{0:"#ffffff",50:"{slate.50}",100:"{slate.100}",200:"{slate.200}",300:"{slate.300}",400:"{slate.400}",500:"{slate.500}",600:"{slate.600}",700:"{slate.700}",800:"{slate.800}",900:"{slate.900}",950:"{slate.950}"}}},primary:Gu}});var Wt=class e{constructor(t){this.httpClient=t}getDepartments(){return this.httpClient.get("https://api-colombia.com/api/v1/Department")}getCitiesByDepartment(t){return this.httpClient.get(`https://api-colombia.com/api/v1/Department/${t}/cities`)}getAllCities(){return this.httpClient.get("https://api-colombia.com/api/v1/City")}static \u0275fac=function(o){return new(o||e)(O(Je))};static \u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})};var Qt=class e{actions$=v(ro);departmentCityService=v(Wt);messageService=v(Me);loadDepartments$=R(()=>this.actions$.pipe(A(Qe.loadDepartments),oe(()=>this.departmentCityService.getDepartments().pipe(M(t=>Qe.loadDepartmentsSuccess({departments:t})),Q(t=>(this.messageService.add({severity:"error",summary:"Error",detail:"Error al cargar los departamentos"}),W(Qe.loadDepartmentsFailure({error:t.message}))))))));loadCities$=R(()=>this.actions$.pipe(A(Qe.loadCities),oe(({departmentId:t})=>this.departmentCityService.getCitiesByDepartment(t).pipe(M(o=>Qe.loadCitiesSuccess({cities:o})),Q(o=>(this.messageService.add({severity:"error",summary:"Error",detail:"Error al cargar las ciudades"}),W(Qe.loadCitiesFailure({error:o.message}))))))));loadDepartmentsSuccessToast$=R(()=>this.actions$.pipe(A(Qe.loadDepartmentsSuccess),q(()=>{this.messageService.add({severity:"success",summary:"\xC9xito",detail:"Departamentos cargados correctamente"})})),{dispatch:!1});loadCitiesSuccessToast$=R(()=>this.actions$.pipe(A(Qe.loadCitiesSuccess),q(()=>{this.messageService.add({severity:"success",summary:"\xC9xito",detail:"Ciudades cargadas correctamente"})})),{dispatch:!1});static \u0275fac=function(o){return new(o||e)};static \u0275prov=S({token:e,factory:e.\u0275fac})};var Bo=class e{_loading=Ne(!1);loading=this._loading.asReadonly();timer;show(){clearTimeout(this.timer),this._loading.set(!0)}hide(){this.timer=setTimeout(()=>{this._loading.set(!1)},1e3)}static \u0275fac=function(o){return new(o||e)};static \u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})};var qt=class e{constructor(t){this.loader=t}intercept(t,o){return this.loader.show(),o.handle(t).pipe(rr(()=>this.loader.hide()))}static \u0275fac=function(o){return new(o||e)(O(Bo))};static \u0275prov=S({token:e,factory:e.\u0275fac})};var Kt=class e{constructor(t){this.router=t}intercept(t,o){return o.handle(t).pipe(Q(r=>{if(r instanceof wi)switch(r.status){case 401:this.router.navigate(["/login"]);break;case 403:this.router.navigate(["/forbidden"]);break;case 404:this.router.navigate(["/not-found"]);break;case 0:this.router.navigate(["/server-error"]);break;case 500:default:this.router.navigate(["/server-error"]);break}return Gr(()=>r)}))}static \u0275fac=function(o){return new(o||e)(O(pe))};static \u0275prov=S({token:e,factory:e.\u0275fac})};var Gt=class e{constructor(t){this.http=t}baseUrl=`${G.apiUrl}company360/companies`;extractSubdomain(){let o=window.location.hostname.split(".");return o.length<3?"dev":o[0]}loadCompanies(){return G.useMockApi?this.http.get("data/company360/companies.json"):this.http.get(this.baseUrl)}loadCompanyById(t){return G.useMockApi?this.http.get("data/company360/companies.json").pipe(M(o=>{let r=o.data.find(i=>i.id===t);if(!r)throw new Error(`Company with ID ${t} not found`);return m(p({},o),{data:r,message:"Company info fetched"})})):this.http.get(`${this.baseUrl}/${t}`)}loadCompany(){if(G.useMockApi)return this.http.get("data/company360/company.json");let t=this.extractSubdomain();return this.http.get(`${this.baseUrl}/${t}`)}createCompany(t){if(G.useMockApi){let o=m(p({},t),{id:Date.now()});return this.http.get("data/company360/companies.json").pipe(M(r=>m(p({},r),{data:o,message:"Company created successfully"})))}return this.http.post(this.baseUrl,t)}updateCompany(t){return G.useMockApi?this.http.get("data/company360/companies.json").pipe(M(o=>m(p({},o),{data:t,message:"Company updated successfully"}))):this.http.put(`${this.baseUrl}/${t.id}`,t)}patchCompany(t,o){return G.useMockApi?this.http.get("data/company360/companies.json").pipe(M(r=>{let i=r.data.find(s=>s.id===t);if(!i)throw new Error(`Company with ID ${t} not found`);let n=p(p({},i),o);return m(p({},r),{data:n,message:"Company updated successfully"})})):this.http.patch(`${this.baseUrl}/${t}`,o)}deleteCompany(t){return G.useMockApi?this.http.get("data/company360/companies.json").pipe(M(o=>{if(!o.data.find(i=>i.id===t))throw new Error(`Company with ID ${t} not found`);return{success:!0,message:"Company deleted successfully",data:void 0,traceId:o.traceId}})):this.http.delete(`${this.baseUrl}/${t}`)}updateCompanyBySubdomain(t){let o=this.extractSubdomain();return G.useMockApi?this.http.put("data/company360/company.json",t):this.http.put(`${this.baseUrl}/${o}`,t)}static \u0275fac=function(o){return new(o||e)(O(Je))};static \u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})};var Zt=class e{constructor(t){this.http=t}baseUrl=`${G.apiUrl}settings/users`;getUsers(){return G.useMockApi?this.http.get("data/settings/users.json"):this.http.get(this.baseUrl)}getUser(t){return G.useMockApi?this.http.get("data/settings/users.json").pipe(M(o=>m(p({},o),{data:o.data.find(r=>r.id===t)}))):this.http.get(`${this.baseUrl}/${t}`)}createUser(t){return G.useMockApi?W({success:!0,message:"Mock: usuario creado",data:t,traceId:"mock-create"}):this.http.post(this.baseUrl,t)}updateUser(t,o){return G.useMockApi?W({success:!0,message:"Mock: usuario actualizado",data:m(p({},o),{id:t}),traceId:"mock-update"}):this.http.put(`${this.baseUrl}/${t}`,o)}updateUserStatus(t,o){return G.useMockApi?this.http.get("data/settings/users.json").pipe(M(r=>{let i=r.data.find(n=>n.id===t);return i&&(i.status=o),{success:!0,message:"Mock: estado actualizado",data:i,traceId:"mock-update-status"}})):this.http.patch(`${this.baseUrl}/${t}/status`,{status:o})}deleteUser(t){return G.useMockApi?W({success:!0,message:"Mock: usuario eliminado",data:void 0,traceId:"mock-delete"}):this.http.delete(`${this.baseUrl}/${t}`)}searchUsers(t){return G.useMockApi?this.http.get("data/settings/users.json").pipe(M(o=>m(p({},o),{data:o.data.filter(r=>r.names?.toLowerCase().includes(t.toLowerCase())||r.email?.toLowerCase().includes(t.toLowerCase()))}))):this.http.get(this.baseUrl,{params:{search:t}})}static \u0275fac=function(o){return new(o||e)(O(Je))};static \u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"})};var Xt=class e{actions$=v(ro);userService=v(Zt);messageService=v(Me);initUsers$=R(()=>this.actions$.pipe(A(mn),oe(()=>this.userService.getUsers().pipe(M(t=>vr({users:t.data})),Q(t=>W(yr({error:t})))))));loadUser$=R(()=>this.actions$.pipe(A(vt),oe(({id:t})=>this.userService.getUser(t).pipe(M(o=>Cr({user:o.data})),Q(o=>W(kr({error:o})))))));updateUser$=R(()=>this.actions$.pipe(A(fn),oe(({id:t,user:o})=>this.userService.updateUser(t,o).pipe(M(r=>xr({user:r.data})),Q(r=>W(_r({error:r})))))));loadUsersSuccessToast$=R(()=>this.actions$.pipe(A(vr),q(()=>{this.messageService.add({severity:"success",summary:"\xC9xito",detail:"Usuarios cargados correctamente"})})),{dispatch:!1});loadUserSuccessToast$=R(()=>this.actions$.pipe(A(Cr),q(()=>{this.messageService.add({severity:"success",summary:"\xC9xito",detail:"Usuario cargado correctamente"})})),{dispatch:!1});updateUserSuccessToast$=R(()=>this.actions$.pipe(A(xr),q(()=>{this.messageService.add({severity:"success",summary:"\xC9xito",detail:"Usuario actualizado correctamente"})})),{dispatch:!1});loadUsersFailureToast$=R(()=>this.actions$.pipe(A(yr),q(({error:t})=>{this.messageService.add({severity:"error",summary:"Error",detail:t||"Error al cargar los usuarios"})})),{dispatch:!1});loadUserFailureToast$=R(()=>this.actions$.pipe(A(kr),q(({error:t})=>{this.messageService.add({severity:"error",summary:"Error",detail:t||"Error al cargar el usuario"})})),{dispatch:!1});updateUserFailureToast$=R(()=>this.actions$.pipe(A(_r),q(({error:t})=>{this.messageService.add({severity:"error",summary:"Error",detail:t||"Error al actualizar el usuario"})})),{dispatch:!1});static \u0275fac=function(o){return new(o||e)};static \u0275prov=S({token:e,factory:e.\u0275fac})};var ol=[Xt];var tl=Oi({users:wr});var Xu={companies:[],selectedCompany:null,loading:!1,error:null},il=pt(Xu,N(yt,e=>m(p({},e),{loading:!0,error:null})),N(Po,(e,{companies:t})=>m(p({},e),{companies:t,loading:!1})),N(Vo,(e,{error:t})=>m(p({},e),{loading:!1,error:t})),N(Ct,e=>m(p({},e),{loading:!0,error:null})),N(kt,(e,{company:t})=>m(p({},e),{selectedCompany:t,loading:!1})),N(Ho,(e,{error:t})=>m(p({},e),{loading:!1,error:t})),N(xt,e=>m(p({},e),{loading:!0,error:null})),N(_t,(e,{company:t})=>m(p({},e),{selectedCompany:t,loading:!1})),N(jo,(e,{error:t})=>m(p({},e),{loading:!1,error:t})),N(wt,e=>m(p({},e),{loading:!0,error:null})),N(No,(e,{company:t})=>m(p({},e),{companies:[...e.companies,t],selectedCompany:t,loading:!1})),N(Uo,(e,{error:t})=>m(p({},e),{loading:!1,error:t})),N(St,e=>m(p({},e),{loading:!0,error:null})),N(Wo,(e,{company:t})=>m(p({},e),{companies:e.companies.map(o=>o.id===t.id?t:o),selectedCompany:t,loading:!1})),N(Qo,(e,{error:t})=>m(p({},e),{loading:!1,error:t})),N(It,e=>m(p({},e),{loading:!0,error:null})),N(qo,(e,{company:t})=>m(p({},e),{companies:e.companies.map(o=>o.id===t.id?t:o),selectedCompany:t,loading:!1})),N(Ko,(e,{error:t})=>m(p({},e),{loading:!1,error:t})),N(Mt,e=>m(p({},e),{loading:!0,error:null})),N(Go,(e,{id:t})=>m(p({},e),{companies:e.companies.filter(o=>o.id!==t),selectedCompany:e.selectedCompany?.id===t?null:e.selectedCompany,loading:!1})),N(Zo,(e,{error:t})=>m(p({},e),{loading:!1,error:t})));var Yt=class e{actions$=v(ro);companyService=v(Gt);messageService=v(Me);loadCompanies$=R(()=>this.actions$.pipe(A(yt),oe(()=>this.companyService.loadCompanies().pipe(M(t=>Po({companies:t.data})),Q(t=>W(Vo({error:t})))))));loadCompany$=R(()=>this.actions$.pipe(A(Ct),oe(()=>this.companyService.loadCompany().pipe(M(t=>kt({company:t.data})),Q(t=>W(Ho({error:t})))))));loadCompanyById$=R(()=>this.actions$.pipe(A(xt),oe(({id:t})=>this.companyService.loadCompanyById(t).pipe(M(o=>_t({company:o.data})),Q(o=>W(jo({error:o})))))));createCompany$=R(()=>this.actions$.pipe(A(wt),oe(({company:t})=>this.companyService.createCompany(t).pipe(M(o=>No({company:o.data})),Q(o=>W(Uo({error:o})))))));updateCompany$=R(()=>this.actions$.pipe(A(St),oe(({company:t})=>this.companyService.updateCompany(t).pipe(M(o=>Wo({company:o.data})),Q(o=>W(Qo({error:o})))))));patchCompany$=R(()=>this.actions$.pipe(A(It),oe(({id:t,changes:o})=>this.companyService.patchCompany(t,o).pipe(M(r=>qo({company:r.data})),Q(r=>W(Ko({error:r})))))));deleteCompany$=R(()=>this.actions$.pipe(A(Mt),oe(({id:t})=>this.companyService.deleteCompany(t).pipe(M(()=>Go({id:t})),Q(o=>W(Zo({error:o})))))));loadCompaniesSuccessToast$=R(()=>this.actions$.pipe(A(Po),q(({companies:t})=>{this.messageService.add({severity:"success",summary:"\xC9xito",detail:`${t.length} compa\xF1\xEDas cargadas correctamente`,life:3e3})})),{dispatch:!1});createCompanySuccessToast$=R(()=>this.actions$.pipe(A(No),q(()=>{this.messageService.add({severity:"success",summary:"Creado",detail:"Compa\xF1\xEDa creada correctamente",life:3e3})})),{dispatch:!1});updateCompanySuccessToast$=R(()=>this.actions$.pipe(A(Wo),q(()=>{this.messageService.add({severity:"success",summary:"Actualizado",detail:"Compa\xF1\xEDa actualizada correctamente",life:3e3})})),{dispatch:!1});patchCompanySuccessToast$=R(()=>this.actions$.pipe(A(qo),q(()=>{this.messageService.add({severity:"success",summary:"Actualizado",detail:"Compa\xF1\xEDa actualizada correctamente",life:3e3})})),{dispatch:!1});deleteCompanySuccessToast$=R(()=>this.actions$.pipe(A(Go),q(()=>{this.messageService.add({severity:"success",summary:"Eliminado",detail:"Compa\xF1\xEDa eliminada correctamente",life:3e3})})),{dispatch:!1});loadCompaniesFailureToast$=R(()=>this.actions$.pipe(A(Vo),q(({error:t})=>{this.messageService.add({severity:"error",summary:"Error",detail:t?.message||"Error al cargar las compa\xF1\xEDas",life:3e3})})),{dispatch:!1});loadCompanyFailureToast$=R(()=>this.actions$.pipe(A(Ho,jo),q(({error:t})=>{this.messageService.add({severity:"error",summary:"Error",detail:t?.message||"Error al cargar la compa\xF1\xEDa",life:3e3})})),{dispatch:!1});createCompanyFailureToast$=R(()=>this.actions$.pipe(A(Uo),q(({error:t})=>{this.messageService.add({severity:"error",summary:"Error",detail:t?.message||"Error al crear la compa\xF1\xEDa",life:3e3})})),{dispatch:!1});updateCompanyFailureToast$=R(()=>this.actions$.pipe(A(Qo,Ko),q(({error:t})=>{this.messageService.add({severity:"error",summary:"Error",detail:t?.message||"Error al actualizar la compa\xF1\xEDa",life:3e3})})),{dispatch:!1});deleteCompanyFailureToast$=R(()=>this.actions$.pipe(A(Zo),q(({error:t})=>{this.messageService.add({severity:"error",summary:"Error",detail:t?.message||"Error al eliminar la compa\xF1\xEDa",life:3e3})})),{dispatch:!1});static \u0275fac=function(o){return new(o||e)};static \u0275prov=S({token:e,factory:e.\u0275fac})};var nl={[_n]:il},al=[Yt];var sl={providers:[Si(Ii()),{provide:lr,useClass:qt,multi:!0},{provide:lr,useClass:Kt,multi:!0},Sn(),Mi(Js,Bi({anchorScrolling:"enabled",scrollPositionRestoration:"enabled"}),Ei(),Ti()),Me,Ni(p({departmentCity:wn,menu:jr,settings:tl},nl),{runtimeChecks:{strictStateImmutability:!0,strictActionImmutability:!0,strictActionTypeUniqueness:!0,strictStateSerializability:!0,strictActionSerializability:!0}}),Tn([Qt,Jo,...ol,...al]),Jn({maxAge:25,logOnly:!Ci(),traceLimit:25,autoPause:!0,trace:!0,connectInZone:!0}),en({ripple:!0,inputStyle:"filled",theme:{preset:el,options:{darkModeSelector:".app-dark"}}})]};function Yu(e,t){e&1&&(l(0,"div",1),g(1,"p-progressSpinner",2),c())}var Jt=class e{loader=v(Bo);loading=P(()=>this.loader.loading());static \u0275fac=function(o){return new(o||e)};static \u0275cmp=E({type:e,selectors:[["app-loader"]],decls:1,vars:1,consts:[["class","fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center",4,"ngIf"],[1,"fixed","inset-0","z-[9999]","bg-black","bg-opacity-40","flex","items-center","justify-center"],["strokeWidth","4","styleClass","w-12 h-12"]],template:function(o,r){o&1&&b(0,Yu,2,0,"div",0),o&2&&a("ngIf",r.loading())},dependencies:[j,ne,xn,kn],encapsulation:2})};var er=class e{title="quanta-administrador-frontend";static \u0275fac=function(o){return new(o||e)};static \u0275cmp=E({type:e,selectors:[["app-root"]],decls:2,vars:0,template:function(o,r){o&1&&g(0,"app-loader")(1,"router-outlet")},dependencies:[st,Jt],encapsulation:2})};_i(er,sl).catch(e=>console.error(e));
