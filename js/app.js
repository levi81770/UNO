

/*-------------------------------- Constants --------------------------------*/
const deck = []
const discardPile = []
const humanPlayer = []
const computerPlayer = []
const colors = ['red', 'green', 'yellow', 'blue']

// const randomCard = Math.floor(Math.random() * deck.length)

/*---------------------------- Variables (state) ----------------------------*/
let winner 
let turn


/*------------------------ Cached Element References ------------------------*/
const humanHand = document.querySelector('.human-player')
const computerHand = document.querySelector('.computer-player')

/*-------------------------------- Functions --------------------------------*/
function fillDeckWithAllCards() {
    colors.forEach(color => {
        for (let i = 0; i < 10; i++) {
            const card1 = document.createElement('div')
            card1.classList.add(`${color}`, 'num', `${i}`, 'card')
            card1.textContent = `${i}`
            deck.push(card1)

            if (i !== 0) {
                const card2 = document.createElement('div')
                card2.classList.add(`${color}`, 'num', `${i}`, 'card')
                card2.textContent = `${i}`
                deck.push(card2)
            }
        }

        const revers1 = document.createElement('div')
        revers1.classList.add(`${color}`, 'revers', 'card')
        revers1.textContent = 'revers'
        deck.push(revers1)

        const revers2 = document.createElement('div')
        revers2.classList.add(`${color}`, 'revers', 'card')
        revers2.textContent = 'revers'
        deck.push(revers2)

        const skip1 = document.createElement('div')
        skip1.classList.add(`${color}`, 'skip', 'card')
        skip1.textContent = 'skip'
        deck.push(skip1)

        const skip2 = document.createElement('div')
        skip2.classList.add(`${color}`, 'skip', 'card')
        skip2.textContent = 'skip'
        deck.push(skip2)

        const drawTwo1 = document.createElement('div')
        drawTwo1.classList.add(`${color}`, 'draw-two', 'card')
        drawTwo1.textContent = 'draw-two'
        deck.push(drawTwo1)

        const drawTwo2 = document.createElement('div')
        drawTwo2.classList.add(`${color}`, 'draw-two', 'card')
        drawTwo2.textContent = 'draw-two'
        deck.push(drawTwo2)

        const wild = document.createElement('div')
        wild.classList.add('wild', 'card')
        wild.textContent = 'wild'
        deck.push(wild)

        const wildDrawFour = document.createElement('div')
        wildDrawFour.classList.add('wild-draw-four', 'card')
        wildDrawFour.textContent = 'wild-draw-four'
        deck.push(wildDrawFour)
    })
}

function shuffleDeck(arrey) {
    let currentIndex = arrey.length

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [arrey[currentIndex], arrey[randomIndex]] = [arrey[randomIndex], arrey[currentIndex]]
    }
    return arrey
}

function dealCardsToPlayers() {
    for (let i = 0; i < 7; i++) {
        let topCard = deck.shift()
        humanPlayer.push(topCard)
        humanHand.appendChild(humanPlayer[i])
        let secondToTopCard = deck.shift()
        computerPlayer.push(secondToTopCard)
        computerHand.appendChild(computerPlayer[i])
    }
}
fillDeckWithAllCards()
shuffleDeck(deck)
dealCardsToPlayers()
console.log(humanPlayer, computerPlayer);

/*----------------------------- Event Listeners -----------------------------*/



