const container = document.querySelector(".container");
const gridSizeInput = document.querySelector("#points");
const gridSizeValueSpan = document.querySelector(".grid-size-value");
const colorRadioButtons = document.querySelectorAll(".color-options  input");
const eraserButton = document.querySelector("#eraser");
const bordersButton = document.querySelector("#borders");
const resetButton = document.querySelector(".reset-button button");
const number_of_squares = 16;
let containerSquares = document.querySelectorAll(".container .column-div");
container.addEventListener("mouseover", colorSquare);
// container.addEventListener("mouseout", toggleSquareBackgroundColor);
gridSizeInput.addEventListener("input", changeGridSizeSpanValue);
gridSizeInput.addEventListener("change", changeGridSize);
bordersButton.addEventListener("change", toggleGridBorders);
eraserButton.addEventListener("change", toggleEraserButton);
resetButton.addEventListener("click", reset);


function generateGrid(squares = number_of_squares) {
    gridSizeInput.value = squares;
    gridSizeValueSpan.textContent = squares;
    for(let i = 0 ; i < squares ; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row-div");
        for(let j = 0 ; j < squares ; j++) {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("column-div"); 
            columnDiv.setAttribute("red", 0);
            columnDiv.setAttribute("green", 0);
            columnDiv.setAttribute("blue", 0);
            columnDiv.setAttribute("opacity", 0);
            columnDiv.style.border = bordersButton.checked ? "1px solid black" : "0px";
            rowDiv.appendChild(columnDiv);
        }
        container.appendChild(rowDiv);
    }
    container.style.border = bordersButton.checked ? "0px" : "1px solid black";
    containerSquares = document.querySelectorAll(".container .column-div");
}


function toggleSquareBackgroundColor(event) {
    const target = event.target;
    if(target.className === "column-div") {
        target.style.backgroundColor = event.type === "mouseover" ? "grey" : "transparent";
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
    const inputVal = event.target.value;
    gridSizeValueSpan.textContent = inputVal;
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

function colorSquare(event) {
    const target = event.target;
    if(target.className === "column-div") {
        const COLOR_OPACITY = getRandomOpacity();
        const RED = getRandomRGBValue();
        const GREEN = getRandomRGBValue();
        const BLUE = getRandomRGBValue();
        for(const colorRadioButton of colorRadioButtons) {
            if(!colorRadioButton.disabled && colorRadioButton.checked) {
                switch(colorRadioButton.value) {
                    case "black":
                        target.style.backgroundColor = "black";
                        target.setAttribute("opacity", 1);
                        break;
                    case "colored":
                        target.setAttribute("red", RED);
                        target.setAttribute("green", GREEN);
                        target.setAttribute("blue", BLUE);
                        target.setAttribute("opacity", COLOR_OPACITY);
                        target.style.backgroundColor = `rgba(${RED},${GREEN},${BLUE}, ${COLOR_OPACITY})`;
                        break;
                    case "darken":
                        if(target.getAttribute("darkenValue") === null) {
                            const darkenValue = Math.round((1 - Number(target.getAttribute("opacity"))) / 10 * 10000) / 10000;
                            target.setAttribute("darkenValue", darkenValue);
                        }
                        const newOpacity = Math.min(1, Number(target.getAttribute("opacity")) + Number(target.getAttribute("darkenValue")));
                        target.setAttribute("opacity", newOpacity);
                        target.style.backgroundColor = `rgba(${target.getAttribute("red")},${target.getAttribute("green")},${target.getAttribute("blue")},${target.getAttribute("opacity")})`;
                        break;
               }
               break; 
            }
        }
        if(eraserButton.checked) {
            // target.setAttribute("red", 0);
            // target.setAttribute("green", 0);
            // target.setAttribute("blue", 0);
            // target.setAttribute("opacity", 0);
            // target.setAttribute("darkenValue", 0.1);
            // target.style.backgroundColor = "rgba(0, 0, 0, 0)";
            resetSquare(target);
        }
    }
}

function resetSquare(square) {
    square.setAttribute("red", 0);
    square.setAttribute("green", 0);
    square.setAttribute("blue", 0);
    square.setAttribute("opacity", 0);
    square.setAttribute("darkenValue", 0.1);
    square.style.backgroundColor = "rgba(0, 0, 0, 0)";
}

function getRandomRGBValue() {
    return Math.floor(Math.random() * 240 + 1); // integer from 1 to 240 (inclusive)
}

function getRandomOpacity() {
    return Math.round(Math.random() * 10000) / 10000; // rounded to 4 decimals
}

function toggleGridBorders() {
    container.style.border = bordersButton.checked ? "0px" : "1px solid black";
    for(const square of containerSquares) {
        square.style.border = bordersButton.checked ? "1px solid black" : "0px";
    }
}

function toggleEraserButton() {
    for(button of colorRadioButtons) {
        if(eraserButton.checked) button.setAttribute("disabled", "");
        else button.removeAttribute("disabled");
    }
}

function reset(event) {
    eraserButton.checked = false;
    document.querySelector("#black").checked = true;
    bordersButton.checked = true;
    for(square of containerSquares) {
        resetSquare(square);
    }
    toggleGridBorders();
    toggleEraserButton();
}

generateGrid();
preventDragDrop();
