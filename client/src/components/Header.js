import React, { useContext } from 'react';
import { Context } from './Providers';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';

//observer - что бы mobx отслеживал изменения

const Header = observer(() => {
  const { user } = useContext(Context);
  return (
    <Navbar
      bg="dark"
      variant="dark"
    >
      <Container>
        <Link
          style={{ color: 'white' }}
          to={SHOP_ROUTE}
        >
          Название магазина
        </Link>
        {user.isAuth ? (
          <Nav
            style={{ color: 'white' }}
            className="ml-auto"
          >
            <Button variant={'outline-light'}>Админ панель</Button>
            <Button
              variant={'outline-light'}
              onClick={() => user.setIsAuth(false)}
              className="ms-4"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav
            style={{ color: 'white' }}
            className="ml-auto"
          >
            <Button
              variant={'outline-light'}
              onClick={() => user.setIsAuth(true)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default Header;
