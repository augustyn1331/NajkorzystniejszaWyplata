import React from 'react';
import { render } from '@testing-library/react';
import Navbar from 'src/components/header/Header';

//TODO - Unit testing

test('renders learn react link', () => {
  const { getByText } = render(<Navbar />);
  const text = getByText(/home/i);
  expect(text).toBeInTheDocument();
});
