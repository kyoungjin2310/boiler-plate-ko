import React from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from "reactstrap";

const Categroy = ({ posts }) => {
  console.log(posts);
  return (
    <>
      {Array.isArray(posts)
        ? //_id, categoryName, posts - 콘솔로 찍어서 알수있음
          posts.map(({ _id, categoryName, posts }) => (
            //key - 고유값을 써야함
            <div key={_id} className="mx-1 mt-1 my_category">
              <Link
                to={`/post/category/${categoryName}`}
                className="text-dark text-decoration-none"
              >
                <span className="ml-1">
                  <Button color="info">
                    {categoryName} <Badge color="light">{posts.length}</Badge>
                  </Button>
                </span>
              </Link>
            </div>
          ))
        : ""}
    </>
  );
};

export default Categroy;
