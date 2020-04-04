export function capitalize(word: string): string {
    if (!word || word.length === 0) {
        return word;
    }

    if (word.length === 1) {
        return word.toUpperCase();
    }

    return word.substring(0, 1).toUpperCase() + word.substring(1);
}
