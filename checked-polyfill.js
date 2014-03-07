/*	Checked Polyfill 1.5
	Provides a .checked class that works like the :checked pseudo class on radio buttons and checkboxes but is available in older browsers such as IE7/8. 
	https://github.com/rdebeasi/checked-polyfill */

(function ($) {
	$.fn.checkedPolyfill = function (options) {
		function supportsChecked() {
			// Create a hidden input, style it, and then check to see whether the styles are applied.
			// Inspired by Modernizr's testStyles function
			var $style = $('<style type="text/css"> #checkedPolyfill-test:checked { margin-left: 123456px; display: none; } </style>}'),
				$checkbox = $('<input type="checkbox" checked id="checkedPolyfill-test" />'),
				result;
			$('head').append($style);
			$('body').append($checkbox);
			if ($checkbox.css('margin-left') === '123456px') {
				result = true;
			} else {
				result = false;
			}
			$style.remove();
			$checkbox.remove();
			return result;
		}

		if( supportsChecked() ) {
			// Browser natively supports :checked and doesn't need the polyfill.
			return false;
		}

		function checkValue ($elem) {
			var $label = $('label[for="' + $elem.attr('id') + '"]');
			// TODO: also find labels wrapped around the input
			if ($elem.prop('checked')) {
				$elem.addClass('checked');
				$label.addClass('checked');
			} else {
				$elem.removeClass('checked');
				$label.removeClass('checked');
			}
			// We modify the label as well as the input because authors may want to style the labels based on the state of the chebkox, and IE7 and IE8 don't fully support sibling selectors.
			// For more info: http://www.quirksmode.org/css/selectors/#t11
			return $elem;
		}

		return this.each(function () {
			var $self = $(this);
			if ($self.prop('type') === 'radio') {
				$('input[name="' + $self.prop('name') + '"]').change(function() {
					checkValue($self);
				});
			} else if ($self.prop('type') === 'checkbox') {
				$self.change(function() {
					checkValue($self);
				});
			}
			checkValue($self); // Check value when plugin is first called, in case a value has already been set.
		});
	};
})(jQuery);