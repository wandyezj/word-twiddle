export interface Twiddle {
    name: string;
    rules: Rule[];
}

export interface Rule {
    description?: string;
    replaceWords?: RuleReplaceWords;
    highlightWords?: RuleHighlightWords;
}

export type RuleReplaceWords = FromTo[];

export interface FromTo {
    from: string;
    to: string;
}

export type RuleHighlightWords = Highlight[];

export interface Highlight {
    word: string;
    color: string;
}
