// jBoxExpander v0.1 - jQuery box expander/collapser plugin
// (c) 2012 Andreas Scherer
// github: https://github.com/t3asdev/jBoxExpander
(function($){
	$.fn.jBoxExpander = function(options) {

		var defaults = {
			collapsedHeight: 170,
			moreText: "+",
			lessText: "-",
			fxDuration: 1000
		};

		var options = $.extend(defaults, options);

		function getObjectDimensions(box){
			return {
				"collapsedContentHeight": options.collapsedHeight - $('.boxControls', box).height(),
				"expandedContentHeight": $('.jBoxTruncateContentHolder', box).height(),
				"collapsedBoxHeight": options.collapsedHeight,
				"expandedBoxHeight": $('.jBoxTruncateContentHolder', box).height() + $('.boxControls', box).height()
			};
		}

		return this.each(function() {
			var box = $(this);
			box.height(options.collapsedHeight);

			box.wrapInner('<div class="jBoxTruncateContentHolder"></div>').wrapInner('<div class="jBoxTruncateContent"></div>');
			$('.jBoxTruncateContentHolder', box).append('<div class="clearer">&nbsp;</div>');
			var boxContent = $('.jBoxTruncateContent', box);

			if (boxContent.height() > box.height()){
				boxContent.css('overflow', 'hidden');
				box.append('<div class="boxControls"><a class="moreLessLink" onfocus="if(this.blur)this.blur();" href="#" style="display: block;">' + options.moreText + '</a>');

				dimensions = getObjectDimensions(box);
				boxContent.height(dimensions.collapsedContentHeight);

				var morLessLink = $('.moreLessLink', box);
				morLessLink.click(function() {
					dimensions = getObjectDimensions(box);
					if(morLessLink.text() == options.moreText) {
						boxContent.animate({
							height: dimensions.expandedContentHeight + 'px'
						}, options.fxDuration);
						box.animate({
							height: dimensions.expandedBoxHeight + 'px'
						}, options.fxDuration);
						morLessLink.text(options.lessText);
					} else {
						boxContent.animate({
							height: dimensions.collapsedContentHeight + 'px'
						}, options.fxDuration);

						box.animate({
							height: dimensions.collapsedBoxHeight + 'px'
						}, options.fxDuration);

						morLessLink.text(options.moreText);
					}
					return false;
				});
			}

		});
	};
})(jQuery);