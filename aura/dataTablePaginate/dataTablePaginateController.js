/**
 * Created by gabriel on 3/10/17.
 */
({
    previousPage : function(component, event, helper)
    {
        var changePage = component.getEvent("dataTablePageChangeEvent");
        changePage.setParams({ "direction": "previous"});
        changePage.fire();
    },
    nextPage : function(component, event, helper)
    {
        var changePage = component.getEvent("dataTablePageChangeEvent");
        changePage.setParams({ "direction": "next"});
        changePage.fire();
    }
})