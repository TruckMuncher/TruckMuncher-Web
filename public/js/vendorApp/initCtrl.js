angular.module('vendorApp').controller('initCtrl', ['$scope', 'TokenService',
    function ($scope, TokenService) {
        $scope.initializeTokens = function (twitter_token, twitter_token_secret, facebook_token) {
            twitter_token === 'null' ?
                TokenService.setTwitter(null, null) :
                TokenService.setTwitter(twitter_token, twitter_token_secret);

            facebook_token === 'null' ?
                TokenService.setFacebook(null) :
                TokenService.setFacebook(facebook_token);
        }
    }
]);