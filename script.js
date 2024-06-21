const container = document.querySelector(".container");
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
let number_of_squares = 16;


function generateGrid() {
    for(let i = 0 ; i < number_of_squares ; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row-div");
        for(let j = 0 ; j < number_of_squares ; j++) {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("column-div");
            columnDiv.style.border = "1px solid black";
            rowDiv.appendChild(columnDiv);
        }
        container.appendChild(rowDiv);
    }
}

function applyHoverEffect() { // Event Delegation
    container.addEventListener("mouseover", toggleSquareBackgroundColor);
    container.addEventListener("mouseout", toggleSquareBackgroundColor);
}

function toggleSquareBackgroundColor(event) {
    const target = event.target;
    if(target.className === "column-div") {
        target.style.backgroundColor = event.type === "mouseover" ? "grey" : "transparent";
    }
}

generateGrid();
applyHoverEffect();