import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";


export default function AlbumModal({ currentItem, toggle, onSave }) {
  const [activeItem, setActiveItem] = useState(currentItem);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'rating') {
      const intValue = Number(value)
      const changedItem = {...activeItem, [name]: intValue};
      setActiveItem(changedItem)
    } else {
      const changedItem = {...activeItem, [name]: value};
      setActiveItem(changedItem)
    }
  };

  return(
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Album</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Enter Album Title Here"
            />
          </FormGroup>
          <FormGroup>
            <Label for="artist">Artist</Label>
            <Input
              type="text"
              name="artist"
              value={activeItem.artist}
              onChange={handleChange}
              placeholder="Enter Album Artist or Band Here"
            />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input 
              type="select"
              name="rating"
              onChange={handleChange}
              >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}
