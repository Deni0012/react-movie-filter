// Importazioni di base
import { useState, useEffect } from 'react'
import './App.css'
import watchMovies from './data/movies'

// Creazione di const per gestire i dati del nuovo film
const Movie = {
  title: '',
  genere: ''
}

// Creazione della funzioni di App
function App() {

  // Const che contiene la lista completa dei film
  const [movies, setMovies] = useState(watchMovies);

  // Const per gestire i dati del nuovo film che viene scritto
  const [newMovies, setNewMovies] = useState(Movie);

  // Const per contenere la lista filtrata dei film 
  const [filterdMovies, setFilterdMovies] = useState(movies);

  // Const per memorizzare la ricerca per genere
  const [searchGenere, setSearchGenere] = useState('');

  // Const per memorizzare la ricerca per titolo
  const [searchTitle, setSearchTitle] = useState('');

  // Funzione per l'utente che preme il bottone per aggiungere un nuovo film
  const newMoviesSubmit = (event) => {
    event.preventDefault();// Blocco il refresh della pagina
    if (newMovies.title.trim() === '') return console.error("Nessun Film inserito");

    // Creo un nuovo oggetto film con i dati title e genere
    const newMoviesObject = {
      title: newMovies.title,
      genere: newMovies.genere
    };

    setMovies([...movies, newMoviesObject]);
    setNewMovies({ title: '', genere: '' });
  }

  // useEffect che si attiva ogni volta che ricarichiamo la pagina
  useEffect(() => {
    // Lista completa dei film
    let result = movies;
    if (searchGenere !== '') { // Filtrazione per genere
      result = movies.filter(movie => movie.genere === searchGenere);
    }

    if (searchTitle !== '') {
      result = result.filter(movie => { // Filtrazione per titolo
        let movieTitle = movie.title.toLowerCase();
        let searchWord = searchTitle.toLowerCase();
        return movieTitle.includes(searchWord); // Controllo della parola corretta
      });
    }

    setFilterdMovies(result);
  }, [searchGenere, searchTitle, movies])


  return (
    <>
      <div>
        {/* Input per cercare per genere */}
        <select value={searchGenere} onChange={e => setSearchGenere(e.target.value)}>
          <option value="">--</option>
          <option value="Fantascienza">Fantascienza</option>
          <option value="Thriller">Thriller</option>
          <option value="Romantico">Romantico</option>
          <option value="Azione">Azione</option>
        </select>

        {/* Input per cercare per titolo */}
        <input type="text" value={searchTitle} onChange={e => setSearchTitle(e.target.value)} />
      </div>

      {/* Lista dei film filtrati */}
      <ul>
        {filterdMovies.map((movies, index) => (
          <li key={index}>{movies.title}</li>
        ))}
      </ul>

      {/* Form per aggiungere un nuovo film */}
      <form onSubmit={newMoviesSubmit}>

        {/* Input per aggiungere un film */}
        <input
          type="text"
          placeholder="Aggiungi un film"
          value={newMovies.title}
          onChange={(e) => setNewMovies({ ...newMovies, title: e.target.value })}
        />

        {/* Select per scegliere il genere */}
        <select
          value={newMovies.genere}
          onChange={(e) => setNewMovies({ ...newMovies, genere: e.target.value })}
        >
          <option value="Thriller">Thriller</option>
          <option value="Fantascienza">Fantascienza</option>
          <option value="Azione">Azione</option>
          <option value="Romantico">Romantico</option>
        </select>

        <button>Aggiungi Film</button>
      </form>

    </>
  )
}

// Esportazione di App
export default App;
