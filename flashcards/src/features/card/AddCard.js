import React from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Card as RSCard
} from "reactstrap";
import styles from "./Card.module.scss";
export function AddCard({ setFront, front, setBack, back, onAddCard }) {
  return (
    <div>
      <h3>Add Cards</h3>
      <RSCard className={styles.newCardForm}>
        <Form>
          <FormGroup>
            <Label for="cardTitle">Front</Label>
            <Input
              id="cardTitle"
              onChange={e => setFront(e.target.value)}
              placeholder="Front of card..."
              value={front}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cardContent">Back</Label>
            <Input
              id="cardContent"
              type="textarea"
              rows={6}
              onChange={e => setBack(e.target.value)}
              placeholder="Back of card..."
              value={back}
            />
          </FormGroup>
          <Button onClick={() => onAddCard()}>Add Card</Button>
        </Form>
      </RSCard>
    </div>
  );
}
