import { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  //states
  const [book, setBooks] = useState("");
  const [result, setResult] = useState([]);

  //handleChange
  const handleChange = (event) => {
    const book = event.target.value;
    setBooks(book);
  };

  //handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=40&startIndex=10`)
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);
      })
    console.log(book);
  };

  const mainContent = () => {
    return (
      <div className='container'>
        <h1>Bookipedia</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input type="text" className='form-control mt-10' placeholder='Search for books' autoComplete="off" onChange={handleChange} />
          </div>
          <button className='btn btn-danger' type='submit'>Search</button>
        </form>
      </div>
    )
  }

  const handleCards = () => {
    const items = result.map((item, i) => {
      let thumbnail = '';
      if (item.volumeInfo.imageLinks) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }
      return (
        <div className="card" style={{width: '18rem'}}>
          <img src={thumbnail} className="card-img-top" alt=''/>
          <div className ="card-body">
          <h5 className ="card-title">{item.volumeInfo.title}</h5>
          <p className ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href={item.volumeInfo.infoLink} className ="btn btn-primary" target='_blank' rel="noreferrer">More info</a>
          </div>
        </div>
      );
    });
    return (
      <div className='container my-5'>
        <div className='row'>{items}</div>
      </div>
    )
  }






  return (
    <div className='w-100 h-100'>
      {mainContent()}
      {handleCards()}
    </div>
  );
}

export default App;
