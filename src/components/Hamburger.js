import React, { useState } from 'react';

const Hamburger = () => {
  const [status, setStatus] = useState(false);

  function handleHamburger() {
    setStatus(status => !status);
  }

  let toggleClassCheck = status ? ' active': '';

  return (
    <div onClick={handleHamburger} className={`header__hamburger${toggleClassCheck}`}>
        <span className='header__hamburger-bar'></span>
        <span className='header__hamburger-bar'></span>
        <span className='header__hamburger-bar'></span>
    </div>
  );
};

export default Hamburger;