import { useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <h1 className="header-title">
        {pathname.split('/').map((path, index) => {
          return (
            <span key={path + index}>
              {capitalize(path.replace('-', ' '))}
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

function capitalize(string: string): string {
  const words = string.split(' ');
  if (words.length > 1) {
    return words.map(word => capitalize(word)).join(' ');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}
