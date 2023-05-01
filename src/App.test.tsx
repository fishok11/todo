import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import App from './App';

test('renders todo app', () => {
  const store = setupStore();
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/todo/i)).toBeInTheDocument();
});
