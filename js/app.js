

/*-------------------------------- Constants --------------------------------*/

const colors = ['red', 'green', 'yellow', 'blue']
const actionCards = ['skip', 'draw-two', 'reverse']

const TIMING = {
    MESSAGE_DISPLAY: 1500,
    COMPUTER_TURN_START: 800,
    COMPUTER_THINK: 1200,
    CARD_EFFECT: 1800,
    QUICK_MESSAGE: 1000
}
//
/*---------------------------- Variables (state) ----------------------------*/
let deck = []
let discardPile = []
let humanPlayer = []
let computerPlayer = []
let winner
let turn
let chosenColor = ''
let waitingForColorChoice = false
let isProcessing = false

/*------------------------ Cached Element References ------------------------*/
const discardPileDiv = document.querySelector('.discard-pile')
const deckDiv = document.querySelector('.deck')
const humanHand = document.querySelector('.human-player')
const computerHand = document.querySelector('.computer-player')
const msgEl = document.querySelector('#msg')
const subMsgEl = document.querySelector('#sub-msg')
const drawCard = document.querySelector('.draw-card')
const chooseColorBtns = document.querySelector('.choose-color')
chooseColorBtns.style.display = 'none'
const challengeDraw4 = document.querySelector('#challenge-wild-draw-4')
challengeDraw4.style.display = 'none'
const dontChallengeDraw4 = document.querySelector('#dont-challenge-wild-draw-4')
dontChallengeDraw4.style.display = 'none'
const resetBtn = document.querySelector('#reset-btn')
const howToPlayBtn = document.querySelector('#how-to-play-btn')
const rulesDiv = document.querySelector('#rules')

const unoLogo = document.createElement('img')
unoLogo.src = 'data:image/png;base64,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'
unoLogo.alt = 'UNO logo'
unoLogo.classList.add('card')
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

        const reverse1 = document.createElement('div')
        reverse1.classList.add(`${color}`, 'reverse', 'card')
        reverse1.textContent = '⇄'
        deck.push(reverse1)

        const reverse2 = document.createElement('div')
        reverse2.classList.add(`${color}`, 'reverse', 'card')
        reverse2.textContent = '⇄'
        deck.push(reverse2)

        const skip1 = document.createElement('div')
        skip1.classList.add(`${color}`, 'skip', 'card')
        skip1.textContent = '⊘'
        deck.push(skip1)

        const skip2 = document.createElement('div')
        skip2.classList.add(`${color}`, 'skip', 'card')
        skip2.textContent = '⊘'
        deck.push(skip2)

        const drawTwo1 = document.createElement('div')
        drawTwo1.classList.add(`${color}`, 'draw-two', 'card')
        drawTwo1.textContent = '+2'
        deck.push(drawTwo1)

        const drawTwo2 = document.createElement('div')
        drawTwo2.classList.add(`${color}`, 'draw-two', 'card')
        drawTwo2.textContent = '+2'
        deck.push(drawTwo2)
    })
    for (let i = 0; i < 4; i++) {
        const wild = document.createElement('div')
        wild.classList.add('wild', 'card')
        wild.textContent = 'wild'
        deck.push(wild)

        const wildDrawFour = document.createElement('div')
        wildDrawFour.classList.add('wild-draw-four', 'card')
        wildDrawFour.textContent = 'wild +4'
        deck.push(wildDrawFour)
    }
}

function shuffleDeck(array) {
    let currentIndex = array.length

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}

function dealCardsToPlayers() {
    for (let i = 0; i < 7; i++) {
        let topCard = deck.shift()
        humanPlayer.push(topCard)
        humanHand.appendChild(humanPlayer[i])
        let secondToTopCard = deck.shift()
        computerPlayer.push(secondToTopCard)
        updateComHandDisplay()
    }
}

const updateComHandDisplay = () => {
    computerHand.innerHTML = ''
    computerPlayer.forEach(() => {
        const logoClone = unoLogo.cloneNode(true)
        computerHand.appendChild(logoClone)
    })
}

const updateDiscardPileDisplay = () => {
    const topCard = discardPile.at(-1)
    if (!topCard) return
    if (discardPileDiv.firstChild !== topCard) {
        while (discardPileDiv.firstChild) {
            discardPileDiv.removeChild(discardPileDiv.firstChild)
        }
        discardPileDiv.appendChild(topCard)
    }
}

function startDiscardPile() {
    discardPile.push(deck.shift())

    while (discardPile.at(-1).classList.contains('wild-draw-four') || discardPile.at(-1).classList.contains('wild')) {
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

    for (let i = 0; i < 10; i++) {
        if (cardToPlay.classList.contains(`${i}`) && currentDiscard.classList.contains(`${i}`)) {
            return true
        }
    }

    for (let i = 0; i < colors.length; i++) {
        if (cardToPlay.classList.contains(`${colors[i]}`) && currentDiscard.classList.contains(`${colors[i]}`)) {
            return true
        }
    }

    for (let i = 0; i < actionCards.length; i++) {
        if (cardToPlay.classList.contains(`${actionCards[i]}`) && currentDiscard.classList.contains(`${actionCards[i]}`)) {
            return true
        }
    }

    return false
}

function computerDrawCard() {
    computerPlayer.push(deck.shift())
    updateComHandDisplay()
    msgEl.textContent = 'Computer drew 1 card from the deck'
}

function drawCardsForPlayers(playerArray, playerHandDiv, count) {
    for (let i = 0; i < count; i++) {
        playerArray.push(deck.shift())
        if (playerHandDiv === humanHand) {
            playerHandDiv.appendChild(playerArray.at(-1))
        } else {
            updateComHandDisplay()
        }
    }
}

function handleCardEffect(card, thrownBy) {
    const opponent = thrownBy === 'player 1' ? 'player 2' : 'player 1'

    if (card.classList.contains('draw-two')) {
        if (opponent === 'player 1') {
            msgEl.textContent = 'Draw Two played against you!'
            subMsgEl.textContent = 'Drawing 2 cards...'
            setTimeout(() => {
                drawCardsForPlayers(humanPlayer, humanHand, 2)
                msgEl.textContent = 'You drew 2 cards and lost your turn!'
                subMsgEl.textContent = ''
                setTimeout(() => {
                    computerTurn()
                }, TIMING.CARD_EFFECT)
            }, 500)
        } else {
            msgEl.textContent = 'You played Draw Two!'
            subMsgEl.textContent = 'Computer drawing 2 cards...'
            setTimeout(() => {
                drawCardsForPlayers(computerPlayer, computerHand, 2)
                msgEl.textContent = 'Computer drew 2 cards and lost its turn!'
                subMsgEl.textContent = 'Your turn again!'
                setTimeout(() => {
                    subMsgEl.textContent = ''
                }, TIMING.MESSAGE_DISPLAY)
            }, 500)
        }
        return
    }
    if (card.classList.contains('skip')) {
        msgEl.textContent = `Skip card played!`
        subMsgEl.textContent = `${opponent} loses their turn`
        setTimeout(() => {
            subMsgEl.textContent = ''
            if (thrownBy === 'player 2') {
                setTimeout(() => {
                    computerTurn()
                }, TIMING.COMPUTER_TURN_START)
            }
        }, TIMING.CARD_EFFECT)
        return
    }
    if (card.classList.contains('reverse')) {
        msgEl.textContent = 'Reverse card played!'
        subMsgEl.textContent = `${opponent} loses their turn (reverse in 2-player)`
        setTimeout(() => {
            subMsgEl.textContent = ''
            if (thrownBy === 'player 2') {
                setTimeout(() => {
                    computerTurn()
                }, TIMING.COMPUTER_TURN_START)
            }
        }, TIMING.CARD_EFFECT)
        return
    }
    if (card.classList.contains('wild')) {
        if (thrownBy === 'player 1') {
            msgEl.textContent = 'Wild card played!'
            chooseColorBtns.style.display = 'inline-block'
            waitingForColorChoice = true
            subMsgEl.textContent = '⬇️ Click a color below ⬇️'
            return
        } else {
            const chosenColor = colors[Math.floor(Math.random() * colors.length)]
            msgEl.textContent = 'Computer played Wild card'
            subMsgEl.textContent = `Computer is choosing a color...`
            setTimeout(() => {
                discardPile.at(-1).classList.add(chosenColor)
                msgEl.textContent = `Color changed to ${chosenColor.toUpperCase()}!`
                subMsgEl.textContent = `Computer chose ${chosenColor.toUpperCase()} - match this color`
                setTimeout(() => {
                    nextTurn()
                }, TIMING.MESSAGE_DISPLAY)
            }, TIMING.COMPUTER_THINK)
            return
        }
    }
    if (card.classList.contains('wild-draw-four')) {
        if (thrownBy === 'player 1') {
            if (isWildDraw4Challengeable(humanPlayer, colors, 2)) {
                card.isChallengeable = 'yes'
            } else {
                card.isChallengeable = 'no'
            }
            card.thrownBy = 'player 1'
            chooseColorBtns.style.display = 'inline-block'
            waitingForColorChoice = true
            subMsgEl.textContent = 'Please choose a color'
            return
        } else {
            if (isWildDraw4Challengeable(computerPlayer, colors, 1)) {
                card.isChallengeable = 'yes'
            } else {
                card.isChallengeable = 'no'
            }
            card.thrownBy = 'player 2'
            msgEl.textContent = 'Computer played Wild Draw Four!'
            subMsgEl.textContent = 'Computer is choosing a color...'

            setTimeout(() => {
                const chosenColor = colors[Math.floor(Math.random() * colors.length)]
                discardPile.at(-1).classList.add(chosenColor)
                msgEl.textContent = `Color changed to ${chosenColor.toUpperCase()}!`
                subMsgEl.textContent = `Computer chose ${chosenColor.toUpperCase()} - Do you want to challenge?`

                setTimeout(() => {
                    challengeDraw4.style.display = 'inline-block'
                    dontChallengeDraw4.style.display = 'inline-block'
                }, TIMING.MESSAGE_DISPLAY)
            }, TIMING.COMPUTER_THINK)
            return
        }
    }
}

function drawCardHandler() {
    if (turn === 'player 2') {
        msgEl.textContent = "It's not your turn!"
        subMsgEl.textContent = 'Wait for the computer to finish'
        setTimeout(() => {
            subMsgEl.textContent = ''
        }, TIMING.QUICK_MESSAGE)
        return
    }
    if (waitingForColorChoice) {
        subMsgEl.textContent = 'Please choose a color first!'
        return
    }
    if (isProcessing) return

    isProcessing = true
    humanDrawCardAuto()
    msgEl.textContent = 'You drew 1 card from the deck'
    subMsgEl.textContent = 'Card added to your hand'

    setTimeout(() => {
        subMsgEl.textContent = ''
        isProcessing = false
        nextTurn()
    }, TIMING.MESSAGE_DISPLAY)
}

function handleHumanCardClick(event) {

    if (winner) return
    refillDeckIfNeeded()
    const clickedCard = event.target
    const clickedCardIndex = humanPlayer.indexOf(clickedCard)

    if (!clickedCard.classList.contains('card')) return
    if (turn === 'player 2') {
        msgEl.textContent = "Wait! It's the computer's turn"
        return
    }
    if (waitingForColorChoice) {
        subMsgEl.textContent = 'Choose a color first!'
        return
    }
    if (isProcessing) return

    if (isValidCard(clickedCard, discardPile.at(-1))) {
        discardPile.push(clickedCard)
        updateDiscardPileDisplay()
        humanPlayer.splice(clickedCardIndex, 1)
        clickedCard.remove()

        handleCardEffect(clickedCard, 'player 1')

        if (!waitingForColorChoice &&
            !clickedCard.classList.contains('draw-two') &&
            !clickedCard.classList.contains('skip') &&
            !clickedCard.classList.contains('reverse')) {
            nextTurn()
        }
        updateDiscardPileDisplay()
    } else {
        msgEl.textContent = 'Invalid card! Cannot play this card'
        subMsgEl.textContent = 'Must match color, number, or symbol'
        setTimeout(() => {
            if (turn === 'player 1') {
                msgEl.textContent = 'Your turn! Play a valid card'
                subMsgEl.textContent = ''
            }
        }, TIMING.QUICK_MESSAGE)
    }
    checkForWinner()
}

function computerTurn() {
    checkForWinner()
    if (winner) return
    refillDeckIfNeeded()

    let validComCards = []
    const oneOr2 = Math.floor(Math.random() * 2)

    if (turn === 'player 1') return
    for (let i = 0; i < computerPlayer.length; i++) {
        if (isValidCard(computerPlayer[i], discardPile.at(-1))) {
            validComCards.push(computerPlayer[i])
        }
    }

    for (let index = 0; index < validComCards.length; index++) {
        const crd = validComCards[index]
        if (crd.classList.contains('wild-draw-four')) {
            if (isWildDraw4Challengeable(validComCards, colors, 1)) {
                crd.isChallengeable = 'yes'
            } else {
                if (oneOr2 === 1) {
                    crd.isChallengeable = 'yes'
                } else {
                    validComCards.splice(index, 1)
                    index--
                }
            }
        }
    }

    if (validComCards.length > 0) {
        msgEl.textContent = 'Computer is thinking...'
        subMsgEl.textContent = 'Analyzing cards...'

        setTimeout(() => {
            const randomValidCard = Math.floor(Math.random() * validComCards.length)
            const chosenCard = validComCards[randomValidCard]
            const chosenCardIndex = computerPlayer.indexOf(chosenCard)

            let cardType = 'a card'
            if (chosenCard.classList.contains('wild-draw-four')) cardType = 'Wild +4'
            else if (chosenCard.classList.contains('wild')) cardType = 'Wild'
            else if (chosenCard.classList.contains('draw-two')) cardType = 'Draw Two'
            else if (chosenCard.classList.contains('skip')) cardType = 'Skip'
            else if (chosenCard.classList.contains('reverse')) cardType = 'Reverse'
            else {
                for (let i = 0; i < 10; i++) {
                    if (chosenCard.classList.contains(`${i}`)) {
                        cardType = `${i}`
                        break
                    }
                }
            }

            msgEl.textContent = `Computer played ${cardType}`
            subMsgEl.textContent = 'Processing...'

            discardPile.push(chosenCard)
            updateDiscardPileDisplay()
            computerPlayer.splice(chosenCardIndex, 1)
            updateComHandDisplay()

            setTimeout(() => {
                handleCardEffect(chosenCard, 'player 2')

                if (!chosenCard.classList.contains('wild') &&
                    !chosenCard.classList.contains('wild-draw-four') &&
                    !chosenCard.classList.contains('draw-two') &&
                    !chosenCard.classList.contains('skip') &&
                    !chosenCard.classList.contains('reverse')) {
                    setTimeout(() => {
                        nextTurn()
                    }, 600)
                }
            }, 400)
        }, TIMING.COMPUTER_THINK)
    } else {
    msgEl.textContent = 'Computer has no valid cards'
    subMsgEl.textContent = 'Drawing from deck...'
    setTimeout(() => {
        computerDrawCard()
        subMsgEl.textContent = ''
        setTimeout(() => {
            nextTurn()
        }, TIMING.MESSAGE_DISPLAY)
    }, TIMING.COMPUTER_THINK)
}
    checkForWinner()
    
}

function isWildDraw4Challengeable(array1, array2, num) {
    for (let i = 0; i < array1.length; i++) {
        const card = array1[i];
        for (let j = 0; j < array2.length; j++) {
            const color = array2[j];
            if (card.classList.contains(`${color}`) && discardPile.at(-num).classList.contains(`${color}`)) {
                return true
            } else {

            }
        }
    }
    return false
}

function nextTurn() {
    if (winner) return
    if (isProcessing) {
        setTimeout(() => nextTurn(), 300)
        return
    }

    turn = turn === 'player 1' ? 'player 2' : 'player 1'

    if (turn === 'player 2') {
        const lastCard = discardPile.at(-1)
        const hasColorMessage = lastCard && (lastCard.classList.contains('wild') || lastCard.classList.contains('wild-draw-four'))

        if (!hasColorMessage || !subMsgEl.textContent.includes('chose')) {
            msgEl.textContent = "Computer's turn"
            subMsgEl.textContent = 'Please wait...'
        }

        setTimeout(() => {
            computerTurn()
        }, TIMING.COMPUTER_TURN_START)
    } else {
        const lastCard = discardPile.at(-1)
        const hasColorMessage = lastCard && (lastCard.classList.contains('wild') || lastCard.classList.contains('wild-draw-four'))

        if (!hasColorMessage || !subMsgEl.textContent.includes('chose')) {
            msgEl.textContent = 'Your turn!'
            subMsgEl.textContent = 'Play a card or draw from deck'
            setTimeout(() => {
                subMsgEl.textContent = ''
            }, TIMING.MESSAGE_DISPLAY)
        } else {
            msgEl.textContent = msgEl.textContent 
        }
    }
}

function handleColorChoice(event) {
    if (winner) return
    if (turn === 'player 2') return
    if (!waitingForColorChoice) return

    const clickedColor = event.target
    chosenColor = clickedColor.textContent.toLowerCase()

    discardPile.at(-1).classList.add(`${chosenColor}`)
    chooseColorBtns.style.display = 'none'
    waitingForColorChoice = false
    msgEl.textContent = `You chose ${chosenColor.toUpperCase()}!`
    subMsgEl.textContent = 'Color selected'

    setTimeout(() => {
        if (discardPile.at(-1).classList.contains('wild-draw-four')) {
            discardPile.at(-1).thrownBy = 'player 1'

            const oneOr2 = Math.floor(Math.random() * 2)

            if (oneOr2 === 1) {
                msgEl.textContent = 'Computer is challenging your Wild +4...'
                subMsgEl.textContent = 'Checking your hand...'

                setTimeout(() => {
                    if (discardPile.at(-1).isChallengeable === 'yes') {
                        drawCardsForPlayers(humanPlayer, humanHand, 4)
                        msgEl.textContent = 'Challenge successful! You had a playable card'
                        subMsgEl.textContent = 'You drew 4 cards as penalty and lost your turn'
                        discardPile.at(-1).processed = true

                        setTimeout(() => {
                            subMsgEl.textContent = ''
                            nextTurn()
                        }, TIMING.CARD_EFFECT)
                        return
                    } else {
                        drawCardsForPlayers(computerPlayer, computerHand, 6)
                        msgEl.textContent = `Color changed to ${chosenColor.toUpperCase()}!`
                        subMsgEl.textContent = `You chose ${chosenColor.toUpperCase()} - Computer drew 6 cards as penalty`
                        discardPile.at(-1).processed = true

                        setTimeout(() => {
                            subMsgEl.textContent = ''
                        }, TIMING.CARD_EFFECT)
                        return
                    }
                }, TIMING.COMPUTER_THINK)
            } else {
                msgEl.textContent = 'Computer accepted your Wild +4'
                subMsgEl.textContent = 'Computer drawing 4 cards...'

                setTimeout(() => {
                    drawCardsForPlayers(computerPlayer, computerHand, 4)
                    msgEl.textContent = 'Computer drew 4 cards and lost its turn'
                    subMsgEl.textContent = 'Your turn again!'
                    discardPile.at(-1).processed = true

                    setTimeout(() => {
                        subMsgEl.textContent = ''
                    }, TIMING.MESSAGE_DISPLAY)
                    return
                }, 800)
            }
        } else {
            msgEl.textContent = `Color changed to ${chosenColor.toUpperCase()}!`
            subMsgEl.textContent = `You chose ${chosenColor.toUpperCase()} - this is the new color`
            setTimeout(() => {
                nextTurn()
            }, 800)
        }
    }, 500)
}

function humanDrawCardAuto() {
    humanPlayer.push(deck.shift())
    humanHand.appendChild(humanPlayer.at(-1))
}

function handleChallengeBtn() {
    msgEl.textContent = 'You challenged the Wild +4!'
    subMsgEl.textContent = 'Checking computer hand...'
    challengeDraw4.style.display = 'none'
    dontChallengeDraw4.style.display = 'none'

    setTimeout(() => {
        if (discardPile.at(-1).isChallengeable === 'yes') {
            drawCardsForPlayers(computerPlayer, computerHand, 4)
            const cardColor = colors.find(c => discardPile.at(-1).classList.contains(c))
            msgEl.textContent = `Color is ${cardColor.toUpperCase()}!`
            subMsgEl.textContent = `Challenge successful! Computer drew 4 cards. Match ${cardColor.toUpperCase()}`
            turn = 'player 1'
        } else {
            drawCardsForPlayers(humanPlayer, humanHand, 6)
            msgEl.textContent = 'Challenge failed! Computer played legally'
            subMsgEl.textContent = 'You drew 6 cards as penalty and lost your turn'
            turn = 'player 1'
            setTimeout(() => {
                subMsgEl.textContent = ''
                nextTurn()
            }, TIMING.CARD_EFFECT)
        }
        discardPile.at(-1).processed = true
    }, TIMING.COMPUTER_THINK)
}


function handleDontChallenge() {
    msgEl.textContent = 'You accepted the Wild +4'
    subMsgEl.textContent = 'Drawing 4 cards...'
    challengeDraw4.style.display = 'none'
    dontChallengeDraw4.style.display = 'none'

    setTimeout(() => {
        drawCardsForPlayers(humanPlayer, humanHand, 4)
        const cardColor = colors.find(c => discardPile.at(-1).classList.contains(c))
        msgEl.textContent = `Color is ${cardColor.toUpperCase()}!`
        subMsgEl.textContent = `You drew 4 cards - Computer's turn. Match ${cardColor.toUpperCase()} next`
        turn = 'player 1'
        discardPile.at(-1).processed = true
        setTimeout(() => {
            nextTurn()
        }, TIMING.MESSAGE_DISPLAY)
    }, 500)
}

function refillDeckIfNeeded() {
    if (deck.length <= 6) {
        while (discardPile.length !== 1) {
            deck.push(discardPile.shift())
        }
        deck.forEach(card => {
            if (card.classList.contains('wild')) {
                card.className = ''
                card.classList.add('wild', 'card')
            }
            if (card.classList.contains('wild-draw-four')) {
                card.className = ''
                card.processed = false
                card.isChallengeable = ''
                card.thrownBy = ''
                card.classList.add('wild-draw-four', 'card')
            }
        })
        shuffleDeck(deck)
    }
}

function checkForWinner() {
    if (!computerPlayer.length) {
        winner = 'player 2'
        msgEl.textContent = '🤖 COMPUTER WINS!'
        subMsgEl.textContent = 'Better luck next time! Click "New Game" to try again'
        isProcessing = true
    }
    if (!humanPlayer.length) {
        winner = 'player 1'
        msgEl.textContent = '🎉 YOU WIN! CONGRATULATIONS! 🎉'
        subMsgEl.textContent = 'Great job! Click "New Game" to play again'
        isProcessing = true
    }
}

function initGame() {
    deck = []
    humanPlayer = []
    computerPlayer = []
    discardPile = []
    winner = null
    waitingForColorChoice = false
    chosenColor = ''
    msgEl.textContent = 'Game started! Your turn!'
    subMsgEl.textContent = ''
    humanHand.innerHTML = ''
    computerHand.innerHTML = ''
    discardPileDiv.innerHTML = ''
    turn = 'player 1'
    fillDeckWithAllCards()
    shuffleDeck(deck)
    dealCardsToPlayers()
    isProcessing = false
    startDiscardPile()
}
initGame()


/*----------------------------- Event Listeners -----------------------------*/

humanHand.addEventListener('click', handleHumanCardClick)

drawCard.addEventListener('click', drawCardHandler)

chooseColorBtns.addEventListener('click', handleColorChoice)

challengeDraw4.addEventListener('click', handleChallengeBtn)
dontChallengeDraw4.addEventListener('click', handleDontChallenge)

resetBtn.addEventListener('click', initGame)

howToPlayBtn.addEventListener('click', () => {
    if (rulesDiv.style.display === 'none') {
        rulesDiv.style.display = 'block'
        howToPlayBtn.textContent = '✖️ Close Rules'
    } else {
        rulesDiv.style.display = 'none'
        howToPlayBtn.textContent = '❓ How to Play'
    }
})