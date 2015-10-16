angular.module('medicalReferrals', ['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })

        .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        })

    $urlRouterProvider.otherwise('home');
}])

.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
    $scope.test = 'Hello world!';
    $scope.posts = posts.posts;

    $scope.addPost = function() {
        if ($scope.title === '') {
            return;
        }
        $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0,
            comments: [
              {author: 'Joe', body: 'Called patient 9/2/2015, no answer', upvotes: 0},
              {author: 'Bob', body: 'Called patient 9/1/2015, left message', upvotes: 0}
            ]
        });
        $scope.title = '';
        $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
        post.upvotes += 1;
    }

}])

.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){
        if($scope.body === '') { return; }
        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });
        $scope.body = '';
    };
    $scope.incrementUpvotes = function(comment){
        comment.upvotes += 1;
    };
}])

.factory('posts', [function(){
    var o = {
        posts: []
    };
    return o;
}])


















