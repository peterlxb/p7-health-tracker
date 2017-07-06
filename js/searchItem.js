// this model is used for search result items from the api

var SearchItem = Backbone.Model.extend({

	parse: function(item){
		return item.fields;
	},

});