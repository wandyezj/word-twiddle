import { reset } from "./lib/buttons/reset";
import { twiddle } from "./lib/buttons/twiddle";
import { run } from "./lib/buttons/run";
import { populateTwiddles } from "./lib/populateTwiddles";

Office.onReady((info) => {
    // note: onReady is called multiple times
    console.log("Word Twiddle Ready!");
    if (info.host === Office.HostType.Word) {
        initialize();
    }
});

const idMap: { [id: string]: () => Promise<void> } = {
    //run,
    reset,
    "button-twiddle": twiddle,
};

function initialize() {
    console.log("initialize");
    populateTwiddles();
    for (let id of Object.getOwnPropertyNames(idMap)) {
        document.getElementById(id).onclick = async () => {
            console.log(id);
            await idMap[id]();
        };
    }
}
