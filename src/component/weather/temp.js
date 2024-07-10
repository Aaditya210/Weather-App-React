//https://api.openweathermap.org/data/2.5/weather?q=pune&appid=74b1e435a6fda9bb8c3cfb71f7afe65a
import './styles.css';
import WeatherCard from './WeatherCard';
import React, { useEffect, useState } from 'react';

const Temp = () => {
  const[searchValue,setSearchValue] = useState("Mumbai");
  const[tempInfo,setTempInfo] = useState({});

  const getWeatherInfo = async() => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=74b1e435a6fda9bb8c3cfb71f7afe65a`;
      
      const res = await fetch(url);
      const data =await res.json();
      
      const  {temp,humidity,pressure} = data.main;
      const{main:weathermood} = data.weather[0];
      const{name} = data;
      const{speed} = data.wind;
      const{country,sunset} = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        name,
        weathermood,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo)
    }catch(error){
      console.log(error);
    }

  };

  useEffect(()=>{
    getWeatherInfo();
  },[]);





  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input type='search' placeholder='Search' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(event)=>{setSearchValue(event.target.value)}}/>
        <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp
