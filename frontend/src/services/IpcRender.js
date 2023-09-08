class FakeIpc {
    constructor() {
        this.editors = [
            {
                name: 'VSCODE',
                status: 'ON',
                current: true,
            },
            {
                name: 'DEFAULT',
                status: 'ON',
                current: false,
            },
        ];

        this.changeEditorCallback = () => { };
    }

    send(channel, editor) {
        console.warn('IPC not defined (this is an electron application!)');
        if (channel === 'Config:changeEditor') {
            this.changeEditor(editor);
        }
    }

    removeAllListeners(channel) {
        console.warn('IPC not defined (this is an electron application!)');
    }

    changeEditor(editor) {
        editor = editor || 'VSCODE';
        this.editors = this.editors.map((item) => ({ ...item, current: false })).map((item) => ({ ...item, current: item.name === editor }));

        this.changeEditorCallback(this.editors);
    }

    on(channel, cb) {
        console.warn('IPC not defined (this is an electron application!)');
        if (channel === 'Config:onChangeEditorState') {
            this.changeEditorCallback = cb;
        }
    }
}

let _ipcRenderer = new FakeIpc();

if (window.ipcRenderer) {
    _ipcRenderer = window.ipcRenderer;
}

export default _ipcRenderer;
export { _ipcRenderer as ipcRenderer };
