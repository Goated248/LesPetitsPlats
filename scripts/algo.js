//recuperation des données

const nomRecette = recipes.map(recipe => recipe.name)

const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient))

const ustensiles = recipes.flatMap(recipe =>recipe.ustensils)

const appareils = recipes.flatMap(recipe => recipe.appliance)



//empeche rechargement de la page
const searchForm = document.querySelector(".search-form")
searchForm.addEventListener('submit',(event) =>{
    event.preventDefault()
    const query = searchBar.value
    recherche(query)
})




//écouteur d'évenement pour la barre de recherche
const searchBar = document.getElementById("search-Bar")
searchBar.addEventListener('input', function(){
    
    const query = searchBar.value
   
    recherche(query)
})

function recherche(query){
     if (query.length >= 3) {
//tri les recettes a afficher
        const searchResult = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query.toLowerCase())
            || recipe.ingredients.some(ing=> ing.ingredient.toLowerCase().includes(query.toLowerCase()))
            || recipe.ustensils.some(ust =>ust.toLocaleLowerCase().includes(query.toLowerCase()))
            ||recipe.appliance.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
        
//affiche les recettes après tri
        updateRecipesToShow(searchResult)
     }else{
        updateRecipesToShow(recipes)
     }
}

