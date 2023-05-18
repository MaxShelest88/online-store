import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import bigStar from '../assets/bigStar.png';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const DevicePage = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src=""
          />
        </Col>
        <Col md={4}>
          <div>
            <h2>имя</h2>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}
            >
              рейтинг
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column justify-content-around align-items-center"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgrey' }}
          >
            <h3>цена руб.</h3> <Button variant={'outline-dark'}>Добавить в корзину</Button>
          </Card>
        </Col>
		  </Row>
		  <Row>
			  <h2>Характеристики</h2>
		  </Row>
    </Container>
  );
};
export default DevicePage;
