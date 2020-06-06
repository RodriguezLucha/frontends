import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, Card as RSCard, Form, FormGroup, Input, Jumbotron } from "reactstrap";
import { leftArrayCircleFill } from "../../icons";
import {useSelector} from "react-redux";
import {selectCardById} from "./cardSlice";
import styles from "./Recall.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faNotEqual } from '@fortawesome/free-solid-svg-icons';

const cleanSpaces = (str) => {
  str = str.replace(/ +(?= )/g,'');
  str = str.trim();
  return str;
}

export const Recall = () => {
  const history = useHistory();
  const params = useParams();
  let {id} = params;
  let card = useSelector(state => selectCardById(state, id));
  let [matched, setMatched] = useState(false);
  let [text, setText] = useState("")
  let [show, setShow] = useState(true);

  const compare = (value) => {
       setText(value);
       cleanSpaces(card.back) === cleanSpaces(value) ? setMatched(true) : setMatched(false);
  };

  return (
      <>
        <Jumbotron className={styles.jumbotron}>
          <Button onClick={() => history.goBack()}>
            {leftArrayCircleFill()}
          </Button>
           <h1>Recall</h1>
        </Jumbotron>
    <Container>
      <Container>
          <RSCard>
            <Container>
                <Container className={styles.cardFrontContainer}>
                    <h5>{card.front}</h5>
                </Container>
                <Form>
                    <FormGroup>
                        <Input 
                        value={text} 
                        onChange={ (e)=> compare(e.target.value) } 
                        type="textarea"/>
                    </FormGroup>
                    <div className={styles.checkButtonContainer}>
                        <Button onClick={()=>setShow(!show)}>Show/Hide</Button>
                    </div>
                </Form>
            </Container>
          </RSCard>
          <Container className={styles.matchesContainer}>
              {
              matched ? 
                <FontAwesomeIcon className={styles.equal} icon={faEquals} /> 
              :
                <FontAwesomeIcon className={styles.notEqual} icon={faNotEqual} />
              }
          </Container>
          
      {
          show && 
          <RSCard className={styles.cardBackContainer}>
              <Container>
                {card.back}
              </Container>
          </RSCard>
      }

      </Container>
    </Container>
    </>
  );
};
