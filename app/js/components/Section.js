import React from 'react';
import Header             from '../components/Header';
import Main             from '../components/Main';
import Footer             from '../components/Footer';

export default class Section extends React.Component{

	render() {
	    return (
	    	<section className="flexbox-container">
		      	<div>		      	
		      		<Main />
				</div>
		      	<div>
		      		<Header />
		      		<Footer />
				</div>
	    	</section>
	    );
	}8
}