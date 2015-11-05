app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.items = [{
                label: 'Home',
                state: 'home'
            }, {
                label: 'About',
                state: 'about'
            }, {
                label: 'F.A.Q',
                state: 'faqs'
            }];

            scope.summoner;
            scope.lookUp = function(summoner) {
                console.log('hi', summoner)
                $state.go('stats', {
                    id: summoner
                })

            }


        }
    }
});