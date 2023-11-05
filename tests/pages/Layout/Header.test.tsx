// import React from 'react';
// import { describe, test, expect, beforeEach, vi } from 'vitest';
// import { cleanup, render, screen } from '@testing-library/react';
// import { Header } from '../../../src/pages/Layout/components';
// import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// const pathname = '/xd';

// describe('<Header />', () => {
//   beforeEach(() => {
//     cleanup();
//   });

//   test('renders the header', () => {
//     render(<Header />, { wrapper: BrowserRouter });
//     expect(screen.getByRole('banner')).toBeDefined();
//   });

//   test('title should be "/home"', () => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <Header />
//       </MemoryRouter>,
//     );

//     const headerTitle = screen.getByRole('heading');
//     expect(headerTitle).toBeDefined();
//     expect(headerTitle.textContent).toBe('/home');
//   });

//   test(`title should be ${pathname}`, () => {
//     render(
//       <MemoryRouter initialEntries={[`${pathname}`]}>
//         <Header />
//       </MemoryRouter>,
//     );

//     const headerTitle = screen.getByRole('heading');
//     expect(headerTitle).toBeDefined();
//     expect(headerTitle.textContent).toBe(`${pathname}`);
//   });
// });
