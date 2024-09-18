import React, {useEffect, useState} from 'react';
import './App.css';
import {promptsStore} from "./stores";
import {addPrompt, getModelTestAnswer, getPrompts, removePrompt, replacePrompt} from "./api/promptsApi";
import {Prompt} from "./stores/promptsStore";
import {observer} from "mobx-react";

const App = observer(() => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [promptID, setPromptID] = useState<string>("")
    const [promptText, setPromptText] = useState<string>("")
    const [testPrompt, setTestPrompt] = useState<string>("")
    const [testRequest, setTestRequest] = useState<string>("")
    const {promptsList, modelAnswer, setPromptsList, setModelAnswer} = promptsStore

    useEffect(() => {
        setIsLoading(true)
        getPrompts().then(res => {
            setPromptsList(res as Prompt[])
        }).then(() => setIsLoading(false)).catch(err => alert(err.message))
    }, [setPromptsList])

    const onAddPromptPressHandler = () => {
        setIsLoading(true)
        addPrompt({
            id: promptID,
            text: promptText
        }).then(res => setPromptsList(res as Prompt[]))
            .then(() => setIsLoading(false))
            .catch(err => alert(err.response.data.message))
    }

    const onRemovePromptPressHandler = () => {
        setIsLoading(true)
        removePrompt({promptId: promptID})
            .then(res => setPromptsList(res as Prompt[]))
            .then(() => setIsLoading(false))
            .catch(err => alert(err.response.data.message))
    }

    const onReplacePromptPressHandler = () => {
        setIsLoading(true)
        replacePrompt({
            id: promptID,
            text: promptText
        })
            .then(res => setPromptsList(res as Prompt[]))
            .then(() => setIsLoading(false))
            .catch(err => alert(err.response.data.message))
    }

    const onTestPromptPressHandler = () => {
        setIsLoading(true)
        getModelTestAnswer({
            prompt: testPrompt,
            text: testRequest
        })
            .then(res => setModelAnswer(res as string))
            .then(() => setIsLoading(false))
            .catch(err => alert(err.response.data.message))
    }

    return (
        <div className="App" style={{backgroundColor: "#5050d1", height: "100vh", overflow: "hidden"}}>
            <div style={{display: "flex", flexDirection: "row", width: "100vw", height: "50vh", columnGap: 50}}>
                <div style={{display: "flex", flexDirection: "column", width: "25%", rowGap: 10, padding: 24}}>
                    <input type="text" placeholder={"Prompt ID"} value={promptID}
                           onChange={(e) => setPromptID(e.target.value)}/>
                    <textarea style={{width: '99%', resize: "none", borderWidth: 0, marginBottom: 25, height: '80px'}}
                              placeholder={"Prompt Text"} value={promptText} onChange={(e) => {
                        setPromptText(e.target.value)
                    }}/>
                    <button disabled={isLoading} onClick={onAddPromptPressHandler}>{isLoading ? "Loading..." : "Add Prompt"}</button>
                    <button disabled={isLoading} onClick={onReplacePromptPressHandler}>{isLoading ? "Loading..." : "Replace Prompt"}</button>
                    <button disabled={isLoading} onClick={onRemovePromptPressHandler}>{isLoading ? "Loading..." : "Remove Prompt}"}</button>
                </div>
                <div style={{display: "flex", flexDirection: "column", marginTop: 24, rowGap: 20, width: '65%', overflow: "scroll"}}>
                    {promptsList && promptsList.map(el => {
                        return <div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: 24,
                                justifyContent: 'space-between'
                            }}>
                                <div style={{color: "white"}}>{el.id}</div>
                                <div style={{color: "white"}}>{el.text}</div>
                            </div>
                            <hr style={{backgroundColor: 'white', width: '100%', height: 2}}/>
                        </div>
                    })}
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", width: "100vw", height: "50vh", columnGap: 50, padding: 24}}>
                <div style={{display: "flex", flexDirection: "column", width: "50%", height: "100%", columnGap: 50, alignItems: "center"}}>
                    <textarea style={{width: '99%', resize: "none", borderWidth: 0, marginBottom: 25, height: '80px'}}
                              placeholder={"Type prompt to test"} value={testPrompt} onChange={(e) => {
                        setTestPrompt(e.target.value)
                    }}/>
                    <textarea style={{width: '99%', resize: "none", borderWidth: 0, marginBottom: 25, height: '80px'}}
                              placeholder={"Type your question for test"} value={testRequest} onChange={(e) => {
                        setTestRequest(e.target.value)
                    }}/>
                    <button disabled={isLoading} style={{width: "30%", height: 32}} onClick={onTestPromptPressHandler}>{isLoading ? "Loading..." : "Test"}</button>
                </div>
                <div style={{overflow: "scroll", maxWidth: "40%", height: "90%"}}>
                    <span style={{color: "white"}}>{isLoading ? "Loading..." : modelAnswer}</span>
                </div>
            </div>
        </div>
    );
})

export default App;
