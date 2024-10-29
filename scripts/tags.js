document.addEventListener('DOMContentLoaded', ()=> {
    //initialise donnée pour chaque liste
    fillDropdownOptions('ingredients-options',uniqueIngredients)
    fillDropdownOptions('devices-options',uniqueDevices)
    fillDropdownOptions('ustensils-options',uniqueUstensils)

    setupDropdown ('ingredients-button', 'ingredients-options', uniqueIngredients, 'ingredients-search')
    setupDropdown ('devices-button', 'devices-options', uniqueDevices, 'devices-search')
    setupDropdown ('ustensils-button', 'ustensils-options', uniqueUstensils, 'ustensils-search')

})

function setupDropdown(buttonId, optionsContainerId, options, searchInputId) {
    const button = document.getElementById(buttonId)
    const dropdown = button.closest('.dropdown-tags')
    const searchInput = document.getElementById(searchInputId)

    //affiche dropdown au click
    button.addEventListener('click', (e)=> {
        dropdown.classList.toggle('active')
        e.stopPropagation()
    })
    //filtre les options en fonction de l'input
    searchInput.addEventListener('input', ()=> {
        const query = searchInput.value.toLowerCase()
        const filteredOptions = options.filter(option => option.toLowerCase().includes(query))
        fillDropdownOptions(optionsContainerId, filteredOptions)
    })

    //ferme dropdown si click en dehors
    document.addEventListener('click', (e)=> {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active')
        }
    })
}

//rempli liste de tag
let selectedTags = []

function fillDropdownOptions(optionsContainerId, options) {
    const container = document.getElementById(optionsContainerId)
    container.innerHTML = ''
    options.forEach(option => {
        const optionEl = document.createElement('div')
        optionEl.classList.add('dropdown-option')
        optionEl.textContent = option
        container.appendChild(optionEl)

        // Gérer le clic sur chaque option
        optionEl.addEventListener('click', () => {
            if (!selectedTags.includes(option)) {
              
                selectedTags.push(option)

                // Affichage du tag dans l'interface
                const tagsContainer = document.querySelector('.tags-container')
                const newTag = document.createElement('div')
                newTag.classList.add('tag')
                newTag.classList.add('col-2')
                newTag.classList.add('bg-warning')
                newTag.classList.add('me-4')
                
                const tagText = document.createElement('div')
                tagText.classList.add('tag-text')
                tagText.textContent = option

                const tagIcon = document.createElement('div')
                tagIcon.classList.add('tag-icon')
                const icon =document.createElement('i')
                icon.classList.add('fa-solid','fa-xmark')

                tagIcon.appendChild(icon)
                newTag.appendChild(tagText)
                newTag.appendChild(tagIcon)
                tagsContainer.appendChild(newTag)


                // Permettre la suppression d'un tag en cliquant dessus
                tagIcon.addEventListener('click', () => {
                    selectedTags = selectedTags.filter(tag => tag !== option); // Retire le tag
                    newTag.remove()
                    filterRecipesByTags()
                });

                // Met à jour l'affichage des recettes en fonction des tags sélectionnés
                filterRecipesByTags()
            }
        })
    })
}

function filterRecipesByTags() {
    const filteredRecipes = recipes.filter(recipe => {
        // Vérifie si chaque tag sélectionné est présent dans les ingrédients, appareils ou ustensiles
        return selectedTags.every(tag =>
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === tag.toLowerCase()) ||
            recipe.appliance.toLowerCase() === tag.toLowerCase() ||
            recipe.ustensils.some(ust => ust.toLowerCase() === tag.toLowerCase())
        )
    })

    // Met à jour l'affichage des recettes
    updateRecipesToShow(filteredRecipes)
}
