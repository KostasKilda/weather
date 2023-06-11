import './style.css';

function Navbar() {

  return (
      <ul>
        <li><a className='navbarLink' href="/">Home</a></li>
        <li><a className='navbarLink' href="/about">About</a></li>
        <li><a className='navbarLink' href="/contact">Contact</a></li>
      </ul>
  );
}

export default Navbar;