import { Highlight } from "./twiddleJson";

export async function executeRuleWordHighlight(highlights: Highlight[]) {
    const wordToColor = new Map<string, string>(
        highlights.map((highlight) => [
            highlight.word.toLowerCase(),
            highlight.color,
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
        console.log(text);
        const color = wordToColor.get(text);
        if (color) {
            range.font.highlightColor = color;
        }
    });

    await ranges.context.sync();
}
