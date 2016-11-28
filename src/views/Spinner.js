import React from 'react';
import Radium, { StyleRoot } from 'radium';

export default class Spinner extends React.Component {

  render() {
    return (
    	<StyleRoot>
	      <div style={Styles.spinner}>
				  <div style={[Styles.doubleBounce1, Styles.animation]}></div>
				  <div style={[Styles.doubleBounce2, Styles.animation]}></div>
				</div>
			</StyleRoot>
    );
  }
}

const bounce = Radium.keyframes({
  '0%': {transform: 'scale(0.0)'},
  '50%': {transform: 'scale(1.0)'},
  '100%': {transform: 'scale(0.0)'},
});

const Styles = {
	spinner: {
		width: 40,
  	height: 40,
  	position: 'relative',
  	margin: '100px auto'
	}, 

	animation: {
		width: '100%',
	  height: '100%',
	  borderRadius: '50%',
	  backgroundColor: '#ffb001',
	  opacity: '0.6',
	  position: 'absolute',
	  top: 0,
	  left: 0,
	  animationName: bounce
	},

	doubleBounce1: {
		animation: 'bounce 2.0s infinite ease-in-out',
	},

	doubleBounce2: {
		animation: 'bounce 2.0s infinite ease-in-out',
		animationDelay: '-1.0s'
	}
};
