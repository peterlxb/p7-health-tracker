// this view contains nutritional label and buttons

var NutritionInfoView = Backbone.View.extend({

	el: '#nutritional',

	attributes: {

	},

	initialize: function(){
		this.render();
	},

	events: {
	 	"click .add-eaten": "onAddEaten",
	 	"click .cancel-eaten": "onCancel"
	},

	// hides nutritional info view when 'cancel' is clicked
	onCancel: function(){
		$('#nutritional').toggle();
	},

	// adds search item to eaten items
	onAddEaten: function(){
		App.events.trigger("addtoeaten:event");
	},

	
	hideNutritional: function(){
		if(this.$el.is(':visible')){
			this.$el.toggle();
		}
	},

	render: function(){

		var template = $("#nutritionalInfoTemplate").html();
		var html = Mustache.render(template);
		this.$el.html(html);

		return this;
	}

});
