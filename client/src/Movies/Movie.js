import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "./component/Card";

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  console.log("from moviefile",props)
  useEffect(() => {
    const id = props.match.params.id;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[]);
  
 
  const saveMovie = () => {
    const addToSavedList = props.funct;
    addToSavedList(movie)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className = "save-wrapper">
      <Card title = {title} director = {director} metascore = {metascore} stars = {stars} button = {true}/>
      <button onClick={()=>saveMovie()} className="save-button">Save</button>
    </div>
    
      );
}

export default Movie;
