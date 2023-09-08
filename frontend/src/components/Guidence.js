import React, { useState, useEffect, useContext } from 'react';
import Style from '../styles/EditorStyle.module.css'

export default function Guidence() {

    //guidence complete

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 4; // Number of pages in the guide

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            // alert(currentPage)
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        

        <div className={`container col-md-3 ${Style['voice-guide-container']}`} style={{ textAlign: 'left', height: '600px' }}>
            <h2 className={`mb-4 ${Style['voice-guide-heading']}`}>Voice Command Guide</h2>
            <div className={`${Style['voice-guide-page']} ${currentPage === 0 ? 'd-block' : 'd-none'}`} >
                <p className={Style['voice-guide-text']}>Follow these steps to use the voice command interface:</p>
                <ol className={`mb-5 ${Style['voice-guide-list']}`}>
                    <li>Select a programming language from the dropdown.</li>
                    <li>Click the "Start Listening" button to activate voice recognition.</li>
                    <li>Speak one of the supported commands, like "create function" or "declare variable".</li>
                    <li>Your spoken command will be processed and code snippets will be generated.</li>
                    <li>Generated code will appear in the editor. You can manually edit it if needed.</li>
                    <li>Click the "Apply Code" button to insert the generated code into the editor.</li>
                    <li>Click the "Run Code" button to execute the code and see the output.</li>
                    <li>Or Give "Execute" voice command</li>
                </ol>
            </div>
            {/* ... Other content for Page 1 */}
            <div className={`${Style['voice-guide-page']} ${currentPage === 1 ? 'd-block' : 'd-none'}`}>
                <ul className={`mb-5 ${Style['voice-guide-list']}`} >

                    <li><strong>"create function":</strong> Create a function template.</li>
                    <li><strong>"declare variable":</strong> Declare variable.</li>
                    <li><strong>"constant":</strong> Generates constant declaration.</li>
                    <li><strong>"create class":</strong> Generates a class definition.</li>
                    <li><strong>"comment":</strong> Adds a comment to the code.</li>
                    <li><strong>"create object":</strong> Generates an object instance.</li>
                    <li><strong>"initialize":</strong> Initializes variables or objects.</li>
                    <li><strong>"print":</strong> Outputs information to the console.</li>
                    <li><strong>"create loop":</strong> Generates a loop structure.</li>
                    <li><strong>"create if else":</strong> Generates if-else statement.</li>
                    <li><strong>"execute":</strong> Executes the code.</li>
                    <li><strong>"print variable":</strong> Displays the value of a variable.</li>

                </ul>
                <p className={Style['voice-guide-text']} style={{ bottom: '0px' }}>Here are some example commands:</p>
                {/* ... Other content for Page 2 */}
            </div>
            {/* ... Other content for Page 2 */}
            <div className={`${Style['voice-guide-page']} ${currentPage === 2 ? 'd-block' : 'd-none'}`}>
                <ul className={`mb-5 ${Style['voice-guide-list']}`} >
                    <li><strong>"create loop with condition i less than 10"::</strong>Generates a for loop with the specified condition.</li>
                    <li><strong>"create if else statement with condition x greater than 5":</strong> Generates an if-else statement with the specified condition.</li>
                    <li><strong>"create star pattern"::</strong>Generates star patter using the specified condition.</li>
                    <li><strong>"print variableName":</strong>Generates a console log statement to print the specified variable.</li>
                    <li><strong>"create constant":</strong>Generates a constant declaration.</li>
                    <li><strong>"create object with attributes name and age":</strong>Generates an object declaration with attributes.</li>
                    <li><strong>"initialize variableName with Number":</strong>Generates variable initialization with a specified type.</li>

                </ul>
                <h4 className={`mb-4 ${Style['voice-guide-subheading']}`}>Example Voice Commands:</h4>
                {/* ... Other content for Page 3 */}
            </div>
            <div className={`${Style['voice-guide-page']} ${currentPage === 3 ? 'd-block' : 'd-none'}`}>
                <ul className={`mb-5 ${Style['voice-guide-list']}`} >

                    <li><strong>"comment hello":</strong> Generates a comment.</li>
                    <li><strong>"call function functionName":</strong>Generates a function call.</li>
                    <li><strong>"create class ClassName":</strong>Generates a class definition.</li>
                    <li><strong>"create function myFunction":</strong>Generates a function template.</li>
                    <li><strong>"declare variable myVariable":</strong>Generates a variable declaration.</li>
                    <li><strong>"print var variableName":</strong>Displays the value of a variable.</li>


                </ul>
                <h4 className={`mb-4 ${Style['voice-guide-subheading']}`}>Example Voice Commands:</h4>
                {/* ... Other content for Page 3 */}
            </div>
            <div className="text-center">
                <button className="btn btn-primary me-2 w-10" onClick={prevPage}>Previous</button>
                <button className="btn btn-primary w-10" onClick={nextPage}>Next</button>
            </div>

        </div>
    );
}

