describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));
    var distanceFilter;

    beforeEach(inject(function ($filter) {
        distanceFilter = $filter('distance');
    }));

    it('should convert meters to miles', function () {
        var result = distanceFilter(1609, 'miles');
        expect(Math.abs(result - 1) < 0.001).toBe(true);
    });

    it('should just return meters for unknown units', function () {
        var meters = 10000;
        var result = distanceFilter(meters, 'metric-fuckton');
        expect(result).toEqual(meters);
    });
});