import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import store from '../redux/store';
import '@testing-library/jest-dom/extend-expect';

describe('Testing the Home component', () => {
  it('test_render_header', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Home />
        </Provider>,
      );
    });
    const header = screen.getByRole('heading', { name: /countries of the world/i });
    expect(header).toBeInTheDocument();
  });
});
