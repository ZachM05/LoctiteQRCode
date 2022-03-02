import React, { useContext, useRef } from 'react';
import { render } from 'react-dom';
import { QRCode } from 'react-qr-svg';
import { elementToSVG } from 'dom-to-svg'
import './index.css'

import JSONContextProvider from './providers/JSONContextProvider'

import Loctite from './Loctite.js';

import styles from './styles/styles.module.scss';
import { DataInput } from './components';
import JSONContext from './context/JSONContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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
  data.forEach(item => {
    obj[item.key] = item.value
  })
  return obj
}

export default function App() {
  const svgRef = useRef();

  const { data, add, setData } = useContext(JSONContext)

  const downloadSVG = () => {
    const svgDocument = elementToSVG(svgRef.current)
    const svgString = new XMLSerializer().serializeToString(svgDocument)
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    downloadBlob(blob, `myimage.svg`);
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      data,
      result.source.index,
      result.destination.index
    );

    setData([
      ...items
    ]);
  }

  return (
    <div className={styles.root}>
      {/* {data.map((e, i) => {
          return (
            <DataInput data={e} key={e.id} />
          )
        })
        } */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" >
          {(provided, snapshot) => {
            return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.countForm}
            >
              {data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DataInput data={item} key={item.id}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}}
        </Droppable>
      </DragDropContext>
      <div className={styles.addNew}>
        <button onClick={() => add()}>Add extra entry</button>
        {data.length !== Object.keys(parseJSON(data)).length ? <p>Two objects have the same key, ensure that each key is unique</p> : ''}
      </div>
      <div className={styles.qrcode} ref={svgRef}>
        <QRCode
          level="L"
          style={{ width: 200 }}
          value={JSON.stringify(parseJSON(data))}
        />
        <div className={styles.text}>
          <p>{data[0].value}</p>
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
