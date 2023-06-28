import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries, getCountriesRegion, selectCountry } from '../redux/country/countrySlice';
import Country from './Country';
import americas from '../assets/img/americas.svg';
import africa from '../assets/img/africa.svg';
import europe from '../assets/img/europe.svg';
import asia from '../assets/img/asia.svg';
import oceania from '../assets/img/oceania.svg';

const Home = () => {
  const dispatch = useDispatch();
  const countriesRegion = useSelector((state) => state.countries.countriesRegion);
  const status = useSelector((state) => state.countries.status);
  const selectedCountry = useSelector((state) => state.countries.selectedCountry);

  const handleRegion = (region) => {
    dispatch(getCountriesRegion(region));
  };

  const handleSelectedCountry = (id) => {
    dispatch(selectCountry(id));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
    if (countriesRegion.length === 0) {
      handleRegion('Americas');
    }
  }, [status]);

  return (
    <>
      <span>{selectedCountry}</span>
      <h2>Home</h2>
      <div onClick={() => handleRegion('Americas')}
      onKeyDown={() => handleRegion('Americas'}>
        <h2>america</h2>
        <img src={americas} alt="america" />
      </div>
      <div onClick={() => handleRegion('Africa')}
      onKeyDown={() => handleRegion('Africa'}>
        <h2>africa</h2>
        <img src={africa} alt="africa" />
      </div>
      <div onClick={() => handleRegion('Asia')}
      onKeyDown={() => handleRegion('Asia'}>
        <h2>asia</h2>
        <img src={asia} alt="asia" />
      </div>
      <div onClick={() => handleRegion('Europe')}
        onKeyDown={() => handleRegion('Europe'}>
        <h2>aeurope</h2>
        <img src={europe} alt="europe" />
      </div>
      <div onClick={() => handleRegion('Oceania')}
          onKeyDown={() => handleRegion('Oceania')}>
        <h2>oceania</h2>
        <img src={oceania} alt="oceania" />
      </div>
      {
        countriesRegion.length > 0
        && (
        <ul>
          {
            countriesRegion.map((country) => (
              <Link to={/details/ + country.id} key={country.id} onClick={() => handleSelectedCountry(country.id)}>
                <h2>{country.name}</h2>
                <Country id={country.id} />
              </Link>
            ))
          }
        </ul>
        )
      }
    </>
  );
};

export default Home;
