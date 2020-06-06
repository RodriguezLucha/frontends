import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard, removeCard, selectAllCards } from "./cardSlice";
import { trashFillIcon, playFillIcon } from "../../icons";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Label,
  Card as RSCard
} from "reactstrap";

export function Card() {
  const cards = useSelector(selectAllCards);
  const dispatch = useDispatch();

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const onAddCard = () => {
    dispatch(addCard({ front, back }));
    setFront("");
    setBack("");
  };

  return (
    <Container>
      <h1>Cards</h1>
      <ListGroup>
        {cards.map(c =>
          <ListGroupItem key={c.id}>
            <RSCard>
              <Container className={styles.cardContainer}>
                <div>
                  {c.front}
                </div>
                <div className={styles.cardControlContainer}>
                  <Link to={`/recall/${c.id}`}>
                    <Button>
                      {playFillIcon()}
                    </Button>
                  </Link>
                  <Button onClick={() => dispatch(removeCard(c.id))}>
                    {trashFillIcon()}
                  </Button>
                </div>
              </Container>
            </RSCard>
          </ListGroupItem>
        )}
      </ListGroup>
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
            onChange={e => setBack(e.target.value)}
            placeholder="Back of card..."
            value={back}
          />
        </FormGroup>
        <Button onClick={() => onAddCard()}>Add Card</Button>
      </Form>
    </Container>
  );
}
