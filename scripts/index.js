const recipeContainer = document.getElementById('recipes-container')

//MAj du compteur de recettes
function updateRecipeCounter(count){
    const counterEl = document.getElementById('recipes-counter')
    counterEl.textContent= `${count} recettes`
}

function updateRecipesToShow (recipesToShow){
    recipeContainer.innerHTML =""
    recipesToShow.forEach(recipe =>createCard(recipe))
    updateRecipeCounter(recipesToShow.length)
}

function createCard(recipe) {
    const col = document.createElement('div')
    col.classList.add('col-md-4', 'mb-4')
    const ingredients = recipe.ingredients.map(ingredient =>{
        const quantity = ingredient.quantity ?  `${ingredient.quantity}${ingredient.unit ? ' ' + ingredient.unit : ''}` : ''
        return `
        <div class="col-6 text-center card-text">
        <div>${ingredient.ingredient}</div>
        <div class="text-secondary mb-3">${quantity}</div>
        </div>
        `
    }).join('')
    const cardHtml = `
    <div class="card">
        <img src="assets/${recipe.image}" class="card-img-top" alt="${recipe.name}">
  <div class="card-body pb-0">
        <h2 class="card-title fs-4 fw-bold mb-4">${recipe.name}</h2>
        <h3 class="card-text fw-light text-secondary mb-4">RECETTE</h3>
        <p class="card-text text-limit">${recipe.description}</p>
        <h3 class="card-text fw-light text-secondary mb-4 mt-3">INGRÉDIENTS</h3>
        <div class="container">
        <div class="row fs-6">
        ${ingredients}
        </div>
        </div>
  </div>
    </div>
    `
    col.innerHTML += cardHtml
    recipeContainer.appendChild(col)
}

recipes.forEach(recipe => createCard(recipe))

updateRecipesToShow(recipes)