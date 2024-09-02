sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/Sorter","sap/ui/model/FilterOperator","sap/m/GroupHeaderListItem","sap/ui/Device","sap/ui/core/Fragment","../model/formatter","sap/viz/ui5/data/FlattenedDataset"],function(e,t,i,s,r,a,o,n,l,u){"use strict";return e.extend("bsx.usageanalytics.controller.List",{formatter:l,_PastMonths:function(e,t){e.setMonth(e.getMonth()+t);return e},_PastWeek:function(e,t){e.setDate(e.getDate()+t);return e},onInit:function(){if(sap.ui.Device.system.tablet){this.getView().byId("browserCell").addStyleClass("flex")}this.getView().byId("dynamicPageId").setBusy(true);var e=new Date;var t=this._PastMonths(new Date,-1);var i=this._PastWeek(new Date,-7);var s=e.getDate().toString();var r=(e.getMonth()+1).toString();var a=e.getFullYear().toString();if(s<10){s="0"+s}if(r<10){r="0"+r}var o=t.getDate().toString();var n=(t.getMonth()+1).toString();var l=t.getFullYear().toString();if(o<10){o="0"+o}if(n<10){n="0"+n}this.getView().byId("dateTo").setValue((a+r+s).toString());this.getView().byId("dateFrom").setValue((l+n+o).toString());this.reqTypeColors=["#5899db","#e8743b","#1aaa79","#3caea3","#173f5f","#D06957","#EF5030","#184b72","#297971","#143753"];this.req2TypeColors=["#7caee0","#eb9069","#EF5030","#3caea3","#173f5f","#D06957","#EF5030","#184b72","#297971","#143753"];this.req3TypeColors=["red","green"];var u=sap.ui.core.Component.getOwnerIdFor(this.getView());this._oComponent=sap.ui.component(u);this.onDataFetch()},onDataFetch:function(){this.getView().byId("iconTabBar").setSelectedKey("overview");var e=this.getView().byId("dateFrom").getValue();var i=this.getView().byId("dateTo").getValue();var s=e.toString().split("-")[0]+e.toString().split("-")[1]+e.toString().split("-")[2];var r=i.toString().split("-")[0]+i.toString().split("-")[1]+i.toString().split("-")[2];var a=this.getOwnerComponent().getManifestEntry("/sap.app/id");var o=a.replaceAll(".","/");var n=jQuery.sap.getModulePath(o);var l=this;$.ajax({url:n+"/sap/opu/odata/sap/ZBSX_TRACKAPPUSAGE_SRV/AppUsageSet?$filter=EDate ge '"+s+"' and EDate le '"+r+"'",type:"GET",contentType:"application/json",dataType:"json",async:true,success:function(e,i){var s=[];var r=[];var a=[];e.userCount=[];e.appCount=[];e.deviceCount=[];e.browserCount=[];e.systemCount=[];for(var o=0;o<e.d.results.length;o++){var n=e.d.results[o].Appname.split("_");var u=n.join(" ");e.d.results[o].Appname=u;if(e.d.results[o].Device===" Desktop"){e.d.results[o].Desktop=1;e.d.results[o].Tablet=0;e.d.results[o].Phone=0}if(e.d.results[o].Device===" Tablet"){e.d.results[o].Desktop=0;e.d.results[o].Tablet=1;e.d.results[o].Phone=0}if(e.d.results[o].Device===" Phone"){e.d.results[o].Desktop=0;e.d.results[o].Tablet=0;e.d.results[o].Phone=1}if(e.d.results[o].Device===""){e.d.results[o].Desktop=0;e.d.results[o].Tablet=0;e.d.results[o].Phone=0}}e.d.results.forEach(function(t){if(!this[t.Fullname]){this[t.Fullname]={Fullname:t.Fullname,Desktop:0,Phone:0,Tablet:0,Total:0};e.userCount.push(this[t.Fullname])}this[t.Fullname].Desktop+=t.Desktop;this[t.Fullname].Tablet+=t.Tablet;this[t.Fullname].Phone+=t.Phone;this[t.Fullname].Total++},Object.create(null));e.d.results.forEach(function(t){if(!this[t.Appname]){this[t.Appname]={Appname:t.Appname,Desktop:0,Phone:0,Tablet:0,Total:0};e.appCount.push(this[t.Appname])}this[t.Appname].Desktop+=t.Desktop;this[t.Appname].Tablet+=t.Tablet;this[t.Appname].Phone+=t.Phone;this[t.Appname].Total++},Object.create(null));e.d.results.forEach(function(t){if(!this[t.Device]){this[t.Device]={Device:t.Device,Count:0};e.deviceCount.push(this[t.Device])}this[t.Device].Count++},Object.create(null));e.d.results.forEach(function(t){if(!this[t.Browser]){this[t.Browser]={Browser:t.Browser,Count:0};e.browserCount.push(this[t.Browser])}this[t.Browser].Count++},Object.create(null));e.d.results.forEach(function(t){if(!this[t.OS]){this[t.OS]={OS:t.OS,Count:0};e.systemCount.push(this[t.OS])}this[t.OS].Count++},Object.create(null));var d=new t;d.setData(e);d.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);sap.ui.getCore().setModel(d);l.onInactiveFetch()},error:function(e,t,i){var s="F"}},this)},onInactiveFetch:function(){var e=sap.ui.getCore().getModel();var t=e.getData();t.activeUsers=[];t.inactiveUsers=[];var i=this.getOwnerComponent().getManifestEntry("/sap.app/id");var s=i.replaceAll(".","/");var r=jQuery.sap.getModulePath(s);var a=r+"/sap/opu/odata/sap/ZBSX_TRACKAPPUSAGE_SRV/UserStatusSet?$filter=FromDate eq '' and ToDate eq ''";var o=this;$.ajax({url:a,type:"GET",contentType:"application/json",dataType:"json",async:true,success:function(i,s){t.inactiveUsers=i.d.results;e.getData().d.results.forEach(function(e){if(!this[e.UserId]){this[e.UserId]={UserId:e.UserId,Fullname:e.Fullname,Count:0,Status:"sap-icon://status-completed",Color:"green"};t.activeUsers.push(this[e.UserId])}this[e.UserId].Count++},Object.create(null));for(var r=0;r<t.activeUsers.length;r++){var a=t.activeUsers[r].UserId;for(var n=t.inactiveUsers.length-1;n>=0;n--){t.inactiveUsers[n].Status="sap-icon://status-inactive";t.inactiveUsers[n].Color="red";t.inactiveUsers[n].Count=0;if(t.inactiveUsers[n].UserId===a){t.inactiveUsers.splice(n,1)}}}t.userStatusList=t.activeUsers.concat(t.inactiveUsers);t.activeChart=[{Status:"Inactive",Count:t.inactiveUsers.length},{Status:"Active",Count:t.activeUsers.length}];console.log(t);e.setData(t);o.renderUserChart();o.renderAppChart();o.renderActiveChart();o.onRenderNumbers()},error:function(e,t,i){var s="F"}},this)},onRenderNumbers:function(){this.getView().byId("desktopCount").setText("0");this.getView().byId("tabletCount").setText("0");this.getView().byId("mobileCount").setText("0");this.getView().byId("chromeCount").setText("0");this.getView().byId("safariCount").setText("0");this.getView().byId("edgeCount").setText("0");this.getView().byId("firefoxCount").setText("0");this.getView().byId("ieCount").setText("0");this.getView().byId("fioriClientCount").setText("0");this.getView().byId("safariBox").setVisible(false);this.getView().byId("firefoxBox").setVisible(false);this.getView().byId("windowsCount").setText("0");this.getView().byId("macCount").setText("0");this.getView().byId("androidCount").setText("0");this.getView().byId("otherCount").setText("0");var e=4;var t=sap.ui.getCore().getModel().getData();this.getView().byId("activeCount").setText(t.userCount.length);this.getView().byId("inactiveCount").setText(t.inactiveUsers.length);for(var i=0;i<t.deviceCount.length;i++){if(t.deviceCount[i].Device===" Desktop"){this.getView().byId("desktopCount").setText(t.deviceCount[i].Count)}if(t.deviceCount[i].Device===" Tablet"){this.getView().byId("tabletCount").setText(t.deviceCount[i].Count)}if(t.deviceCount[i].Device===" Phone"){this.getView().byId("mobileCount").setText(t.deviceCount[i].Count)}}for(var i=0;i<t.systemCount.length;i++){if(t.systemCount[i].OS==="Windows"){this.getView().byId("windowsCount").setText(t.systemCount[i].Count)}if(t.systemCount[i].OS==="Apple"){this.getView().byId("macCount").setText(t.systemCount[i].Count)}if(t.systemCount[i].OS==="Android"){this.getView().byId("androidCount").setText(t.systemCount[i].Count)}if(t.systemCount[i].OS==="Other"){this.getView().byId("otherCount").setText(t.systemCount[i].Count)}}for(var s=0;s<t.browserCount.length;s++){if(t.browserCount[s].Browser==="Google Chrome"){this.getView().byId("chromeCount").setText(t.browserCount[s].Count)}if(t.browserCount[s].Browser==="Safari"){this.getView().byId("safariCount").setText(t.browserCount[s].Count)}if(t.browserCount[s].Browser==="Microsoft Edge"){this.getView().byId("edgeCount").setText(t.browserCount[s].Count)}if(t.browserCount[s].Browser==="Mozilla Firefox"){this.getView().byId("firefoxCount").setText(t.browserCount[s].Count)}if(t.browserCount[s].Browser==="Internet Explorer"){this.getView().byId("ieCount").setText(t.browserCount[s].Count)}if(t.browserCount[s].Browser==="Fiori Client"){this.getView().byId("fioriClientCount").setText(t.browserCount[s].Count)}}if(this.getView().byId("safariCount").getText()!=="0"){this.getView().byId("safariBox").setVisible(true);e++}if(this.getView().byId("firefoxCount").getText()!=="0"){this.getView().byId("firefoxBox").setVisible(true);e++}if(e>=4){this.getView().byId("browserCell").setWidth(2)}this.getView().byId("dynamicPageId").setBusy(false)},renderUserChart:function(){var e=this.getView().byId("userChart");if(e){e.destroyDataset();e.destroyFeeds()}e.setVizType("stacked_bar");e.setVizProperties({plotArea:{colorPalette:this.reqTypeColors,dataLabel:{visible:true,showTotal:true,defaultState:true},defaultOthersStyle:{color:"red"},sumLabel:{visible:true,defaultState:true}},tooltip:{visible:true},legendGroup:{layout:{position:"top"}},legend:{label:{style:{color:"#145569"}}},title:{text:"",visible:false},valueAxis:{title:{visible:false,text:"App usage"}},categoryAxis:{title:{visible:false,text:"Date"},label:{style:{color:"#145569"}}}});var t=sap.ui.getCore().getModel();var i=new u({dimensions:[{name:"Fullname",value:"{Fullname}"}],measures:[{name:"Desktop",value:"{Desktop}"},{name:"Tablet",value:"{Tablet}"},{name:"Phone",value:"{Phone}"}],data:{path:"/userCount"}});e.setDataset(i);e.setModel(t);var s=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:["Desktop"]}),r=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:["Tablet"]}),a=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:["Phone"]}),o=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"categoryAxis",type:"Dimension",values:["Fullname"]});e.addFeed(s);e.addFeed(r);e.addFeed(a);e.addFeed(o)},renderAppChart:function(){var e=this.getView().byId("appChart");if(e){e.destroyDataset();e.destroyFeeds()}e.setVizType("stacked_column");e.setVizProperties({plotArea:{colorPalette:this.reqTypeColors,dataLabel:{visible:true,showTotal:true,defaultState:true},sumLabel:{visible:true,defaultState:true}},tooltip:{visible:true},legendGroup:{layout:{position:"top"}},legend:{label:{style:{color:"#145569"}}},title:{text:"",visible:false},valueAxis:{title:{visible:false,text:"App usage"}},categoryAxis:{title:{visible:false,text:"Date"},label:{style:{color:"#145569"}}}});var t=sap.ui.getCore().getModel();var i=new u({dimensions:[{name:"Appname",value:"{Appname}"}],measures:[{name:"Desktop",value:"{Desktop}"},{name:"Tablet",value:"{Tablet}"},{name:"Phone",value:"{Phone}"}],data:{path:"/appCount"}});e.setDataset(i);e.setModel(t);var s=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:["Desktop"]}),r=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:["Tablet"]}),a=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"valueAxis",type:"Measure",values:["Phone"]}),o=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"categoryAxis",type:"Dimension",values:["Appname"]});e.addFeed(s);e.addFeed(r);e.addFeed(a);e.addFeed(o)},renderActiveChart:function(){var e=this.getView().byId("activeChart");if(e){e.destroyDataset();e.destroyFeeds()}e.setVizType("donut");e.setVizProperties({plotArea:{colorPalette:this.req3TypeColors,dataLabel:{visible:true,defaultState:true,type:"value"}},tooltip:{visible:true},legendGroup:{layout:{position:"bottom"}},legend:{label:{style:{color:"#145569"}}},title:{text:"",visible:false},valueAxis:{title:{visible:false,text:"No of Requests"}},categoryAxis:{title:{visible:false,text:"Device"},label:{style:{color:"#145569"}}}});var t=sap.ui.getCore().getModel();jQuery.sap.require("sap.ui.core.format.DateFormat");var i=sap.ui.core.format.DateFormat.getInstance({style:"short"});var s=new u({dimensions:[{name:"Status",value:"{Status}"}],measures:[{name:"Count",value:"{Count}"}],data:{path:"/activeChart"}});e.setDataset(s);e.setModel(t);var r=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"size",type:"Measure",values:["Count"]});e.addFeed(r);var a=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"color",type:"Dimension",values:["Status"]});e.addFeed(a)},onTabChange:function(){this.getView().byId("dynamicPageId").setHeaderExpanded(false);this.screenSize2();var e=this.getView().byId("iconTabBar");if(e.getSelectedKey()==="appDetails"){this.onAppTab()}if(e.getSelectedKey()==="deviceDetails"){this.onDeviceTab()}if(e.getSelectedKey()==="userDetails"){this.onUserTab()}},onAppTab:function(){var e=sap.ui.getCore().getModel();var t=this.getView().byId("oItemsTable");var i=this.getView().byId("oItemsTemplate");t.addStyleClass("sapUiSizeCozy");t.setModel(e);var s={path:"/appCount",template:i};t.bindAggregation("items",s)},onDeviceTab:function(){var e=sap.ui.getCore().getModel();var t=this.getView().byId("oDeviceTable");var i=this.getView().byId("oDeviceTemplate");t.addStyleClass("sapUiSizeCozy");t.setModel(e);var s={path:"/deviceCount",template:i};t.bindAggregation("items",s)},onUserTab:function(){var e=sap.ui.getCore().getModel();var t=this.getView().byId("oUserTable");var i=this.getView().byId("oUserTemplate");t.addStyleClass("sapUiSizeCozy");t.setModel(e);var s={path:"/userStatusList",template:i};t.bindAggregation("items",s);this.onUserSearch()},onClickApp:function(e){this.getView().byId("appFirefoxBox").setVisible(false);this.getView().byId("appSafariBox").setVisible(false);this.getView().byId("chromeAppCount").setText("0");this.getView().byId("safariAppCount").setText("0");this.getView().byId("edgeAppCount").setText("0");this.getView().byId("ieAppCount").setText("0");this.getView().byId("firefoxAppCount").setText("0");this.getView().byId("fioriClientAppCount").setText("0");this.getView().byId("desktopAppCount").setText("0");this.getView().byId("tabletAppCount").setText("0");this.getView().byId("mobileAppCount").setText("0");this.getView().byId("visitAppCount").setText("0");this.getView().byId("visitUserCount").setText("0");this.getView().byId("appMacCount").setText("0");this.getView().byId("appWindowsCount").setText("0");this.getView().byId("appAndroidCount").setText("0");this.getView().byId("appOtherCount").setText("0");this.getView().byId("userBox1").setVisible(false);this.getView().byId("user1").setText("");this.getView().byId("progress1").setDisplayValue("");this.getView().byId("progress1").setPercentValue("0");this.getView().byId("userBox2").setVisible(false);this.getView().byId("user2").setText("");this.getView().byId("progress2").setDisplayValue("");this.getView().byId("progress2").setPercentValue("0");this.getView().byId("userBox3").setVisible(false);this.getView().byId("user3").setText("");this.getView().byId("progress3").setDisplayValue("");this.getView().byId("progress3").setPercentValue("0");this.getView().byId("userBox4").setVisible(false);this.getView().byId("user4").setText("");this.getView().byId("progress4").setDisplayValue("");this.getView().byId("progress4").setPercentValue("0");this.getView().byId("userBox5").setVisible(false);this.getView().byId("user5").setText("");this.getView().byId("progress5").setDisplayValue("");this.getView().byId("progress5").setPercentValue("0");var t=e.getSource().getBindingContext().getPath().split("/")[2];if(this.getView().byId("verticalHide").getVisible()===true){this.getView().byId("scrollBox").scrollToElement(this.getView().byId("verticalHide"),999)}if(this.getView().byId("verticalShow").getVisible()===true){this.getView().byId("scrollBox").scrollToElement(this.getView().byId("verticalShow"),999)}var i=sap.ui.getCore().getModel().getData().appCount[t].Appname;var s=sap.ui.getCore().getModel();var r=this.getView().byId("oVisitsTable");var a=this.getView().byId("oVisitsTemplate");var o=[];var n=[];var l=[];var u=0;var d=0;var g=0;var h=0;var c=0;var p=0;var b=0;var v=0;var w=0;var y=0;this.getView().byId("verticalHide").setVisible(false);this.getView().byId("verticalShow").setVisible(true);this.getView().byId("selectedAppName").setText(i);for(var V=0;V<s.getData().d.results.length;V++){if(s.getData().d.results[V].Appname===i){o.push(s.getData().d.results[V])}}for(var f=0;f<o.length;f++){if(o[f].Browser==="Google Chrome"){u++}if(o[f].Browser==="Safari"){d++}if(o[f].Browser==="Microsoft Edge"){g++}if(o[f].Browser==="Mozilla Firefox"){c++}if(o[f].Browser==="Internet Explorer"){h++}if(o[f].Browser==="Fiori Client"){p++}if(o[f].OS==="Apple"){b++}if(o[f].OS==="Windows"){v++}if(o[f].OS==="Android"){w++}if(o[f].OS==="Other"){y++}o[f].NewDate="";var I=o[f].EDate;var C=I.substring(0,4);var x=I.substring(4,6);var m=I.substring(6,8);var T=new Date(C,x-1,m).toDateString();o[f].NewDate=T;var D=o[f].ETime;var S=D.substring(0,2);var B=D.substring(2,4);var F=D.substring(4,6);if(S<12){var A="am"}if(S>=12){var A="pm"}var P=S+":"+B+":"+F+" "+A;o[f].NewTime=P}this.getView().byId("chromeAppCount").setText(u);this.getView().byId("safariAppCount").setText(d);if(d>0){this.getView().byId("appSafariBox").setVisible(true)}if(c>0){this.getView().byId("appFirefoxBox").setVisible(true)}this.getView().byId("edgeAppCount").setText(g);this.getView().byId("ieAppCount").setText(h);this.getView().byId("firefoxAppCount").setText(c);this.getView().byId("fioriClientAppCount").setText(p);this.getView().byId("appMacCount").setText(b);this.getView().byId("appWindowsCount").setText(v);this.getView().byId("appAndroidCount").setText(w);this.getView().byId("appOtherCount").setText(y);var U=new sap.ui.model.json.JSONModel(o);r.setModel(U);var M={path:"/",template:a};r.bindAggregation("items",M);for(var O=0;O<s.getData().appCount.length;O++){if(s.getData().appCount[O].Appname===i){this.getView().byId("desktopAppCount").setText(s.getData().appCount[O].Desktop);this.getView().byId("tabletAppCount").setText(s.getData().appCount[O].Tablet);this.getView().byId("mobileAppCount").setText(s.getData().appCount[O].Phone)}}o.forEach(function(e){if(!this[e.Fullname]){this[e.Fullname]={Fullname:e.Fullname,Count:0};n.push(this[e.Fullname])}this[e.Fullname].Count++},Object.create(null));this.getView().byId("visitAppCount").setText(o.length);this.getView().byId("visitUserCount").setText(n.length);n.sort(function(e,t){return[t.Count]-[e.Count]});if(n.length>5){for(var E=0;E<5;E++){l.push(n[E]);n=l}}var k=n.map(function(e){return e.Count});var _=k.reduce(function(e,t){return e+t});if(n.length>=1){this.getView().byId("userBox1").setVisible(true);this.getView().byId("user1").setText(n[0].Fullname);this.getView().byId("progress1").setDisplayValue(n[0].Count);this.getView().byId("progress1").setPercentValue(100/_*n[0].Count)}if(n.length>=2){this.getView().byId("userBox2").setVisible(true);this.getView().byId("user2").setText(n[1].Fullname);this.getView().byId("progress2").setDisplayValue(n[1].Count);this.getView().byId("progress2").setPercentValue(100/_*n[1].Count)}if(n.length>=3){this.getView().byId("userBox3").setVisible(true);this.getView().byId("user3").setText(n[2].Fullname);this.getView().byId("progress3").setDisplayValue(n[2].Count);this.getView().byId("progress3").setPercentValue(100/_*n[2].Count)}if(n.length>=4){this.getView().byId("userBox4").setVisible(true);this.getView().byId("user4").setText(n[3].Fullname);this.getView().byId("progress4").setDisplayValue(n[3].Count);this.getView().byId("progress4").setPercentValue(100/_*n[3].Count)}if(n.length>=5){this.getView().byId("userBox5").setVisible(true);this.getView().byId("user5").setText(n[4].Fullname);this.getView().byId("progress5").setDisplayValue(n[4].Count);this.getView().byId("progress5").setPercentValue(100/_*n[4].Count)}},onClickDevice:function(e){this.getView().byId("deviceFirefoxBox").setVisible(false);this.getView().byId("deviceSafariBox").setVisible(false);this.getView().byId("chromeDeviceCount").setText("0");this.getView().byId("safariDeviceCount").setText("0");this.getView().byId("edgeDeviceCount").setText("0");this.getView().byId("ieDeviceCount").setText("0");this.getView().byId("firefoxDeviceCount").setText("0");this.getView().byId("fioriClientDeviceCount").setText("0");this.getView().byId("deviceVisitAppCount").setText("0");this.getView().byId("deviceVisitUserCount").setText("0");this.getView().byId("deviceMacCount").setText("0");this.getView().byId("deviceWindowsCount").setText("0");this.getView().byId("deviceAndroidCount").setText("0");this.getView().byId("deviceOtherCount").setText("0");this.getView().byId("deviceUserBox1").setVisible(false);this.getView().byId("deviceUser1").setText("");this.getView().byId("deviceProgress1").setDisplayValue("");this.getView().byId("deviceProgress1").setPercentValue("0");this.getView().byId("deviceUserBox2").setVisible(false);this.getView().byId("deviceUser2").setText("");this.getView().byId("deviceProgress2").setDisplayValue("");this.getView().byId("deviceProgress2").setPercentValue("0");this.getView().byId("deviceUserBox3").setVisible(false);this.getView().byId("deviceUser3").setText("");this.getView().byId("deviceProgress3").setDisplayValue("");this.getView().byId("deviceProgress3").setPercentValue("0");this.getView().byId("deviceUserBox4").setVisible(false);this.getView().byId("deviceUser4").setText("");this.getView().byId("deviceProgress4").setDisplayValue("");this.getView().byId("deviceProgress4").setPercentValue("0");this.getView().byId("deviceUserBox5").setVisible(false);this.getView().byId("deviceUser5").setText("");this.getView().byId("deviceProgress5").setDisplayValue("");this.getView().byId("deviceProgress5").setPercentValue("0");var t=e.getSource().getBindingContext().getPath().split("/")[2];if(this.getView().byId("deviceVerticalHide").getVisible()===true){this.getView().byId("deviceScrollBox").scrollToElement(this.getView().byId("deviceVerticalHide"),999)}if(this.getView().byId("deviceVerticalShow").getVisible()===true){this.getView().byId("deviceScrollBox").scrollToElement(this.getView().byId("deviceVerticalShow"),999)}var i=sap.ui.getCore().getModel().getData().deviceCount[t].Device;var s=sap.ui.getCore().getModel();var r=this.getView().byId("oDevice2Table");var a=this.getView().byId("oDevice2Template");var o=[];var n=[];var l=[];var u=0;var d=0;var g=0;var h=0;var c=0;var p=0;var b=0;var v=0;var w=0;var y=0;this.getView().byId("deviceVerticalHide").setVisible(false);this.getView().byId("deviceVerticalShow").setVisible(true);this.getView().byId("selectedDeviceName").setText(i);for(var V=0;V<s.getData().d.results.length;V++){if(s.getData().d.results[V].Device===i){o.push(s.getData().d.results[V])}}for(var f=0;f<o.length;f++){if(o[f].Browser==="Google Chrome"){u++}if(o[f].Browser==="Safari"){d++}if(o[f].Browser==="Microsoft Edge"){g++}if(o[f].Browser==="Mozilla Firefox"){c++}if(o[f].Browser==="Internet Explorer"){h++}if(o[f].Browser==="Fiori Client"){p++}if(o[f].OS==="Apple"){b++}if(o[f].OS==="Windows"){v++}if(o[f].OS==="Android"){w++}if(o[f].OS==="Other"){y++}o[f].NewDate="";var I=o[f].EDate;var C=I.substring(0,4);var x=I.substring(4,6);var m=I.substring(6,8);var T=new Date(C,x-1,m).toDateString();o[f].NewDate=T;var D=o[f].ETime;var S=D.substring(0,2);var B=D.substring(2,4);var F=D.substring(4,6);if(S<12){var A="am"}if(S>=12){var A="pm"}var P=S+":"+B+":"+F+" "+A;o[f].NewTime=P}this.getView().byId("chromeDeviceCount").setText(u);this.getView().byId("safariDeviceCount").setText(d);if(d>0){this.getView().byId("deviceSafariBox").setVisible(true)}if(c>0){this.getView().byId("deviceFirefoxBox").setVisible(true)}this.getView().byId("edgeDeviceCount").setText(g);this.getView().byId("ieDeviceCount").setText(h);this.getView().byId("firefoxDeviceCount").setText(c);this.getView().byId("fioriClientDeviceCount").setText(p);this.getView().byId("deviceMacCount").setText(b);this.getView().byId("deviceWindowsCount").setText(v);this.getView().byId("deviceAndroidCount").setText(w);this.getView().byId("deviceOtherCount").setText(y);var U=new sap.ui.model.json.JSONModel(o);r.setModel(U);var M={path:"/",template:a};r.bindAggregation("items",M);o.forEach(function(e){if(!this[e.Fullname]){this[e.Fullname]={Fullname:e.Fullname,Count:0};n.push(this[e.Fullname])}this[e.Fullname].Count++},Object.create(null));this.getView().byId("deviceVisitAppCount").setText(o.length);this.getView().byId("deviceVisitUserCount").setText(n.length);n.sort(function(e,t){return[t.Count]-[e.Count]});if(n.length>5){for(var O=0;O<5;O++){l.push(n[O]);n=l}}var E=n.map(function(e){return e.Count});var k=E.reduce(function(e,t){return e+t});if(n.length>=1){this.getView().byId("deviceUserBox1").setVisible(true);this.getView().byId("deviceUser1").setText(n[0].Fullname);this.getView().byId("deviceProgress1").setDisplayValue(n[0].Count);this.getView().byId("deviceProgress1").setPercentValue(100/k*n[0].Count)}if(n.length>=2){this.getView().byId("deviceUserBox2").setVisible(true);this.getView().byId("deviceUser2").setText(n[1].Fullname);this.getView().byId("deviceProgress2").setDisplayValue(n[1].Count);this.getView().byId("deviceProgress2").setPercentValue(100/k*n[1].Count)}if(n.length>=3){this.getView().byId("deviceUserBox3").setVisible(true);this.getView().byId("deviceUser3").setText(n[2].Fullname);this.getView().byId("deviceProgress3").setDisplayValue(n[2].Count);this.getView().byId("deviceProgress3").setPercentValue(100/k*n[2].Count)}if(n.length>=4){this.getView().byId("deviceUserBox4").setVisible(true);this.getView().byId("deviceUser4").setText(n[3].Fullname);this.getView().byId("deviceProgress4").setDisplayValue(n[3].Count);this.getView().byId("deviceProgress4").setPercentValue(100/k*n[3].Count)}if(n.length>=5){this.getView().byId("deviceUserBox5").setVisible(true);this.getView().byId("deviceUser5").setText(n[4].Fullname);this.getView().byId("deviceProgress5").setDisplayValue(n[4].Count);this.getView().byId("deviceProgress5").setPercentValue(100/k*n[4].Count)}},onClickUser:function(e){this.getView().byId("userFirefoxBox").setVisible(false);this.getView().byId("userSafariBox").setVisible(false);this.getView().byId("chromeUserCount").setText("0");this.getView().byId("safariUserCount").setText("0");this.getView().byId("edgeUserCount").setText("0");this.getView().byId("ieUserCount").setText("0");this.getView().byId("firefoxUserCount").setText("0");this.getView().byId("fioriClientUserCount").setText("0");this.getView().byId("userVisitAppCount").setText("0");this.getView().byId("userMacCount").setText("0");this.getView().byId("userWindowsCount").setText("0");this.getView().byId("userAndroidCount").setText("0");this.getView().byId("userOtherCount").setText("0");var t=e.getSource().getBindingContext().getPath().split("/")[2];if(this.getView().byId("userVerticalHide").getVisible()===true){this.getView().byId("userScrollBox").scrollToElement(this.getView().byId("userVerticalHide"),999)}if(this.getView().byId("userVerticalShow").getVisible()===true){this.getView().byId("userScrollBox").scrollToElement(this.getView().byId("userVerticalShow"),999)}var i=sap.ui.getCore().getModel().getData().userStatusList[t].Fullname;var s=sap.ui.getCore().getModel();var r=this.getView().byId("oUser2Table");var a=this.getView().byId("oUser2Template");var o=[];var n=[];var l=[];var u=0;var d=0;var g=0;var h=0;var c=0;var p=0;var b=0;var v=0;var w=0;var y=0;this.getView().byId("userVerticalHide").setVisible(false);this.getView().byId("userVerticalShow").setVisible(true);this.getView().byId("selectedUserName").setText(i);for(var V=0;V<s.getData().d.results.length;V++){if(s.getData().d.results[V].Fullname===i){o.push(s.getData().d.results[V])}}for(var f=0;f<o.length;f++){if(o[f].Browser==="Google Chrome"){u++}if(o[f].Browser==="Safari"){d++}if(o[f].Browser==="Microsoft Edge"){g++}if(o[f].Browser==="Mozilla Firefox"){c++}if(o[f].Browser==="Internet Explorer"){h++}if(o[f].Browser==="Fiori Client"){p++}if(o[f].OS==="Apple"){b++}if(o[f].OS==="Windows"){v++}if(o[f].OS==="Android"){w++}if(o[f].OS==="Other"){y++}o[f].NewDate="";var I=o[f].EDate;var C=I.substring(0,4);var x=I.substring(4,6);var m=I.substring(6,8);var T=new Date(C,x-1,m).toDateString();o[f].NewDate=T;var D=o[f].ETime;var S=D.substring(0,2);var B=D.substring(2,4);var F=D.substring(4,6);if(S<12){var A="am"}if(S>=12){var A="pm"}var P=S+":"+B+":"+F+" "+A;o[f].NewTime=P}this.getView().byId("chromeUserCount").setText(u);this.getView().byId("safariUserCount").setText(d);if(d>0){this.getView().byId("userSafariBox").setVisible(true)}if(c>0){this.getView().byId("userFirefoxBox").setVisible(true)}this.getView().byId("edgeUserCount").setText(g);this.getView().byId("ieUserCount").setText(h);this.getView().byId("firefoxUserCount").setText(c);this.getView().byId("fioriClientUserCount").setText(p);this.getView().byId("userMacCount").setText(b);this.getView().byId("userWindowsCount").setText(v);this.getView().byId("userAndroidCount").setText(w);this.getView().byId("userOtherCount").setText(y);var U=new sap.ui.model.json.JSONModel(o);r.setModel(U);var M={path:"/",template:a};r.bindAggregation("items",M);for(var O=0;O<s.getData().userCount.length;O++){if(s.getData().userCount[O].Fullname===i){this.getView().byId("desktopUserCount").setText(s.getData().userCount[O].Desktop);this.getView().byId("tabletUserCount").setText(s.getData().userCount[O].Tablet);this.getView().byId("mobileUserCount").setText(s.getData().userCount[O].Phone)}}o.forEach(function(e){if(!this[e.Fullname]){this[e.Fullname]={Fullname:e.Fullname,Count:0};n.push(this[e.Fullname])}this[e.Fullname].Count++},Object.create(null));this.getView().byId("userVisitAppCount").setText(o.length)},onAppSearch:function(e){var t=e.getParameter("query");var s;if(!t){s=new i("Appname",r.Contains,"")}else{var a=new i("Appname",r.Contains,t);s=new i([a],false)}var o=this.getView().byId("oItemsTable");var n=o.getBinding("items");n.filter(s)},onUserSearch:function(e){var t=this.getView().byId("userSearchField").getValue();var s=this.getView().byId("userSwitch").getState();var a;if(t===""){var o=new i("UserId",r.Contains,"")}if(t!==""){var o=new i("UserId",r.Contains,t)}if(s===true){var n=new i("Status",r.Contains,"sap-icon://status-completed")}if(s===false){var n=new i("Status",r.Contains,"sap-icon://status-inactive")}a=new i([o,n],true);var l=this.getView().byId("oUserTable");var u=l.getBinding("items");u.filter(a)},onActiveSwitch:function(e){var t=this.getView().byId("userSwitch").getState();var s;if(t){s=new i("Status",r.Contains,"sap-icon://status-completed")}else{var a=new i("Status",r.Contains,"sap-icon://status-inactive");s=new i([a],false)}var o=this.getView().byId("oUserTable");var n=o.getBinding("items");n.filter(s)},screenSize:function(e){var t=e.getParameter("isExpanded");if(sap.ui.Device.system.desktop===true){var i=window.screen.height*.67;var s=window.screen.height*.55}if(sap.ui.Device.system.tablet===true){var i=window.screen.height*.82;var s=window.screen.height*.72}if(sap.ui.Device.system.phone===true){var i=window.screen.height*.72;var s=window.screen.height*.6}if(t===true){this.getView().byId("scrollBox").setHeight(s+"px");this.getView().byId("deviceScrollBox").setHeight(s+"px");this.getView().byId("userScrollBox").setHeight(s+"px")}if(t===false){this.getView().byId("scrollBox").setHeight(i+"px");this.getView().byId("deviceScrollBox").setHeight(i+"px");this.getView().byId("userScrollBox").setHeight(i+"px")}},screenSize2:function(e){var t=this.getView().byId("dynamicPageId").getHeaderExpanded();if(sap.ui.Device.system.desktop===true){var i=window.screen.height*.67;var s=window.screen.height*.55}if(sap.ui.Device.system.tablet===true){var i=window.screen.height*.82;var s=window.screen.height*.72}if(sap.ui.Device.system.phone===true){var i=window.screen.height*.72;var s=window.screen.height*.6}if(t===true){this.getView().byId("scrollBox").setHeight(s+"px");this.getView().byId("deviceScrollBox").setHeight(s+"px");this.getView().byId("userScrollBox").setHeight(s+"px")}if(t===false){this.getView().byId("scrollBox").setHeight(i+"px");this.getView().byId("deviceScrollBox").setHeight(i+"px");this.getView().byId("userScrollBox").setHeight(i+"px")}},onUpdateFinished:function(e){this._updateListItemCount(e.getParameter("total"))},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh();return}var t=e.getParameter("query");if(t){this._oListFilterState.aSearch=[new i("Appname",r.Contains,t)]}else{this._oListFilterState.aSearch=[]}this._applyFilterSearch()},onRefresh:function(){this._oList.getBinding("items").refresh()},onOpenViewSettings:function(e){var t="filter";if(e.getSource()instanceof sap.m.Button){var i=e.getSource().getId();if(i.match("sort")){t="sort"}else if(i.match("group")){t="group"}}if(!this.byId("viewSettingsDialog")){n.load({id:this.getView().getId(),name:"bsx.usageanalytics.view.ViewSettingsDialog",controller:this}).then(function(e){this.getView().addDependent(e);e.addStyleClass(this.getOwnerComponent().getContentDensityClass());e.open(t)}.bind(this))}else{this.byId("viewSettingsDialog").open(t)}},onConfirmViewSettingsDialog:function(e){this._applySortGroup(e)},_applySortGroup:function(e){var t=e.getParameters(),i,r,a=[];i=t.sortItem.getKey();r=t.sortDescending;a.push(new s(i,r));this._oList.getBinding("items").sort(a)},onSelectionChange:function(e){var t=e.getSource(),i=e.getParameter("selected");if(!(t.getMode()==="MultiSelect"&&!i)){this._showDetail(e.getParameter("listItem")||e.getSource())}},onBypassed:function(){this._oList.removeSelections(true)},createGroupHeader:function(e){return new a({title:e.text,upperCase:false})},onNavBack:function(){history.go(-1)},_createViewModel:function(){return new t({isFilterBarVisible:false,filterBarLabel:"",delay:0,title:this.getResourceBundle().getText("listTitleCount",[0]),noDataText:this.getResourceBundle().getText("listListNoDataText"),sortBy:"Appname",groupBy:"None"})},_onMasterMatched:function(){this.getModel("appView").setProperty("/layout","OneColumn")},_showDetail:function(e){var t=!o.system.phone;this.getModel("appView").setProperty("/layout","TwoColumnsMidExpanded");this.getRouter().navTo("object",{objectId:e.getBindingContext().getProperty("UserId")},t)},_updateListItemCount:function(e){var t;if(this._oList.getBinding("items").isLengthFinal()){t=this.getResourceBundle().getText("listTitleCount",[e]);this.getModel("listView").setProperty("/title",t)}},_applyFilterSearch:function(){var e=this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),t=this.getModel("listView");this._oList.getBinding("items").filter(e,"Application");if(e.length!==0){t.setProperty("/noDataText",this.getResourceBundle().getText("listListNoDataWithFilterOrSearchText"))}else if(this._oListFilterState.aSearch.length>0){t.setProperty("/noDataText",this.getResourceBundle().getText("listListNoDataText"))}},_updateFilterBar:function(e){var t=this.getModel("listView");t.setProperty("/isFilterBarVisible",this._oListFilterState.aFilter.length>0);t.setProperty("/filterBarLabel",this.getResourceBundle().getText("listFilterBarText",[e]))}})});