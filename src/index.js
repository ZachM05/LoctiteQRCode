import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { render } from 'react-dom';
import { QRCode } from 'react-qr-svg';
import { elementToSVG } from 'dom-to-svg'
import './index.css'

import JSONContextProvider from './providers/JSONContextProvider'

import Loctite from './Loctite.js';

import styles from './styles/styles.module.scss';
import { DataInput } from './components';
import JSONContext from './context/JSONContext';

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const parseJSON = (data) => {
  let obj = {}
  for (const property in data) {
    const entry = data[property]
    for (const prop in entry) {
      obj[prop] = entry[prop]
    }
  }
  return obj
}

export default function App() {
  const svgRef = useRef();

  const { data, setData, count, setCount } = useContext(JSONContext)

  const inc = () => {
    setCount(count + 1)
    return
  }

  const dec = () => {
    if (count === 1) {
      return
    } else {
      let temp = { ...data }
      delete temp[String(count - 1)]
      setCount(count - 1)
      setData(temp)
    }
  }

  const [value, setValue] = useState({
    'edge-device-id': 'USRHL1486724682',
    'edge-device-type': 'moxa_uc8220-t-lx',
    'edge-device-serial': 'TBZHB1040528',
    'edge-device-firmware': '4.0.6'
  });

  const downloadSVG = () => {
    const svgDocument = elementToSVG(svgRef.current)
    const svgString = new XMLSerializer().serializeToString(svgDocument)
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    downloadBlob(blob, `myimage.svg`);
  };

  return (
    <div className={styles.root}>
      {/* <div className={styles.inputForm}>
        <input placeholder={value['edge-device-id']} className={styles.input} onChange={(e) => setValue({ ...value, 'edge-device-id': e.target.value })} />
        <input placeholder={value['edge-device-type']} className={styles.input} onChange={(e) => setValue({ ...value, 'edge-device-type': e.target.value })} />
        <input placeholder={value['edge-device-serial']} className={styles.input} onChange={(e) => setValue({ ...value, 'edge-device-serial': e.target.value })} />
        <input placeholder={value['edge-device-firmware']} className={styles.input} onChange={(e) => setValue({ ...value, 'edge-device-firmware': e.target.value })} />
      </div> */}
      <div className={styles.countForm}>
        {[...Array(count)].map((e, i) => {
          return (
            <div className={styles.inputRow}>
              <DataInput key={i} index={i} />
              <button onClick={() => dec()}>-</button>
              <button onClick={() => inc()}>+</button>
            </div>
          )
        })
        }
      </div>
      <div className={styles.qrcode} ref={svgRef}>
        <QRCode
          level="L"
          style={{ width: 200 }}
          value={JSON.stringify(parseJSON(data))}
        />
        <div className={styles.text}>
          <p>{data['0'] ? Object.values(data['0'])[0] : ''}</p>
          <Loctite />
        </div>
      </div>

      <div>
        <button onClick={downloadSVG}><p>Download</p></button>
      </div>
    </div>
  )
}

render(
  <JSONContextProvider>
    <App />
  </JSONContextProvider>,
  document.getElementById('root'));
