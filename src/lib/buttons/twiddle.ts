import * as selectTwiddle from "../../data/twiddles/uwu.twiddle.json";
import { Twiddle, Rule } from "../twiddle/twiddleJson";
import { executeRule } from "../twiddle/executeRule";

const currentTwiddle: Twiddle = selectTwiddle as Twiddle;

export async function twiddle() {
    for (let rule of currentTwiddle.rules) {
        await executeRule(rule);
    }
}
