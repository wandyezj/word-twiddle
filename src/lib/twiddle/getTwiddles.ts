import { Twiddle } from "./twiddleJson";
import * as neutralize from "../../data/twiddles/neutralize.twiddle.json";
import * as feminize from "../../data/twiddles/feminize.twiddle.json";
import * as masculinize from "../../data/twiddles/masculinize.twiddle.json";
import * as uwu from "../../data/twiddles/uwu.twiddle.json";

export function getTwiddles(): Twiddle[] {
    return [
        neutralize as Twiddle,
        feminize as Twiddle,
        masculinize as Twiddle,
        //uwu as Twiddle,
    ];
}
