import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from './Providers';
import Card from 'react-bootstrap/Card';

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div className="d-flex">
      {device.brands.map((brand) => (
        <Card
          key={brand.id}
          className="p-3"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
          style={{ cursor: 'pointer' }}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});
export default BrandBar;
