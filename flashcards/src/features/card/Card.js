import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard, removeCard, selectAllCards, shuffleCards, deactivateCard, activateCard } from "./cardSlice";
import { trashFillIcon, playFillIcon, shuffleIcon } from "../../icons";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import classnames from "classnames";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Label,
  Card as RSCard,
  Jumbotron
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export function Card() {
  const cards = useSelector(selectAllCards);
  const activeCards = cards.filter(c => c.active);
  const inactiveCards = cards.filter(c =>!c.active);
  const dispatch = useDispatch();

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const onAddCard = () => {
    dispatch(addCard({ front, back }));
    setFront("");
    setBack("");
  };

  return (
    <>
      <Jumbotron className={styles.jumboStyle}>
      <h1>Cards</h1>
      <Button color="info" onClick={() => dispatch(shuffleCards())}>
        {shuffleIcon()}
      </Button>
      </Jumbotron>
    <Container>
      <h3>Active Cards</h3>
      <ListGroup className={styles.list}>
        {activeCards.map(c =>
          <ListGroupItem key={c.id}>
            <RSCard>
              <Container className={styles.cardContainer}>
                <div>
                  {c.front}
                </div>
                <div className={styles.cardControlContainer}>
                  <Link className={styles.cardControlButton} to={`/recall/${c.id}`}>
                    <Button color="primary">
                      {playFillIcon()}
                    </Button>
                  </Link>
                  <Button color="danger" className={styles.cardControlButton} onClick={() => dispatch(removeCard(c.id))}>
                    {trashFillIcon()}
                  </Button>
                  <Button color="success" className={styles.cardControlButton} onClick={() => dispatch(deactivateCard(c.id))}>
                    <FontAwesomeIcon className={styles.notEqual} icon={faEyeSlash} />
                  </Button>
                </div>
              </Container>
            </RSCard>
          </ListGroupItem>
        )}
      </ListGroup>
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
      <h3>Inactive Cards</h3>
      <ListGroup className={classnames(styles.list, styles.grey)}>
        {inactiveCards.map(c =>
          <ListGroupItem key={c.id}>
            <RSCard>
              <Container className={styles.cardContainer}>
                <div>
                  {c.front}
                </div>
                <div className={styles.cardControlContainer}>
                  <Button className={styles.cardControlButton} onClick={() => dispatch(activateCard(c.id))}>
                    <FontAwesomeIcon className={styles.notEqual} icon={faEye} />
                  </Button>
                </div>
              </Container>
            </RSCard>
          </ListGroupItem>
        )}
      </ListGroup>
    </Container>
    </>
  );
}
