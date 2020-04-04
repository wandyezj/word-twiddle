import * as Neutralize from "../../data/neutralize.twiddle.json";
import { Twiddle, Rule } from "../twiddle/twiddleJson";
import { executeRule } from "../twiddle/executeRule";

const currentTwiddle: Twiddle = Neutralize as Twiddle;

export async function twiddle() {
    for (let rule of currentTwiddle.rules) {
        await executeRule(rule);
    }
}
