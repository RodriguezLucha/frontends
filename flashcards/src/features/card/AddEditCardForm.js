import React, { useState, useEffect } from "react";
import { addCard, selectCardById } from "./cardSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Container,
  FormGroup,
  Input,
  Button,
  Label,
  Card as RSCard,
  Jumbotron
} from "reactstrap";
import styles from "./Card.module.scss";
import { leftArrayCircleFill } from "../../icons";
import { useHistory, useParams } from "react-router-dom";

export function AddEditCard() {
  const dispatch = useDispatch();
  const history = useHistory();


  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const params = useParams();
  let { id } = params;
  const card = useSelector(state => selectCardById(state, id));

  useEffect(() => {
    card && setFront(card.front);
    card && setBack(card.back);
  }, []);
 
  const onAddCard = () => {
    dispatch(addCard({ front, back, id }));
    setFront("");
    setBack("");
    history.goBack();
  };

  return (
    <div>
      <Jumbotron className={styles.jumboStyle}>
        <Button color="info" onClick={() => history.goBack()}>
          {leftArrayCircleFill()}
        </Button>
        <h3>
          {id ? "Edit" : "Add"} Cards
        </h3>
      </Jumbotron>
      <Container>
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
            <Container className={styles.center}>
              <Button color="secondary" onClick={() => onAddCard()}>
                Cancel
              </Button>
              <Button color="primary" onClick={() => onAddCard()}>
                Save
              </Button>
            </Container>
          </Form>
        </RSCard>
      </Container>
    </div>
  );
}
