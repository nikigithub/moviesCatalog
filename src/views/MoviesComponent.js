import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import MoviesActions from '../queries/movies';
import Spinner from '../views/Spinner';

@Radium
export default class MoviesComponent extends React.Component {
	render() {
	  return (
	    <StyleRoot>
		 			<section style={Styles.appSection}>
			      <main style={Styles.leftColumn}>
			      	{ this.renderSpinner() }
			      	{ this.renderMovieSection() }
			      </main>
			      <aside style={Styles.rightColumn}>
			      	{ this.renderSearchMovieForm() }
			      	{ this.renderMoviesList() }
			      </aside>
		      </section>
	    </StyleRoot>
		);
	}

	renderSearchMovieForm() {
		return (
			<form onSubmit={this.onSubmit} style={{margin: 0}}>
        <div>
           <input ref="movie" onChange={this.inputOnChange} style={Styles.input} onBlur={this.onBlur} placeholder="Search for a movie" />
        </div>
      </form>
		);
	}

	renderMovieSection() {
		const { creditsData, movieData, loading } = this.state;

		if (movieData && movieData !== null && !loading) {
		  return (
				<MainSection movieData={movieData} creditsData={creditsData} />
		  );
		} else {
			return null;
		}
	}

	renderSpinner() {
		const { loading, searchResults } = this.state;

		if (loading && searchResults && searchResults !== null) {
		  return (
				<Spinner />
		  );
		} else {
			return null;
		}
	}

	renderMoviesList() {
		const { searchResults } = this.state;
		const results = searchResults && searchResults.results;
		if (results && results.length > 0) {
			return (
				<div style={Styles.moviesList}>
					<div style={{marginBottom: -15, marginTop: -15}}>
						{ results.map((movie) => { 
								const { title, release_date, id, backdrop_path, poster_path } = movie;
								return (
									<section data-movie-id={id} onClick={this.selectMovieHandler} key={id} style={Styles.moviesListItem}>
										{ this.renderPosterImage(poster_path) }
										<main style={{ alignSelf: 'center' }}>
											<h4 style={Styles.h4}>{title}</h4>
											<small style={Styles.small}>{release_date}</small>
										</main>
									</section>
								);
							})
						}
					</div>
				</div>
			);
		} else {
			return null;
		}  	
	}

	renderPosterImage(poster_path) {
 		if (poster_path && poster_path !== null) {
	 		return (
	 			<img src={`https://image.tmdb.org/t/p/w45_and_h67_bestv2${poster_path}`} alt="Poster image" style={{marginRight: 10}} />
	 		);
 		} else {
 			return null;
 		}
 	}

	inputOnChange = (e) => {
    const value = e.target.value;

    if (value) {
    	MoviesActions.ListMoviesByTitle(value)
		   	.then((searchResults) => {
			    this.setState({searchResults})
		   	});
    } else {
    	const searchResults = null;
    	this.setState({searchResults})
    }
  };

  selectMovieHandler = (e) => {
  	const movieId = e.currentTarget.dataset.movieId;

  	if (movieId) {
  		this.handleOnSearch(movieId);
    }
  };

  onSubmit = (e) => {
  	const { searchResults } = this.state;
  	const { results } = searchResults;
    e.preventDefault();
		const movieId = results && results[0] && results[0].id;
    if (movieId) {
    	this.handleOnSearch(movieId);
    }
  };

  handleOnSearch(movieId) {
  	const loading = true;
  	this.setState({loading});

	  MoviesActions.MovieById(movieId)
	   	.then(movieData => {
	   		return MoviesActions.CreditsById(movieId)
	   			.then(creditsData => {
	   				this.clearSearchInput('movie');
	   				this.setState({searchResults: null, movieData, creditsData, loading: false})
	   			});
	   	});
  }

  clearSearchInput(refName) {
  	this.refs[refName].value = '';
  	this.refs[refName].blur();
  }

  state = { 
  	searchResults: null,
  	creditsData: null,
  	movieData: null,
  	loading: false
  };
}

@Radium
class MainSection extends React.Component {
  render() {
		const { title, overview, poster_path } = this.props.movieData;
		const { cast, crew } = this.props.creditsData;

		if (title, overview, poster_path, cast, crew ) {
			return(
				<article>
					<div style={Styles.movieSection}>
						<aside style={Styles.column}>
							{ this.renderPosterImage() }
						</aside>
						<section style={Styles.column}>
							<header><h1 style={Styles.h1}>{title}</h1></header>
							<main>
								<h2 style={Styles.h2}>Overview</h2>
								<p style={Styles.p}>{overview}</p>
								<h3 style={Styles.h3}>Featured Crew</h3>
								<ul style={[Styles.listStyle]}>
									{ crew.slice(0,3).map(member => { 
											const { credit_id, job, name } = member;
											return (
												<li style={Styles.tag} key={credit_id}>
													<div style={{color: '#1f1f1f', fontWeight: 700, lineHeight: 1, marginBottom: 5}}>{name}</div>
													<small style={{lineHeight: 1}}>{job}</small>
												</li>
											);
										})
									}
								</ul>
							</main>
						</section>
					</div>
					<footer>
						<h3 style={Styles.h3}>Top Billed Cast</h3>
						<ul style={Styles.listStyle}>
							{ cast.slice(0,6).map(actor => {
									const { cast_id, name, profile_path } = actor;
									return (
										<li style={[Styles.liInline, {textAlign: 'center'}]} key={cast_id}>
											{ this.renderProfileImage(profile_path) }
											<div style={{color: '#1f1f1f', fontWeight: 700, lineHeight: 1, marginBottom: 5}}>{name}</div>
										</li>
									);
								}) 
							}
						</ul>
					</footer>
				</article>
			);
		} else {
			return null;
		}
 	}

 	renderPosterImage() {
		const { poster_path } = this.props.movieData;
 		if (poster_path && poster_path !== null) {
	 		return (
	 			<img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt="Poster image" style={Styles.posterImage} />
	 		);
 		} else {
 			return null;
 		}
 	}

 	renderProfileImage(src) {
 		if (src && src !== null) {
	 		return (
	 			<img src={`https://image.tmdb.org/t/p/w132_and_h132_bestv2${src}`} alt="Actor image" style={{marginBottom: 15, borderRadius: '50%'}} />
	 		);
 		} else {
	 		return (
	 			<img src={`https://image.tmdb.org/t/p/w132_and_h132_bestv2/lBXifSLzs1DuspaWkACjSfjlwbd.jpg`} alt="Actor image" style={{marginBottom: 15, borderRadius: '50%'}} />
	 		);
 		}
 	}
}

const Styles = {
  appSection: {
    display: 'flex',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    flexDirection: 'column',

    '@media (min-width: 769px)': {
    	flexDirection: 'row',
    	width: '90%',
    	paddingTop: '5%',
    	paddingBottom: '5%',
    }
  },

  column: {
  	'@media (min-width: 737px)': {
  		paddingLeft: 15,
  		paddingRight: 15,
    }
  },

  leftColumn: {
  	backgroundColor: '#fff',
  	padding: 15,
  	order: 2,
  	height: '100%',

  	'@media (min-width: 769px)': {
    	width: '75%',
    	order: 1,
    	padding: 90
    }
  },

  rightColumn: {
  	backgroundColor: '#f2f2f2',
  	order: 1,

  	'@media (min-width: 769px)': {
  		width: '25%',
  		paddingLeft: 30,
  		paddingRight: 30,
  		order: 2,
    }
  },

  input: {
  	display: 'block',
  	color: '#555',
  	width: '100%',
  	padding: '6px 12px',
  	backgroundColor: '#fff',
  	borderTopWidth: 0,
		borderBottomWidth: 1,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderStyle: 'solid',
		borderColor: '#eee',
  	boxShadow: 'none',
  	height: 50,
  	fontSize: 14,
  	lineHeight: 6.428571,
  	outline: 'none',

  	'@media (min-width: 769px)': {
			borderRadius: 4,
			borderBottomWidth: 0,
		}
  },

  movieSection: {
  	display: 'flex',
  	width: '100%',
  	flexDirection: 'column',

  	'@media (min-width: 737px)': {
    	flexDirection: 'row',
    	marginLeft: -15,
  		marginRight: -15,
    }
  },

  h1: {
  	color: '#212121',
  	fontSize: 44,
  	lineHeight: '140%',
  	marginTop: 0,
  	marginBottom: 30
  }, 

  h2: {
  	color: '#1f1f1f',
    fontSize: 26,
    lineHeight: '35px',
    marginTop: 0,
    marginBottom: 20
  },

  h3: {
  	color: '#1f1f1f',
    fontSize: 21,
    marginTop: 0,
    marginBottom: 20
  },

  h4: {
  	fontWeight: 700, 
  	lineHeight: 1, 
  	marginTop: 0, 
  	marginBottom: 5
  },

  small: {
  	lineHeight: 1, 
  	color: '#686b70'
  },

  p: {
  	marginTop: 0
  },

  moviesList: {
  	backgroundColor: '#fff', 
  	padding: 15, 

  	'@media (min-width: 769px)': {
  		marginTop: 15
  	}
  },

  moviesListItem: {
  	display: 'flex', 
  	color: '#1f1f1f', 
  	marginTop: 15,
  	marginBottom: 15, 
  	transition: 'all .3s ease-in-out',
		
		':hover': {
      backgroundColor: '#f2f2f2'
    }
  },

  listStyle: {
  	listStyle: 'none',
  	marginTop: 0,
  	marginBottom: 10,
  	paddingLeft: 0,
  	marginLeft: -10,
  	marginRight: -10
  },

  liInline: {
  	display: 'inline-block',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 30
  },

  posterImage: {
  	marginBottom: 30,
  	maxWidth: '100%',
  	boxSizing: 'border-box',

  	'@media (min-width: 737px)': {
  		maxWidth: 300,
  	}

  },
 	
 	tag: {
 		display: 'inline-block',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5
 	}
}
