const cards = [ 
    {
        name: 'egg',
        img: "imgs/egg.png"
    },
    {
        name: 'moon',
        img: "imgs/moon.png"
    },
    {
        name: 'envelop',
        img: "imgs/envelop.png"
    },
    {
        name: 'pyramid',
        img: "imgs/pyramid.png"
    },
    {
        name: 'ring',
        img: "imgs/ring.png"
    },
    {
        name: 'diamond',
        img: "imgs/diamond.png"
    },
    {
        name: 'cloud',
        img: "imgs/cloud.png"
    },
    {
        name: 'box',
        img: "imgs/box.png"
    }
]


function rand_range(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

function occurances(item, list) {
    return list.reduce( (n, val) => n + (val === item), 0)
}



const grid = document.querySelector(".grid");
var pairs = [];
var pairs_won = 0;
var cards_array = []

// create the board and randomize it as well:
createBoard();

function createBoard() {
    for (let i = 0; i < cards.length*2; i++) {
        var card = document.createElement("img");
        card.setAttribute("src", "imgs/question.png");
        var card_id = rand_range(0, cards.length);
        cards_array.push(card_id);
        while (occurances(card_id, cards_array) > 2) {
            cards_array.pop();
            card_id = rand_range(0, cards.length);
            cards_array.push(card_id);
        }
        card.setAttribute("data-id", card_id);
        card.addEventListener("mouseenter",  changeToRed);
        card.addEventListener("mouseout",  backtToOrange);

        card.addEventListener("click", flipCard);

        grid.appendChild(card);
    }

}



function flipCard() {
    if ( pairs.length > 1 ) {
       return;
    }
    // only if not flipped
    let img = this.getAttribute("src");
    if (img == "imgs/question.png" || img == "imgs/question_red.png") {
        let id = this.getAttribute('data-id');
        this.setAttribute("src", cards[id].img);
        pairs.push(this);
        if (pairs.length === 2 ) {
            checkMatch();
        }
    }

}



function checkMatch() {
    if (pairs[0].getAttribute('data-id') == pairs[1].getAttribute('data-id')) 
    {
        setTimeout(() => {
            // if match, add card to cards_won:
            console.log('match');
            pairs_won++;
            pairs.length = 0;

            if (pairs_won === cards.length) {
                if (confirm("You won!. Play again?")) {
                    reset_game(); 
                }
            }
        }, 400);


    }else 
    
    {
        setTimeout(() => {
            // if doesn't match:
            pairs.forEach(e => {
                e.setAttribute("src", "imgs/question.png");
            })
            pairs.length = 0;
        }, 1200)
    
    }

    
}

function changeToRed() {
    if (this.getAttribute("src") === "imgs/question.png") {
        this.setAttribute("src", "imgs/question_red.png");
    } 
}

function backtToOrange() {
    if (this.getAttribute("src") === "imgs/question_red.png") {
        this.setAttribute("src", "imgs/question.png");
    }

}

function reset_game() {
    // change score:
    cards_array = [];
    pairs = [];
    pairs_won = 0;


    // remove children of grid:
    grid.innerHTML = "";
    createBoard();
}