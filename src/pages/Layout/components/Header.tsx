import { useLocation } from 'react-router-dom';
export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <h1 className="header-title">
        {pathname.split('/').map((path, index) => {
          return (
            <span key={path + index}>
              {path}
              {index !== pathname.split('/').length - 1 && '/'}
            </span>
          );
        })}
        {pathname === '/' && <span>home</span>}
      </h1>
      {/**TODO:something maybe - button notification - profile icon button */}
    </header>
  );
}
