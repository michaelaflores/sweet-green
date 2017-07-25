import React, { Component } from 'react';
import Card from 'components/card/Card';
import { Col } from 'react-bootstrap';
import Deck from 'components/deck/Deck';
import RaisedButton from 'material-ui/RaisedButton';
import './GameContainer.css';

class GameContainer extends Component {
  static scoreDeck(deck) {
    const positionSortableDeck = deck.slice();
    const valueSortableDeck = deck.slice();

    positionSortableDeck.sort((a, b) => {
      return a.position - b.position;
    });
    console.log('positionsortable', positionSortableDeck);

    valueSortableDeck.sort((a, b) => {
      const courtConversionA = ({
        Jack: '11',
        Queen: '12',
        King: '13',
        Ace: '14'
      })[a.value];
      const courtConversionB = ({
        Jack: '11',
        Queen: '12',
        King: '13',
        Ace: '14'
      })[b.value];
      if (courtConversionA)
        a.value = courtConversionA;
      if (courtConversionB)
        b.value = courtConversionB;
      return parseInt(a.value, 10) - parseInt(b.value, 10);
    });

    let sameSuitCount = 1;
    // Use this to show something in UI in leieu of finishing
    let maxSuitCount = 1;
    let consecutiveRankCount = 1;
    // Use this to show something in UI in leiue of finishing
    let maxConsecutiveRankCount = 1;
    let lastPositionCard = undefined;
    let lastValueCard = undefined;

    // Check for flush
    for (const card of positionSortableDeck) {
      if (lastPositionCard) {
        if (lastPositionCard.suit === card.suit) {
          sameSuitCount++;
          if (sameSuitCount > maxSuitCount)
              maxSuitCount = sameSuitCount;
        } else {
          sameSuitCount = 1;
        }
      }
      lastPositionCard = card;
    }
    // Check for consecutive rank
    for (const card of valueSortableDeck) {
      if (lastValueCard) {
        if (parseInt(lastValueCard.value, 10) == parseInt(card.value, 10) - 1) {
          consecutiveRankCount++;
          if (consecutiveRankCount > maxConsecutiveRankCount)
            maxConsecutiveRankCount = consecutiveRankCount;
        } else {
          consecutiveRankCount = 1;
        }
      }
      lastValueCard = card;
    }

    // TODO: Determine score and call API
    // show alert for now
    alert(`Consecutive suits: ${maxSuitCount}
    Consecutive card values: ${consecutiveRankCount}`);
  }

  constructor(props) {
    super(props);

    this.initState();
  }

  componentWillMount() {
    this.initDeck();
  }

  informDiscardState = (card, removeFromDiscardList) => {
    if (!removeFromDiscardList) {
      this.setState({
        cardsDiscarded: [...this.state.cardsDiscarded, card]
      });
    } else {
      // Remove the now not-discarded cards from the array
      this.setState({
        cardsDiscarded: this.state.cardsDiscarded.filter(value => value !== card)
      });
    }
  }

  initDeck() {
    this.deck = new Deck();
    const {
      card1,
      card2,
      card3,
      card4,
      card5
    } = this.deck.dealCards([]);

    this.setState({
      cards: [
        card1,
        card2,
        card3,
        card4,
        card5
      ]
    });
  }

  initState() {
    this.state = {
      cards: {},
      cardsDiscarded: [],
      firstRun: true,
      runDisabled: false,
      runLabel: 'Go'
    };
  }

  runScoring = () => {
    if (this.state.cardsDiscarded.length > 0 && this.state.firstRun) {
      var stateCopy = Object.assign({}, this.state);
      stateCopy.cards = stateCopy.cards.slice();
      for (const card of this.state.cardsDiscarded) {
        stateCopy.cards[card] = Object.assign({}, stateCopy.cards[card]);
        stateCopy.cards[card] = this.deck.dealNewCard([]);
        stateCopy.firstRun = false;
      }
      this.setState(stateCopy);
    } else {
      this.setState({
        runDisabled: true,
        runLabel: 'Deal'
      }, () => {
        GameContainer.scoreDeck(this.state.cards);
      });
    }
  }

  render() {
    return (
      <div className="game-container">
        <Col sm={12}>
          {this.state.cards.map((card, index) => 
            <Col key={index} sm={12} md={2}>
              <Card title={card.value} subtitle={card.suit} informParentOfDiscard={this.informDiscardState} index={index} />
            </Col>
          )}
        </Col>
        <Col sm={12} className="action-container">
          <RaisedButton label={this.state.runLabel} disabled={this.state.runDisabled} primary={true} onTouchTap={this.runScoring} />
        </Col>
      </div>
    );
  }
}

export default GameContainer;
