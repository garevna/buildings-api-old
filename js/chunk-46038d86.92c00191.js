(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46038d86"],{"169a":function(e,t,n){"use strict";n("7db0"),n("caad"),n("45fc"),n("a9e3"),n("2532"),n("498a");var i=n("5530"),a=n("2909"),s=n("ade3"),o=(n("368e"),n("480e")),r=n("4ad4"),d=n("b848"),l=n("75eb"),c=(n("3c93"),n("a9ad")),u=n("7560"),h=n("f2e7"),v=n("58df"),m=Object(v["a"])(c["a"],u["a"],h["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim:function(){var e=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",e)},classes:function(){return Object(i["a"])({"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive},this.themeClasses)},computedOpacity:function(){return Number(this.isActive?this.opacity:0)},styles:function(){return{zIndex:this.zIndex}}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render:function(e){var t=[this.__scrim];return this.isActive&&t.push(this.genContent()),e("div",{staticClass:"v-overlay",class:this.classes,style:this.styles},t)}}),p=m,f=n("80d2"),b=n("a026"),y=b["a"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data:function(){return{animationFrame:0,overlay:null}},watch:{hideOverlay:function(e){this.isActive&&(e?this.removeOverlay():this.genOverlay())}},beforeDestroy:function(){this.removeOverlay()},methods:{createOverlay:function(){var e=new p({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});e.$mount();var t=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");t&&t.insertBefore(e.$el,t.firstChild),this.overlay=e},genOverlay:function(){var e=this;if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((function(){e.overlay&&(void 0!==e.activeZIndex?e.overlay.zIndex=String(e.activeZIndex-1):e.$el&&(e.overlay.zIndex=Object(f["u"])(e.$el)),e.overlay.value=!0)})),!0},removeOverlay:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.overlay&&(Object(f["a"])(this.overlay.$el,"transitionend",(function(){e.overlay&&e.overlay.$el&&e.overlay.$el.parentNode&&!e.overlay.value&&(e.overlay.$el.parentNode.removeChild(e.overlay.$el),e.overlay.$destroy(),e.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),t&&this.showScroll()},scrollListener:function(e){if("keydown"===e.type){if(["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)||e.target.isContentEditable)return;var t=[f["y"].up,f["y"].pageup],n=[f["y"].down,f["y"].pagedown];if(t.includes(e.keyCode))e.deltaY=-1;else{if(!n.includes(e.keyCode))return;e.deltaY=1}}(e.target===this.overlay||"keydown"!==e.type&&e.target===document.body||this.checkPath(e))&&e.preventDefault()},hasScrollbar:function(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;var t=window.getComputedStyle(e);return["auto","scroll"].includes(t.overflowY)&&e.scrollHeight>e.clientHeight},shouldScroll:function(e,t){return 0===e.scrollTop&&t<0||e.scrollTop+e.clientHeight===e.scrollHeight&&t>0},isInside:function(e,t){return e===t||null!==e&&e!==document.body&&this.isInside(e.parentNode,t)},checkPath:function(e){var t=e.path||this.composedPath(e),n=e.deltaY;if("keydown"===e.type&&t[0]===document.body){var i=this.$refs.dialog,a=window.getSelection().anchorNode;return!(i&&this.hasScrollbar(i)&&this.isInside(a,i))||this.shouldScroll(i,n)}for(var s=0;s<t.length;s++){var o=t[s];if(o===document)return!0;if(o===document.documentElement)return!0;if(o===this.$refs.content)return!0;if(this.hasScrollbar(o))return this.shouldScroll(o,n)}return!0},composedPath:function(e){if(e.composedPath)return e.composedPath();var t=[],n=e.target;while(n){if(t.push(n),"HTML"===n.tagName)return t.push(document),t.push(window),t;n=n.parentElement}return t},hideScroll:function(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):(Object(f["b"])(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll:function(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}}),g=n("e4d3"),w=n("21be"),C=n("a293"),I=n("d9bd"),k=Object(v["a"])(r["a"],d["a"],l["a"],y,g["a"],w["a"],h["a"]);t["a"]=k.extend({name:"v-dialog",directives:{ClickOutside:C["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200}},computed:{classes:function(){var e;return e={},Object(s["a"])(e,"v-dialog ".concat(this.contentClass).trim(),!0),Object(s["a"])(e,"v-dialog--active",this.isActive),Object(s["a"])(e,"v-dialog--persistent",this.persistent),Object(s["a"])(e,"v-dialog--fullscreen",this.fullscreen),Object(s["a"])(e,"v-dialog--scrollable",this.scrollable),Object(s["a"])(e,"v-dialog--animated",this.animate),e},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(e){e?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(e){this.isActive&&(e?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(I["e"])("full-width",this)},beforeMount:function(){var e=this;this.$nextTick((function(){e.isBooted=e.isActive,e.isActive&&e.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var e=this;this.animate=!1,this.$nextTick((function(){e.animate=!0,window.clearTimeout(e.animateTimeout),e.animateTimeout=window.setTimeout((function(){return e.animate=!1}),150)}))},closeConditional:function(e){var t=e.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(t)||this.overlay&&t&&!this.overlay.$el.contains(t))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):y.options.methods.hideScroll.call(this)},show:function(){var e=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){e.$refs.content.focus(),e.bind()}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(e){this.$emit("click:outside",e),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(e){if(e.keyCode===f["y"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var t=this.getActivator();this.$nextTick((function(){return t&&t.focus()}))}this.$emit("keydown",e)},onFocusin:function(e){if(e&&this.retainFocus){var t=e.target;if(t&&![document,this.$refs.content].includes(t)&&!this.$refs.content.contains(t)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(e){return e.contains(t)}))){var n=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),i=Object(a["a"])(n).find((function(e){return!e.hasAttribute("disabled")}));i&&i.focus()}}},genContent:function(){var e=this;return this.showLazyContent((function(){return[e.$createElement(o["a"],{props:{root:!0,light:e.light,dark:e.dark}},[e.$createElement("div",{class:e.contentClasses,attrs:Object(i["a"])({role:"document",tabindex:e.isActive?0:void 0},e.getScopeIdAttrs()),on:{keydown:e.onKeydown},style:{zIndex:e.activeZIndex},ref:"content"},[e.genTransition()])])]}))},genTransition:function(){var e=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[e]):e},genInnerContent:function(){var e={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(e.style=Object(i["a"])(Object(i["a"])({},e.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(f["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(f["g"])(this.width)})),this.$createElement("div",e,this.getContentSlot())}},render:function(e){return e("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},2972:function(e,t,n){"use strict";var i=n("2c8e"),a=n.n(i);a.a},"2c8e":function(e,t,n){},"368e":function(e,t,n){},"3c93":function(e,t,n){},"54c8":function(e,t,n){"use strict";n.r(t),t["default"]={buildingName:"",buildingType:"dwelling=,type=,category=,field=",status:"Footprint",coordinates:[0,0],address:"",addressComponents:{number:"",street:"",city:"",state:"",postCode:"",admin:""},footprint:!1,distanceFromFootprint:0,owner:{name:"",address:"",phone:"",email:"",contactPerson:""},management:{name:"",address:"",phone:"",email:"",contactPerson:""},customerInstallApprovalRequired:!0,inductionRequired:!0,difficultyLevel:{leadInInstallation:0,backboneInstallation:0,customerInstallation:0},infrastructure:{type:"",leadIn:{planned:!1,installed:!1},backbone:{planned:!1,installed:!1},customerAccessCabling:{planned:!1,installed:!1},gPOinMDF:{exist:!1,planned:!1,installed:!1},uPSinMDF:{planned:!1,installed:!1},gPOinRisers:{exist:!1,planned:!1,installed:!1},uPSinRisers:{planned:!1,installed:!1}},files:{design:{},laanInspect:{},laanInstall:{},scope:{},photos:[{}],approoval:{_id:"",link:"",name:""}},numberOfLevels:0,numberOfDwellings:0,avgFloorHeight:0,levels:[{plannedRouter:!1,plannedSplicingBox:!1,plannedSplitter:!1,plannedOFTU:!1,plannedRack:!1,installedRouter:!1,installedSplicingBox:!1,installedSplitter:!1,installedOFTU:!1,installedRack:!1,routerId:""}]}},"99d9":function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return d}));var i=n("b0af"),a=n("80d2"),s=Object(a["i"])("v-card__actions"),o=Object(a["i"])("v-card__subtitle"),r=Object(a["i"])("v-card__text"),d=Object(a["i"])("v-card__title");i["a"]},bd37:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{"max-width":"800px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",{staticClass:"pa-4",attrs:{flat:""}},[n("v-card-title",[n("h4",[e._v(e._s(e.address))])]),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.$emit("update:opened",!1)}}},[n("v-icon",[e._v("mdi-close")])],1)],1),n("v-card-text",[n("table",{attrs:{with:"100%"}},[n("tbody",[n("tr",[n("td",{staticStyle:{width:"140px"}},[n("v-text-field",{attrs:{label:"Street number*",placeholder:"Number",color:"#09b","prepend-inner-icon":"$marker",outlined:""},model:{value:e.editedItem.addressComponents.number,callback:function(t){e.$set(e.editedItem.addressComponents,"number",t)},expression:"editedItem.addressComponents.number"}})],1),n("td",{attrs:{colspan:"2"}},[n("v-text-field",{attrs:{label:"Street name*",placeholder:"Name",color:"#09b","prepend-inner-icon":"$marker",outlined:""},model:{value:e.editedItem.addressComponents.street,callback:function(t){e.$set(e.editedItem.addressComponents,"street",t)},expression:"editedItem.addressComponents.street"}})],1)]),n("tr",[n("td",{attrs:{colspan:"3"}},[n("v-text-field",{attrs:{label:"City (optional)",color:"#09b",outlined:""},model:{value:e.editedItem.addressComponents.city,callback:function(t){e.$set(e.editedItem.addressComponents,"city",t)},expression:"editedItem.addressComponents.city"}})],1)]),n("tr",[n("td",[n("v-text-field",{attrs:{label:"State*",placeholder:"VIC",color:"#09b","prepend-inner-icon":"$marker",outlined:""},model:{value:e.editedItem.addressComponents.state,callback:function(t){e.$set(e.editedItem.addressComponents,"state",t)},expression:"editedItem.addressComponents.state"}})],1),n("td",{staticStyle:{width:"140px"}},[n("v-text-field",{attrs:{label:"Postal code*",placeholder:"3182",color:"#09b","prepend-inner-icon":"$marker",outlined:""},model:{value:e.editedItem.addressComponents.postCode,callback:function(t){e.$set(e.editedItem.addressComponents,"postCode",t)},expression:"editedItem.addressComponents.postCode"}})],1),n("td")]),n("tr",[n("td",{attrs:{colspan:"3"}},[n("v-text-field",{attrs:{label:"Building Name (optional)",color:"#09b",outlined:""},model:{value:e.editedItem.buildingName,callback:function(t){e.$set(e.editedItem,"buildingName",t)},expression:"editedItem.buildingName"}})],1)])])])]),n("v-card-actions",[n("v-spacer"),e.addressReady?n("v-btn",{attrs:{dark:"",color:"#09b"},on:{click:e.validateAddress}},[e._v(" Validate address "),n("v-icon",{attrs:{right:"",dark:""}},[e._v(" $diagnostics ")])],1):e._e()],1),e.addressReady?n("v-card-text",[n("h5",[e._v("Coordinates")]),n("table",[n("thead",[n("tr",[n("th",[e._v("Lat")]),n("th",[e._v("Lng")])])]),n("tbody",[n("tr",[n("td",[n("p",[e._v(e._s(e.editedItem.coordinates[1]))])]),n("td",[e._v(e._s(e.editedItem.coordinates[0]))])])])])]):e._e(),e.editedItem.coordinates[0]?n("v-card-text",[n("v-select",{attrs:{items:e.$buildingTypes,label:"Status",outlined:""},model:{value:e.editedItem.status,callback:function(t){e.$set(e.editedItem,"status",t)},expression:"editedItem.status"}})],1):e._e(),n("v-card-actions",[n("v-spacer"),e.canSave?n("v-btn",{attrs:{dark:"",color:"#09b"},on:{click:e.saveCallback}},[e._v(" Save "),n("v-icon",{attrs:{right:"",dark:""}},[e._v(" $save ")])],1):e._e()],1)],1)],1)},a=[],s=(n("99af"),n("96cf"),n("1da1")),o={name:"EditBuildingListItem",props:["opened","save"],data:function(){return{editedItem:n("54c8").default,canSave:!1}},computed:{addressReady:function(){return this.editedItem.addressComponents.postCode&&this.editedItem.addressComponents.state&&this.editedItem.addressComponents.street&&this.editedItem.addressComponents.number},address:function(){var e=this.editedItem.addressComponents,t=e.number,n=void 0===t?"":t,i=e.street,a=void 0===i?"":i,s=e.city,o=void 0===s?"":s,r=e.state,d=void 0===r?"":r,l=e.postCode,c=void 0===l?"":l;return"".concat(n," ").concat(a,", ").concat(o," ").concat(d," ").concat(c)},dialog:{get:function(){return this.opened&&this.editedItem},set:function(e){this.$emit("update:opened",e)}},coordinates:{get:function(){return this.editedItem.coordinates},set:function(e){Object.assign(this.editedItem,{coordinates:e})}}},watch:{opened:function(e){this.editedItem=n("54c8").default}},methods:{validateAddress:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e._validateAddress(e.address);case 3:n=t.sent,Object.assign(e.editedItem,{coordinates:n.formattedCoordinates,addressComponents:n.properties,address:n.formattedAddress}),e.canSave=!0,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.warn("ADDRESS ERROR: ",t.t0),e.canSave=!1;case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},saveCallback:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return localStorage.setItemByName("selectedBuilding",e.editedItem),t.next=3,e._createNewBuilding(e.editedItem);case 3:n=t.sent,console.log("New building created: ",n),localStorage.setItemByName("selectedBuilding",Object.assign(e.editedItem,{_id:n})),e.$emit("update:save",!0),e.$emit("update:opened",!1);case 8:case"end":return t.stop()}}),t)})))()}}},r=o,d=(n("2972"),n("2877")),l=n("6544"),c=n.n(l),u=n("8336"),h=n("b0af"),v=n("99d9"),m=n("169a"),p=n("132d"),f=n("b974"),b=n("2fa4"),y=n("8654"),g=Object(d["a"])(r,i,a,!1,null,"03066d02",null);t["default"]=g.exports;c()(g,{VBtn:u["a"],VCard:h["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:v["c"],VDialog:m["a"],VIcon:p["a"],VSelect:f["a"],VSpacer:b["a"],VTextField:y["a"]})}}]);
//# sourceMappingURL=chunk-46038d86.92c00191.js.map