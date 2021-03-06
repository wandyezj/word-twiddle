import { isUpperCase } from "@wandyezj/standard-node";
import { isCapitalized } from "@wandyezj/standard-node";
import { capitalize } from "@wandyezj/standard-node";

export async function executeRuleWordReplace(fromTo: [string, string][]) {
    await Word.run(async (context) => {
        const sections = context.document.sections;
        sections.load("body");

        context.document.body.paragraphs.load("text");

        await context.sync();

        for (let paragraph of context.document.body.paragraphs.items) {
            const text = paragraph.text;

            //console.log(text);
            const replaced = correctText(text, fromTo);
            paragraph.insertText(replaced, Word.InsertLocation.replace);
        }
    });
}

/**
 * return the word or the corrected word
 */
function correctWord(word: string, map: [string, string][]) {
    // should remove punctuation

    // should preserve capitalization and all caps
    const lookupWord = word.toLowerCase();

    const matching = map.find((value) => value[0] === lookupWord);

    if (matching) {
        // look up the correct word
        const correctWord = matching[1];

        // handle casing
        if (isUpperCase(word)) {
            return correctWord.toUpperCase();
        }

        if (isCapitalized(word)) {
            return capitalize(correctWord);
        }

        return correctWord;
    }

    return word;
}

const compositonRegex = /([a-z]|')/i;

function isCompositionLetter(letter: string): boolean {
    const isCompositionLetter: boolean =
        letter.length === 1 && compositonRegex.test(letter);

    return isCompositionLetter;
}

function correctText(text: string, formTo: [string, string][]) {
    // look through words while preserving spacing (preserving spacing will be tricky)

    // make sure to match case of original word

    let trace = "";
    let word = "";
    for (let c of text) {
        if (isCompositionLetter(c)) {
            word += c;
        } else {
            trace += correctWord(word, formTo) + c;
            word = "";
        }
    }
    // if there is a word at the end still correct it.
    trace += correctWord(word, formTo);

    return trace;

    // or should feed words one at a time
    // individual words break down if it maps to a compound word
    // should trail along snipping spaces and punctuation . ! ?() and reinserting words as appropriate
    //const words = text.split(" ");
    //const correctedWords = words.map((word) => correctWord(word, genderMap));

    //return correctedWords.join(" ");
}
