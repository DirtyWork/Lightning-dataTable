/**
 * Created by Takei on 26.1.2017.
 */
({
    doInit : function(component, event, helper){
        component.set("v.fieldAPIs", component.get("v.fields").split(','));
        helper.fetchData(component);

        if(component.get("v.listOfRecPerPageValues")){
            var recordsPerPage = component.get("v.listOfRecPerPageValues").split(',');
            var recordsPerPageInt = [];
            recordsPerPage.forEach(function(a){
                recordsPerPageInt.push(parseInt(a,0));
            });

            component.set("v.recPerPageList", recordsPerPageInt);
        }
    },

    pageChange : function(component, event, helper){
        var direction = event.getParam("direction");
        if(direction === "previous")
        {
            component.set("v.page",(component.get("v.page")-1));
            component.set("v.data",component.get("v.pageList")[component.get("v.page")-1]);
        }
        else if(direction === "next")
        {
            component.set("v.page",(component.get("v.page")+1));
            component.set("v.data",component.get("v.pageList")[component.get("v.page")-1]);
        }
    },

    recordsPerPage : function(component, event, helper){
        component.set("v.recPerPage", component.find("recsPerPage").get("v.value"));
        helper.fetchData(component);
    },

    sortTable : function(component, event, helper){
        component.set("v.sortBy", event.getParam("field"));
        component.set("v.sortOrder", event.getParam("sortOrder"));
        helper.fetchData(component);
    },
})