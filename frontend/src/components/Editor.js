import React, { useState, useEffect, useContext } from 'react';
import CodeMirror from 'codemirror'; // Import CodeMirror correctly
import CodeMirrorEditor from '../services/CodeMirrorEditor';
import { GlobalContext } from '../services/GlobleContext'; // Correct the import path
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../css/code.css';
import useClipboard from "react-use-clipboard";
import {
    createJavaScriptFunction, createVaribleJs, createClassJs, commentJs, constantJs, objectJs, initializeJs, printJs, createForLoopJs, createIfElseJs, executeCode, createTreeStarPattern, createSquareStarPattern, createHollowSquareStarPattern,summation,findtextSize,
    createJavaFunction, createClassJava, createCommentJava, createConstantJava, createForLoopJava, createIfElseJava, createObjectJava, createVariableJava, initializeJava, printJava, printVaribleJs, callFunctionJs
} from '../datamodules/DataCollections';


import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/mode/javascript/javascript.js';

import Style from '../styles/EditorStyle.module.css'
import Guidence from './Guidence';

let myCodeMirror = null;




function Editor(props) {


    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeValue, setCodeValue] = useState('');
    //const [resetKey, setResetKey] = useState(0);
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 5000
    });

    const [keywords, setKeywords] = useState('');
    const [language, setlanguage] = useState('Javascript');
    const [isListening, setIsListening] = useState(false);
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    const [codeEditor, setCodeEditor] = useState(false);




    const languageCommandHandlers = {
        'Javascript': {
            'create function': createJavaScriptFunction,
            'declare variable': createVaribleJs,
            'constant': constantJs,
            'create class': createClassJs,
            'comment': commentJs,
            'create object': objectJs,
            'initialize': initializeJs,
            'print': printJs,
            'create loop': createForLoopJs,
            'create if else': createIfElseJs,
            'execute': executeCode,
            'print varible': printVaribleJs,
            'call function': callFunctionJs,
            'create star pattern': createStarPatternCommand,
            'create square star pattern': createStarPatternCommand,
            'summation':createsummation,
            'find text size':findAndDisplayTextSize,

        },
        'Java': {
            'create function': createJavaFunction,
            'declare variable': createVariableJava,
            'constant': createConstantJava,
            'create class': createClassJava,
            'comment': createCommentJava,
            'create object': createObjectJava,
            'initialize': initializeJava,
            'print': printJava,
            'create loop': createForLoopJava,
            'create if else': createIfElseJava,
        },
    };



    //create loop with condition i less than
    //create if else statement with condition x greater than 5

    function extractConditionFromArgument(argument) {
        const conditionIndex = argument.indexOf('with condition');

        if (conditionIndex !== -1) {
            const conditionText = argument.substring(conditionIndex + 'with condition'.length).trim();

            if (conditionText.includes('greater than or equal to')) {
                return conditionText.replace('greater than or equal to', '>=').trim();
            } else if (conditionText.includes('less than or equal to')) {
                return conditionText.replace('less than or equal to', '<=').trim();
            } else if (conditionText.includes('greater than')) {
                return conditionText.replace('greater than', '>').trim();
            } else if (conditionText.includes('less than')) {
                return conditionText.replace('less than', '<').trim();
            }
        }

        return '';


    }
    // Return an empty string if no valid condition is found
    //"create if else statement with condition x greater than 0"

    //createStarPatternCommand function to handle the "create star pattern" voice command:
    function createStarPatternCommand() {

        const patternType = prompt('Enter "tree" or "square" or "hollowsquare" to choose the pattern type:');
        if (patternType === null) return; // User canceled

        if (patternType.toLowerCase() === 'tree') {
            const rows = prompt('Enter the number of rows for the tree pattern:');
            if (rows === null) return; // User canceled
            const code = createTreeStarPattern(parseInt(rows));
            return code;
        } else if (patternType.toLowerCase() === 'square') {
            const rows = prompt('Enter the number of rows for the square pattern:');
            if (rows === null) return; // User canceled
            const code = createSquareStarPattern(parseInt(rows));
            return code;
        } else if (patternType.toLowerCase() === 'hollowsquare') {
            const rows = prompt('Enter the number of rows for the hollow square pattern:');
            if (rows === null) return; // User canceled
            const code = createHollowSquareStarPattern(parseInt(rows));
            return code;
        } else {
            alert('Invalid pattern type. Please enter "tree" or "square" or "hollowsquare".');
            return null;
        }

    }

    function createsummation() {
        
        const input = prompt('Enter two numbers separated by a space:');
      
        // Split the input into an array using a space as the delimiter
        const inputArray = input.split(' ');
      
        // Check if there are exactly two elements in the array
        if (inputArray.length === 2) {
          const num1 = parseInt(inputArray[0]);
          const num2 = parseInt(inputArray[1]);
      
          if (!isNaN(num1) && !isNaN(num2)) {
            // Both inputs are valid integers
            console.log('First number:', num1);
            console.log('Second number:', num2);
      
            // Perform summation
            const result = summation(num1,num2);
            return result; // Return the result
          } else {
            console.log('Invalid input. Please enter two valid numbers separated by a space.');
          }
        } else {
          console.log('Invalid input format. Please enter two numbers separated by a space.');
        }
        
      }

      function findAndDisplayTextSize() {
        const text = prompt('Enter the text:');
        
        // Ensure text is not empty or null before passing it to the findtextSize function
        if (text !== null && text.trim() !== '') {
            const size = findtextSize(text);
            return size;
        } else {
            console.log('Invalid input. Please enter a non-empty text.');
        }
    }
      

    function processTranscript(transcript) {
        const normalizedTranscript = transcript.toLowerCase();
        const selectedLanguageHandlers = languageCommandHandlers[language];

        for (const command in selectedLanguageHandlers) {
            if (normalizedTranscript.startsWith(command)) {
                const argument = normalizedTranscript.replace(command, '').trim();

                if (command === 'create star pattern') {
                    const code = selectedLanguageHandlers[command](argument);
                    if (code) {
                        setKeywords(code);
                        setIsListening(false);
                    }
                    return;
                }

                if (command === 'summation') {
                    const result = selectedLanguageHandlers[command](argument);
                    if (result) {
                        setKeywords(result);
                        setIsListening(false);
                    }
                    return;
                }

                if (command === 'find text size') {
                    const text = selectedLanguageHandlers[command](argument);
                    if (text) {
                        setKeywords(text);
                        setIsListening(false);
                    }
                    return;
                }

                if (normalizedTranscript == "execute") {
                    executeCode();
                }
                if (argument) {
                    let keyword = '';

                    if (command === 'create loop' || command === 'create if else') {
                        const condition = extractConditionFromArgument(argument);
                        keyword = selectedLanguageHandlers[command](condition);
                    } else {
                        keyword = selectedLanguageHandlers[command](argument);
                    }

                    setKeywords(keyword);
                    setIsListening(false);
                    return;
                }
            }
        }

        setKeywords('Unrecognized command');
        setIsListening(false);
    }

    useEffect(() => {


        if (transcript) {
            processTranscript(transcript);
        }


    }, [transcript]);

    useEffect(() => {



        if (!myCodeMirror) {
            const myCodeMirrorInstance = CodeMirror(document.querySelector('#code-editor'), {
                lineNumbers: true,
                mode: 'javascript',
                styleActiveLine: true,
                matchBrackets: true,
                theme: 'idea',
                indentUnit: 4,
            });

            myCodeMirror = myCodeMirrorInstance; // Set the myCodeMirror variable

            CodeMirrorEditor.setEditor(myCodeMirrorInstance);

            myCodeMirrorInstance.setValue('// your code will be written here');

        }


        CodeMirrorEditor.onRunCode({
            before: () => setLoading(true),
            success: (result) => setResult(result),
            error: (ex) => setResult(ex.toString()),
            after: () => setLoading(false)
        });

        // Remove + codeValue

        // Attach a change event listener to the CodeMirror instance
        setResult('');
    }, []);

    //not happy

    const rejectCode = () => {
        setTextToCopy('');
        setKeywords('');
        resetTranscript();
    }

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
        setIsListening(true);
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setIsListening(false);
    };

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    const setValue = (e) => {

        setCodeValue(e.target.value);

    }

    const handleCodeChange = (editor) => {
        setCodeValue(editor.getValue()); // Update the codeValue state
    };

    const applyGeneratedCode = () => {
        if (keywords) {
            //komada
            const currentCursor = myCodeMirror.getCursor();
            const currentCode = myCodeMirror.getValue();

            // Get the lines before and after the current cursor position
            const linesBeforeCursor = currentCode.split('\n').slice(0, currentCursor.line + 1);
            const linesAfterCursor = currentCode.split('\n').slice(currentCursor.line + 1);

            // Insert the generated code at the current cursor position
            const newCodeLines = [...linesBeforeCursor, keywords, ...linesAfterCursor];
            const newCode = newCodeLines.join('\n');

            myCodeMirror.setValue(newCode);
            // Set the new code to the editor

            // Set cursor to the end of the inserted code
            const newCursor = { line: currentCursor.line + keywords.split('\n').length - 1, ch: keywords.length };
            myCodeMirror.setCursor(newCursor); // Set the cursor position
            setKeywords('');
            //////////////////////////////////////////////////////////////////////////////////////////


            //hello
        }
    };




    return (

        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-4'>
                    <Guidence />
                </div>

                <div className='col-md-5' style={{ padding: '5px' }}>
                    <div className={`${Style.codeeditorwrapper}`}>
                        <div className={Style.filename}>
                            My Code Editor
                            <span
                                onClick={() => CodeMirrorEditor.runCode()}
                                title='Click here to run this file'
                                className={`float-right cursor-pointer ${loading ? Style.loading : ''}`}
                            >
                                {loading && <i className={`fa fa-circle-o-notch fa-spin fa-3x ${Style.loadingIcon}`}></i>}
                                {!loading && <i className={`fa fa-caret-right ${Style.caretIcon}`} />}
                            </span>
                        </div>
                        <div id='code-editor' className={`${Style.CodeMirror}`} style={{ textAlign: 'left' }} onChange={setValue}></div>
                    </div>
                    <div className={`output ${loading ? Style.loading : ''} p-3 border rounded`}>
                        <div className='d-flex align-items-center'>
                            <i className={`fa fa-angle-right ${Style.angleIcon} mr-2`}></i>
                            {loading ? (
                                <span className={`fa-3x ${Style.loadingIcon}`}>
                                    <i className='fa fa-circle-o-notch fa-spin'></i>
                                </span>
                            ) : (
                                <pre className='m-0'>{result === '' ? 'Empty output' : result}</pre>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-3" style={{ paddingRight: '5px' }}>
                    <div className="bg-white rounded p-4 shadow">
                        <div className="mb-3">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select Language: {language}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" href="#" onClick={() => setlanguage('Javascript')}>Javascript</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => setlanguage('Java')}>Java</a></li>
                                </ul>
                            </div>
                        </div>
                        <h2 className="mb-3">Say Your Code</h2>
                        <div className="main-content mb-3 p-2 border" style={{ height: '50px', cursor: 'pointer' }} onClick={() => setTextToCopy(transcript)}>
                            {transcript}
                        </div>
                        <hr />
                        <div className="main-content mb-3 p-2 border" style={{ height: '200px', overflowY: 'auto' }}>
                            {keywords}
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary me-2" onClick={applyGeneratedCode}>
                                Apply Code
                            </button>
                            <button className="btn btn-secondary" onClick={rejectCode}>
                                Clear
                            </button>
                        </div>
                        <div className="btn-style">
                            <button className={`btn ${isCopied ? 'btn-success' : 'btn-primary'} me-2`} onClick={setCodeEditor}>
                                {isCopied ? 'Copied!' : 'Copy Clipboard'}
                            </button>
                            <button className={`btn ${isListening ? 'btn-danger' : 'btn-success'}`} onClick={isListening ? stopListening : startListening}>
                                {isListening ? 'Stop Listening' : 'Start Listening'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default React.memo(Editor);