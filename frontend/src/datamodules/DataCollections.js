import React from "react";
import CodeMirrorEditor from '../services/CodeMirrorEditor';

export function createJavaScriptFunction(functionName) {
    // Your function implementation
    const functionText = `
        function ${functionName}() {
            // Your function implementation here
        }
    `;
    return functionText;

}

export function createVaribleJs(varibleName) {
    // Your function implementation
    const functionText = `
        var ${varibleName};
    `;
    return functionText;

}

export function callFunctionJs(varibleName) {
    // Your function implementation
    const functionText = `
        ${varibleName}();
    `;
    return functionText;

}
export function createClassJs(varibleName) {
    // Your function implementation
    const functionText = `
       class ${varibleName} {
            constructor() {}
        }
 `;
    return functionText;

}

export function commentJs(varibleName) {
    // Your function implementation
    const functionText = `
       //${varibleName}
 `;
    return functionText;

}

export function constantJs(varibleName) {
    // Your function implementation
    const functionText = `
        const ${varibleName};
    `;
    return functionText;

}

export function objectJs(varibleName) {
    // Your function implementation
    const functionText = `
       const ${varibleName} = {//Enter your attributes};
    `;
    return functionText;

}

export function initializeJs(varibleName) {
    // Your function implementation

    if (varibleName === Number) {
        const functionText = `
       = ${varibleName};
    `;
        return functionText;

    }
    else {
        const functionText = `
       = '${varibleName}';
    `;
        return functionText;
    }

}

export function printJs(varibleName) {
    // Your function implementation
    const functionText = `
       console.log('${varibleName}');
    `;
    return functionText;

}

export function printVaribleJs(varibleName) {
    // Your function implementation
    const functionText = `
       console.log(${varibleName});
    `;
    return functionText;

}


export function createForLoopJs(condition) {
    const comparisonOperators = ['<', '>', '<=', '>='];

    for (const operator of comparisonOperators) {
        if (condition.includes(operator)) {
            const conditionText = condition.substring(0, condition.indexOf(operator)).trim();

            const loopText = `
                for (var ${conditionText}=0; ${condition}; ${conditionText}++) {
                    // Your loop body here
                }
            `;
            return loopText;
        }
    }

    return '';
}

export function createIfElseJs(condition) {
    const functionText = `
        if (${condition}) {
            // Your if block code here
        } else {
            // Your else block code here
        }
    `;
    return functionText;
}

//tree star pattern
export function createTreeStarPattern(rows) {

    const functionText = `
    let code = '';
    //tree 
    const testStr1 = "tree star pattern!!";\n
    console.log(testStr1);
        for (let i=1; i <= ${rows}; i++){
            for (let j = 1; j <= i; j++){
                code += '*';
            }
            code += "\\n";
        }
        console.log(code);
    `

    return functionText;
}

//square star pattern
export function createSquareStarPattern(rows) {

    const functionText = `
    let code = '';
        //square
        const testStr2 = "square star pattern!!";\n
        console.log(testStr2);
        for (let i=1; i <= ${rows}; i++){
            for (let j = 1; j <= ${rows}; j++){
                code += '*';
            }
            code += "\\n";
        }
        console.log(code);
    `

    return functionText;
}

//hollow square star pattern
export function createHollowSquareStarPattern(rows) {

    const functionText = `
    let code = '';
        //hollowsquare
        const testStr3 = "hollow square star pattern!!";\n
        console.log(testStr3);
        for(let i = 0; i < ${rows}; i++) { // external loop
            for(let j = 0; j < ${rows}; j++) { // internal loop
              if(i === 0 || i === ${rows} - 1) {
                code += "*";
              }
              else {
                if(j === 0 || j === ${rows} - 1) {
                  code += "*";
                }
                else {
                  code += " ";
                }
              }
            }
            code += "\\n";
        }
        console.log(code);
    `

    return functionText;
}

//summation
export function summation(num1, num2) {
    const functionText = `
    const result = ${num1} + ${num2};
    console.log('Summation:', result);
     
`
    return functionText;
}

//string text size
export function findtextSize(text) {
    const functionText = `
        let size = ${JSON.stringify(text)}.length;
        console.log('Text size:', size);
    `;
    return functionText;
}

export function createBreakStatement() {
    const functionText = `
    break;
    `;
    return functionText;
}

/////New Added


export function createArrowFunction(functionName, parameters) {
    const functionText = `
        const ${functionName} = (${parameters}) => {
            // Your arrow function implementation here
        };
    `;
    return functionText;
}

/*

export function createArray(variableName, elements) {
    const elementsText = elements.map(element => JSON.stringify(element)).join(', ');
    const functionText = `
        const ${variableName} = [${elementsText}];
    `;
    return functionText;
}

*/
export function createWhileLoop(condition) {
    const loopText = `
        while (${condition}) {
            // Your while loop body here
        }
    `;
    return loopText;
}


export function createSwitchStatement(variableName) {
    const functionText = `
        switch (${variableName}) {
            case 'case1':
                // Your case1 code here
                break;
            case 'case2':
                // Your case2 code here
                break;
            default:
                // Your default code here
        }
    `;
    return functionText;
}


export function createTemplateLiteral(textValues, variableValues) {
    let template = "const result = `";
    for (let i = 0; i < textValues.length; i++) {
        template += textValues[i];
        if (i < variableValues.length) {
            template += `\${${variableValues[i]}}`;
        }
    }
    template += "`;\n";
    return template;
}



//java


export function createJavaFunction(functionName) {
    const functionText = `public void ${functionName}() {\n    // Your function implementation here\n}\n`;
    return functionText;
}

export function createVariableJava(variableName) {
    const variableText = `int ${variableName};\n`;
    return variableText;
}

export function createClassJava(className) {
    const classText = `public class ${className} {\n    // Constructor\n    public ${className}() {\n    }\n}\n`;
    return classText;
}

export function createCommentJava(commentText) {
    const comment = `// ${commentText}\n`;
    return comment;
}

export function createConstantJava(constantName) {
    const constantText = `final int ${constantName} = 0;\n`;
    return constantText;
}

export function createObjectJava(objectName) {
    const objectText = `Object ${objectName} = new Object();\n`;
    return objectText;
}

export function initializeJava(variableName) {
    const initialization = `int ${variableName} = 0;\n`;
    return initialization;
}

export function printJava(variableName) {
    const printStatement = `System.out.println(${variableName});\n`;
    return printStatement;
}

export function createForLoopJava(condition) {
    const loopText = `for (${condition}) {\n    // Your loop body here\n}\n`;
    return loopText;
}

export function createIfElseJava(condition) {
    const ifElseText = `if (${condition}) {\n    // Your if block code here\n} else {\n    // Your else block code here\n}\n`;
    return ifElseText;
}

export function executeCode() {

    CodeMirrorEditor.runCode()

}