import React, { useContext } from 'react';
import { Context } from './Providers';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

//observer - что бы mobx отслеживал изменения

const Header = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { basket } = useContext(Context);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    basket.clearDevices();
    localStorage.removeItem('token');
    navigate(LOGIN_ROUTE);
  };
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
            <Button
              variant={'outline-light'}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>

            <Button
              variant={'outline-light'}
              onClick={() => navigate(BASKET_ROUTE + '/' + user.user.id)}
            >
              Корзина
            </Button>
            <div className="ms-4">{user.user.email}</div>
            <Button
              variant={'outline-light'}
              onClick={() => logOut()}
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
              onClick={() => navigate(LOGIN_ROUTE)}
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
