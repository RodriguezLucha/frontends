import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { leftArrayCircleFill } from "../../icons";

export const Recall = () => {
  let history = useHistory();
  return (
    <Container>
      <Button onClick={() => history.goBack()}>
        {leftArrayCircleFill()}
      </Button>
      <h1>Recall</h1>
    </Container>
  );
};
