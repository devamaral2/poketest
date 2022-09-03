/* eslint-disable react/jsx-filename-extension */
import { useEffect, React, useState } from 'react';
import Head from 'next/head';
import { InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import clientPromise from '../lib/mongodb';

export async function getServerSideProps(context: any) {
  try {
    await clientPromise;
    // const db = await client.db('pokemon')
    // const pki = await db.collection('saved').Find();
    // const pk = JSON.parse(pki)
    // console.log(pk)
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: {
        isConnected: true,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  interface IPk {
    name:string
  }
  
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
      <ul>
        { list.map((pokemon) => (
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
