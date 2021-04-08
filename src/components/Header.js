import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

function Header() {
    return (
      <>
        <Navs activeKey="/">
          <Nav className="mr-auto">
            <Navbar.Brand href="/" style={{color: '#D86A04', fontWeight: '600'}}>Lazy Loading</Navbar.Brand>
          </Nav>
        </Navs>
      </>
    )
}

export default Header;

const Navs = styled(Navbar) `
  padding: 1.2rem 2rem;
  background: rgba(0,0,0,0.7);
  width: 100vw;
  z-index: 2;
  max-width: 100vw !important;
  position: fixed;
`

const Register = styled(Nav.Link) `
  background: transparent;
  color: #ddd;
  padding: 0.5rem 2rem !important;
  margin-right: 0.5rem;
`