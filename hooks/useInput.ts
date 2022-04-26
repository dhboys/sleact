import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react"

// returnType을 좀 더 가독성 있게 하기 위해 변수로 선언 - [] 내부의 3가지 변수는 useInput의 return [value, handler, setValue] 각각의 Type.
type ReturnType<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>]

// <Generic> 을 사용하면 param과 Return Type을 특정할 수 있다.
const useInput = <T>(initialData: T): ReturnType<T> => {
    const [value, setValue] = useState(initialData);
    const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue((e.target.value as unknown) as T);
    }, []);
    return [value, handler, setValue];
};

export default useInput;