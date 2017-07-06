var EatenItemsView = Backbone.View.extend({

	el: '#list',

	attributes: {

	},

	// total calories from eaten items
	totalCalories: 0,

	// called when our view is created
	initialize: function(){

		var template = $("#eaten-content").html();
		var html = Mustache.render(template, this);
		this.$el.append(html);

		this.model.on("remove", this.onDeleteEatenItem, this);
	},

	events: {

	},

	onDeleteEatenItem: function(item){
		// removes item from dom
		this.$("li#" + item.cid).remove();
		this.render();
		// adds 'nothing' eaten message if eaten list < 0
		this.hasEaten();
	},

	// shows 'nothing' eaten message if eaten list < 0
	// or shows 'total calories' div
	hasEaten: function(){
		if(App.eatenItems.length == 0){
			$('.total-calories').hide();
			$('.nothing').show();
		} else {
			$('.total-calories').show();
			$('.nothing').hide();
		}
	},

	// updates progress bar color
	updateProgressBar: function(){
		var self = this;

		var percentageCals = self.getPercentageCals();

		if (percentageCals < 25){
			$("#calories-bar").removeClass();
			$( "#calories-bar" ).addClass('progress-bar progress-bar-info');
		} else if (percentageCals < 75) {
			$("#calories-bar").removeClass();
			$( "#calories-bar" ).addClass('progress-bar progress-bar-success');
		} else if (percentageCals < 90) {
			$("#calories-bar").removeClass();
			$( "#calories-bar" ).addClass('progress-bar progress-bar-warning');
		} else if (percentageCals >= 90) {
			$("#calories-bar").removeClass();
			$( "#calories-bar" ).addClass('progress-bar progress-bar-danger');
		} else {
			$("#calories-bar").removeClass();
			$( "#calories-bar" ).addClass('progress-bar progress-bar-info');
		}
	},

	// gets percentage of daily recommended calories consumed
	// hard-coded for 2000/day
	getPercentageCals: function(){
		var self = this;

		var p = (self.totalCalories / 2000) * 100;

		return p;
	},

	// gets total calories eaten
	getTotalCalories: function(){
		return Math.ceil(this.totalCalories);
	},

	// deletes item older than 24 hours
	excludeOlder: function(item){

		var ONE_DAY = 60 * 60 * 24* 1000; /* ms */
		// destroys item if date is older than 24 hours
		if((Date.now() - ONE_DAY) > item.attributes.timeEaten){
			item.destroy();
		}
	},

	render: function(){
		var self = this;

		// resets eaten items list
		var $list = $('.eaten-items-list');
		$list.html("");
		self.totalCalories = 0;

		// drops from list items older than 24 hours
		this.model.each(function(item){
			self.excludeOlder(item);
		});

		this.model.each(function(item){

			var view = new EatenItemView({ model: item });
			$list.append(view.render().$el);

			// calculates calories for item (portion eaten * calories/portion)
			var itemCalories = item.attributes.nf_calories * (item.attributes.quantityEaten / item.attributes.nf_serving_size_qty);

			// increments total calories
			self.totalCalories += itemCalories;
		});

		var template = $("#eaten-total-calories").html();
		var html = Mustache.render(template, self);
		$('.total-calories').html(html);

		// sets percentage on progress bar
		var c = self.getPercentageCals();
		$('#calories-bar').css('width', c + '%');

		// updates progress bar color
		self.updateProgressBar();

		return this;

	}

});