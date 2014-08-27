(function($) {

	$(function() {
		$('a#download').click(function(e) {
			e.preventDefault();
			var clone = $('#contactus').clone();
			clone.find('input[type="submit"]').attr('value', 'Download');
			clone.find('> p').text("Thank you for your interest in Booz Allen's Polaris software. Please complete the form below and you will be directed to where you can download the software.");
			clone.find('> h2').text("Download Trial");
			$(clone).modal({
				overlayClose: true,
				overlayCss: {backgroundColor: "#000"},
				maxHeight: 540,
				maxWidth: 960,
				onShow: function(dialog) {
					dialog.overlay.css('opacity', .7);
					dialog.container.css('opacity', 1);
				},
				onClose: function(dialog) {
					dialog.overlay.css('opacity', 0);
					dialog.container.css('opacity', 0);
					setTimeout(function() {
						$.modal.close();
					}, 300);
				}
			});
		});

		$('a#learnMore').click(function(e) {
			e.preventDefault();
			$('#playVideo').animatescroll({scrollSpeed:600,easing:'easeOutQuad'});
		});

		$('a#orContactUs').click(function(e) {
			e.preventDefault();
			$('#contactus').animatescroll({scrollSpeed:1200,easing:'easeOutQuad'});
		});

		var $videoBackground = $('.videoButtonBackground');
		function getScrollPosition() {
			if (document.documentElement.scrollTop == 0) {
				return document.body.scrollTop;
			} else {
				return document.documentElement.scrollTop;
			}
		}
		$(window).scroll(function(e) {
			var offsetMax = 160;
			var scrollMax = 500;
			var top = Math.max(0, Math.min(scrollMax, getScrollPosition()));
			var offset = quadOut(top, -40, -offsetMax, scrollMax);
			var opacity = quadOut(top, -40, 0.5, scrollMax);
			if ($.browser.msie  && parseInt($.browser.version, 10) < 10) {
				$videoBackground.css({
					'top': offset + 'px'
				}, 0);
			} else {
				$videoBackground.css({
					'-webkit-transform': 'translate3d(0, ' + offset + 'px, 0)',
					'-moz-transform': 'translate3d(0, ' + offset + 'px, 0)',
					'-o-transform': 'translate3d(0, ' + offset + 'px, 0)',
					'transform': 'translate3d(0, ' + offset + 'px, 0)'
				}, 0);
			}
		}).trigger('scroll');

		$('.videoButton').click(function(e) {
			e.preventDefault();
			var $video = $('#playVideo .video > div').css('height', 435);
			$video.modal({
				overlayClose: true,
				overlayCss: {backgroundColor: "#000"},
				maxHeight: 540,
				maxWidth: 960,
				onShow: function(dialog) {
					dialog.overlay.css('opacity', .7);
					dialog.container.css('opacity', 1);
				},
				onClose: function(dialog) {
					dialog.overlay.css('opacity', 0);
					dialog.container.css('opacity', 0);
					setTimeout(function() {
						$.modal.close();
					}, 300);
				}
			});
		}).hover(function() {
			$('.videoButtonBackground').addClass('hover');
		}, function () {
			$('.videoButtonBackground').removeClass('hover');
		});

		// usage/description bubble interactions
		var selectedBubble = 0;
		$('.bubble').click(function(e) {
			var $el = $(this);
			var $bubbleImg = $el.find('.bubbleimg');
			var index = selectedBubble = $el.index();
			var color = $bubbleImg.css('background-color');

			var $container = $('#description');
			var prevHeight = $container.css('height', '').outerHeight();

			$('.descriptionContainer').hide().eq(index).show();
			var newHeight = $container.outerHeight();
			$container.css({height: prevHeight})
				.attr('class', 'section ' + $bubbleImg.attr('id'))
				.transition({
					'border-color': color,
					height: newHeight
				});

			$('#arrow').attr('class', $bubbleImg.attr('id'));
			$('.bubble .bubbleimg').each(function(i) {
				var $bubble = $(this);
				var size = index != i ? 60 : 70;
				$bubble.transition({
					width: size,
					height: size
				});
			});
		}).eq(0).click();

		$('.description-navigation a').mousedown(function(e) {
			var bubbles = $('.bubble');
			if ($(this).hasClass('previous')) {
				selectedBubble = (bubbles.length + selectedBubble - 1) % bubbles.length;
			} else {
				selectedBubble = (selectedBubble + 1) % bubbles.length;
			}
			bubbles.eq(selectedBubble).click();
			e.preventDefault();
		});





// usage/description bubble interactions
		var selectedBubble = 0;
		$('.featurebubble').click(function(e) {
			var $el = $(this);
			var $bubbleImg = $el.find('.featurebubbleimg');
			var index = selectedBubble = $el.index();
			var color = $bubbleImg.css('background-color');

			var $container = $('#featuredescription');
			var prevHeight = $container.css('height', '').outerHeight();

			$('.featuredescriptionContainer').hide().eq(index).show();
			var newHeight = $container.outerHeight();
			$container.css({height: prevHeight})
				.attr('class', 'featuresection ' + $bubbleImg.attr('id'))
				.transition({
					'border-color': color,
					height: newHeight
				});

			$('#featurearrow').attr('class', $bubbleImg.attr('id'));
			$('.featurebubble .featurebubbleimg').each(function(i) {
				var $bubble = $(this);
				var size = index != i ? 60 : 70;
				$bubble.transition({
					width: size,
					height: size
				});
			});
		}).eq(0).click();

		$('.featuredescription-navigation a').mousedown(function(e) {
			var bubbles = $('.featurebubble');
			if ($(this).hasClass('previous')) {
				selectedBubble = (bubbles.length + selectedBubble - 1) % bubbles.length;
			} else {
				selectedBubble = (selectedBubble + 1) % bubbles.length;
			}
			bubbles.eq(selectedBubble).click();
			e.preventDefault();
		});


		// scroll resources
		var resourcesPosition = 0;
		var resourcesMaxScroll = Math.max(0, $('#resourceList').outerWidth() - 900);
		var pageSize = 320;
		resourcesMaxScroll = Math.floor(resourcesMaxScroll / 320) * 320;
		$('#resources a.previous').click(function() {
			resourcesPosition  = Math.max(0, resourcesPosition - pageSize);
			$('#resourceList').transition({
				left: -resourcesPosition
			});
		});
		$('#resources a.next').click(function() {
			resourcesPosition  = Math.min(resourcesMaxScroll, resourcesPosition + pageSize);
			$('#resourceList').transition({
				left: -resourcesPosition
			});
		});


		// open screen shots
		$('#preview .flow-item').click(function() {
			var content = $('<table style="width: 100%; height: 100%;"><tr><td valign="middle" align="center"></td></tr></table>');
			var img = $('<img style="width: 100%; height: auto;"/>').attr('src', $(this).find('img').eq(0).data('full'));
			content.find('td').append(img);
			$(content).click(function() {
				$.modal.close();
			}).modal({
				overlayClose: true,
				overlayCss: {backgroundColor: "#000"},
				maxHeight: 640,
				maxWidth: 960,
				onShow: function(dialog) {
					dialog.overlay.css('opacity', .7);
					dialog.container.css('opacity', 1);
				},
				onClose: function(dialog) {
					dialog.overlay.css('opacity', 0);
					dialog.container.css('opacity', 0);
					setTimeout(function() {
						$.modal.close();
					}, 300);
				}
			});

		});
	});

	function quadOut(t, b, c, d) {
		t /= d;
		return -c * t*(t-2) + b;
	}

})(jQuery);