class UserInterface {

    get twiddleOptions(): HTMLSelectElement {
        return document.getElementById(
            "twiddles"
        ) as HTMLSelectElement;
    }

    get selectedTwiddle(): string {
        return this.twiddleOptions.value;
    }
}

export const UI = new UserInterface()
