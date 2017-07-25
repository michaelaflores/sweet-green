import { 
  fullBlack
} from 'material-ui/styles/colors';

const cardStyles = {
  actionsContainer: {
    marginTop: 100
  },
  activeCard: {
    backgroundColor: 'white',
    display: 'inline-block',
    height: 250,
    width: 250
  },
  discardCard: {
    backgroundColor: 'red',
    display: 'inline-block',
    height: 250,
    width: 250
  },
  activeSubtitle: {
    color: fullBlack
  },
  discardSubtitle: {
    color: 'white'
  },
  activeTitle: {
    color: 'black',
    fontWeight: '800'
  },
  discardTitle: {
    color: 'white',
    fontWeight: '800'
  }
};

export default cardStyles;
