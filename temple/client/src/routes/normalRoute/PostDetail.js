//서버를 전송받아서 그려주는 역할
import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
//header의 title을 바꿔줌
import { Helmet } from "react-helmet";
import {
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
import { Button, Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCommentDots,
  faMouse,
} from "@fortawesome/free-solid-svg-icons";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Comments from "../../components/comments/Comments";

const PostDetail = (req) => {
  const dispatch = useDispatch();
  //post
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  //user
  const { userId, userName } = useSelector((state) => state.auth);

  //comment 불러오기(CommentReducer.js에서 불러오는 것임)
  const { comments } = useSelector((state) => state.comment);

  console.log(req);
  useEffect(() => {
    //detail을 클릭했을때 주소에 post id가 담김
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    //작성자만 Delete 버튼이 보이게 구별할 수 있도록 token을 보냄
    dispatch({
      type: USER_LOADING_REQUEST,
      //개발자도구 F12 -> Application -> 왼쪽에 Local Storage
      //token은 보안적인 측면에서 이름을 나중에 변경
      payload: localStorage.getItem("token"),
    });
  }, [dispatch, req.match.params.id]);

  //글을 지워주는 버튼(작성한 사람만 삭제 가능)
  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        //작성한 사람만 가능해서 token이 필요함
        token: localStorage.getItem("token"),
      },
    });
  };

  const EditButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

  const HomeButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );

  const Body = (
    <>
      {/*userId랑 creatorId랑 같으면 Edit*/}
      {userId === creatorId ? EditButton : HomeButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between">
        {
          //삼항연산자를 안쓸경우
          //1. ()안에 함수 작성
          //2. 그리고 ()추가 - 함수처럼 실행한다는 의미
          //3. 형태 - (익명함수)()
          (() => {
            if (postDetail && postDetail.creator) {
              return (
                <Fragment>
                  <div className="font-weight-bold text-big">
                    <span className="mr-3">
                      <Button color="info">
                        {postDetail.category.categoryName}
                      </Button>
                    </span>
                    {postDetail.title}
                  </div>
                  <div className="align-self-end">
                    {postDetail.creator.name}
                  </div>
                </Fragment>
              );
            }
          })()
        }
      </Row>
      {postDetail && postDetail.comments ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">
            {/*볼펜아이콘*/}
            <FontAwesomeIcon icon={faPencilAlt} />
            &nbsp;
            <span> {postDetail.date}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faCommentDots} />
            &nbsp;
            <span>{postDetail.comments.length}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faMouse} />
            {/*조회수*/}
            <span>{postDetail.views}</span>
          </div>
          <Row className="mb-3">
            {/*disabled - 읽기전용*/}
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
          <Row>
            <Container className="mb-3 border border-blue rounded">
              {
                //comments 배열이있으면
                Array.isArray(comments)
                  ? comments.map(
                      ({ contents, creator, date, _id, creatorName }) => (
                        <div key={_id}>
                          <Row className="justify-content-between p-2">
                            <div className="font-weight-bold">
                              {
                                //creatorName이 있으면, creator - 고유 아이디
                                creatorName ? creatorName : creator
                              }
                            </div>
                            <div className="text-small">
                              <span className="font-weight-bold">
                                {/*split으로 나눠주고 띄어쓰기로 구분, 첫번째 값을 적어줌 -> comment에서 년도 다음에 띄어쓰기 시간*/}
                                {date.split(" ")[0]}
                              </span>
                              <span className="font-weight-light">
                                {" "}
                                {date.split(" ")[1]}
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div>{contents}</div>
                          </Row>
                          <hr />
                        </div>
                      )
                    )
                  : "Creator"
              }
              {/* 
                너무 길어져서 모듈화 하기
                req.match.params.id - post id를 넘겨주는것(어느 post 인지 명확히 해야함)
                userId - 작성자 아이디
                userName - 작성자 이름
              */}
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              />
            </Container>
          </Row>
        </Fragment>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );

  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
};

export default PostDetail;
