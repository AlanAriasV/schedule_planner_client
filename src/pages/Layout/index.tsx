import { Outlet } from 'react-router-dom';
import { Sidebar, Header } from './components';

export default function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
