({
	doInit : function(component, event, helper) {
		var action = component.get("c.getLabel");
        action.setParams({"sobj":component.get("v.sobj"),
                          "field":component.get("v.field")});
        action.setCallback(this, function(a){
            var state = a.getState();
            if(state === 'SUCCESS'){
                
                component.set("v.fieldLabel", a.getReturnValue());

                var upArrow = component.find("up");
                if(component.get("v.field") === component.get("v.sortField")){
                    $A.util.addClass(upArrow, "slds-show");
                    $A.util.removeClass(upArrow, "slds-hide");
                }

            }
            else if(state === 'ERROR'){
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        $A.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    $A.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	},

	sortTable : function(component, event, helper){
        var sortOrder = component.get("v.sortOrder");
        sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
        component.set("v.sortOrder", sortOrder);

        var sort = component.getEvent("dataTableSortEvent");
        sort.setParams({ "field": component.get("v.field")});
        sort.setParams({ "sortOrder": component.get("v.sortOrder")});
        sort.fire();

        setTimeout(function(){ }, 3000);

        var upArrow = component.find("up");
        var downArrow = component.find("down");
        if(component.get("v.sortField") === component.get("v.field")){
            if(component.get("v.sortOrder") === 'ASC'){
                $A.util.addClass(upArrow, "slds-show");
                $A.util.removeClass(upArrow, "slds-hide");
                $A.util.addClass(downArrow, "slds-hide");
                $A.util.removeClass(downArrow, "slds-show");
            }
            else {
                $A.util.addClass(downArrow, "slds-show");
                $A.util.removeClass(downArrow, "slds-hide");
                $A.util.addClass(upArrow, "slds-hide");
                $A.util.removeClass(upArrow, "slds-show");
            }
        }
	},

    removeArrow : function(component, event, helper){
        if(component.get("v.sortField")!== component.get("v.field")){
            var upArrow = component.find("up");
            var downArrow = component.find("down");
            $A.util.addClass(downArrow, "slds-hide");
            $A.util.removeClass(downArrow, "slds-show");
            $A.util.addClass(upArrow, "slds-hide");
            $A.util.removeClass(upArrow, "slds-show");
        }
    },
})