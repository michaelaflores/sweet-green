import Card from './Card';

class Deck {
  static getRandomCard(exclusionArray) {
    let matchedExclusion = false;
    const position = Math.floor(Math.random() * (52 - 1 + 1)) + 1;
    // Will run until the return value is true, here we check
    // if any value we want to exclude was generated.
    exclusionArray.some((value) => {
      if (value === position) {
        matchedExclusion = true;
      }
      return matchedExclusion;
    });
    // If a value that we want excluded is generated,
    // run this again.
    if (matchedExclusion) {
      return Deck.getRandomCard(exclusionArray);
    }
    // If no excluded position was generated, return the generated position
    return position;
  }

  constructor() {
    this.values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    this.cards = [];

    this.generateCards();
  }

  dealCards(exclusionArray) {
    // console.log('deck', 'dealing cards');
    const card1 = this.cards[Deck.getRandomCard(exclusionArray)],
          card2 = this.cards[Deck.getRandomCard(exclusionArray)],
          card3 = this.cards[Deck.getRandomCard(exclusionArray)],
          card4 = this.cards[Deck.getRandomCard(exclusionArray)],
          card5 = this.cards[Deck.getRandomCard(exclusionArray)];
    // console.log('dealing cards', card1, card2, card3, card4, card5);
    return {
      card1,
      card2,
      card3,
      card4,
      card5
    };
  }

  dealNewCard(exclusionArray) {
    const card = this.cards[Deck.getRandomCard(exclusionArray)];
    return card;
  }

  generateCards() {
    let position = 0;
    for (var s = 0; s < this.suits.length; s++) {
      for (var n = 0; n < this.values.length; n++) {
        position++;
        this.cards.push(new Card({position: position, value: this.values[n], suit: this.suits[s]}));
      }
    }
  }
}

export default Deck;
