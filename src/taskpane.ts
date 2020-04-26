import { reset } from "./lib/buttons/reset";
import { twiddle } from "./lib/buttons/twiddle";
import { getTwiddles } from "./lib/twiddle/getTwiddle";

Office.onReady((info) => {
    console.log("Word Twiddle Ready!");
    if (info.host === Office.HostType.Word) {
        populateTwiddles();
        for (let id of Object.getOwnPropertyNames(idMap)) {
            document.getElementById(id).onclick = async () => {
                console.log(id);
                await idMap[id]();
            };
        }
    }
});



const idMap: { [id: string]: () => Promise<void> } = {
    run,
    reset,
    twiddle,
};

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

function populateTwiddles() {
    const twiddles = getTwiddles();

    const element: HTMLSelectElement = document.getElementById("twiddles") as HTMLSelectElement;

    twiddles.forEach((twiddle) => {
        const optionName = twiddle.name;
        console.log(`option name ${optionName}`);
        const option = document.createElement('option') as HTMLOptionElement;
        option.appendChild(document.createTextNode(optionName));
        element.appendChild(option);
    
    });




}