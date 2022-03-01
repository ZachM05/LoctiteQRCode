import { createContext } from "react";


const JSONContext = createContext({
  data: [{
    id: 0,
    key: 'key',
    value: 'value',
    active: false
  }],
  setData: () => {},
  add: () => {}, 
  del: () => {}
});

export default JSONContext;