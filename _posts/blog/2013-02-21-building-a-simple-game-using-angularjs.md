---
title: Building a simple game using AngularJs
category: blog
excerpt: Tic Tac Toe game in AngularJs
layout: post

draft: true
---

_Note\: this post is in progress. You can see the view the [changes and updates on github](https://github.com/alexjpaz/alexjpaz.github.com/blob/master/_posts/blog/2013-02-21-building-a-simple-game-using-angularjs.md)_

We will be building a simple TicTacToe game leveraging [AngularJs](http://angularjs.org) for ui-binding and [dependency injection](http://merrickchristensen.com/articles/javascript-dependency-injection.html).

### Part One: Laying out the classes

#### The TicTacToe Module

First we will define out _TicTacToeGame_ module and attach all the classes that will hold our game logic.

{% highlight javascript %}
(function() {
	var game = angular.module('TicTacToeGame', []);
	
	// ...
	// Game code, controllers, etc
})();
{% endhighlight %}

The _TicTacToeBoard_ class will handle the game state. Below is the "skeleton" for our class.

{% highlight javascript %}
game.factory('TicTacToeBoard', function(GameException) {
	function TicTacToeBoard() {
		// Initial game state
	}

	TicTacToeBoard.prototype.putMark = function() {};
	TicTacToeBoard.prototype.checkGameState = function() {};
	
	return TicTacToeBoard
});
{% endhighlight %}

##### Handling Game state

The _TicTacToeGameCtrl_ is the glue that ties together the state of the _TicTaceToeBoard_ class and rendering view (defined later).

{% highlight javascript %}
{% raw %}
game.controller('TicTacToeGameCtrl', function($scope, TicTacToeBoard) {
	
	$scope.reset = function() {
		$scope.board = new TicTacToeBoard();
	};
	
	$scope.reset();
});
{% endraw %}
{% endhighlight %}

##### Exceptions
If a player tries to mark a square that it already marked we can raise an exception and have our game handle it or bubble that up to our controller to render in the view.

First we need to create a base exception class called _GameException_. We can use this to tie into AngularJs to broadcast an event, essentially bubbling the exception up to the _TicTacToeGameCtrl_ to handle.
{% highlight javascript %}
utils.factory('GameException', function($log, $rootScope) {
	return function() {
		$rootScope.$broadcast('GameExceptionError',this);
	};
});
{% endhighlight %}

We will add use the [$scope.$on](http://docs.angularjs.org/api/ng.$rootScope.Scope#$on) method watch for the event _GameExceptionError_ and simply update view when an exception has occured.

{% highlight javascript %}
{% raw %}
$scope.$on('GameExceptionError', function(event, exception) {
	$scope.exception = exception; 
});
{% endraw %}
{% endhighlight %}

_Note: We could pass this information on to a rendering class to render to a canvas object or even tie into the AngularJs [$digest](http://docs.angularjs.org/api/ng.$rootScope.Scope#$digest) cycle to do that work for you. That depends on your design goals._

##### The View


{% highlight html %}
{% raw %}
<div class='game-tic-tac-toe' ng-controller='TicTacToeGameCtrl'>
	<div class='board'>
		<div ng-repeat='b in board.squares' 
			class='square' 
			ng-click='board.putMark($index)' 
			ng-class='{"square-win": boardOverlay[$index]}'>{{ b }}</div>
	</div>
	<hr />
	<div class='alert alert-danger' ng-show='exception'> {{ exception }}</div>
	<div class='alert alert-success' ng-hide='!board.winner'>
		<span>{{ board.winner.mark }} has won!</span> 
		<a ng-click='reset()'>Play again?</a>
	</div>
</div>
{% endraw %}
{% endhighlight %}

##### Next steps

+ The game logic
+ Creating [Google Hangout API](https://developers.google.com/+/hangouts/) app
+ Rendering with canvas
+ [Code example on github (WIP)](https://github.com/alexjpaz/sandbox/tree/tic-tac-toe)
