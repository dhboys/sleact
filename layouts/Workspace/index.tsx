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
  WorkspaceButton,
  AddButton,
} from "@layouts/Workspace/styles";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import gravatar from "gravatar";
import Menu from "@components/Menu";
import { Link } from "react-router-dom";
import { IUser } from "@typings/db";

const Channel = loadable(() => import("@pages/Channel"));
const DirectMessage = loadable(() => import("@pages/DirectMessage"));

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { data: userData, error, mutate } = useSWR<IUser | false>("http://localhost:3095/api/users", fetcher, {
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

  const onClickCreateWorkspace = useCallback(() => {

  }, [])

  if (!userData) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData?.email, { s: "28px", d: "retro" })} alt={userData?.email} />
            {showUserMenu && 
            (<Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
              <ProfileModal>
                <img src={gravatar.url(userData?.email, { s: "28px", d: "retro" })} alt={userData?.email} />
                <div>
                  <span id="profile-name">{userData?.nickname}</span>
                  <span id="profile-active">Active</span>
                </div>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </ProfileModal>
              </Menu>)}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>{userData?.Workspaces?.map((workspace) => {
          return (
            <Link key={workspace?.id} to={`/workspace/${123}/channel/일반`}>
              <WorkspaceButton>{workspace?.name?.slice(0,1).toUpperCase()}</WorkspaceButton>
            </Link>
          );
        })}
        <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
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
