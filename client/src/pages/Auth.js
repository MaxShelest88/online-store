import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card
        style={{ width: 600 }}
        className="p-5"
      >
        <h2 className="m-auto">Авторизация</h2>
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
              <div>
                Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйтесь</Link>
              </div>
            </Col>
            <Col className="col-12 col-sm-6">
              <Button
                variant={'outline-success'}
                className="align-self-end"
              >
                Войти
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};
export default Auth;
