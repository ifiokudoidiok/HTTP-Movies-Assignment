import React, { useState } from "react";
import axios from 'axios';
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import UpdateForm from "../src/Movies/UpdateForm";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

const App = props => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  
  const deleteMovie = (id) => (e) => {
  
      
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(({ data }) => {
        
        setMovies(movies.filter(movie => movie.id !== data));
       window.location.href = "/";
      })
      .catch(err => console.log(err));
 
}
  
  
  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => {
          return <MovieList {...props} movies={movies} setMovies={setMovies} />;
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie}/>;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateForm {...props} movieDetails={movies} setMovies={setMovies} />
        )}
      />
    </>
  );
};

export default App;
