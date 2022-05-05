import React, { useCallback, useState } from "react";
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from "@pages/SignUp/styles";
import axios from "axios";
import useInput from "@hooks/useInput";
import { Link, Navigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const LogIn = () => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          "/api/users/login",
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          // 성공 시 바로 호출
          mutate();
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  // mutate 후에 정보가 들어오면 실행하는 구문
  if (data !== false) {
    return <Navigate replace to="/workspace/channel" />
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
