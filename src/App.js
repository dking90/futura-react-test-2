import React, { useState} from 'react'
import logo from './logo.svg';
import './App.css';

const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category=' // remember to fill this
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' // remember to fill this
const launchErrorAlert = () => setTimeout(() => window.alert('errore!'), 500) 

// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      alt='interactive-logo'
      className={loading ? 'App-logo-spinning' : 'App-logo'}
      // ... 
    />
  )
}

const Joke = ({ value, categories }) => {
  //console.log('<Joke>value: ', value)
  return (
  <div className="Joke">
    <code className="Joke-Value">{value}</code>
     {/* { per ciascun elemento di 'categories', renderizzare:
      <span className="Selected-Cat" ... >
        <code>{* QUI LA STRINGA DELLA SINGOLA CATEGORIA *}</code>
      </span> } */}
  </div>
  )
}

// class App extends React.Component {
function App() {
  // qui tutto ciò che serve al componente per essere inizializzato

  const [inputText, setInputText] = useState('')

  //variabile di state per gestire il caricamento

  const [loading, setLoading] = useState(false)

  //variabile di state per salvarmi la barzelletta

  const[fetchedJoke, setFetchedJoke]=useState({})
  // getJokeByKeyword
  // funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo

  const getJokeByKeyword = async () => {
    let singleJoke={}
    try {
      setLoading(true)
      let response = await fetch(`${ALLLJOKESBYKEYWORD}${inputText}`)
      let data = await response.json()
      //console.log('data: ', data)
      console.log('first joke ', data.result[0])

      singleJoke={...data.result[0]}
      //setFetchedJoke(data.result[0])
    }catch (error){
      console.error(error)
    }finally {
      //console.log('joke inside finally: ', singleJoke)

      
      setLoading(false)
      setFetchedJoke(singleJoke)
    }
  }
  // onInputTextChange
  // handler per l'input di testo
const onInputTextChange =(event)=> {
 // console.log('event: ', event, event.target)
  setInputText(event.target.value)
}
  // qui i lifecycle methods

  // render () {
    return (
      <div className="App">
        <div className="App-header">
          <Logo
          loading={loading}
            // ...
          />
          <input
            type="search"
            id="search" name="search"
            placeholder="Enter keyword here"
            value={inputText}
            onChange={onInputTextChange}
            // ...
          />
          <button
            className="Search-Button"
            onClick={getJokeByKeyword}
            // ...
          >
            <code>CLICK TO SEARCH!</code>
          </button>
        </div>
        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />
          <Joke  
    value={fetchedJoke.value}
          /> 
        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Domenico Mucci </code>
        </div>
      </div>
    );
  // }
};

export default App;
