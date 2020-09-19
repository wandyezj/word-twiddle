import { timeStamp } from "console";
import { punctuation } from "@wandyezj/standard-node";

export async function executeRuleWordHighlight(highlights: [string, string][]) {
    const wordToColor = new Map<string, string>(
        highlights.map((highlight) => [
            highlight[0].toLowerCase(),
            highlight[1],
        ])
    );

    await Word.run(async (context) => {
        const sections = context.document.sections;
        sections.load("body");
        await context.sync();
        context.document.load("body/paragraphs/items");
        await context.sync();
        for (let paragraph of context.document.body.paragraphs.items) {
            const ranges = paragraph.getTextRanges([" "], true);
            // getTextRanges doesn't work quite right(at least on the web
            // it does not break on multiple objects
            // Really want an API that can simply highlight specific chains of letters.
            await highlightWords(wordToColor, ranges);
        }
    });
}

async function highlightWords(
    wordToColor: Map<string, string>,
    ranges: Word.RangeCollection
) {
    ranges.load("items/text");
    await ranges.context.sync();

    ranges.items.forEach((range) => {
        const text = range.text.toLowerCase();
        // console.log(text);
        const color = wordToColor.get(text);
        if (color) {
            range.font.highlightColor = color;
        } else {
            // // Handle edge case where there is punctuation attached
            // Highlighting gets messed up when swaping between the two..
            // let textWithoutPunctuation = text;
            // const punctuation = [".", ",", ";", "!"];
            // const end = text[text.length -1];
            // console.log(end)
            // if (text.length > 0 && punctuation.includes(end)) {
            //     textWithoutPunctuation = text.slice(0, text.length - 1);
            // }
            // // console.log(textWithoutPunctuation);
            // const color = wordToColor.get(textWithoutPunctuation);
            // if (color) {
            //     range.font.highlightColor = color;
            // }
        }
    });

    await ranges.context.sync();
}
