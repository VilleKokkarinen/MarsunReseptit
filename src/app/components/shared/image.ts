export class Image {
    id:string = "";
    publisher: string = "";
    data: Blob = new Blob;
    url:string = "";
}

export class ImageEOL {
    id: string = "";
    eol:Date = new Date;
    url:string = "";
}