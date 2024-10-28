//recuperation des données

const nomRecette = recipes.map(recipe => recipe.name)

const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));

const ustensiles = recipes.flatMap(recipe =>recipe.ustensils)

const appareils = recipes.flatMap(recipe => recipe.appliance)


//structuration des liste sans doublons
const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient)))];
const uniqueDevices = [...new Set(recipes.flatMap(recipe => recipe.appliance))];
const uniqueUstensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils))];


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

//rempli liste de tags

function fillDataList(dataListId , options){
    const dataList = document.getElementById(dataListId)
    dataList.innerHTML = ""
    options.forEach(option => {
        const optionElement = document.createElement('option')
        optionElement.value = option
        dataList.appendChild(optionElement)
    })
    
}

document.addEventListener("DOMContentLoaded", ()=> {
fillDataList('ingredients-list', uniqueIngredients)
fillDataList('devices-list' , uniqueDevices)
fillDataList('ustensils-list', uniqueUstensils)
updateRecipeCounter(recipes.length)
})