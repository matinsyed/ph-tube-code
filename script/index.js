function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) =>res.json())
    .then((data)=>displayCategory(data.categories));

}

function displayCategory(categories){
    const categoryContainer = document.getElementById("categories-container");
    
    categories.forEach(element => {
       const categoryDiv = document.createElement("div")
       categoryDiv.innerHTML = `
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${element.category}</button>
       `
        categoryContainer.append(categoryDiv);
    });
}

loadCategories();