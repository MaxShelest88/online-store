import { useContext, useEffect } from 'react';
import { Context } from '../components/Providers';
import { fetchBasketDevices } from '../http/basketApi';
import { observer } from 'mobx-react-lite';
import BasketDeviceItem from '../components/BasketDeviceItem';
import { fetchDevices } from '../http/deviceAPI';
import Container from 'react-bootstrap/esm/Container';

const Basket = observer(() => {
  const { basket } = useContext(Context);
  const { device } = useContext(Context);

  const devices = [];

  useEffect(() => {
	  fetchBasketDevices().then((data) => basket.setDevices(data));
	  fetchDevices().then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  for (let i = 0; i < basket.devices.length; i++) {
    const element = basket.devices[i];
    const foundDevice = device.devices.find((device) => device.id === element.id);
    if (foundDevice) {
      devices.push(foundDevice);
    }
  }

  return (
    <Container>
      {devices.map((device) => (
        <BasketDeviceItem
          key={device.id}
          device={device}
        />
      ))}
    </Container>
  );
});
export default Basket;
