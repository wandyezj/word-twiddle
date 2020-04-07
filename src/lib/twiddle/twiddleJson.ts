export interface Twiddle {
    name: string;
    rules: Rule[];
}

export interface Rule {
    description?: string;
    replaceWords?: [string, string][];
    highlightWords?: [string, string][];
    replace?: [string, string][];
    highlight?: [string, string][];
}
