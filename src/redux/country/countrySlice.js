import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import shapes from '../../assets/country_shapes.json';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
});

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    selectedCountry: null,
    regionSelected: null,
    countriesRegion: [],
    countriesIndexes: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    selectCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    getCountriesRegion: (state, action) => {
      const region = action.payload;
      const newState = state.countries.filter((country) => country.region === region);
      state.countriesRegion = newState;
    },
    getCountriesIndexes: (state) => {
      const newIndex = {};
      for (let i = 0; i < shapes.length; i += 1) {
        newIndex[shapes[i].iso_a2] = i;
      }
      state.countriesIndexes = newIndex;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const newIndex = {};
        for (let i = 0; i < shapes.length; i += 1) {
          newIndex[shapes[i].iso2] = i;
        }

        state.countriesIndexes = newIndex;
        state.countries = action.payload.map((country) => ({
          name: country.name.common,
          id: country.cca2,
          currency: country.currencies,
          capital: country.capital,
          region: country.region,
          languages: country.languages,
          area: country.area,
          flag: country.flag,
          population: country.population,
        }));
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectCountry, getCountriesRegion } = countrySlice.actions;

export default countrySlice.reducer;
