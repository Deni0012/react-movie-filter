// Importazioni di base
import { useState, useEffect } from 'react'
import './App.css'
import watchMovies from './data/movies'

const Movie = {
  title: '',
  genere: 'Thriller'
}

// Creazione della funzione di App
function App() {
  const [movies, setMovies] = useState(watchMovies);

  console.log(watchMovies);

  return (
    <>

    </>
  )
}

// Esportazione di App
export default App;
