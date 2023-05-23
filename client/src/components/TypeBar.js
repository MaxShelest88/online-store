import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from './Providers';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  const onClick = () => {
    device.clearSelectedType();
    device.clearSelectedBrand();
  };

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
      <Button onClick={onClick}>Очистить фильтры</Button>
    </div>
  );
});
export default TypeBar;
