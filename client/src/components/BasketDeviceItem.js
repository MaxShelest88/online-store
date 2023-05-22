import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import star from '../assets/star.png';


const BasketDeviceItem = ({ device }) => {

  return (
    <Col
      md={3}
      className="mt-3"
    >
      <Card
        style={{ width: 150, cursor: 'pointer' }}
        border={'light'}
      >
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{device.brand}</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image
              src={star}
              width={15}
              height={15}
            />
          </div>
          <div>{device.name}</div>
        </div>
      </Card>
    </Col>
  );
};
export default BasketDeviceItem;
