# 🎮 UNO Card Game

![UNO cards](https://www.rd.com/wp-content/uploads/2025/06/How-to-play-Uno_RDD_Uno_EF_061225_FT.jpg)

## Description

A fully interactive, browser-based implementation of the classic UNO card game. This single-player game pits you against a computer opponent in an exciting battle of strategy, luck, and quick thinking.

UNO is a beloved family card game where players race to get rid of all their cards by matching colors, numbers, or special action cards. I chose this game because of its perfect balance between simple rules and engaging gameplay, making it an ideal project to demonstrate front-end development skills while creating something genuinely fun to play.

---

## Getting Started

### Play the Game
🎮 **[Play UNO Now!](https://levi81770.github.io/UNO/)**

### How to Play
1. **Objective**: Be the first player to get rid of all your cards
2. **Your Turn**: Click a card from your hand that matches the top card's color, number, or symbol
3. **Drawing Cards**: Click "Draw Card" if you have no valid plays
4. **Special Cards**:
   - **Wild**: Choose any color to continue play
   - **Wild +4**: Choose a color and opponent draws 4 cards (can be challenged!)
   - **Draw Two**: Opponent draws 2 cards and loses their turn
   - **Skip**: Opponent loses their turn
   - **Reverse**: Acts like Skip in 2-player mode

### Planning Materials
1. Define variables to track the game progress
2. Cache HTML elements in JS (cached elements)
3. Define win condition
4. Define deck
5. Define discard pile
6. Define players in empty arrays so that a player can draw and play cards
7. Initialize game
8. Build logic for what happens each turn (whose turn it is, which cards the player can play, what if they have no cards to play, handling special cards (skip, reverse, draw two, wild, wild draw four), checking win condition, moving to next player)
9. Build logic for which cards are allowed to play each turn (matching color or matching number/symbol)
10. Build logic for when the deck runs out (keep the last card from discard pile and shuffle the rest back into the deck)
11. Design the game with CSS

---

## Attributions

- **Libraries And Assets**:     
    - [MDN](https://developer.mozilla.org/en-US/)
    - [stack overflow](https://stackoverflow.com/questions)
    - [WebAim](https://webaim.org/resources/contrastchecker/) (comparability with WCAG 2.0 level AA standards)
    - [Claude Code](https://claude.ai/) (debuging)
    - [Wikipedia](https://www.wikipedia.org/) (UNO rules)

---

## Technologies Used

- JavaScript
- HTML
- CSS
- Browser DevTools
- WCAG Color Contrast Checker

---

## Next Steps

- Add ***call UNO*** button
- Add option for more players
- Add audio and animation effects
- Add background music

---
