import React from "react";
import {
  Button,
  Jumbotron,
  Container,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategorys, removeCategory } from "./categorySlice";
import { trashFillIcon } from "../../icons";

import styles from "./Category.module.scss";

export const Category = () => {
  let dispatch = useDispatch();
  let categories = useSelector(state => selectAllCategorys(state));
  return (
    <div>
      <Jumbotron className={styles.center}>
        <h1>Categories</h1>
      </Jumbotron>

      <Container>
        <ListGroup>
          {categories.map(c => {
            return (
              <ListGroupItem key={c.id}>
                <div className={styles.listGroupItem}>
                  <div>
                    {c.name}
                  </div>
                  <div>
                    <Button
                      color="danger"
                      onClick={() => dispatch(removeCategory(c.id))}
                    >
                      {trashFillIcon()}
                    </Button>
                  </div>
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Container>
      <Container className={styles.center}>
        <div />
        <Link to="/category/add">
          <Button color="primary" className={styles.addCategoryButton}>
            Add Category
          </Button>
        </Link>
        <div />
      </Container>
    </div>
  );
};
