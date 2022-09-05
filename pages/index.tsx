/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
// import Image from 'next/image';
import styles from '../index.module.css';

export default function Home() {
  interface IPk {
    name: string,
    timestamp: any
  }

  const [list, setList] = useState([]);
  const [poke, setPoke] = useState({} as any);
  const pktest = async () => {
    const pokemons = await axios.get('/api/pokemon').then((res) => res);
    setList(pokemons.data);
    console.log(pokemons.data);
  };
  useEffect(() => {
    pktest();
  }, []);

  const handleCreation = async () => {
    const num = Math.floor(Math.random() * 151);
    const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res) => res);
    setPoke(pokemons.data);
    console.log(pokemons.data);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon monocard</title>
        <link rel="icon" href="/pokebola-icon.png" />
      </Head>
      <img src="pokemon.png" alt="Vercel Logo" className={styles.logo} />
      <div className="menu">
        <img src="pokebola.png" alt="Vercel Logo" className="pokebola" />
        <img src="lista.png" alt="Vercel Logo" className="lista" />
      </div>

      <ul>
        { list.map((pokemon: IPk, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {' '}
            { pokemon.name }
            { pokemon.timestamp}
            {' '}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleCreation}
      >
        Criar Pokemon
      </button>
      {Object.values(poke).length !== 0 && (
        <div>
          <h2>{poke.name}</h2>
          <img
            width="200px"
            // height="200px"
            src={poke.sprites.other.dream_world.front_default}
            alt="Vercel Logo"
            className="logo"
          />
        </div>
      )}
      <div className={styles.shadow} />
      <div className={styles.pokeball}>
        <div className={styles.top} />
        <div className={styles.bottom} />
        <div className={styles.middle} />

      </div>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      {/* <style jsx>
        {`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      .logo {
        width: 60%;
        max-width: 30rem;
      }
      .menu {
        display: flex;
        background-color: red;
        justify-content: space-aroud;
      }
      .pokebola {
        width: 30%;
      }
      .lista {
        width: 30%;
      }
      `}

      </style> */}
    </div>
  );
}
