import { executeRule } from "../twiddle/executeRule";
import { UI } from "../UI";
import { getTwiddleByName } from "../twiddle/getTwiddleByName";

export async function twiddle() {

    const selected = UI.selectedTwiddle;
    const currentTwiddle = getTwiddleByName(selected);

    for (let rule of currentTwiddle.rules) {
        await executeRule(rule);
    }
}
