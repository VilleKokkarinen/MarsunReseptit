export class Image {
    id: string = "";
    publisher:string = "";
    eol:Date = new Date;
    data: Blob = new Blob;
    url?:string
}