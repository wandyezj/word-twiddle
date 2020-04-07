import { Twiddle } from "./twiddleJson";
import * as neutralize from "../../data/twiddles/neutralize.twiddle.json";
import * as uwu from "../../data/twiddles/uwu.twiddle.json";

export function getTwiddles(): Twiddle[] {
    return [
        neutralize as Twiddle,
        uwu as Twiddle,
    ]
}