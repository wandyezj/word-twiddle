import * as TestParagraphs from "../../data/testParagraphs.json";
const paragraphs = TestParagraphs.map((test) => test.paragraph);

export async function reset() {
    await Word.run(async (context) => {
        const body = context.document.body;

        // clear out the body
        body.clear();
        await context.sync();

        paragraphs.forEach((paragraph) => {
            context.document.body.insertParagraph(
                paragraph,
                Word.InsertLocation.end
            );
        });

        // reset styling
        context.document.body.font.highlightColor = undefined;

        await context.sync();
    });
}
