import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { act, render, renderHook, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Sidebar } from '../../../src/pages/Layout/components';
import { BrowserRouter } from 'react-router-dom';

describe('<Sidebar />', () => {
  const user = userEvent.setup();

  test('should render', async () => {
    render(<Sidebar />, { wrapper: BrowserRouter });
    expect(screen.getByRole('complementary')).toBeDefined();
  });

  test('should change its size', async () => {
    const aside = screen.getByRole('complementary');
    expect(aside).toBeDefined();

    const menu = screen.getByRole('button', {
      name: 'Menu',
    });
    expect(menu).toBeDefined();

    await user.click(menu!);
    expect(aside.classList.contains('expanded')).toBe(true);
  });

  test('should change route', async () => {
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeDefined();

    await user.click(homeLink!);
    expect(window.location.pathname).toBe('/');
  });
});
