import React from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function UpdateForm(props) {
  
  const validate = ({ editMovie, title, director, metascore, stars }) => {
    return {};
  };
  let initialValues = {};
  const fetchMovies = () =>{
      axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        // debugger
        props.setMovies(res.data)
        initialValues = res.data.find(mov => mov.id === Number(props.match.params.id))
        
      })
      .catch(err => console.log(err.response));
  }
  if(props.movieDetails.length < 1) {
    fetchMovies();
    
    return 'Loading movies...'
  } else {
    initialValues = props.movieDetails.find(mov => mov.id === Number(props.match.params.id))
  }

  const putMovie = (data) => {
    axios
      .put(`http://localhost:5000/api/movies/${data.id}`, data)
      .then((res) => {
        // debugger
        // props.setMovies()
        props.setMovies(props.movieDetails.map(movie => {
          if(movie.id === data.id) {
            return data;
          }
          return movie;
        }))
       props.history.push(`/movies/${data.id}`)
       console.log(res)
      })
      .catch((err)=> {
        debugger
        console.log(err)
      })
  };

  return (
    <>
      <Formik
        key={initialValues} 
        validate={validate}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          putMovie(values)
        }}
        render={() => (
          <div className="form">
            <h4>Enter Movie Details</h4>
          <Form>
            <Field name="title"  placeholder="Title"/>
            <ErrorMessage name="title" component="span" /><br/>

            <Field name="director" placeholder="Director"/>
            <ErrorMessage name="director" component="span" /><br/>
            <Field name="metascore" placeholder="MetaScore"/>
            <ErrorMessage name="metascore" component="span" /><br/>
            <Field name="stars" placeholder="Stars"/>
            <ErrorMessage name="stars" component="span" /><br/>

            <input type="submit" />
          </Form>
      </div>
        )}
      />
    </>
  );
}
