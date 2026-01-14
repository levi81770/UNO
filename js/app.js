

/*-------------------------------- Constants --------------------------------*/
const deck = []
const discardPile = []
const humanPlayer = []
const computerPlayer = []
const colors = ['red', 'green', 'yellow', 'blue']
const actionCards = ['skip', 'draw-two', 'revers']
// const randomCard = Math.floor(Math.random() * deck.length)

/*---------------------------- Variables (state) ----------------------------*/
let winner 
let turn


/*------------------------ Cached Element References ------------------------*/
const discardPileDiv = document.querySelector('.discard-pile')
const deckDiv = document.querySelector('.deck')
const humanHand = document.querySelector('.human-player')
const computerHand = document.querySelector('.computer-player')
const msgEl = document.querySelector('#msg')
const drawCard = document.querySelector('.draw-card')
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
        drawTwo1.textContent = '+2'
        deck.push(drawTwo1)

        const drawTwo2 = document.createElement('div')
        drawTwo2.classList.add(`${color}`, 'draw-two', 'card')
        drawTwo2.textContent = '+2'
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

const updateDiscardPileDisplay = () => {
    discardPileDiv.innerHTML = ''
    discardPileDiv.appendChild(discardPile.at(-1))
}

function startDiscardPile() {
    discardPile.push(deck.shift())

    while (discardPile.at(-1).classList.contains('wild-draw-four')) {
        deck.push(discardPile.shift())
        shuffleDeck(deck)
        discardPile.push(deck.shift())
    }

    updateDiscardPileDisplay()
}

function isValidCard(cardToPlay, currentDiscard) {
    if (cardToPlay.classList.contains('wild') || cardToPlay.classList.contains('wild-draw-four')) {
        return true
    }

    if (currentDiscard.classList.contains('wild') || currentDiscard.classList.contains('wild-draw-four')) {
        return true
    }

    for (let i = 0; i < 10; i++) {
        if (cardToPlay.classList.contains(`${i}`) && currentDiscard.classList.contains(`${i}`)) {
            return true
        }
    }

    for (let i = 0; i < colors.length - 1; i++) {
        if (cardToPlay.classList.contains(`${colors[1]}`) && currentDiscard.classList.contains(`${colors[1]}`)) {
            return true
        }
    }

    for (let i = 0; i < actionCards.length - 1; i++) {
        if (cardToPlay.classList.contains(`${actionCards[1]}`) && currentDiscard.classList.contains(`${actionCards[1]}`)) {
            return true
        }
    }

    return false
}

function computerDrawCard() {
    computerPlayer.push(deck.shift())
    computerHand.appendChild(computerPlayer.at(-1))
}

function drawCardHandler() {
    humanPlayer.push(deck.shift())
    humanHand.appendChild(humanPlayer.at(-1))
}

function handelHumanCardClick(event) {
    const clickedCard = event.target
    let clickedCardIndex = humanPlayer.indexOf(clickedCard)

    if (!clickedCard.classList.contains('card')) return
    if (turn === 'player 2') return

    if (isValidCard(clickedCard, discardPile.at(-1))) {
        humanPlayer.splice(clickedCardIndex, 1)
        clickedCard.remove()
        discardPile.push(clickedCard)
        updateDiscardPileDisplay()
        switchPlayerTurn()
    } else {
        msgEl.textContent = 'not a valid card'
    }
}

function computerTurn() {
    const randomComCard = Math.floor(Math.random() * computerPlayer.length)
    let validComCards = []
    
    for (let i = 0; i < computerPlayer.length - 1; i++) {
        if (isValidCard(computerPlayer[i], discardPile.at(-1))) {
            validComCards.push(computerPlayer[i])
        }
    }

    discardPile.push(validComCards[randomComCard])
    updateDiscardPileDisplay()

    if (validComCards.length === 0) {
        computerDrawCard()
    }

    switchPlayerTurn()
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'player 1' ? 'player 2' : 'player 1'
}
// function playCard(playerHand, currentDiscard, playerArr) {
//     let removedCard
//     playerHand.forEach((card, cardIndex) => {
//         if (isValidCard(card, currentDiscard)) {
//             card.addEventListener('click', function() {
//                 removedCard = playerArr.splice(cardIndex, 1)
//                 discardPile.push(removedCard.at(-1))
//                 playerHand.splice(cardIndex, 1)
//             })
//         } else if (!isValidCard(card, currentDiscard)) {

//             msgEl.textContent = 'not a valid card'
//         }
//     })
// }
fillDeckWithAllCards()
shuffleDeck(deck)
dealCardsToPlayers()
startDiscardPile()
console.log(humanPlayer, computerPlayer, deck, discardPile);

/*----------------------------- Event Listeners -----------------------------*/

humanHand.addEventListener('click', handelHumanCardClick)

drawCard.addEventListener('click', drawCardHandler)

