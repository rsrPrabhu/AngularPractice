describe('first test', () => {
    let testVariable: any;
    describe('first test 33', () => {
        
        beforeEach(() => {  // it will run bofore the current testcase run 
            testVariable = {};
        });
    
        it('should return true', () => {
            // arrange ,
            testVariable.a = false;
    
            //  act , 
            testVariable.a = true;
    
            // assert
            expect(testVariable.a).toBe(true);  
        });
    });
});