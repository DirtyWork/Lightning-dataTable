/**
 * Created by Takei on 25.1.2017.
 */

public with sharing class DataTableController {

    @AuraEnabled
    public static List<String> getData(String sobj, String fields, String clause, String sortBy, String sortOrder, String recordId, String recordIdObject) {

        String soql = 'SELECT '+fields+' FROM '+sobj;
        if(!String.isBlank(clause)){
            soql += ' WHERE '+clause;
            if(!String.isBlank(recordIdObject))
                soql += ' AND '+recordIdObject+' =\''+recordId+'\'';
        }else if(!String.isBlank(recordIdObject)){
            soql += ' WHERE '+recordIdObject+' =\''+recordId+'\'';
        }

        fields = 'Id,'+fields;

        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = schemaMap.get(sobj).getDescribe().fields.getMap();

        if(!String.isBlank(sortBy) && !sortBy.contains('.')){
            Schema.SObjectField field = fieldMap.get(sortBy);
            Boolean dfr = field.getDescribe().isSortable();
            if(dfr) soql += ' ORDER BY '+sortBy+' '+sortOrder;
        } else if(sortBy.contains('.')){
            String[] helper = sortBy.split('\\.');
            Map<String, Schema.SObjectField> fieldMap2 = schemaMap.get(helper[0]).getDescribe().fields.getMap();
            Schema.SObjectField field = fieldMap.get(helper[1]);
            Boolean dfr = field.getDescribe().isSortable();
            if(dfr) soql += ' ORDER BY '+sortBy+' '+sortOrder;
        }

        List<sObject> data = Database.query(soql);

        List<String> returnString = new List<String>();

        for(sObject so : data){
            List<String> strs = new List<String>();
        	for(String s : fields.split(',')){
                if(s.contains('.')){
                    String[] helper = s.split('\\.');
                    try{
                        strs.add(s+'©S1©'+schemaMap.get(helper[0]).getDescribe().fields.getMap().get(helper[1]).getDescribe().getType()+'©S1©'
                            +so.getSObject(helper[0]).get(helper[1]));
                    }catch (Exception e){
                        strs.add('No data');
                    }
                }
                else strs.add(s+'©S1©'+schemaMap.get(sobj).getDescribe().fields.getMap().get(s).getDescribe().getType()+'©S1©'+so.get(s));
        	}
            returnString.add(String.join(strs,'©S2©'));
        }
        return returnString;
    }

    @AuraEnabled
    public static String getLabel(String sobj, String field){
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        if(field.contains('.')){
            String[] helper = field.split('\\.');
            return helper[0]+' '+helper[1];
        }
        Schema.SObjectType sobjSchema = schemaMap.get(sobj);
        Map<String, Schema.SObjectField> fieldMap = sobjSchema.getDescribe().fields.getMap();
        return fieldMap.get(field).getDescribe().getLabel();
    }
}