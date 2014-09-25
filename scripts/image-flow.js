(function($) {
	// transit must be loaded first to enable the fallback if necessary!
	if (!$.support.transition)
		$.fn.transition = $.fn.animate;

	$.fn.imageFlow = function(options) {
		var self = this;
		$(this).each(function() {
			var $el = $(this);
			var instance = $el.data('imageFlow');
			if (typeof options == 'string') {
				if (options == 'next') {
					instance.next();
				} else if (options == 'prev') {
					instance.prev();
				}
			} else {
				if (!instance) {
					var dataOptions = $el.data('options');
					if (dataOptions) {
						try {
							dataOptions = eval(dataOptions);
						} catch(exception) {
							dataOptions = {};
						}
					} else {
						dataOptions = {};
					}
					instance = new ImageFlow($el, $.extend({}, defaultOptions, options));
					$el.data('imageFlow', instance);
				}
			}
		});

		return this;
	};

	var defaultOptions = {
		itemSpacing: 50,
		scale: 2
	};

	function ImageFlow($el, options) {
		this.options = options;
		this.$el = $el;
		this.selectedIndex = -1;
		this.height = $el.height();
		this.width = $el.width();
		this.topPadding = Math.round(this.height * 0.05);
		this.selectedImageHeight = Math.round(this.height * 0.85);
		this.imageHeight = Math.round(this.selectedImageHeight * 0.5);
		this.titleHeight = Math.round(this.height * 0.1);
		$el.css({
			overflow: 'hidden'
		});

		var self = this;
		this.items = $el.find('.flow-item').css('visibility', 'hidden').mousedown(function(e) {
			self.showItem($(this).index());
			e.preventDefault();
		});
		$el.find('.flow-title').css({
			//'line-height': this.titleHeight + 'px',
			'height': this.titleHeight * 2,
			'white-space':'pre-wrap',
		});
		this.images = this.items.find('img').css({
			height: this.imageHeight,
			width: 'auto'
		});

		$('.flow-navigation').each(function() {
			var $nav = $(this);
			if ($el.is($nav.data('for'))) {
				$nav.find('.next').mousedown(function(e) {
					self.next();
					e.preventDefault();
				});
				$nav.find('.previous').mousedown(function(e) {
					self.prev();
					e.preventDefault();
				});
			}
		});

		var interval = setInterval(function() {
			var loaded = 0;
			self.images.each(function() {
				if (this.complete) {
					loaded++;
				}
			});
			if (loaded == self.images.length) {
				// all images loaded
				self.start();
				clearInterval(interval);
			}
		}, 100);
	}

	/**
	 * called internally once all images are loaded
	 */
	ImageFlow.prototype.start = function() {
		// layout all the items

		var spacing = this.options.itemSpacing;
		var center = Math.round(this.width / 2);
		var x = center;
		var top = this.topPadding + (this.selectedImageHeight - this.imageHeight) / 2;
		this.items.each(function(i) {
			var $item = $(this);
			$item.css({
				position: 'absolute',
				visibility: 'visible',
				left: x,
				top: top,
				opacity: 0
			}).data('flow-offset', Math.round(x - center));
			x += Math.round($item.width() + spacing);
			$item.transition({opacity: 1, delay: i * 50, duration: 500});
		});

		this.currentPosition = 0;
		this.showItem(0);
	};

	ImageFlow.prototype.next = function() {
		this.showItem((this.selectedIndex + 1) % this.items.length);
	};

	ImageFlow.prototype.prev = function() {
		this.showItem((this.selectedIndex - 1 + this.items.length) % this.items.length);
	};

	ImageFlow.prototype.showItem = function(index) {

		var left = false;
		if (this.selectedIndex == index) {
			return;
		} else if (index < this.selectedIndex) {
			left = true;
		}
		var duration = (Math.abs(index - this.selectedIndex) - 1) / this.items.length * 300 + 300;
		this.selectedIndex = index;

		var center = Math.round(this.width / 2);
		var targetPosition = -this.items.eq(this.selectedIndex).data('flow-offset');
		var nItems = this.items.length;
		var selectedScale = this.options.scale;
		this.items.each(function(i) {
			var $item = $(this);
			var offset = $item.data('flow-offset');
			$item.transition({
				left: targetPosition + offset + center - $item.width() / 2,
				scale: index == i ? selectedScale : 1,
				delay: (left ? nItems - i - 1 : i) * 30,
				'z-index': index == i ? 100 : 0
			}, duration, 'easeOutQuad');
		});
	};

	$.easing.easeOutQuad = function(t, ms, b, c, d) {
		return -c * t*(t-2) + b;
	};


	// autoload plugin on .image-flow items
	$(function() {
		$('.image-flow').imageFlow();
	});

})(jQuery);