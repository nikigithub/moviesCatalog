import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium'
import MoviesComponent from './views/MoviesComponent';

@Radium
export default class App extends Component {
  render() {
    return (
      <StyleRoot>
    		<div style={Styles.section}>
    			<MoviesComponent />
    		</div>
      </StyleRoot>
    );
  }
}

const Styles = {
	section: {
		fontSize: 15,
		fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
    lineHeight: 1.80857,
    color: '#686b70',
    backgroundColor: '#f2f2f2'
	}
};
