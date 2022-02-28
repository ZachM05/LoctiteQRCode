import React, { useState } from 'react';
import JSONContext from '../context/JSONContext';


function JSONContextProvider({ children }) {
  const [data, setData] = useState({});
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(1)

  return (
    <JSONContext.Provider
      value={{
        count,
        setCount,
        data,
        setData,
        active,
        setActive
      }}
    >
      {children}
    </JSONContext.Provider>
  )
}

export default JSONContextProvider