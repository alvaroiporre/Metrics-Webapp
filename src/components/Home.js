import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
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
      dispatch(getCountriesRegion('Americas'));
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <h1>Countries of the World</h1>
        </nav>

        <AwesomeSlider>
          <button
            className="button-slider"
            type="submit"
            onTransitionEnd={() => handleRegion('Americas')}
          >
            <h2 className="continent-title">America</h2>
            <img className="slider-image" src={americas} alt="america" />
          </button>
          <button
            className="button-slider"
            type="submit"
            onTransitionEnd={() => handleRegion('Africa')}
          >
            <h2 className="continent-title">Africa</h2>
            <img className="slider-image" src={africa} alt="africa" />
          </button>
          <button
            className="button-slider"
            type="submit"
            onTransitionEnd={() => handleRegion('Asia')}
          >
            <h2 className="continent-title">Asia</h2>
            <img className="slider-image" src={asia} alt="asia" />
          </button>
          <button
            className="button-slider"
            type="submit"
            onTransitionEnd={() => handleRegion('Europe')}
          >
            <h2 className="continent-title">Europe</h2>
            <img className="slider-image" src={europe} alt="europe" />
          </button>
          <button
            className="button-slider"
            type="submit"
            onTransitionEnd={() => handleRegion('Oceania')}
          >
            <h2 className="continent-title">Oceania</h2>
            <img className="slider-image" src={oceania} alt="oceania" />
          </button>

        </AwesomeSlider>
      </header>

      {
        countriesRegion.length > 0
        && (
          <ul className="countries-container">
            {
              countriesRegion.map((country, index) => (
                <Link
                  to={/details/ + country.id}
                  key={country.id}
                  onClick={() => handleSelectedCountry(country.id)}
                  className={`country-card color-${index % 4}`}
                >
                  <Country id={country.id} />
                  <h2 className="country-card-name">{country.name}</h2>
                  <p className="country-card-area">
                    {country.area}
                    {' '}
                    m2
                  </p>
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
