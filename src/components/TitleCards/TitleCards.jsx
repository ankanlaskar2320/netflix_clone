import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjNlZDUyNjZhNTFkZjQ4MTJhZWQ1MTJlOTRkOGU5OCIsIm5iZiI6MTc3Mjc3MTg0Ni4zMjksInN1YiI6IjY5YWE1YTA2ZjdhNTdiYjYyYzZhY2FhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pIk--drK6AFJaeZYWMXPSsYQ3dqbbNEFKYNek8da7xw'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    const element = cardsRef.current;

    const handleWheel = (e) =>{
      if(element){
        e.preventDefault();
        element.scrollLeft += e.deltaY;
      }
    };

    if(element){
      element.addEventListener('wheel', handleWheel, {passive: false});
    }

    return()=>{
      if(element){
        element.removeEventListener('wheel', handleWheel);
      }
    };
  },[category]);

  //const cardsRef = useRef(null);
  //
  //const handleWheel = (e)=>{
  //  e.preventDefault();
  //  cardsRef.current.scrollLeft += e.deltaY;
  //}
  //useEffect(()=>{
  //  cardsRef.current.addEventListener('wheel', handleWheel);
  //},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
