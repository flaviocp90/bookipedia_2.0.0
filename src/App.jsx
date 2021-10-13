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
    if(book){
      event.preventDefault();
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=40&startIndex=10`)
        .then(data => {
          console.log(data.data.items);
          setResult(data.data.items);
        })
      console.log(book);
    } else {
      alert('Insert book title')
    }

  };

  const mainContent = () => {
    return (
      <div className='container'>
        <h1 className='display-2 text-center mb-3 justify-content-center align-items-center flex-column'>Bookipedia</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input type="text" className='form-control mt-10' placeholder='Search for books' autoComplete="off" onChange={handleChange} />
          </div>
          <button className='btn btn-danger justify-content-center' type='submit'>Search</button>
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
          <img src={thumbnail} className="card-img-top" alt={item.volumeInfo.title} style={{width: '100%', height: '250px'}}/>
          <div className ="card-body">
          <h5 className ="card-title">{item.volumeInfo.title}</h5>
          <p className ="card-text">{item.volumeInfo.subtitle}</p>
          <ul>
            <li>pageCount: </li>
            <li>language: </li>
            <li>authors: </li>
          </ul>
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
