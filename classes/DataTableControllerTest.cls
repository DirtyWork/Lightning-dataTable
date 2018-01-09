/**
 * Created by Gabriel on 11.4.17.
 */

@IsTest
private class DataTableControllerTest {
    static testMethod void testDataTable() {
        Account acc = new Account(Name = 'TestAccount');
        insert acc;

        Opportunity opp = new Opportunity(Name = 'Test1111',
                                          Amount = 1000000,
                                          StageName = 'Prospecting',
                                          CloseDate = System.today(),
                                          AccountId = acc.Id);
        insert opp;

        String sobj = 'Opportunity';
        String fields = 'Name,Amount,StageName,Account.Name';
        String clause = 'Amount > 10000';
        String sortBy = 'Name';
        String sortOrder = 'ASC';
        String recordId = acc.Id;
        String recordIdObject = 'AccountId';
        String fieldForLabel = 'Name';

        Test.startTest();
        List<String> data = DataTableController.getData(sobj, fields, clause, sortBy, sortOrder, recordId, recordIdObject);
        String returnLabel = DataTableController.getLabel(sobj, fieldForLabel);
        clause = '';
        sortBy = 'Account.Name';
        fieldForLabel = 'Account.Name';
        returnLabel = DataTableController.getLabel(sobj, fieldForLabel);
        data = DataTableController.getData(sobj, fields, clause, sortBy, sortOrder, recordId, recordIdObject);
        Test.stopTest();
    }
}