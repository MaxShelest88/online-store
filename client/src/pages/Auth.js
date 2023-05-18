import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
  let location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card
        style={{ width: 600 }}
        className="p-5"
      >
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите email"
          />
          <Form.Control
            className="mt-3"
            placeholder="Ведите Пароль"
          />
          <Row>
            <Col>
              {isLogin ? (
                <div>
                  Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйтесь</Link>
                </div>
              ) : (
                <div>
                  Есть аккаунт? <Link to={LOGIN_ROUTE}>Авторизируйтесь</Link>
                </div>
              )}
            </Col>
            <Col className="col-12 col-sm-6">
              <Button
                variant={'outline-success'}
                className="align-self-end"
              >
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};
export default Auth;
