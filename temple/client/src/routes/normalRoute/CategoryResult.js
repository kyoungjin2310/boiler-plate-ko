import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import PostCardOne from "../../components/post/PostCardOne";
import { Row } from "reactstrap";

const CategoryResult = () => {
  const dispatch = useDispatch();
  //Params를 떼올수있는 hooks, useParams는 route path parameter의 정보
  let { categoryName } = useParams();
  let category = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);

  console.log(categoryFindResult, "categoryFindResult");
  console.log(categoryName, "params");
  console.log(category, "category");

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

  return (
    <div>
      <h1>Category: "{categoryName}"</h1>
      <Row>
        <PostCardOne posts={categoryFindResult.posts} />
      </Row>
    </div>
  );
};

export default CategoryResult;
