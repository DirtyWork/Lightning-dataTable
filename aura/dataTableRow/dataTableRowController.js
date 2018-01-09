({
	doInit : function(component, event, helper) {
		var data = component.get("v.data").split('©S2©');
		component.set("v.recordId", data.shift().split('©S1©')[2]);
		component.set("v.dataset",data);
	},
})