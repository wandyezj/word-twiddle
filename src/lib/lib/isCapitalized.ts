import { isLowerCase } from "./isLowerCase";
import { isUpperCase } from "./isUpperCase";

export function isCapitalized(word: string): boolean {
    return (
        word &&
        ((word.length === 1 && isUpperCase(word[0])) ||
            (word.length > 1 && isUpperCase(word[0]) && isLowerCase(word[1])))
    );
}
