import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, FormGroup, Label, Modal, ModalBody, ModalHeader, NavLink, Input } from 'reactstrap'
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST} from "../../redux/type";
import { useDispatch, useSelector } from "react-redux";

const LoginModal = () => {
    //modal이 닫혀있는지 열려있는지 유무
    const [modal, setModal] = useState(false)
    const [localMsg, setLocalMsg] = useState('')
    const [form, setValues] = useState({
        email:"",
        password: ""
    });
    const dispatch = useDispatch();
    //initialSate 안에 errorMsg 불러오기(auth가 객체 반환임)
    const { errorMsg } = useSelector((state) => state.auth);
    useEffect(()=>{
        // try, catch는 error를 체크할때 사용
        try{
            setLocalMsg(errorMsg)
        }catch(e){
            console.log(e)
        }
    }, [errorMsg])

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        });
        setModal(!modal)
    }

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = form
        const user = {email, password}
        console.log(user)
        dispatch({
           type: LOGIN_REQUEST,
           //authSaga - action.payload랑 같아야함
           payload: user
        });
    }
    return (
        <div>
            <NavLink onClick={handleToggle}>
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Login</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{localMsg}</Alert> : null }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input 
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="password">Email</Label>
                            <Input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={onChange}
                            />
                            <Button color="dark" style={{ marginTop:"2rem" }}>
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default LoginModal;