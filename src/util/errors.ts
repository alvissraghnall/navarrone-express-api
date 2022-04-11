
export class NoTokenFoundError extends Error {
    constructor() {
        super("No JWT token found in request");
    }
}

export class ServerError extends Error {
    constructor () {
        super("Something went wrong from our end, however, we promise to fix it soon.");
    }
}

export class IllegalPictureFormatError extends Error {
    constructor() {
        super("Only .jpg, .png && .jpeg file formats are accepted!");
    }
}