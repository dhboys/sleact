import React, { FC, useCallback, useEffect } from 'react';
import { Header, RightMenu, ProfileImg, WorkspaceWrapper, Workspaces, Channels, WorkspaceName, Chats, MenuScroll } from "@layouts/Workspace/styles";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Navigate } from "react-router-dom";
import gravatar from 'gravatar';


const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
        dedupingInterval: 1000, // 지정된 시간안에서는 같은 key를 서버에 호출하지 않고 caching된 데이터 사용
    });
    
    const onLogout = useCallback(() => {
        axios
          .post('/api/users/logout', null, {
            withCredentials: true,
          })
          .then(() => {
            mutate(false, false);
            // swr에서 { mutate }를 import 받으면 범용적으로 사용가능하다
            // ex: mutate('http://localhost:3095/api/users', false) -> key로 사용
          });
    }, []);

    
    if (!data) {
        return <Navigate replace to="/login" />
    }


    return (
        <>
        <Header>
            <RightMenu>
                <span>
                    <ProfileImg src={gravatar.url(data?.email, { s: '28px', d: 'retro'})} alt={data?.email} />
                </span>
            </RightMenu>
        </Header>
            <button onClick={onLogout}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>
                    test
                </Workspaces>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>menu scroll</MenuScroll>
                </Channels>
                <Chats>Chats</Chats>
            </WorkspaceWrapper>
            {children}
        </>
    );
};

export default Workspace;
