import React, { useEffect, useState } from 'react'  //rafce 
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import{BiPlay} from "react-icons/bi"
import{AiOutlinePlus} from "react-icons/ai"
const apikey = "9e4da3f112f0d251ddafd3bb06dfb7cd";
const url = "https://api.themoviedb.org/3";
const imgurl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing"
const popular = "popular";
const topRated ="top_rated"

const Card = ({ img }) => <img className='card' src={img} alt="cover" />


const Row = ({ title, arr = []}) => (
  <div className='row'>
    <h2>{title}</h2>

    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgurl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);
const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
  const [popularMovies, setpopularMovies] = useState([]);
  const [topRatedMovies, settopRatedMovies] = useState([]);
   const [genres, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}&page=5`);
      setUpcomingMovies(results);
    };

    const fetchnowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`);
      setnowPlayingMovies(results);
    };
    const fetchpopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);
      setpopularMovies(results);
    };
    const fetchtopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
      settopRatedMovies(results);
    };

    const getAllGenre = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setGenre(genres);
    };

     getAllGenre();

    fetchUpcoming();
    fetchnowPlaying();
    fetchpopular();
    fetchtopRated();
    
  },[])





  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage:nowPlayingMovies[12]? `url(${`${imgurl}/${nowPlayingMovies[12].poster_path}`})`:"rgb(16,16,16)"
      }}>
        
          
       { nowPlayingMovies[12] && <h1>{nowPlayingMovies[12].original_title}</h1>}  
          { nowPlayingMovies[12] &&  <p>{ nowPlayingMovies[12].overview}</p>}
       
        <div>
          <button> <BiPlay /> Play  </button>
        <button>My List <AiOutlinePlus/> </button></div>

      </div>

      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing "} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      

      <div className="genreBox">
        {genres.map((item) => (
          <Link key={item.id} to={'/genre/${item.id }' }>{item.name }</Link>
        ))}
      </div>

    </section>
  );
};

export default Home;