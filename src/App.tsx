import React, {useEffect, useState} from 'react';
import './App.css';
import {promptsStore} from "./stores";
import {addPrompt, getPrompts, removePrompt, replacePrompt} from "./api/promptsApi";
import {Prompt} from "./stores/promptsStore";
import {observer} from "mobx-react";

const App = observer(()=> {
    const [promptID, setPromptID] = useState<string>("")
    const [promptText, setPromptText] = useState<string>("")
    const {promptsList, setPromptsList} = promptsStore

    useEffect(() => {
        getPrompts().then(res => {
            setPromptsList(res as Prompt[])
        }).catch(err => alert(err.message))
    }, [])

    const onAddPromptPressHandler = () => {
        addPrompt({id: promptID, text: promptText}).then(res => setPromptsList(res as Prompt[])).catch(err => alert(err.response.data.message))
    }

    const onRemovePromptPressHandler = () => {
        removePrompt({promptId: promptID}).then(res => setPromptsList(res as Prompt[])).catch(err => alert(err.response.data.message))
    }

    const onReplacePromptPressHandler = () => {
        replacePrompt({id: promptID, text: promptText}).then(res => setPromptsList(res as Prompt[])).catch(err => alert(err.response.data.message))
    }

    return (
        <div className="App" style={{backgroundColor: "#5050d1", height: "100vh"}}>
            <div style={{display: "flex", flexDirection: "row", width: "100vw", columnGap: 50}}>
                <div style={{display: "flex", flexDirection: "column", width: "25%", rowGap: 10, padding: 24}}>
                    <input type="text" placeholder={"Prompt ID"} value={promptID} onChange={(e) => setPromptID(e.target.value)}/>
                    <textarea style={{width: '99%', resize: "none", borderWidth: 0, marginBottom: 25, height: '80px'}} placeholder={"Prompt Text"} value={promptText} onChange={(e) => {
                        setPromptText(e.target.value)
                    }}/>
                    <button onClick={onAddPromptPressHandler}>Add Prompt</button>
                    <button onClick={onReplacePromptPressHandler}>Replace Prompt</button>
                    <button onClick={onRemovePromptPressHandler}>Remove Prompt</button>
                </div>
                <div style={{display: "flex", flexDirection: "column", marginTop: 24, rowGap: 20, width: '65%'}}>
                    {promptsList && promptsList.map(el => {
                        return <div>
                            <div style={{display: "flex", flexDirection: "row", columnGap: 24, justifyContent: 'space-between'}}>
                                <div style={{color: "white"}}>{el.id}</div>
                                <div style={{color: "white"}}>{el.text}</div>
                            </div>
                            <hr style={{backgroundColor: 'white', width: '100%', height: 2}}/>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
})

export default App;
