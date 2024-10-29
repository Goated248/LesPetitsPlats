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

function fillDropdownOptions (optionsContainerId, options) {
    const container = document.getElementById(optionsContainerId)
    container.innerHTML= ''
    options.forEach(option => {
        const optionEl = document.createElement('div')
        optionEl.classList.add('dropdown-option')
        optionEl.textContent = option
        container.appendChild(optionEl)

        //selectionne l'option au click
        optionEl.addEventListener('click', ()=> {
            const searchInput = container.parentNode.querySelector('.dropdown-search')
            searchInput.value = option
            container.closest('.dropdown-tags').classList.remove('active')
            
        })
    })
}