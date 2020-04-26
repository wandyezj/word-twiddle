export async function executeRuleReplace(fromTo: [string, string][]) {
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

// Case Sensitive
function correctText(text: string, fromTo: [string, string][]): string {
    let final = text;
    fromTo.forEach((value) => {
        const regex = new RegExp(`${value[0]}`, "g"); // TODO: needs escapeRegularExpression
        console.log(regex);
        final = final.replace(regex, value[1]);
    });

    return final;
}
