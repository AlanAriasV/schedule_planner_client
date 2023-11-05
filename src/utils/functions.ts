export function addScrolledClass(e: React.UIEvent<HTMLDivElement>) {
  const scroll = e.currentTarget;
  const bottom = scroll.scrollHeight - scroll.scrollTop === scroll.clientHeight;
  if (scroll.scrollTop > 0) {
    scroll.classList.add('scrolling');
  } else {
    scroll.classList.remove('scrolling');
  }

  if (bottom) {
    scroll.classList.add('scrolled-to-bottom');
  } else {
    scroll.classList.remove('scrolled-to-bottom');
  }
}
