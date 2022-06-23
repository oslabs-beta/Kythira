import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    loginReq: function () {
        ipcRenderer.send('')
    }
})