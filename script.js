const container = document.querySelector(".container");
const gridSizeInput = document.querySelector("#points");
const gridSizeValueSpan = document.querySelector(".grid-size-value");
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
let number_of_squares = 16;
gridSizeInput.addEventListener("input", changeGridSizeSpanValue);
gridSizeInput.addEventListener("change", changeGridSize);

function generateGrid(squares = number_of_squares) {
    gridSizeInput.value = squares;
    gridSizeValueSpan.textContent = squares;
    for(let i = 0 ; i < squares ; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row-div");
        for(let j = 0 ; j < squares ; j++) {
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
    
    function toggleSquareBackgroundColor(event) {
        const target = event.target;
        if(target.className === "column-div") {
            target.style.backgroundColor = event.type === "mouseover" ? "grey" : "transparent";
        }
    }
}

function preventDragDrop() {
    
    container.addEventListener("drag", preventDefault);
    container.addEventListener("dragstart", preventDefault);
    container.addEventListener("dragend", preventDefault);
    container.addEventListener("drop", preventDefault);
    container.addEventListener("dropenter", preventDefault);
    container.addEventListener("dropleave", preventDefault);
    container.addEventListener("dropover", preventDefault);
    

    function preventDefault(event) {
        event.preventDefault();
    }
}

function changeGridSizeSpanValue(event) {
    const input = event.target;
    gridSizeValueSpan.textContent = input.value;
}

function removePreviousGrid() {
    let containerRow = container.firstChild;
    while(containerRow) {
        let containerRowCell = containerRow.firstChild;
        while(containerRowCell) {
            containerRow.removeChild(containerRowCell);
            containerRowCell = containerRow.firstChild;
        }
        container.removeChild(containerRow);
        containerRow = container.firstChild;
    }
}

function changeGridSize(event) {
    const newGridSize = event.target.value;
    removePreviousGrid();
    generateGrid(newGridSize);
}


generateGrid();
applyHoverEffect();
preventDragDrop();