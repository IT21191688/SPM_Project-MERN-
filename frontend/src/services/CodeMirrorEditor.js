import CodeMirror from 'codemirror';

class CodeMirrorEditor {
    constructor() {
        this.editor = null;
        this.runCodeLifecycle = null;
    }

    getEditor() {
        const editor = this.editor;

        if (editor == null) return [null, new Error('No active text editor')];

        return [editor, null];
    }

    setEditor(editor) {
        this.editor = editor;
    }

    onRunCode(lifecycle) {
        this.runCodeLifecycle = lifecycle;
    }

    runCode() {
        const { after, before, error, success } = this.runCodeLifecycle;

        before();

        const code = this.getEditor()[0].getValue();

        this.runThisCode(code)
            .then(success)
            .catch(error)
            .finally(after);
    }

    async write(text = '') {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        if (editor.getSelection().length > 0) {
            const sel = editor.listSelections()[0];

            editor.replaceSelection(text);

            editor.setSelection(sel.anchor, { ...sel.head, ch: sel.anchor.ch + text.length });
        } else {
            editor.replaceRange(text, editor.getCursor());
        }
    }

    async remove() {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        editor.execCommand('deleteLine');
    }

    async newLine(pos) {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        if (pos === 0) {
            await this.goToLine(editor.getCursor().line + 1, 'END');
        }

        editor.execCommand('newlineAndIndent');
    }

    async goToLine(number, cursorPosition = 'BEGIN') {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        const destLine = parseInt(number) - 1;
        const text = editor.getLine(destLine);

        if (cursorPosition === 'END') {
            editor.setCursor({ line: destLine, ch: Math.max(text.length, 0) });
        } else {
            editor.setCursor({ line: destLine, ch: Math.max(text.length - text.trimLeft().length, 0) });
        }

        editor.scrollIntoView(null, 200);

        return text;
    }

    lineBoundaries(line, withWhiteSpace = false) {
        const rStart = withWhiteSpace ? 0 : Math.max(line.length - line.trimLeft().length, 0);
        const rEnd = withWhiteSpace ? line.length : line.trimRight().length;

        return {
            relative: [rStart, rEnd]
        };
    }

    stringMatchAll(text, regex) {
        const indices = [];
        let match = null;

        while ((match = regex.exec(text)) != null) {
            indices.push([match.index, match.index + match[0].length]);
        }

        return indices;
    }

    findAllOccurrences(lineNumber, regex, pad = 0) {
        const [editor] = this.getEditor();

        if (editor == null) return [];

        const line = editor.getLine(lineNumber);
        const text = line.substr(pad);

        return this.stringMatchAll(text, regex);
    }

    async moveCursorTo(to, symbol, leapSize) {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        const cursor = editor.getCursor();

        if (to === 'BEGIN_LINE' || to === 'END_LINE') {
            const { relative } = this.lineBoundaries(editor.getLine(cursor.line));

            console.log(relative);

            return editor.setCursor({ line: cursor.line, ch: relative[to === 'BEGIN_LINE' ? 0 : 1] });
        }

        if (to === null) {
            return editor.setCursor({ line: cursor.line, ch: cursor.ch + leapSize });
        }

        if (to === 'SYMBOL' && symbol !== undefined) {
            const indices = this.findAllOccurrences(cursor.line, new RegExp(symbol, 'gi'), cursor.ch);

            if (leapSize === -1) leapSize = indices.length;
            else if (leapSize == null) leapSize = 1;

            const range = indices[leapSize - 1];

            if (range == null) throw new Error('Match not found for symbol: ' + symbol);

            return editor.setCursor({ line: cursor.line, ch: cursor.ch + range[0] });
        }

        throw new Error('Unknown operation!');
    }

    async findPositionOf(term, line, pad) {
        const [editor, e] = this.getEditor();

        if (editor === null) throw e;

        line = line ?? editor.getCursor().line;

        if (typeof term === 'string') {
            if (term === 'LINE_BOUNDARIES' || term === '') {
                return [this.lineBoundaries(editor.getLine(line), true).relative];
            }

            term = new RegExp(term, 'gi');
        }

        return this.findAllOccurrences(line, term, pad);
    }

    async select(from, to, line) {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        if (line) {
            const lastCharacter = editor.getLine(to - 1).length;

            editor.setSelection({ line: from - 1, ch: 0 }, { line: to - 1, ch: lastCharacter });

            return editor.getSelection();
        }

        const currentLine = editor.getCursor().line;

        editor.setSelection({ line: currentLine, ch: from }, { line: currentLine, ch: to + 1 });

        return editor.getSelection();
    }

    async getLine(number) {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        number = number != null ? number : editor.getCursor().line;

        const text = editor.getLine(number);

        return {
            _line: number,
            lineNumber: number,
            _text: text,
            text: text,
            character: editor.getCursor().ch
        };
    }

    async formatCode() {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        const cursor = editor.getCursor();
        const startLine = 0;
        const endLine = editor.lastLine();

        editor.setSelection({ line: startLine, ch: 0 }, { line: endLine, ch: editor.getLine(endLine).length });

        editor.execCommand('indentAuto');

        editor.setCursor(cursor);
    }

    async indentSelection(p1, p2) {
        const [editor, e] = this.getEditor();

        if (editor == null) throw e;

        const cursor = editor.getCursor();

        if (p1 == null || p2 == null) {
            const lines = editor.lastLine();

            editor.setSelection({ line: 0, ch: 0 }, { line: lines, ch: editor.getLine(lines).length });

            editor.execCommand('indentAuto');

            return editor.setCursor(cursor);
        }

        p1[0] = p1[0] ?? cursor.line;
        p2[0] = p2[0] ?? cursor.line;

        const sp1 = p1.map(a => parseInt(a, 10));
        const sp2 = p2.map(a => parseInt(a, 10));

        sp1[0] = Math.max(0, sp1[0]);
        sp2[0] = Math.min(editor.lineCount(), sp2[0]);

        editor.setSelection({ line: sp1[0], ch: sp1[1] }, { line: sp2[0], ch: sp2[1] });

        editor.execCommand('indentAuto');

        return editor.setCursor(cursor);
    }

    async writeOnTerminal(text) {
        this.runCode();

        return;
    }

    async fileInfo(text) {
        return {
            fileName: 'MyLittleDarkAge.js'
        };
    }

    async undo() {
        console.log('hereee');
        const [editor, e] = this.getEditor();

        if (e != null || editor == null) throw e;

        return editor.undo();
    }

    async redo() {
        console.log('hereee333');
        const [editor, e] = this.getEditor();

        if (e != null || editor == null) throw e;

        return editor.redo();
    }

    runThisCode(code) {
        return new Promise((res, rej) => {
            try {
                eval(`
                    console.defaultLog = console.log.bind(console);
                    console.logs = [];
                    console.log = function() {
                        console.defaultLog.apply(console, arguments);
                        console.logs.push(Array.from(arguments));
                    }

                    ${code}
                `);

                const text = console.logs.map(item => item.join(' ')).join('\n');

                setTimeout(() => res(text), 1500);
            } catch (ex) {
                setTimeout(() => rej(ex.toString()), 1500);
            } finally {
                if (console.defaultLog) {
                    console.log = console.defaultLog.bind(console);
                    delete console['defaultLog'];
                }

                delete console['logs'];
            }
        });
    }
}

function Log(item) {
    console.log(item);
}

export default new CodeMirrorEditor();
