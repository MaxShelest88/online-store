import { useContext, useEffect } from 'react';
import { Context } from '../components/Providers';
import { fetchBasketDevices } from '../http/basketApi';
import { observer } from 'mobx-react-lite';
import BasketDeviceItem from '../components/BasketDeviceItem';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router-dom';

const Basket = observer(() => {
  const { basket } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchBasketDevices(id).then((data) => {
      basket.setDevices(data);
    });
  }, [basket, id]);

  return (
    <Container>
      {basket.devices.map((device) => (
        <BasketDeviceItem
          key={device.id}
          device={device}
        />
      ))}
    </Container>
  );
});
export default Basket;
