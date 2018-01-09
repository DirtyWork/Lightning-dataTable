/**
 * Created by gabriel on 3/10/17.
 */
({
    fetchData : function(component, event){
        var action = component.get("c.getData");
        action.setParams({"sobj":component.get("v.sObj"),
                          "fields":component.get("v.fields"),
                          "clause":component.get("v.clause"),
                          "sortBy":component.get("v.sortBy"),
                          "sortOrder":component.get("v.sortOrder"),
                          "recordId":component.get("v.recordId"),
                          "recordIdObject":component.get("v.recordIdObject")});
        action.setStorable();
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
        action.setCallback(this, function(a){
            var state = a.getState();
            if(state === 'SUCCESS'){
                var helpTable = a.getReturnValue();
                var returnTable=[];
                component.set("v.total", helpTable.length);
                component.set("v.pages", Math.ceil(helpTable.length/component.get("v.recPerPage")));

                for(var i=0;i<component.get("v.pages");i++)
                {
                    var tempTable=[];
                    for(var j=0;j<component.get("v.recPerPage");j++)
                    {
                        if(helpTable.length>0)
                        tempTable.push(helpTable.shift());
                    }
                    returnTable.push(tempTable);
                }

                component.set("v.pageList", returnTable);
                component.set("v.data", returnTable[0]);
                component.set("v.page", 1);

                $A.util.addClass(spinner, "slds-hide");
            }
            else if(state === 'ERROR'){
                var errors = a.getError();
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
    }
})