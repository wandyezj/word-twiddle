import { getTwiddles } from "./twiddle/getTwiddles";
import { UI } from "./UI";

export function populateTwiddles() {
    const twiddles = getTwiddles();

    // clear the inner HTML so that this is set to a constant state
    UI.twiddleOptions.innerHTML = "";

    twiddles.forEach((twiddle) => {
        const optionName = twiddle.name;
        console.log(`option name ${optionName}`);
        const option = document.createElement("option") as HTMLOptionElement;
        option.appendChild(document.createTextNode(optionName));
        UI.twiddleOptions.appendChild(option);
    });
}