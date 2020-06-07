import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCard,
  selectAllCards,
  shuffleCards,
  deactivateCard,
  activateCard
} from "./cardSlice";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faEdit,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

export function Card() {
  const cards = useSelector(selectAllCards);
  const activeCards = cards.filter(c => c.active);
  const inactiveCards = cards.filter(c => !c.active);
  const dispatch = useDispatch();



  return (
    <div>
      <Jumbotron className={styles.jumboStyle}>
        <h1>Cards</h1>
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
                    <Link
                      className={styles.cardControlButton}
                      to={`/recall/${c.id}`}
                    >
                      <Button color="primary">
                        {playFillIcon()}
                      </Button>
                    </Link>
                    <Button
                      color="success"
                      className={styles.cardControlButton}
                      onClick={() => dispatch(deactivateCard(c.id))}
                    >
                      <FontAwesomeIcon icon={faEyeSlash} />
                    </Button>
                    <Link to={`/card/edit/${c.id}`}>
                      <Button color="info" className={styles.cardControlButton}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </Link>
                    <Button
                      color="danger"
                      className={styles.cardControlButton}
                      onClick={() => dispatch(removeCard(c.id))}
                    >
                      {trashFillIcon()}
                    </Button>
                  </div>
                </Container>
              </RSCard>
            </ListGroupItem>
          )}
        </ListGroup>
        <Container className={styles.cardControlContainer}>
          <Button color="info" onClick={() => dispatch(shuffleCards())}>
            {shuffleIcon()}
          </Button>
          <Link to={"/card/add"}>
            <Button color="primary">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Link>
        </Container>

        {inactiveCards.length > 0 &&
          <div>
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
                        <Button
                          className={styles.cardControlButton}
                          onClick={() => dispatch(activateCard(c.id))}
                        >
                          <FontAwesomeIcon
                            className={styles.notEqual}
                            icon={faEye}
                          />
                        </Button>
                      </div>
                    </Container>
                  </RSCard>
                </ListGroupItem>
              )}
            </ListGroup>
          </div>}
      </Container>
    </div>
  );
}
