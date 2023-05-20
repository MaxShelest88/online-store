import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Providers';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import Dropdown from 'react-bootstrap/Dropdown';

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo((prevInfo) => [...prevInfo, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo((prevInfo) => prevInfo.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo((prevInfo) => prevInfo.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(info));
    createDevice(formData).then((data) => onHide());
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            className="mt-3"
            placeholder="Введите название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимость"
            type="number"
          />
          <Form.Control
            className="mt-3"
            type="file"
            onChange={selectFile}
          />
          <hr />
          <Button
            variant={'outline-success'}
            onClick={addInfo}
          >
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row
              key={i.number}
              className="mt-4"
            >
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название характеристики"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание характеристики"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant={'outline-success'}
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить характеристику
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={'outline-danger'}
          onClick={onHide}
        >
          Закрыть
        </Button>
        <Button
          variant={'outline-success'}
          onClick={addDevice}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default CreateDevice;
