import { createContext } from "react";


const JSONContext = createContext({
  count: 1,
  setCount: () => {},
  data: {},
  setData: () => {},
  active: true,
  setActive: () => {}
});

export default JSONContext;