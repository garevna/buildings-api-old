(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e546d"],{9495:function(t,e,i){"use strict";i.r(e);var d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{attrs:{flat:""}},[i("table",[i("tbody",[i("tr",[i("td",[i("v-text-field",{attrs:{label:"Postal code",outlined:""},model:{value:t.postCode,callback:function(e){t.postCode=e},expression:"postCode"}})],1),i("td",[i("v-text-field",{attrs:{label:"State",outlined:""},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}})],1),i("td",[i("v-text-field",{attrs:{label:"City",outlined:""},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}})],1),i("td",[i("v-text-field",{attrs:{label:"Street name",outlined:""},model:{value:t.street,callback:function(e){t.street=e},expression:"street"}})],1),i("td",[i("v-text-field",{attrs:{label:"Street number",outlined:""},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1),i("td",[i("v-text-field",{attrs:{label:"Building Name",outlined:""},model:{value:t.buildingName,callback:function(e){t.buildingName=e},expression:"buildingName"}})],1),i("td",[i("v-select",{attrs:{items:t.$buildingTypes,label:"Status",outlined:""},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}})],1),i("td")])])])])},n=[],s=i("ade3"),a={name:"BuildingListItem",props:["editedItem","save","buildingId"],data:function(){return{selectedBuilding:null}},computed:{postCode:{get:function(){return this.editedItem.postCode},set:function(t){this.updateAddressComponents("postCode",t)}},state:{get:function(){return this.editedItem.state},set:function(t){this.updateAddressComponents("state",t)}},city:{get:function(){return this.editedItem.city},set:function(t){this.updateAddressComponents("city",t)}},street:{get:function(){return this.editedItem.street},set:function(t){this.updateAddressComponents("street",t)}},number:{get:function(){return this.editedItem.number},set:function(t){this.updateAddressComponents("number",t)}},buildingName:{get:function(){return this.editedItem.buildingName},set:function(t){this.updateBuildingData("buildingName",t)}},status:{get:function(){return this.editedItem.status},set:function(t){this.updateBuildingData("status",t)}}},methods:{updateAddressComponents:function(t,e){var i=localStorage.getItemByName("selectedBuilding");i.addressComponents[t]=e,localStorage.setItemByName("selectedBuilding",i),this.$emit("update:editedItem",Object.assign(this.editedItem,Object(s["a"])({},t,e)))},updateBuildingData:function(t,e){var i=localStorage.getItemByName("selectedBuilding");i[t]=e,localStorage.setItemByName("selectedBuilding",i),this.$emit("update:editedItem",Object.assign(this.editedItem,Object(s["a"])({},t,e)))},saveCallback:function(){this.$emit("update:save",!0)}},watch:{"editedItem._id":{immediate:!0,handler:function(t){this.selectedBuilding=t,this.$emit("update:buildingId",t)}}},mounted:function(){var t=this;this._getBuildingDetails(this.editedItem._id).then((function(e){t.selectedBuildingData=e,localStorage.setItemByName("selectedBuilding",t.selectedBuildingData),t.$emit("update:buildingId",t.selectedBuildingData._id)}))}},l=a,u=i("2877"),o=i("6544"),c=i.n(o),r=i("b0af"),m=i("b974"),p=i("8654"),b=Object(u["a"])(l,d,n,!1,null,null,null);e["default"]=b.exports;c()(b,{VCard:r["a"],VSelect:m["a"],VTextField:p["a"]})}}]);
//# sourceMappingURL=chunk-2d0e546d.fadf35eb.js.map