import { getTwiddles } from "./getTwiddles";
import { Twiddle } from "./twiddleJson";

export function getTwiddleByName(name: string): Twiddle | undefined {
    const twiddles = getTwiddles();
    const matches = twiddles.filter((twiddle) => twiddle.name === name);
    if (matches.length === 1) {
        return matches[0];
    }
    return undefined;
}
