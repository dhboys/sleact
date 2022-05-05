import React, { FC, useCallback } from 'react';
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
    
    const onLogout = useCallback(() => {
        axios.post('http://localhost:3095/api/users/logout', null, {
            withCredentials: true,
        })
          .then(() => {
            mutate();
          });
    }, []);

    return (
        <>
            <button onClick={onLogout}>로그아웃</button>
            {children}
        </>
    );
};

export default Workspace;
