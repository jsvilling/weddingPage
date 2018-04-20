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
		var	$wrapper = $('#wrapper');
		var	$header = $('#header');
		var	$footer = $('#footer');
		var	$main = $('#main');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');
		$window.on('load', function(event) {
			setTimeout(function() {
				$body.removeClass('is-loading');
			}, 50);
		});

		initFlexBox();
		initNav($header);

		// Main.
		var	delay = 100;
		var locked = false;
		
		$main._load = function() {
			var fileName = "include/" + location.hash.substr(1) + ".html";
			$main.load(fileName, {}, function(responseText, textStatus, req) {
				$main._show(location.hash.substr(1));
			});
		}
		
		$main._show = function(id, initial) {
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
						$window.scrollTop(0).triggerHandler('resize.flexbox-fix');
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
							$window.scrollTop(0).triggerHandler('resize.flexbox-fix');

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

		$main._hide = function(addState) {
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
					$window.scrollTop(0).triggerHandler('resize.flexbox-fix');
					// Unlock.
					setTimeout(function() {
						locked = false;
					}, delay);
				}, 25);

			}, delay);
		};

		// Events.
		$body.on('click', function(event) {
			if ($body.hasClass('is-article-visible')) {
				$main._hide(true);
			}
		});
		
		$window.on('keyup', function(event) {
			if(event.keyCode === 27 && $body.hasClass('is-article-visible')) {
				$main._hide(true);
			}
		});

		$window.on('hashchange', function(event) {
			event.preventDefault();
			event.stopPropagation();
			if (location.hash == '' || location.hash == '#') {
				$main._hide();
			} else {
				$main._load();
			}
		});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		} else {
			var	oldScrollPos = 0;
			var scrollPos = 0;
			var	$htmlbody = $('html,body');

			$window
				.on('scroll', function() {
					oldScrollPos = scrollPos;
					scrollPos = $htmlbody.scrollTop();
				})
				.on('hashchange', function() {
					$window.scrollTop(oldScrollPos);
				});
			}
			
		// Initial article.
		if (location.hash != '' &&	location.hash != '#') {
			$main._load();
			$window.trigger('load');
		} else {
			$main.hide();
		}		
	});
	
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
	
	var handleLock = function(locked, article) {
		// Already locked? Speed through "show" steps w/o delays.
		if (locked || (typeof initial != 'undefined' && initial === true)) {
			// Mark as switching.
			$('body').addClass('is-switching');

			// Mark as visible.
			$('body').addClass('is-article-visible');

			$('#header').hide();
			$('#footer').hide();
			
			$('#main').show();
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
	
})(jQuery);