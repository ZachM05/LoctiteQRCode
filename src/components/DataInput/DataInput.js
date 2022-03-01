import React, { useContext, useEffect, useRef, useState } from "react";
import JSONContext from "../../context/JSONContext";
import styles from './DataInput.module.scss'

export default function DataInput(props) {

    const { data, setData, del } = useContext(JSONContext)

    const keyRef = useRef();
    const valRef = useRef();

    const [keyVal, setKey] = useState('key');
    const [val, setVal] = useState('value');

    useEffect(() => {
        setData(
            data.map(obj => {
                if (obj.id === props.data.id) {
                    return {
                        id: props.data.id,
                        key: keyVal,
                        value: val,
                        active: obj.active
                    }
                } else return obj
            })
        )
    }, [keyVal, val])

    return (
        <div className={styles.inputForm}>
            <input
                className={styles.input}
                placeholder={props.data.key}
                ref={keyRef}
                onChange={(e) => setKey(e.target.value)} />
            <p>:</p>
            <input
                className={styles.input}
                placeholder={props.data.value}
                ref={valRef}
                onChange={(e) => setVal(e.target.value)} />
            <button disabled={data.length === 1} onClick={() => del(props.data.id)}>x</button>
        </div>
    )
} 