import { Outlet } from 'react-router-dom';
import { Sidebar } from './components';
import { Header } from './components';

export default function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
