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


        <div className="container col-span-3 mx-auto p-4 bg-gray-100 rounded shadow" style={{ textAlign: 'left', height: '600px' }}>
        <h2 className="text-2xl mb-4">Voice Command Guide</h2>
        <div className={`mb-5 ${currentPage === 0 ? 'block' : 'hidden'}`} >
            <p className="text-base">Follow these steps to use the voice command interface:</p>
            <ol className="list-decimal list-inside">
                <li className="mb-1"><b>1.</b> Select a programming language from the dropdown.</li>
                <li className="mb-1"><b>2.</b> Click the "Start Listening" button to activate voice recognition.</li>
                <li className="mb-1"><b>3.</b> Speak one of the supported commands, like "create function" or "declare variable".</li>
                <li className="mb-1"><b>4.</b> Your spoken command will be processed and code snippets will be generated.</li>
                <li className="mb-1"><b>5.</b> Generated code will appear in the editor. You can manually edit it if needed.</li>
                <li className="mb-1"><b>6.</b> Click the "Apply Code" button to insert the generated code into the editor.</li>
                <li className="mb-1"><b>7.</b> Click the "Run Code" button to execute the code and see the output.</li>
                <li><b>8.</b> Or Give "Execute" voice command</li>
            </ol>
        </div>
        {/* ... Other content for Page 1 */}
        <div className={`${currentPage === 1 ? 'block' : 'hidden'}`}>
            <ul className="list-decimal list-inside mb-5">
                <li className="mb-1"><strong><b>1.</b></strong> "create function": Create a function template.</li>
                <li className="mb-1"><strong><b>2.</b></strong> "declare variable": Declare variable.</li>
                <li className="mb-1"><strong><b>3.</b></strong> "constant": Generates constant declaration.</li>
                <li className="mb-1"><strong><b>4.</b></strong> "create class": Generates a class definition.</li>
                <li className="mb-1"><strong><b>5.</b></strong> "comment": Adds a comment to the code.</li>
                <li className="mb-1"><strong><b>6.</b></strong> "create object": Generates an object instance.</li>
                <li className="mb-1"><strong><b>7.</b></strong> "initialize": Initializes variables or objects.</li>
                <li className="mb-1"><strong><b>8.</b></strong> "print": Outputs information to the console.</li>
                <li className="mb-1"><strong><b>9.</b></strong> "create loop": Generates a loop structure.</li>
                <li className="mb-1"><strong><b>10.</b></strong> "create if else": Generates if-else statement.</li>
                <li className="mb-1"><strong><b>11.</b></strong> "execute": Executes the code.</li>
                <li className="mb-1"><strong><b>12.</b></strong> "print variable": Displays the value of a variable.</li>
            </ul>
            <p className="text-base" style={{ bottom: '0px' }}>Here are some example commands:</p>
            {/* ... Other content for Page 2 */}
        </div>
        {/* ... Other content for Page 2 */}
        <div className={`${currentPage === 2 ? 'block' : 'hidden'}`}>
            <ul className="list-decimal list-inside mb-5">
                <li className="mb-1"><strong><b>1.</b></strong> "create loop with condition i less than 10":: Generates a for loop with the specified condition.</li>
                <li className="mb-1"><strong><b>2.</b></strong> "create if else statement with condition x greater than 5": Generates an if-else statement with the specified condition.</li>
                <li className="mb-1"><strong><b>3.</b></strong> "create star pattern":: Generates star pattern using the specified condition.</li>
                <li className="mb-1"><strong><b>4.</b></strong> "print variableName": Generates a console log statement to print the specified variable.</li>
                <li className="mb-1"><strong><b>5.</b></strong> "create constant": Generates a constant declaration.</li>
                <li className="mb-1"><strong><b>6.</b></strong> "create object with attributes name and age": Generates an object declaration with attributes.</li>
                <li className="mb-1"><strong><b>7.</b></strong> "initialize variableName with Number": Generates variable initialization with a specified type.</li>
            </ul>
            <h4 className="text-lg mb-4">Example Voice Commands:</h4>
            {/* ... Other content for Page 3 */}
        </div>
        <div className={`${currentPage === 3 ? 'block' : 'hidden'}`}>
            <ul className="list-decimal list-inside mb-5">
                <li className="mb-1"><strong><b>1.</b></strong> "summation": Generates summation using two integer type inputs.</li>
                <li className="mb-1"><strong><b>2.</b></strong> "find the text size": Generates a code using .length.</li>
                <li className="mb-1"><strong><b>3.</b></strong> "comment hello": Generates a comment.</li>
                <li className="mb-1"><strong><b>4.</b></strong> "call function functionName": Generates a function call.</li>
                <li className="mb-1"><strong><b>5.</b></strong> "create class ClassName": Generates a class definition.</li>
                <li className="mb-1"><strong><b>6.</b></strong> "create function myFunction": Generates a function template.</li>
                <li className="mb-1"><strong><b>7.</b></strong> "declare variable myVariable": Generates a variable declaration.</li>
                <li className="mb-1"><strong><b>8.</b></strong> ". "print var variableName": Displays the value of a variable.</li>
            </ul>
            <h4 className="text-lg mb-4">Example Voice Commands:</h4>
            {/* ... Other content for Page 3 */}
        </div>
        <div className="text-center">
            <button className="btn me-1 w-20" onClick={prevPage} style={{ borderRadius: "28px", background: "linear-gradient(45deg, #010758, #490d61)", color: 'white' }}>Previous</button>
            <button className="btn btn-primary w-20" onClick={nextPage} style={{ borderRadius: "28px", padding: "6px 22px", background: "linear-gradient(45deg, #010758, #490d61)", color: 'white' }}>Next</button>
        </div>
    </div>
    );
}

