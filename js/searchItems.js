var SearchItems = Backbone.Collection.extend({

	model: SearchItem, // the model that we can store in this collection

	// gets text input value on search div
	query: $("#search").val(),

	// parse help from:
	// http://stackoverflow.com/questions/30968949/backbone-js-collection-fetch-not-setting-response-objects-as-models
	parse: function(response){
		return _.map(response.hits, function(model){
			return model;
		})
	},

	urlRoot: "https://api.nutritionix.com/v1_1/search/",
	queryConfig: "?results=0%3A20&cal_min=0&cal_max=50000&fields=*&appId=e610064a&appKey=af0b2bcc8a8432734a9b1ab69b03f416",
	url: function() {

		return this.urlRoot + this.query + this.queryConfig;
	}

});

