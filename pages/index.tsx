/* eslint-disable react/jsx-filename-extension */
import React, { JSXElementConstructor, useEffect, useState } from 'react';
import axios from 'axios';

export default function Home(): JSX.Element {
  interface IPk {
    name:string,
  };

  const [list, setList] = useState([]);
  const pktest = async () => {
    const pokemons = await axios.get('/api/pokemon').then((res) => res);
    setList(pokemons.data);
    console.log(pokemons.data);
  };
 useEffect(() => {
    pktest();
  }, []);
  return (
    <div className="container">
      <h1>
        Pokemon
      </h1>
      <img src="pokemon.png" alt="Vercel Logo" className="logo" />
      <ul>
        { list.map((pokemon: IPk) => (
          <li>
            {' '}
            { pokemon.name }
            {' '}
          </li>
        ))}
      </ul>
    </div>
  );
}
