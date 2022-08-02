import React, { FC, useCallback, useMemo, useState } from "react";
import {
  Header,
  RightMenu,
  ProfileImg,
  WorkspaceWrapper,
  Workspaces,
  Channels,
  WorkspaceName,
  Chats,
  MenuScroll,
  ProfileModal,
  LogOutButton,
} from "@layouts/Workspace/styles";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import gravatar from "gravatar";
import Menu from "@components/Menu";

const Channel = loadable(() => import("@pages/Channel"));
const DirectMessage = loadable(() => import("@pages/DirectMessage"));

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { data, error, mutate } = useSWR("http://localhost:3095/api/users", fetcher, {
    dedupingInterval: 1000, // 지정된 시간안에서는 같은 key를 서버에 호출하지 않고 caching된 데이터 사용
  });

  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuStyles = useMemo(() => ({ right: 0, top: 38 }), []);

  const onLogout = useCallback(() => {
    axios
      .post("/api/users/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
        // swr에서 { mutate }를 import 받으면 범용적으로 사용가능하다
        // ex: mutate('http://localhost:3095/api/users', false) -> key로 사용
      });
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, [showUserMenu]);

  if (!data) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data?.email, { s: "28px", d: "retro" })} alt={data?.email} />
            {showUserMenu && 
            (<Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
              <ProfileModal>
                <img src={gravatar.url(data?.email, { s: "28px", d: "retro" })} alt={data?.email} />
                <div>
                  <span id="profile-name">{data?.nickname}</span>
                  <span id="profile-active">Active</span>
                </div>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </ProfileModal>
              
              </Menu>)}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel" element={<Channel />} />
            <Route path="/dm" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
    </>
  );
};

export default Workspace;
