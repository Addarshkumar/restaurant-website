let container = document.getElementById("random-food-container");
let button = document.getElementById("submitBtn");
let result = document.getElementById("fooditems");
let searchBox = document.getElementById("searchbox");
let ingredientsBox = document.getElementById("ingredients_div");
let ingredientContainer=document.getElementById("random-food-ingredients")



let randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";


async function getRandomFood() {
    try {
        const res = await fetch(randomUrl);
        const data = await res.json();

        let ingredients = data.meals[0].strMealThumb;
        let ingredientName=data.meals[0].strMeal
        container.innerHTML = `<div id="random-food-container">
            <img src="${ingredients}" alt="" id="random-food-image">
            <p id="random-food-name">${ingredientName}</p>
             
        </div>`;

        let ingredientsItem = data.meals[0];
        container.onclick = () => {
            document.getElementById("mymodal").style.display="flex"
            document.body.style.backgroundColor="black"
            const ingredientList = document.createElement("ol");
            ingredientList.setAttribute("class","ingredient-list")

            for (let i = 1; i <= 20; i++) {
                const ingredient = ingredientsItem[`strIngredient${i}`];
                const measure = ingredientsItem[`strMeasure${i}`];

                if (ingredient && measure) {
                    const listItem = document.createElement("li");
                    listItem.textContent = ` ${ingredient} : ${measure}`;

                    
                    ingredientList.appendChild(listItem);
                }
            }
            let crossButton=document.createElement("img");
            crossButton.setAttribute("class","cutbutton");
            crossButton.src="https://img.freepik.com/premium-vector/red-cross-button-icon-design_178156-173.jpg?w=2000"

            let previewImage=document.createElement("img");
            previewImage.setAttribute("class","previewimage")
            previewImage.src= data.meals[0].strMealThumb;

            ingredientContainer.appendChild(previewImage)
            ingredientContainer.appendChild(crossButton)
            ingredientContainer.appendChild(ingredientList);
            ingredientContainer.style.display="block"
            crossButton.onclick=()=>{
                document.getElementById("mymodal").style.display="none"
                document.body.style.backgroundColor="black"
                ingredientContainer.style.display="none"
                ingredientContainer.innerText="";
            }
        };
    } catch (error) {
        console.error("Error", error);
    }
}


getRandomFood()

async function getSearchedFood() {
    try {
        document.getElementById("message").innerHTML="";
        let inputValue = searchBox.value;
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputValue}`);
        const responseData = await response.json();
        const meals = responseData.meals;
        // Clear previous results
        // container.innerHTML=""
        result.innerHTML = '';

        meals.forEach((item) => {

            let div = document.createElement("div");
            div.setAttribute("class", "cont");
            let image = document.createElement("img");
            image.setAttribute("class", "image");
            image.src = item.strMealThumb;


            div.addEventListener("click", getPopUp);
            function getPopUp(){
                document.getElementById("mymodal").style.display="flex"
                let popUpDiv = document.createElement("div");
                popUpDiv.setAttribute("class", "popup");


                let popupimage = document.createElement("img");
                popupimage.setAttribute("class", "popupimage");


                let ingredientsName = document.createElement("p");
                ingredientsName.setAttribute("class", "nameoffood");
                ingredientsName.textContent = item.strMeal;


                popupimage.src = item.strMealThumb;
                popUpDiv.innerHTML="";

                let ingredientsItem=item.idMeal;
                // console.log(ingredientsItem)
                fetch(` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingredientsItem}`)
                .then((res)=>res.json()).then((data)=>{
                   let ingredients=data.meals[0]
                   const ingredientLists = document.createElement("ol");
                   ingredientLists.setAttribute("class","ingredient-lists");
                //    console.log(ingredients)
                for(let i=1;i<=20;i++){
                    let ingredient=ingredients[`strIngredient${i}`]
                    let amount=ingredients[`strMeasure${i}`]
                    if (ingredient && amount) {
                        const listItem = document.createElement("li");
                        listItem.textContent = ` ${ingredient} : ${amount}`;
    
                        
                        ingredientLists.appendChild(listItem);
                    }
                }
                popUpDiv.appendChild(ingredientLists)
                   
                })


                let cutButton=document.createElement("img");
                cutButton.setAttribute("class","cutbutton");
                cutButton.src="https://img.freepik.com/premium-vector/red-cross-button-icon-design_178156-173.jpg?w=2000"
                popUpDiv.appendChild(cutButton)
                popUpDiv.appendChild(popupimage);
                // popUpDiv.appendChild(ingredientsName)
                
                ingredientsBox.appendChild(popUpDiv);
                result.appendChild(ingredientsBox)
                ingredientsBox.style.display = "block";
                cutButton.onclick=()=>{
                    document.getElementById("mymodal").style.display="none"
                    ingredientsBox.style.display="none";
                    
                }
            }
            let p = document.createElement("p");
            p.setAttribute("class", "nameoffood");
            p.textContent = item.strMeal;
            div.appendChild(image);
            div.appendChild(p);
            result.appendChild(div)
                
            });
    } catch (error) {
        console.error("Error", error);
        document.getElementById("message").innerHTML="Sorry , no results found"
    }
}


button.addEventListener("click", function(){
    getSearchedFood()
    result.scrollIntoView({behavior:"smooth"})

});





