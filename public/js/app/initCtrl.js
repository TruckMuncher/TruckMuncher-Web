angular.module('TruckMuncherApp').controller('initCtrl', ['$scope', 'TokenService',
    function ($scope, TokenService) {
        $scope.initializeTokens = function (twitter_token, twitter_token_secret, facebook_token) {
            if(twitter_token === 'undefined' || twitter_token === 'null')
                TokenService.setTwitter(null, null);
            else
                TokenService.setTwitter(twitter_token, twitter_token_secret);

            if(facebook_token === 'undefined' || facebook_token === 'null')
                TokenService.setFacebook(null);
            else
                TokenService.setFacebook(facebook_token);
        };
    }
]);