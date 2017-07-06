# Calories Tracker
##### P6-2 FEND

#### This project uses the [Nutritionix API](https://developer.nutritionix.com/docs/v1_1) to keep track of daily calories consumed.

**Project can be seen at [http://thomasegas.github.io/](http://thomasegas.github.io/)**

It is built with [Backbone.js](http://backbonejs.org/) and some helper libraries:
* [Backbone.localstorage](https://github.com/jeromegn/Backbone.localStorage) a localstorage adapter for Backbone
* [mustache.js](https://github.com/janl/mustache.js/) for templating
* [nutritionix's nutritional label](https://github.com/nutritionix/nutrition-label)
* [spin.js](http://fgnass.github.io/spin.js/) for the loading spinner

## Directions

To run the project:
* open **index.html**
* **search** for a food item on the search bar
* **select** an item from the list of search results
* the selected item's nutritional data will show on a **nutritional label**
* **enter amount** eaten on nutritional label serving input
* add item to list of eaten by clicking **'add to eaten'**
* eaten items show up on an **eaten items list**, when eaten items > 0
* **total** calories eaten show above list of eaten items, when eaten items > 0

Use `window.localStorage.clear();` to reset the eaten items list.