import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from './Providers';
import Row from 'react-bootstrap/Row';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
	const { device } = useContext(Context);
	
	console.log(device.devices);
  return (
    <Row>
      {device.devices.map((device) => (
        <DeviceItem
          key={device.id}
          device={device}
        />
      ))}
    </Row>
  );
});
export default DeviceList;
