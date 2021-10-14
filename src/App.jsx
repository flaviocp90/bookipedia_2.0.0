import { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  //states
  const [book, setBooks] = useState("");
  const [result, setResult] = useState([]);
  const [maxResults, setMaxResults] = useState(1);

  //handleChangeSearch
  const handleChange = (event) => {
    const book = event.target.value;
    setBooks(book);
  };

  //handleChangeSearchInput
  const handleChangeInput = (event) => {
    const maxResults = event.target.value;
    setMaxResults(maxResults)
  }

  //handleSubmit
  const handleSubmit = (event) => {
    if(maxResults) {
      if(book){
        event.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=${maxResults}`)
          .then(data => {
            setResult(data.data.items);
          })
        console.log(book);
      } else {
        alert('Insert book title')
      }
    } else {
      alert('Insert max number of items')
    };
    }


  const mainContent = () => {
    return (
      <div className="container">
        <h1 className="display-2 text-center mb-3 justify-content-center align-items-center flex-column">
          Bookipedia
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control mt-10"
              placeholder="Search for books"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
            <input
              type="number"
              placeholder="Max Results"
              id="max-result"
              value={maxResults}
              onChange={handleChangeInput}
            />
          </div>
        </form>
      </div>
    );
  };

  const handleCards = () => {
    const items = result.map((item, i) => {
      let thumbnail = '';
      if (item.volumeInfo.imageLinks) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }
      return (
        <div className='col'>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={thumbnail}
              className="card-img-top"
              alt={item.volumeInfo.title}
              style={{ width: "100%", height: "250px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.volumeInfo.title}</h5>
              <p className="card-text">{item.volumeInfo.subtitle}</p>
              <ul>
                <li>Page Count: {item.volumeInfo.pageCount}</li>
                <li>Language: {item.volumeInfo.language}</li>
                <li>Authors: {item.volumeInfo.authors}</li>
              </ul>
              <a
                href={item.volumeInfo.infoLink}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                More info
              </a>
            </div>
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
