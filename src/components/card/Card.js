import React, { Component } from 'react';
import CardStyles from 'mui/cardStyles';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './Card.css';


class GameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keep: true
    };
  }

  componentWillReceiveProps(nextProps) {
    // When the card changes due to a discard, reset the value of keep
    if (this.props.title !== nextProps.title) {
      this.setState({
        keep: true
      });
    }
  }

  swapDiscardState = () => {
    this.setState({
      keep: !this.state.keep
    }, () => {
      this.props.informParentOfDiscard(this.props.index, this.state.keep);
    });
  }

  render() {
    return (        
      <Card
        style={this.state.keep ? CardStyles.activeCard : CardStyles.discardCard}
      >
        <CardTitle
          title={this.props.title}
          subtitle={`of ${this.props.subtitle}`}
          titleStyle={this.state.keep ? CardStyles.activeTitle : CardStyles.discardTitle}
          subtitleStyle={this.state.keep ? CardStyles.activeSubtitle : CardStyles.discardSubtitle}
        />
        <CardActions style={CardStyles.actionsContainer}>
          <FlatButton label={this.state.keep ? 'Discard' : 'Keep'} onTouchTap={this.swapDiscardState} />
        </CardActions>
      </Card>
    );
  }
}

export default GameCard;
