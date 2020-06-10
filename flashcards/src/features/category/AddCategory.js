import React, { useState } from "react";
import { Button, Jumbotron, Form, Label, Input, Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import styles from "./Category.module.scss";
import classnames from "classnames";
import { useDispatch } from "react-redux";
import { addCategory } from "./categorySlice";

export const AddCategory = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleSubmit = () => {
    dispatch(addCategory({ name }));
    history.goBack();
  };

  return (
    <div>
      <Jumbotron className={styles.center}>
        <Button color="info" onClick={() => history.goBack()}>
          Back
        </Button>
        <h1>Add Category</h1>
      </Jumbotron>
      <Container>
        <Form className={classnames(styles.center, styles.margin)}>
          <Label className={classnames(styles.fullWidth)}>
            {" "}Category
            <Input value={name} onChange={e => setName(e.target.value)} />
          </Label>
        </Form>
        <div className={styles.center}>
          <div />
          <Button color="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
          <div />
        </div>
      </Container>
    </div>
  );
};
