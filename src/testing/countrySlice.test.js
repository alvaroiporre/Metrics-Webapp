import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import countryReducer, { fetchCountries, selectCountry, getCountriesIndexes, getCountriesRegion } from '../redux/country/countrySlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('CountrySlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      countries: [],
    });
  });

  it('should fetch countries and update state correctly', async () => {
    await store.dispatch(fetchCountries());

    const actions = store.getActions();
    expect(actions[0].type).toEqual('countries/fetchCountries/pending');
    expect(actions[1].type).toEqual('countries/fetchCountries/rejected');
  });

  it('should get countries with the continent selected, this case Americas', () => {
    const initialState = {
      countries: [
        {
          id: 'BO',
          region: 'Americas',
        },
        {
          id: 'ES',
          region: 'Europe',
        },
      ],
      countriesRegion: [],
    };

    const action = getCountriesRegion('Americas');
    const newState = countryReducer(initialState, action);

    const expectedState = {
      countries: [
        {
          id: 'BO',
          region: 'Americas',
        },
        {
          id: 'ES',
          region: 'Europe',
        },
      ],
      countriesRegion: [
        {
          id: 'BO',
          region: 'Americas',
        },
      ],
    };

    expect(newState).toEqual(expectedState);
  });

  it('should get countries with the continent selected, this case Europe', () => {
    const initialState = {
      countries: [
        {
          id: 'BO',
          region: 'Americas',
        },
        {
          id: 'ES',
          region: 'Europe',
        },
      ],
      countriesRegion: [],
    };

    const action = getCountriesRegion('Europe');
    const newState = countryReducer(initialState, action);

    const expectedState = {
      countries: [
        {
          id: 'BO',
          region: 'Americas',
        },
        {
          id: 'ES',
          region: 'Europe',
        },
      ],
      countriesRegion: [
        {
          id: 'ES',
          region: 'Europe',
        },
      ],
    };

    expect(newState).toEqual(expectedState);
  });
});
