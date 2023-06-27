import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload.map((country) => ({
          name: country.name.official,
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

export const { selectMission, joinMission, leaveMission } = countrySlice.actions;

export default countrySlice.reducer;
