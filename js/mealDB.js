export class MealDB {
  constructor(baseUrl, renderObj) {
    this.baseUrl = baseUrl;
    this.render = renderObj;
  }

  async #fetchData(endpoint) {
    let response = await fetch(`${this.baseUrl}${endpoint}`);
    response = await response.json();
    return response;
  }

  //get all meals NumOfCards is empty string return all result
  async SearchByMealName(name) {
    const dataResponse = await this.#fetchData(
      `search.php?s=${name ? name : ""}`
    );
    return this.render.renderMealCards(dataResponse, 20);
  }

  //get all meals NumOfCards is empty string return all result
  async SearchMealByLetter(char) {
    const dataResponse = await this.#fetchData(
      `search.php?f=${char ? char : "a"}`
    );
    return this.render.renderMealCards(dataResponse, 20);
  }

  //get all meals categories
  async allMealsCategories(numberOfMeals) {
    const dataResponse = await this.#fetchData("categories.php");
    return this.render.renderMealsCatagories(dataResponse, numberOfMeals);
  }

  //get all areas
  async allAreas() {
    const dataResponse = await this.#fetchData("list.php?a=list");
    return this.render.renderAreas(dataResponse);
  }

  //get all meals  ingredients
  async allIngredients(numberOfIngredients) {
    const dataResponse = await this.#fetchData(`list.php?i=list`);
    return this.render.renderIngredients(dataResponse, numberOfIngredients);
  }

  //get specific meal by meal id
  async mealDetails(mealId) {
    const dataResponse = await this.#fetchData(`lookup.php?i=${mealId}`);
    return this.render.renderMealDetails(dataResponse);
  }

  //get all meals in specific area
  async filterByAreas(area) {
    const dataResponse = await this.#fetchData(`filter.php?a=${area}`);
    return this.render.renderMealCards(dataResponse, 20);
  }

  //get all meals by specific ingredient
  async filterByIngredients(ingredient) {
    const dataResponse = await this.#fetchData(`filter.php?i=${ingredient}`);
    return this.render.renderMealCards(dataResponse, 20);
  }

  //get all meals by specific category
  async filterByCategory(category) {
    const dataResponse = await this.#fetchData(`filter.php?c=${category}`);
    return this.render.renderMealCards(dataResponse, 20);
  }
}
