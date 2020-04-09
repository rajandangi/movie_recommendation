
		var app = angular.module('movieRecommender', ['ngRoute']);

		app.config(function($routeProvider, $locationProvider){
			$routeProvider
			.when("/login", {
				templateUrl: "login.html"
			})
			.when("/home", {
				templateUrl: "home.html"
			})
			.otherwise({
				template: "<h1>Welcome !</h1>"
			});

			$locationProvider.html5Mode(true);
		})

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

				var v = $scope.validateEmail(user.email);
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
					url: 'http://127.0.0.1:8001/api/signup',
					method: "POST",
					data: user
				}).then(function(response){
					alert('User registered !!');
					//redirect
				}, 
				function(response){
					alert('Error creating user' + response);

				});




			}
		};

		var loginCtrl =  function($scope, $http){
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
				var v = $scope.validateEmail(user.email);

				if(v == false){
					$scope.loginError  = "Invalid Email";
					return;
				}

				if(user.email = 'ab@gmail.com' && user.password == '123456'){
					$scope.loginError = 'You are logged in !!';
				}else{
					$scope.loginError = 'Invalid email/password';
				}

				$http({
					url: 'http://127.0.0.1:8001/api/login',
					method: "POST",
					data: user
				}).then(function(response){
					alert('User logged in !!');
					//redirect to home page.
				}, 
				function(response){
					alert('Error loggin in' + response);
					
				});



			}
			


		};

		app.controller('signupCtrl', signupCtrl);

		app.controller('loginCtrl', loginCtrl);

