import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from './Providers';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <div>
      <ListGroup>
        {device.types.map((type) => (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            active={type.id === device.selectedType.id}
            key={type.id}
            onClick={() => device.setSelectedType(type)}
          >
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      
    </div>
  );
});
export default TypeBar;
