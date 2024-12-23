const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset_btn");
const boxArr = Array.from(boxes);

let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const startGame = () => {
    boxes.forEach((item) => {
        item.addEventListener("click", () => {
            if (item.innerText !== "" || gameOver) return;

            if (turnO) {
                item.innerText = "O";
                turnO = false;
                item.style.color = "red";
            }
            else {
                item.innerText = "X";
                turnO = true;
                item.style.color = "green";
            }

            checkWinner();
            if (!gameOver) checkTie();
        }, false)
    })
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let val1 = boxes[pattern[0]].innerText
        let val2 = boxes[pattern[1]].innerText
        let val3 = boxes[pattern[2]].innerText

        if (val1 != "" && val1 === val2 && val2 === val3) {
            document.querySelector(".winner").innerText = `Congratulations! WINNER is ${val1}`;
            reset.innerText = "RESTART GAME";
            boxes.forEach((item) => item.disabled = true);
            pattern.forEach((index) => boxes[index].style.backgroundColor = "yellow"); //Highlight winning boxes
            gameOver = true;
            return;
        }
    }
}

const checkTie = () => {
    if (gameOver) return;

    let isBoardFull = true;
    for (let i = 0; i < boxArr.length; i++) {
        if (boxArr[i].innerText == "") {
            isBoardFull = false;
            break;
        }
    }
    if (isBoardFull) {
        document.querySelector(".winner").innerText = "Match is TIE";
        reset.innerText = "RESTART GAME";
        gameOver = true;
    }
}

const restart = () => {
    turnO = true;
    gameOver = false;
    boxes.forEach((item) => {
        item.innerText = "";
        item.disabled = false;
        item.style.backgroundColor = "";
    })
    document.querySelector(".winner").innerText = "";
    reset.innerText = "RESET GAME";
}

startGame();

reset.addEventListener("click", restart, false)