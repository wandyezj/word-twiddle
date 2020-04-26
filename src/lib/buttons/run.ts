export async function run() {
    await Word.run(async (context) => {
        /**a
         * Insert your Word code here
         */

        // insert a paragraph at the end of the document.
        const paragraph = context.document.body.insertParagraph(
            "Hello World",
            Word.InsertLocation.start
        );

        // change the paragraph color to blue.
        paragraph.font.color = "blue";

        await context.sync();
    });
}
