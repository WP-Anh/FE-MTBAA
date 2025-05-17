// Định dang dữ liệu:
// 1. dữ liệu
// 2. trạng thái gọi dữ liệu -> pending
// 3. trạng thái đã thực hiện gọi dữ liệu -> fetched
// 4. trạng thái thành công
// 5. trạng thái thất bại
// 6. message - tin nhắn của API trả về

"use client";
import { createContext, useState } from "react";

interface DataResponse {
  data: any;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

interface DataContext {
  [k: string]: { data: DataResponse; setData: (p?: any) => void };
}

export const StoreContext = createContext({});

const InitialData: DataResponse = {
  data: null,
  isPending: false,
  isFetched: false,
  isSuccess: false,
  isError: false,
};

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [example, setExample] = useState<DataResponse>(InitialData);
  const [login, setLogin] = useState(InitialData);
  const [register, setRegister] = useState(InitialData);
  const [movies, setMovies] = useState(InitialData);
  const dataContext: DataContext = {
    example: { data: example, setData: setExample },
    login: { data: login, setData: setLogin },
    register: { data: register, setData: setRegister },
    movie: { data: movies, setData: setMovies },
  };

  return (
    <StoreContext.Provider value={dataContext}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
