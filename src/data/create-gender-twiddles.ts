// Create individual twiddles from the gender map
import * as path from 'path'
import {readFileJson, writeFileJson, 
    //writeFileJson
} from "@wandyezj/standard-node";
import {Twiddle} from "../lib/twiddle/twiddleJson"

console.log(__filename)
const genderedWordsFile = path.join(__dirname, "gendered-words.json");

type GenderedWords = {
    masculine: string;
    feminine: string;
    neutral: string;
}[];

console.log("Full Text");
const words: GenderedWords = readFileJson(genderedWordsFile);
//console.log(JSON.stringify(words));

const mappings = [
    {
        name: "neutralize",
        from: ["masculine", "feminine"],
        to: "neutral"
    },
    {
        name:"masculinize",
        from: ["neutral", "feminine"],
        to: "masculine"
    },
    {
        name: "feminize",
        from: ["neutral", "masculine"],
        to: "feminine"
    },
];

interface WordMap {
    name: string,
    wordMap: [string, string][]
}


const wordMap = mappings.map((mapping) => {

    const name = mapping.name;
    console.log(`${name}`);

    const wordMap = words.map((word) => {
        const froms: string[] = mapping.from.map((from) => {
            return word[from];
        })
        const to: string = word[mapping.to];

        const both: [string, string][] = froms.map((from) => {
            return [from, to]
        });
        return both;
    }).reduce((previous: [string, string][], current: [string, string][]) => {
        previous.push(...current);
        return previous;
    },[]);

    return  {
        name,
        wordMap,
    }
});

const genderWordMap = path.join(__dirname, "gendered-word-map.json");

//function createTwiddle(map: {name})

// {
//     "name": "Neutralize",
//     "rules": [
//         {
//             "replaceWords": [
//                 ["he", "they"],
//                 ["she", "they"]
//             ]
//         },
//         {
//             "highlightWords": [["they", "yellow"]]
//         }
//     ]
// }


writeFileJson(genderWordMap, wordMap);


