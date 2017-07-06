var SearchItemsView = Backbone.View.extend({

	tagName: "div",

	attributes: {
		class: 'ud-search-input input-group'
	},

	// called when the view is created
	initialize: function(){

		var template = $("#searchInputTemplate").html();
		var html = Mustache.render(template, this.model.toJSON());
		this.$el.html(html);

	},

	events: {
		"click #searchBtn": "onClickSearch",
		"keypress #query": "onEnterPress"
	},

	// when search button is clicked or 'enter' is pressed
	onClickSearch: function(){
		var self = this;

		// show results div
		if($('.results').css('display') == 'none'){
			$('.results').toggle();
		}

		// hides nutritionalInfoView if it was open from a previous query
		App.nutritionInfoView.hideNutritional();

		// makes results div 1:1
		App.squareSearchList();

		// SPINNER

		// loading spinner help from:
		// http://abandon.ie/notebook/simple-loading-spinner-for-backbonejs
		var opts = {
			  lines: 13 // The number of lines to draw
			, length: 28 // The length of each line
			, width: 14 // The line thickness
			, radius: 42 // The radius of the inner circle
			, scale: .25 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#000' // #rgb or #rrggbb or array of colors
			, opacity: 0.25 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 1 // Rounds per second
			, trail: 60 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '50%' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'absolute' // Element positioning
		}
		var target = document.getElementById('ud-search-items');
		var spinner = new Spinner(opts).spin(target);

		// END SPINNER

		// gets value entered on text input
		this.model.query = $("#query").val();

		// error handling help from:
		// http://monicalent.com/blog/2013/07/29/using-a-custom-event-to-detect-fetch-errors-in-backbone-js/
		this.model.fetch({
			reset: true,
			success: function(data){
				self.render();
			},
			error: function() {
			    alert("Uh-oh, couldn't get data from Nutritionix API...");
			}
		});
	},

	// hides '#nutritional' div
	// http://stackoverflow.com/questions/12353741/how-to-check-if-a-div-is-visible-state-or-not
	hideSearchResults: function(){
		if($('.results').is(':visible')){
			$('.results').toggle();
		}
	},

	// when user presses 'enter', trigger search
	onEnterPress: function(e){

		 if (e.keyCode == 13)
			this.onClickSearch();
	},

	render: function(){
		var self = this;

		// resets search results list
		var $searchResults = $("#ud-search-items");
		$searchResults.html("");

		// populates list with new data
		this.model.each(function(item){
			var view = new SearchItemView({ model: item });
			$searchResults.append(view.render().$el);
		});

		return this;
	}

});