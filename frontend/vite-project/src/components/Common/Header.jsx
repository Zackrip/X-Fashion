import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar';
import TopBar from './TopBar';

const Header = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show at top of page
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN — hide
        setVisible(false);
      } else {
        // Scrolling UP — show
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/20
        bg-white/70 backdrop-blur-md shadow-sm
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <TopBar />
      <Navbar />
    </header>
  )
}

export default Header