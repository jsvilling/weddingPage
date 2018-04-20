/*
	Based on Dimension by HTML5 UP - html5up.net | @ajlkn
	Edited by Joshua Villing
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	skel.breakpoints({
		xlarge:		'(max-width: 1680px)',
		large:		'(max-width: 1280px)',
		medium:		'(max-width: 980px)',
		small:		'(max-width: 736px)',
		xsmall:		'(max-width: 630px)',
		xxsmall:	'(max-width: 360px)'
	});

	$(function() {
		var	$window = $(window);
		var	$body = $('body');
		var	$header = $('#header');
		var	viewHandler = new ViewHandler($body, $header);
		
		var animationHandler = new AnimationHandler($window, $body);

		initFlexBox();
		initNav($header);

		var router = new Router($window, viewHandler);
		router.routeToInitialView();
	});
	
	var ViewHandler = function($body, $header) {
		var	$main = $('#main');
		var	$footer = $('#footer');
		var	delay = 100;
		var locked = false;
		
		this.load = function() {
			var fileName = "include/" + location.hash.substr(1) + ".html";
			$main.load(fileName, {}, function(responseText, textStatus, req) {
				show(location.hash.substr(1));
			});
		}	
		var show = function(id, initial) {
			var $article = $("#" + id);
			if ($article.length == 0) {
				return;
			}
			
			locked = handleLock(locked, $article);
			if(!locked) {
				return;
			}
			
			// Article already visible? Just swap articles.
			if ($body.hasClass('is-article-visible')) {

				// Deactivate current article.
				var $prevArticle = $main.children('article').filter('.active');
				$prevArticle.removeClass('active');

				// Show article.
				setTimeout(function() {
					$prevArticle.hide();
					$article.show();
					setTimeout(function() {
						$article.addClass('active');
						$(window).scrollTop(0).triggerHandler('resize.flexbox-fix');
						// Unlock.
						setTimeout(function() {
							locked = false;
						}, delay);
					}, 25);
				}, delay);
			} else {

				// Mark as visible.
				$body.addClass('is-article-visible');

				// Show article.
				setTimeout(function() {

					$header.hide();
					$footer.hide();

					$main.show();
					$article.show();

					// Activate article.
					setTimeout(function() {
						$article.addClass('active');
							$(window).scrollTop(0).triggerHandler('resize.flexbox-fix');

							// Unlock.
							setTimeout(function() {
								locked = false;
							}, delay);
						}, 25);
					}, delay);
				}
						
				$('<div class="close">Close</div>')
					.appendTo($article)
					.on('click', function() {
						location.hash = '';
					});

				$article.on('click', function(event) {
					event.stopPropagation();
				});
			};
		this.hide = function(addState) {
			var $article = $main.children('article').filter('.active');

			if (!$body.hasClass('is-article-visible')) {
				return;
			}

			// Add state?
			if (typeof addState != 'undefined' && addState === true) {
				history.pushState(null, null, '#');
			}
			
			locked = handleLock(locked, $article);
			if(!locked) {
				$window.scrollTop(0).triggerHandler('resize.flexbox-fix');
				return;
			}

			$article.removeClass('active');

			// Hide article.
			setTimeout(function() {

				$article.hide();
				$main.hide();

				$footer.show();
				$header.show();

				// Unmark as visible.
				setTimeout(function() {

					$body.removeClass('is-article-visible');
					$(window).scrollTop(0).triggerHandler('resize.flexbox-fix');
					// Unlock.
					setTimeout(function() {
						locked = false;
					}, delay);
				}, 25);

			}, delay);
		};
		this.hideTargetElement = function() {
			$main.hide();
		}
		var handleLock = function(locked, article) {
			// Already locked? Speed through "show" steps w/o delays.
			if (locked || (typeof initial != 'undefined' && initial === true)) {
				// Mark as switching.
				$body.addClass('is-switching');

				// Mark as visible.
				$body.addClass('is-article-visible');

				$header.hide();
				$footer.hide();
				
				$main.show();
				article.show();

				article.addClass('active');

				locked = false;

				// Unmark as switching.
				setTimeout(function() {
					$body.removeClass('is-switching');
				}, (initial ? 1000 : 0));
				return locked;
			}
			return true;
		}
	}
	
	function Router(handler, outlet) {
		var handler = handler
		var outlet = outlet;
		this.routeToInitialView = function() {
			if (!isHome()) {
				outlet.load();
				handler.trigger('load');
			} else {
				outlet.hideTargetElement();
			}		
		}
		handler.on('hashchange', function(event) {
			event.preventDefault();
			event.stopPropagation();
			if (isHome()) {
				outlet.hide();
			} else {
				outlet.load();
			}
		});
		// Right place?
		handler.on('click', function(event) {
			if (!isHome()) {
				location.hash = '';
			}
		});
		handler.on('keyup', function(event) {
			if(event.keyCode === 27 && !isHome()) {
				location.hash = '';
			}
		});
		var isHome = function() {
			return location.hash == '' || location.hash == '#';
		}
	}
	
	function AnimationHandler(handler, target) {
		var handler = handler;
		var target = target;
		handler.on('load', function(event) {
			enable();
		});
		var init = function() {
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual';
			} else {
				var	oldScrollPos = 0;
				var scrollPos = 0;
				var	$htmlbody = $('html,body');

				$window.on('scroll', function() {
					oldScrollPos = scrollPos;
					scrollPos = $htmlbody.scrollTop();
				}).on('hashchange', function() {
					$window.scrollTop(oldScrollPos);
				});
			}
			disable();
		}
		var enable = function() {
			setTimeout(function() {
				target.removeClass('is-loading');
			}, 50);
		}
		var disable = function() {
			target.addClass('is-loading');
		}
		init();
	}

	var initFlexBox = function() {
		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Fix: Flexbox min-height bug on IE.
		if (skel.vars.IEVersion < 12) {
			var flexboxFixTimeoutId;
			$window.on('resize.flexbox-fix', function() {
				clearTimeout(flexboxFixTimeoutId);
				flexboxFixTimeoutId = setTimeout(function() {
					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');
				}, 250);
			}).triggerHandler('resize.flexbox-fix');
		}
	}
	
	var initNav = function($header) {
		var $nav = $header.children('nav');
		var	$nav_li = $nav.find('li');
		if ($nav_li.length % 2 == 0) {
			$nav.addClass('use-middle');
			$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');
		}
	}
	
	
	
})(jQuery);