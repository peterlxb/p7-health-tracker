var EatenItemView = Backbone.View.extend({

	tagName: "li",

	attributes: {

	},

	initialize: function(){
		this.model.on("change", this.render, this);
	},

	 events: {
	 	"click #delete": "onClickDelete"
	 },

	 // deletes item and updates total calories
	 onClickDelete: function(){
	 	App.eatenItemsView.totalCalories -= this.getEatenCalories();
	 	this.model.destroy();
	 },

	// returns calories consumed for this item (qty * calories / portion)
	getEatenCalories: function(){

		var cals = (this.model.attributes.nf_calories / this.model.attributes.nf_serving_size_qty) * this.model.attributes.quantityEaten;

		return cals;
	},

	// return quantity eaten
	getEatenQuantity: function(){
		return this.model.attributes.quantityEaten;
	},

	render: function(){

		var template = $("#eatenItemTemplate").html();
		var html = Mustache.render(template, this);
		this.$el.html(html);

		this.$el.attr("id", this.model.cid);

		return this;
	}

});