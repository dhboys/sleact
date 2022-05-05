import React, { FC, useCallback, useEffect } from 'react';
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Navigate } from "react-router-dom";

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
    
    const onLogout = useCallback(() => {
        axios.post('/api/users/logout', null, {
            withCredentials: true,
        })
          .then(() => {
            mutate();
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
