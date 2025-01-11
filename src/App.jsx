import { useState } from 'react'
import axios from 'axios'
import './App.css'


function App() {

  const [city, setCity] = useState('')
  const[showCity, setShowCity] = useState('')
  const[display, setDisplay] = useState('')
  const[weather, setWeather] = useState('')
  const[image, setImage] = useState('')
  const[condition, setCondition] = useState('')

  function seeCity(){
    setDisplay(city)
    const lowerCaseCity = city.toLowerCase()
    setShowCity(lowerCaseCity)
    console.log(showCity)
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=8e55a7cb38844dd797603122242812&q=${lowerCaseCity}&aqi=yes`
    console.log(apiUrl)
    axios.get(apiUrl).then(response => {
      const data = response.data
      console.log(data)
      setWeather('Temperature = ' + data.current.temp_f + 'F')
      setImage(data.current.condition.icon)
      setCondition('Condition is '+ data.current.condition.text)
      
    }).catch(error => {
      console.error("There was an error fetching the weather data!", error)
      setDisplay('City not found')
      setWeather(' ')
      setImage('')
      setCondition(' ')
    })
  }

  return (

    <>
    <div className='Main'>
      <h1>Weather App</h1>
      <h2>Enter a city name to get the weather</h2>
      <input value = {city} type='text' placeholder='Enter city name' onChange={(e) => setCity(e.target.value)} /> 
      <button className = 'bttn' onClick={seeCity}>Get Weather</button>

<div className='Container'>
    <div className='Weather'>
    <h2>{display}</h2>
    {image && <img className='image' src={image} alt='weather icon' /> }
    <p className='temp'>{condition}</p>
    <p className='temp'>{weather}</p>
    </div>
    </div>


    </div>
   
    
</>
  )
}

export default App
