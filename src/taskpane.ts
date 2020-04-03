Office.onReady(info => {
  console.log("Word Twiddle Ready!")
    if (info.host === Office.HostType.Word) {
      document.getElementById("run").onclick = run;
    }
  });
  
  export async function run() {
    console.log("Run!");
    return Word.run(async context => {
      /**a
       * Insert your Word code here
       */
  
      // insert a paragraph at the end of the document.
      const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.start);
  
      // change the paragraph color to blue.
      paragraph.font.color = "blue";
  
      await context.sync();
    });
  }