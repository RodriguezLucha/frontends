import { AddCard } from './AddCard';
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard, removeCard, selectAllCards, shuffleCards, deactivateCard, activateCard } from "./cardSlice";
import { trashFillIcon, playFillIcon, shuffleIcon } from "../../icons";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import classnames from "classnames";
import {
  Container,
  Button,
  ListGroup,
  ListGroupItem,
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
      <AddCard setFront={setFront} front={front} setBack={setBack} back={back} onAddCard={onAddCard}  />  
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
