import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { Context } from '../Providers';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo((prevInfo) => [...prevInfo, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo((prevInfo) => prevInfo.filter((i) => i.number !== number));
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
          <Form.Select>
            <option>Выберите тип</option>
            {device.types.map((type) => (
              <option key={type.id}>{type.name}</option>
            ))}
          </Form.Select>
          <Form.Select className="mt-3">
            <option>Выберите бренд</option>
            {device.brands.map((brand) => (
              <option key={brand.id}>{brand.name}</option>
            ))}
          </Form.Select>

          <Form.Control
            className="mt-3"
            placeholder="Введите название"
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите стоимость"
            type="number"
          />
          <Form.Control
            className="mt-3"
            type="file"
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
                <Form.Control placeholder="Введите название характеристики" />
              </Col>
              <Col md={4}>
                <Form.Control placeholder="Введите описание характеристики" />
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
        <Button variant={'outline-success'}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateDevice;
