import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, Card as RSCard, Form, FormGroup, Input, Jumbotron } from "reactstrap";
import { leftArrayCircleFill } from "../../icons";
import {useSelector} from "react-redux";
import {selectCardById} from "./cardSlice";
import styles from "./Recall.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faNotEqual } from '@fortawesome/free-solid-svg-icons';
import levenshtein from 'js-levenshtein';

const cleanSpaces = (str) => {
  str = str.replace(/ +(?= )/g,'');
  str = str.replace(/\n/g, " ");
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
  let [show, setShow] = useState(false);
  let [distance, setDistance] = useState(0);

  const compare = (value) => {
       setText(value);
       let cleanBack = cleanSpaces(card.back);
       let cleanText = cleanSpaces(text);
       (cleanText ===  cleanBack) ? setMatched(true) : setMatched(false);
       let count = levenshtein(cleanBack, cleanText);
       setDistance(count);
       
  };

  return (
      <>
        <Jumbotron className={styles.jumbotron}>
          <Button color="info" onClick={() => history.goBack()}>
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
                        rows={6}
                        onChange={ (e)=> compare(e.target.value) } 
                        type="textarea"/>
                    </FormGroup>
                    <div className={styles.checkButtonContainer}>
                        <Button color="primary" onClick={()=>setShow(!show)}>Show/Hide</Button>
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
              <div>
                {distance}
              </div>
          </Container>
          
      {
          show && 
          <RSCard className={styles.cardBackContainer}>
              <Container>
                {
                  (() => {
                    let lines = card.back.split("\n");
                    return (<>
                      {lines.map(l => <div key={l}>{`${l}`}<br/></div>)}
                    </>)
                  })()
                }
              </Container>
          </RSCard>
      }

      </Container>
    </Container>
    </>
  );
};
