
		var app = angular.module('movieRecommender', ['ngRoute', 'ngCookies', 'angular-jwt']);

		app.run(['$rootScope', function($rootScope) {
		    $rootScope.API_URL = 'http://localhost:8090';
		}]);
		
		app.config(function($routeProvider, $locationProvider){
			$routeProvider
			.when("/login", {
				templateUrl: "views/login.html"
			})
			.when("/home", {
				templateUrl: "views/home.html"
			})
			.when("/", {
				templateUrl: "views/home.html"
			})
			.otherwise({
				template: "<h1>Welcome !</h1>"
			});

			$locationProvider.html5Mode(true);
		})
		
		app.controller('appController', ['$scope', '$rootScope', '$http', '$cookies', '$cookieStore', '$timeout', '$location', function($scope, $rootScope, $http, $cookies, $cookieStore, $timeout, $location) {
			    console.log('app controller');
			
			     $rootScope.resetSession = function(){
			        $http.defaults.headers.common['Authorization'] = '';
			        $rootScope.loggedIn = false;
			        $rootScope.userId = false;
			        $rootScope.userToken = '';
			        $rootScope.user = {}
			        $cookieStore.put('loggedIn', $rootScope.loggedIn);
			        $cookieStore.put('userId', $rootScope.userId);
			        $cookieStore.put('userToken', $rootScope.userToken);
			        $cookieStore.put('user', $rootScope.user);
			    }
			
			   /// Cookies 
			    $rootScope.userToken = $cookieStore.get('userToken');
			    $rootScope.loggedIn = $cookieStore.get('loggedIn');
			    $rootScope.userId = $cookieStore.get('userId');
			    $rootScope.user = $cookieStore.get('user');
			
			console.log('login', $rootScope.loggedIn);
			    
			    if(typeof($rootScope.loggedIn) === 'undefined'){
			        $rootScope.resetSession()
			
			    }else{
			
			        $http.defaults.headers.common['Authorization'] = 'JWT ' + $rootScope.userToken;
			
			        $http.get($rootScope.API_URL+'/api/user/'+$rootScope.userId).then(function(response){
			                var id = response.data.id;
			                if (typeof(id) !== 'undefined'){
			                    $rootScope.user = response.data;
			                    $rootScope.loggedIn = true;
			                    $rootScope.userId = response.data.id;
			                    $cookieStore.put('loggedIn', $rootScope.loggedIn);
			                    $cookieStore.put('userId', $rootScope.userId);
			                    $cookieStore.put('user', $rootScope.user);
			
			                   
			
			                }else{
			                    //alert('no user')
			                }
			        });
			
			    }
			
			   
			   
			
			    $rootScope.signout = function(){
			        if($rootScope.loggedIn === true){
			            $rootScope.resetSession();
			            // alert("You've been successfully signed out")
			            $location.path("/home");
			        }
			    }
			
			}]);



		var signupCtrl =  function($scope, $http){
			$scope.user = {};
			$scope.signuperror = "";

			console.log('hello signup');

			$scope.validateEmail = function(email){

				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
					return true;
				}else{
					return false;
				}
			}

			$scope.validatePassword = function(pw1, pw2){

				if(pw1 != pw2){
					return "Two passwords not matched";
				}

				if(pw1.length < 6){
					return "Password must be at least 6 characters";
				}

				return true;


			}

			$scope.signup = function(){
				var user = $scope.user;
				console.log(user);

				var v = $scope.validateEmail(user.username);
				console.log(v)

				if(v == false){
					$scope.signuperror = "Invalid Email !!";
					return;
				}

				v = $scope.validatePassword(user.password, user.password2);

				if(v != true){
					$scope.signuperror = v;
				}



				$http({
					url: 'http://127.0.0.1:8090/api/user/register',
					method: "POST",
					data: user
				}).then(function(response){
					alert('User registered !!');
					//redirect
					window.location.href = '/home';
				}, 
				function(response){
					alert('Error creating user' + response);

				});




			}
		};

		var loginCtrl =  function($scope, $http, $rootScope, $cookies, $cookieStore,  jwtHelper){
			$scope.user = {email:"", password:""};
			$scope.loginError = "";

			$scope.validateEmail = function(email){

				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
					return true;
				}else{
					return false;
				}
			}

			$scope.login = function(){
				console.log('hello login');
				var user = $scope.user;
				var v = $scope.validateEmail(user.username);

				if(v == false){
					$scope.loginError  = "Invalid Email";
					return;
				}


				$http({
					url: $rootScope.API_URL + '/api/user/login',
					method: "POST",
					data: user
				}).then(function(response){
					//alert('User logged in !!');
					//redirect to home page.
					
					console.log(response.data);
		            var data = response.data;
		            if (typeof(data.token) != 'undefined') {
		                var userid = data.id;
		                console.log('logged in user : ' + userid );
		                $rootScope.userId = userid;
		                $rootScope.loggedIn = true;
		                $rootScope.userToken = data.token
		                $cookieStore.put('loggedIn', $rootScope.loggedIn);   
		                $cookieStore.put('userId', $rootScope.userId);
		                $cookieStore.put('userToken', $rootScope.userToken);
		                $http.defaults.headers.common['Authorization'] = 'JWT ' + $rootScope.userToken;

		                window.location.href = '/home';
		            } else {
		                alert(response.data.message);
		            }
		            
					
				}, 
				function(response){
					alert('Error loggin in' + response);
					//window.location.href = '/home';
					
				});



			}
			


		};
		
		var homeCtrl =  function($scope, $http, $rootScope, $cookies, $cookieStore,  jwtHelper){
			$scope.movies = [];
			$scope.recommended_movies = [];
			$scope.keyword = '';
			$scope.results = [];
			$http({
				url: $rootScope.API_URL + '/api/movie/',
				method: "GET"
				
			}).then(function(response){
				console.log(response);
				$scope.movies = response.data;
				
			});
			
			$scope.searchMovie = function(){
				$http({
					url: $rootScope.API_URL + '/api/movie/search/'+$scope.keyword,
					method: "GET"
					
				}).then(function(response){
					console.log(response);
					$scope.results = response.data;
					
				});
				
			}
			

		}

		app.controller('signupCtrl', signupCtrl);

		app.controller('loginCtrl', loginCtrl);
		
		app.controller('homeCtrl', homeCtrl);

