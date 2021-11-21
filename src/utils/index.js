import { v4 as uuidv4 } from "uuid";
import eventBus from "@/utils/eventBus.js";
const gifshot = window.gifshot;


export default {
    createUUID() {
        return uuidv4()
    },
    createGif(option) {
        eventBus.emit("translating")
        return new Promise((resolve, reject) => {
            gifshot.createGIF(option, res => {
                eventBus.emit("translated")
                res.error ? reject(res.errMsg) : resolve(res)
            });
        })
    },
    downloadGIF(base64) {
        var blob = new Blob([""], {
            type: "application/octet-stream"
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = base64;
        a.download = `img2Gif${new Date().getTime()}`;
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent(
            "click",
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null
        );
        a.dispatchEvent(e);
        URL.revokeObjectURL(url);
    }
}