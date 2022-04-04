import logo from './logo_new_header.png';
import './App.css';
import axios from 'axios';
import {
  Container,
  Form,
  FormControl,
  Navbar,
  Pagination,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { CardVideosComponent } from './components/CardVideosComponent';
import { LoadingSpinner } from './components/generals/LoadingSpinner';
import { AlertMessagge } from './components/generals/AlertMessagge';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [errorMessagge, setErrorMessagge] = useState('');
  const [nextPageToken,setNextPageToken] = useState('');
  const [prevPageToken,setPrevPageToken] = useState('');
  
  /* definición de parámetros generales de búsqueda */
  const params = 'part=snippet&fields=nextPageToken,prevPageToken,items(id,snippet)&order=date&maxResults=16';
  

  /* URL de busqueda, información localizada en variable de ambientes .env.local */
  const baseAPI = process.env.REACT_APP_API;
  let urlSearchAPI = `${baseAPI}?key=${process.env.REACT_APP_KEY}&${params}`;
     
  const handleSubmit = (event) => {  
    event.preventDefault();
  };

  const handleSearchByName = (e) => {
    let filter = e.target.value;
    if (e.key === 'Enter') {     
      setSearchTerm(filter);
    }
  };
  
  /* para manejar los botones de Página Siguiente y Anterior*/
  const setPrevAndNextPage = (data) =>{
    {data.nextPageToken? setNextPageToken(data.nextPageToken): setNextPageToken('') }
    {data.prevPageToken? setPrevPageToken(data.prevPageToken): setPrevPageToken('') } 
  }


  /* Función principal de búsqueda utilizando librería AXIOS*/
  const searchData = async () => {
   setErrorMessagge('');
    await axios
      .get(`${urlSearchAPI}&q=${searchTerm}`)
      .then(function (response) {
        setData([...response.data.items]);
        setSpinner(false);
        setPrevAndNextPage(response.data);  
      })
      .catch(function (error) {
        setSpinner(false);
        setErrorMessagge(error);
        setData([]);
      });
  };


  /** Función que busca la pagina siguiente
   * el token nextPageToken es provisto por la api
   */
  const nextPage = async () => {
    setErrorMessagge('');
    setSpinner(true);
    await axios
      .get(`${urlSearchAPI}&q=${searchTerm}&pageToken=${nextPageToken}`)
      .then(function (response) {
        setData([...response.data.items]);
        setSpinner(false);
        setPrevAndNextPage(response.data);     
      })
      .catch(function (error) {
        setSpinner(false);
        setErrorMessagge(error);
        setData([]);
      });
  };
  
  /** Función que busca la pagina anterior
   * el token prevPageToken es provisto por la api
   */
  const prevPage = async () => {
    setErrorMessagge('');
    setSpinner(true);
    await axios
      .get(`${urlSearchAPI}&q=${searchTerm}&pageToken=${prevPageToken}`)
      .then(function (response) {
        setData([...response.data.items]);
        setSpinner(false);
        setPrevAndNextPage(response.data);  
      })
      .catch(function (error) {
        setSpinner(false);
        setErrorMessagge(error);
        setData([]);
      });
  };

  useEffect(() => {
    if (searchTerm) {
      setSpinner(true);
      searchData();
    } else {
      setData([]);
    }
  }, [searchTerm]);

  return (
    <div className='App'>
      <Navbar bg='light' expand='lg' sticky="top" >
        <Container fluid className={"justify-content-around"}>
          <Navbar.Brand href='#'>
            <img
              src={logo}
              width='190'
              height='40'
              className='d-inline-block align-top'
              alt='React Bootstrap logo'
            />{' '}
          </Navbar.Brand>

          <Form className='d-flex' onSubmit={handleSubmit}>
            <FormControl
              type='search'
              placeholder='Search Video'
              className='me-5'
              aria-label='Search' 
              onKeyUp={handleSearchByName}
            />
            <hr />
          </Form>
        </Container>
      </Navbar>

      <header className='App-header'>
        {errorMessagge && <AlertMessagge error={errorMessagge} setErrorMessagge={setErrorMessagge}/>}
        {!spinner ? ' ' : <LoadingSpinner />}
        {data.length === 0 ? (
          ''
        ) : (
          <>
            <CardVideosComponent ListVideos={data} />
            <hr/>
            <Pagination>
             {!prevPageToken ? '' :  <Pagination.First onClick={prevPage} /> }
             {'  '}
             {!nextPageToken ? '' : <Pagination.Last onClick={nextPage} /> }
            </Pagination>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
