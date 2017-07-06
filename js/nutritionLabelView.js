var NutritionLabelView = Backbone.View.extend({

	//tagName: "div",

	el: '#nutritional-facts',

	attributes: {

	},

	initialize: function(){

	},

	events: {

	},

	placeNutritionLabel: function(data){

		// click is registering multiple events for some reason
		$('#nutritional-facts').unbind();

	 	this.$el.nutritionLabel({
			'width' : 280, //original value

			'showServingUnitQuantity' : true,
			'showAmountPerServing' : true,

			'valueServingUnitQuantity' : data.nf_serving_size_qty,
			'valueServingSize' : data.nf_serving_size_unit,
			'valueServingSizeUnit' : data.nf_serving_size_unit,

			'showCalorieDiet' : false,
			'ingredientList' : data.nf_ingredient_statement || "Ingredients data not available",
			'itemName' : data.item_name,

			'showPolyFat' : false,
			'showMonoFat' : false,
			'showTransFat' : false,
			'showVitaminA' : true,
			'showVitaminC' : true,
			'showCalcium' : true,
			'showIron' : true,
			'showFatCalories' : true,

			'valueCalories' : data.nf_calories,
			'valueTotalFat' : data.nf_total_fat,
			'valueSatFat' : data.nf_saturated_fat,
			'valueCholesterol' : data.nf_cholesterol,
			'valueSodium' : data.nf_sodium,
			'valueTotalCarb' : data.nf_total_carbohydrate,
			'valueFibers' : data.nf_dietary_fiber,
			'valueSugars' : data.nf_sugars,
			'valueProteins' : data.nf_protein,
			'valueVitaminA' : data.nf_vitamin_a_dv,
			'valueVitaminC' : data.nf_vitamin_c_dv,
			'valueCalcium' : data.nf_calcium_dv,
			'valueIron' : data.nf_iron_dv
		});

	},

	render: function(){

		var itemAttrs = this.model.attributes;
		this.placeNutritionLabel(itemAttrs);

		// logic for original increment/decrement click is behaving erratically
		$( ".unitQuantityUp" ).unbind();

		return this;
	}

});