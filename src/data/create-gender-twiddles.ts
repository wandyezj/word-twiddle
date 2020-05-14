// Create individual twiddles from the gender map
import * as path from "path";
import {
    readFileJson,
    writeFileJson,
    //writeFileJson
} from "@wandyezj/standard-node";
import { Twiddle } from "../lib/twiddle/twiddleJson";

console.log(__filename);
const genderedWordsFile = path.join(__dirname, "gendered-words.json");

const outputDirectory = path.join(__dirname, "twiddles");

type GenderedWords = {
    masculine: string;
    feminine: string;
    neutral: string;
}[];

console.log("Full Text");
const wordsDictionary: GenderedWords = readFileJson(genderedWordsFile);
//console.log(JSON.stringify(words));

const mappings = [
    {
        name: "neutralize",
        from: ["masculine", "feminine"],
        to: "neutral",
        color: "aquamarine",
    },
    {
        name: "masculinize",
        from: ["neutral", "feminine"],
        to: "masculine",
        color: "cyan",
    },
    {
        name: "feminize",
        from: ["neutral", "masculine"],
        to: "feminine",
        color: "pink",
    },
];

interface WordMap {
    name: string;
    color: string;
    wordMap: [string, string][];
    words: string[];
}

const wordMap = mappings.map((mapping) => {
    const name = mapping.name;
    const color = mapping.color;
    console.log(`${name}`);

    const wordMap = wordsDictionary
        .map((word) => {
            const froms: string[] = mapping.from.map((from) => {
                return word[from];
            });
            const to: string = word[mapping.to];

            const both: [string, string][] = froms.map((from) => {
                return [from, to];
            });
            return both;
        })
        .reduce((previous: [string, string][], current: [string, string][]) => {
            previous.push(...current);
            return previous;
        }, []);

    const words: string[] = wordsDictionary.map((word) => word[mapping.to]);

    return {
        name,
        color,
        wordMap,
        words,
    };
});

const genderWordMap = path.join(__dirname, "gendered-word-map.json");
//writeFileJson(genderWordMap, wordMap);

function createTwiddle(map: WordMap): Twiddle {
    const name = map.name;
    const replaceWords = map.wordMap;
    const color = map.color;
    const highlightWords: [string, string][] = map.words.map((word) => [
        word,
        color,
    ]);

    return {
        name,
        rules: [
            {
                replaceWords,
            },
            {
                highlightWords,
            },
        ],
    };
}

wordMap.forEach((map) => {
    const twiddle = createTwiddle(map);
    const outputFile = path.join(outputDirectory, `${map.name}.twiddle.json`);
    writeFileJson(outputFile, twiddle);
});

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
