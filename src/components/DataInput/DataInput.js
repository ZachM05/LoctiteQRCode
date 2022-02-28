import React, { useContext, useEffect, useRef, useState } from "react";
import JSONContext from "../../context/JSONContext";
import styles from './DataInput.module.scss'

export default function DataInput(props) {

    const {data, setData} = useContext(JSONContext)

    const keyRef = useRef();
    const valRef = useRef();

    const [keyVal, setKey] = useState('key');
    const [val, setVal] = useState('value');

    useEffect(() => {
        setData({
            ...data,
            [props.index]: {
                [keyVal]: val
            }
        })
    }, [keyVal, val])

    return (
        <div className={styles.inputForm}>
            <input 
            className={styles.input} 
            placeholder={'key'}
            ref={keyRef}
            onChange={(e) => setKey(e.target.value)}/>
            <p>:</p>
            <input 
            className={styles.input} 
            placeholder={'value'}
            ref={valRef}
            onChange={(e) =>setVal(e.target.value)}/>
        </div>
    )
} 