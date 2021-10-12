import { forwardRef, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  const [book, setBooks] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState('AIzaSyAl61RgJ8qUJPWzj9x2Uc-Swssy7_n0bfI')

  const handleChange = (event) => {

    const book = event.target.value;
    setBooks(book);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=40&startIndex=10`)
    .then(data =>{
      console.log(data.data.items);
      setResult(data.data.items);
    })
    console.log(book);
  };
  

  return (
    <div className='container'>
      <h1>Bookipedia</h1>
      <form onSubmit={handleSubmit}> 
        <div className='form-group'>
          <input type="text" className='form-control mt-10' placeholder='Search for books' autoComplete = "off" onChange={handleChange}/>
        </div>
        <button className='btn btn-danger' type='submit'>Search</button>
      </form>
      {result.map(book => (
        <a href={book.volumeInfo.infoLink}>Link</a>
      ))}
    </div>
  );
}

export default App;
