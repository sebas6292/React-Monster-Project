import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  
  const [searchField, setSearchFeild] = useState('');
  const [title, setTitle] = useState('Monster Locator');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
      });

    setFilterMonsters(newFilteredMonsters);
  },[monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
       setSearchFeild(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleUpperCase();
       setTitle(searchFieldString);
  };


  return (
    <div className="App">
    <h1 className='app-title'>{title}</h1>
    
  <SearchBox 
    className='monsters-search-box'
    onChangeHandler={onSearchChange} 
    placeholder='Search Monsters'
    /> 
    
  <SearchBox 
    className='title-search-box'
    onChangeHandler={onTitleChange} 
    placeholder='Set Title'
    /> 

  <CardList monsters={filteredMonsters} />
  </div>
  )
}

export default App;
