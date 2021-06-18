import React, { useState } from "react";
//useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
//state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
//useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Progress,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/UploadAdapter";
import { POST_UPLOADING_REQUEST } from "../../redux/types";
import dotenv from "dotenv";
dotenv.config();

const PostWrite = () => {
  //인증 가져오기
  //useSelector state는 combineReducers 안에
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [form, setValues] = useState({
    title: "",
    contents: "",
    fileUrl: "",
  });
  const dispatch = useDispatch;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, fileUrl, category } = form;
    const token = localStorage.getItem("token");
    const body = { title, contents, fileUrl, category, token };
    dispatch({
      type: POST_UPLOADING_REQUEST,
      payload: body,
    });
  };

  const getDataFromCKEditor = (event, editor) => {
    //ckeditor에서 data를 가져옴
    const data = editor.getData();
    console.log(data);

    //사진이 없으면 랜덤이미지 가져오기
    //data에 아래 글자가 일치하는것이 있으면 동작
    if (data && data.match("<img src=")) {
      //시작점
      const whereImg_start = data.indexOf("<img src=");
      console.log(whereImg_start);
      //마지막점
      let whereImg_end = "";
      //확장자 찾기
      let ext_name_find = "";
      //결과값
      let result_Img_Url = "";
      //확장자 이름 배열
      const ext_name = ["jpeg", "png", "jpg", "gif"];

      //확장자 배열과 맞는걸 찾을때까지 반복
      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          console.log(data.indexOf(`${ext_name[i]}`));
          //확장자 배열과 매치되는걸 변수에 담음
          ext_name_find = ext_name[i];
          //확장자 배열과 매치되는 data index
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }
      }
      console.log(ext_name_find);
      console.log(whereImg_end);

      //jpeg일 경우에 끝에서 4자리, 아닐경우 3자리로 합성
      if (ext_name_find === "jpeg") {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
      }

      console.log(result_Img_Url, "result Img Url");
      setValues({
        ...form,
        fileUrl: result_Img_Url,
        contents: data,
      });
    } else {
      //그림파일이 없는경우
      setValues({
        ...form,
        //기본그림 경로에 서버주소 있으면 dotenv.config 사용
        fileUrl: process.env.REACT_APP_BASIC_IMAGE_URL,
        contents: data,
      });
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          {/*form 감싸는 용도로 - FormGroup 씀*/}
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="category">Category</Label>
            <Input
              type="text"
              id="category"
              name="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="category">Content</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              onInit={Myinit}
              //onChange, onBlur, onFocus만 파라미터 2개값을 가지고,
              //이벤트객체, editor 인스턴스(작성글) 파라미터를 가짐
              //onBlur 태그 바깥을 클릭했을때 전송, onBlur를 사용해야 렉이 발생 안함
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              제출하기
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
};

export default PostWrite;
