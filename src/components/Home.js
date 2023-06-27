import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../redux/country/countrySlice';

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const status = useSelector((state) => state.countries.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
    console.log(countries);
  }, []);
  return (
    <div>Home</div>
  );
};

export default Home;
