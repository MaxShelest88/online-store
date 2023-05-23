import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import bigStar from '../assets/bigStar.png';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneDevice, setRange } from '../http/deviceAPI';
import { addDeviceToBasket } from '../http/basketApi';
import { Context } from '../components/Providers';
import Range from '../components/Range';
import Form from 'react-bootstrap/Form';
import { observer } from 'mobx-react-lite';

const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] });
  const [rate, setRate] = useState(0);
  const { user } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  const onClick = () => {
    setRange(user.user.id, id, rate);
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <div className="d-flex  flex-column justify-content-center align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}
            >
              <p>{device.rating}</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column justify-content-around align-items-center"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgrey' }}
          >
            <h3>{device.price} руб.</h3>{' '}
            <Button
              variant={'outline-dark'}
              onClick={() => addDeviceToBasket(id, user.user.id)}
            >
              Добавить в корзину
            </Button>
          </Card>
          <div>
            <Form.Label>Оценить</Form.Label>
            <Form.Range
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              min={0}
              max={5}
            />
            <p>{rate}</p>
            <Button onClick={onClick}> Оценить</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <h2>Характеристики</h2>
        {device.info.map((info, index) => (
          <Row
            key={info.index}
            style={{ background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});
export default DevicePage;
