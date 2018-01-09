({
	doInit : function(component, event, helper){
		var sHelper = component.get("v.data").split('©S1©');
		component.set("v.field", sHelper[0]);
		component.set("v.fieldType", sHelper[1]);
		component.set("v.fieldValue", sHelper[2]);

		if(component.get("v.fieldType")==='DATE'){
            var d = new Date(component.get("v.fieldValue"));
            component.set("v.dateField", d);
        }else if(component.get("v.fieldType")==='DATETIME'){
            var d = new Date(component.get("v.fieldValue").replace(/-/g,"/"));
            component.set("v.dateField", d);
        }
	},

	dblclick : function(component, event, helper) {
		//console.log('test '+component.get("v.recordId"));
	}
})