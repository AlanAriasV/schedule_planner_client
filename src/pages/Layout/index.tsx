import Notifications from 'src/components/Notifications';
import { Header, Sidebar } from './components';
import { useUserStore } from 'src/store';

export default function Layout() {
  const { role } = useUserStore(state => state);

  return (
    <>
      <Header />
      <Sidebar />
      {role === 'student' && <Notifications />}
    </>
  );
}
