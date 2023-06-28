import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, getCountriesRegion } from '../redux/country/countrySlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const countriesRegion = useSelector((state) => state.countries.countriesRegion);
  const status = useSelector((state) => state.countries.status);

  const handleRegion = (region) => {
    dispatch(getCountriesRegion(region));
    console.log(countriesRegion);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, []);
  return (
    <>
      <h2>Home</h2>
      <div onClick={() => handleRegion('Americas')}>America</div>
      <div onClick={() => handleRegion('Africa')}>Africa</div>
      <div onClick={() => handleRegion('Asia')}>Asia</div>
      <div onClick={() => handleRegion('Europe')}>Europa</div>
      <div onClick={() => handleRegion('Oceania')}>Oceania</div>
      {
        countriesRegion.length > 0 &&
        <ul>
          {
            countriesRegion.map((country) => (
              <Link to={/details/ + country.id} key={country.id}>{country.name}</Link>
            ))
          }
        </ul>
      }
    </>
  );
};

export default Home;
