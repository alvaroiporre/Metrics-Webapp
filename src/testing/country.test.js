import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../redux/store';
import Country from '../components/Country';

test('Testing Mission', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Country id="BO" />
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
