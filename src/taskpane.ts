import { reset } from "./lib/buttons/reset";
import { twiddle } from "./lib/buttons/twiddle";
import { run } from "./lib/buttons/run";
import { getTwiddles } from "./lib/twiddle/getTwiddle";

Office.onReady((info) => {
    // note: onReady is called multiple times
    console.log("Word Twiddle Ready!");
    if (info.host === Office.HostType.Word) {
        initialize();
    }
});

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

const idMap: { [id: string]: () => Promise<void> } = {
    run,
    reset,
    twiddle,
};

function populateTwiddles() {
    const twiddles = getTwiddles();

    const element: HTMLSelectElement = document.getElementById(
        "twiddles"
    ) as HTMLSelectElement;
    // clear the inner HTML so that this is not called twice

    element.innerHTML = "";

    twiddles.forEach((twiddle) => {
        const optionName = twiddle.name;
        console.log(`option name ${optionName}`);
        const option = document.createElement("option") as HTMLOptionElement;
        option.appendChild(document.createTextNode(optionName));
        element.appendChild(option);
    });
}
