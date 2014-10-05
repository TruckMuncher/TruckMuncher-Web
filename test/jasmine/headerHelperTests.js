describe('headerHelpers', function () {
    beforeEach(module('truckmuncher.headerHelpers'));

    describe('TimestampAndNonceService', function () {
        var service;

        beforeEach(inject(function (TimestampAndNonceService) {
            service = TimestampAndNonceService;
        }));

        it('should return a time in the format yyyy-mm-ddT##:##:##Z', function(){
            var actual = service.getTimestamp();
            var regexPattern = new RegExp('^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$');

            expect(regexPattern.test(actual)).toBe(true, 'Date not in correct format: ' + actual);
        })


    })
});