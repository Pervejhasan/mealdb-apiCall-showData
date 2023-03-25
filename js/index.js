const loadData = async (meal, dataLimit) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
  try {
    const res = await fetch(url);
    let data = await res.json();
    if (data.meals.length > dataLimit) {
      // console.log("length", data.meals.length);
      let limitedData = data.meals.slice(0, dataLimit);
      // console.log("limited number of data show", limitedData);
      mealShow(limitedData);
    } else {
      // console.log("less than 6 data", data.meals.length);
      mealShow(data.meals);
    }
  } catch (error) {
    console.error(error);
  }
};
const mealShow = (data) => {
  const mealContainer = document.getElementById("mealContainer");
  mealContainer.innerHTML = "";

  data.forEach((meal) => {
    console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
    <div class="card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="food-image">
      <div class="card-body">
        <h6 class="card-title fw-bold">${meal.strMeal}</h6>
        <p class="card-text">${meal.strInstructions.substr(0, 80) + " ..."}</p>
        <button
        type="button"
        class="btn btn-warning  fw-bold "
        data-bs-toggle="modal"
        data-bs-target="#mealDetail" onclick="foodDetailsLoad(${meal.idMeal})"
      >
    View Details
      </button>
      </div>
    </div>

`;
    mealContainer.appendChild(mealDiv);
  });
};

const foodDetailsLoad = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showFoodDetails(data.meals))
    .catch((error) => {
      console.error(error);
    });
};

const showFoodDetails = (mealDetails) => {
  document.getElementById("foodDetailsImage").src = mealDetails[0].strMealThumb;
  const food_details = document.getElementById("food-details");
  food_details.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("p-2");
  div.innerHTML = `
<h3><b>FoodName:</b> ${mealDetails[0].strMeal}</h3>
<h4><b>Food Category:</b>  ${mealDetails[0].strCategory} </h4>
<h4><b>Food Code:</b>  ${mealDetails[0].idMeal} </h4>
<h5><b> Country Name:</b>  ${mealDetails[0].strArea}</h5>
<a href="${mealDetails[0].strYoutube}" class="text-decoration-none">See Recipe Related Video</a>
`;
  food_details.appendChild(div);
};

const searchFood = () => {
  const fooCategory = document.getElementById("foodCategory").value;
  document.getElementById("foodCategory").value = "";
  if (fooCategory == "") {
    alert("Please enter a food category name...");
    return;
  } else {
    loadData(fooCategory, 6);
  }
};

loadData("rice", 6);

// ==============================================================
// document.getElementById("showAll").addEventListener("click", () => {
//   document.getElementById("mealContainer");
// });
// ==================================================================
