import React, { FC, useCallback, useEffect } from 'react';
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Navigate } from "react-router-dom";

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
            <button onClick={onLogout}>로그아웃</button>
            {children}
        </>
    );
};

export default Workspace;
