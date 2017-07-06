// I have used this course as a helper since I was new to Backbone
// https://www.udemy.com/backbonejs-tutorial/learn/#/

// Events help from
// https://lostechies.com/derickbailey/2012/04/03/revisiting-the-backbone-event-aggregator-lessons-learned/
var App = App || {};

App.selectedItem = {};

App.events = _.extend({}, Backbone.Events);
App.events.on("selectedItem:event", function(data){

	App.selectedItem = new SearchItem(data.model.attributes);

	var $nutri = $("#nutritional-facts");
	$nutri.html('');
  	App.view = new NutritionLabelView({ model: App.selectedItem });
	$nutri.append(App.view.render().$el);
	$('.nutritional-placeholder').hide();

});

// when user clicks 'add to eaten' on nutritional info view
// it adds item to App.eatenItems
App.events.on('addtoeaten:event', function(){

	// gets amount eaten for selected item from input on nutritional label
	App.selectedItem.quantityEaten = $('.unitQuantityBox').val();

	// creates a new item to be added to eatenItems collection with the correct attributes
	var eaten = new EatenItem(App.selectedItem.attributes);
	// adds quantityEatem as an attribute for eaten item
	eaten.attributes.quantityEaten = App.selectedItem.quantityEaten;
	// adds time eaten to item
	eaten.attributes.timeEaten = Date.now()
	// adds eaten item to collection
	App.eatenItems.add(eaten);
	eaten.save();

	App.eatenItemsView.render();

	// hides message saying user ate nothing
	App.eatenItemsView.hasEaten();

	// show nutritinal info view, with label and buttons
	$('#nutritional').toggle();

	// updates calories counter progress bar
	App.eatenItemsView.updateProgressBar();

});

$(document).ready(function(){

	// initialize properties for app
	App.searchItems = new SearchItems();
	App.searchItemsView = new SearchItemsView({ model: App.searchItems});
	App.nutritionInfoView = new NutritionInfoView();

	App.eatenItems = new EatenItems();
	// localstorage help from: http://stackoverflow.com/questions/12606837/how-to-get-backbone-collection-from-backbone-localstorage
	App.eatenItems.localStorage = new Backbone.LocalStorage("DietApp"),
	App.eatenItems.fetch();

	App.eatenItemsView = new EatenItemsView({ model: App.eatenItems });
	App.eatenItemsView.render();

	// adds to screen static content for views
	$("#search").append(App.searchItemsView.render().$el);

	var html = Mustache.render($("#searchTemplate").html());
	$("#search").append(html);

	App.searchItemsView.hideSearchResults();
	App.nutritionInfoView.hideNutritional();

	// if collection of eaten items > 0 items, hide 'nothing' message
	// and show total calories div
	if(App.eatenItems.length == 0){
		$('.eaten-div').after('<p class="nothing text-center">nothing :(</p>');
	}else{
		$('.total-calories').toggle();
	}

	$('.nothing').toggle();
});

$(window).load(function(){
	// squares div for search results list
	App.squareSearchList();
});

$(window).resize(function() {
	// squares div for search results list
	App.squareSearchList();
});

// squares div for search results list
App.squareSearchList = function(){
	// search items list div 1:1 proportion help from:
	// http://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout
  	var width = $('.results').width();
	$('.results').css({'height':width + 'px'});
}