import React, { useState, useEffect } from 'react';
import { ipcRenderer } from './IpcRender'; // Correct the import

export const GlobalContext = React.createContext();

export default function GlobalContextProvider(props) {
    const [state, setState] = useState({
        language: props.lang || 'pt-BR',
        shadeIsOpen: false,
        __debug: false,
        spokenIsLoaded: false,
        connectedToVSCode: false,
        changingLanguage: false,
        editorState: [],
    });

    const changeEditor = (t) => {
        ipcRenderer.send('Config:changeEditor', t); // Use ipcRenderer here
    };

    const toggleShade = (t) => {
        setState((prevState) => ({
            ...prevState,
            shadeIsOpen: t ?? !prevState.shadeIsOpen,
        }));
    };

    const toggleDebug = () => {
        setState((prevState) => ({
            ...prevState,
            __debug: !prevState.__debug,
        }));
    };

    const changeLanguage = (lang) => setState((prevState) => ({ ...prevState, language: lang }));

    const executeInternalCommand = (command) => {
        if (command.id === '__change_lang') {
            setState((prevState) => ({ ...prevState, changingLanguage: true }));
            ipcRenderer.send('VoiceRecognition:setRecording', false);
            setTimeout(() => changeLanguage(command.lang === 'pt-BR' ? 'en-US' : 'pt-BR'), 1500);
            setTimeout(() => {
                ipcRenderer.send('VoiceRecognition:setRecording', true);
                setState((prevState) => ({ ...prevState, changingLanguage: false }));
            }, 3000);
        }
    };

    useEffect(() => {
        ipcRenderer.on('Config:onChangeEditorState', (editorState) => {
            const connected =
                editorState?.find(({ name }) => {
                    const d = name.toLowerCase();
                    return d === 'vscode' || d === 'codemirror';
                })?.status === 'ON';

            if (!connected) ipcRenderer.send('VoiceRecognition:setRecording', false);

            setState((prevState) => ({
                ...prevState,
                editorState: editorState,
                connectedToVSCode: connected,
            }));
        });

        // Request the current editor
        ipcRenderer.send('Config:changeEditor', null);
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                changeEditor,
                changeLanguage,
                toggleShade,
                toggleDebug,
                executeInternalCommand,
                mode: props.mode,
                onOpen: props.onOpen,
                onClose: props.onClose,
                onToggleRecording: props.onToggleRecording,
            }}
        >
            {props.children} {/* Don't forget to render the children */}
        </GlobalContext.Provider>
    );
}
