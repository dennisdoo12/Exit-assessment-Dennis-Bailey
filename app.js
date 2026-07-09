let snacks = [];


const list = document.querySelector("#list");
const search = document.querySelector("#search");
const form = document.querySelector("#form");
const error = document.querySelector("#error");




function render(){

    list.innerHTML = "";
    const term = search.value.toLowerCase();

    snacks
    .filter(snack => snack.name.toLowerCase().includes(term))
.forEach(snack => {
    const li = document.createElement("li");
    li.textContent = '${snack.name} --- ${snack.category}--- ${snack.calories} cal';

    li.addEventListener("click",() =>{
        li.classList.toggle("eaten");
    });

    list.appendChild(li);
});
}


fetch("./data.json")
.then(response => response.json())
.then(data => {
    snacks = data.snacks;
    render();
})
.catch((error) => {
    error.textContent = "error loading the snacks";
});

search.addEventListener("input", render);

form.addEventlistener("submit", event => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const category = form.elements.category.value.trim();
    const calories = Number(form.elements.calories.value);

    if(!name || category || !form.elements.calories.value.trim()){
        error.textContent = "Please fill in all fields";
        return;
    }

    if(isNan(calories) || calories <= 0){
        error.textContent = "Calories must be postive";
        return;
    }

    snacks.push({
        id: Date.now(),
        name,category, calories
    });

    form.reset();
    error.textContent = "";
    render();
});

    
