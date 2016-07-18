export class Image {
    name: string;
    url: string;
    thumbUrl: string;
    rawUrl: string;
    isFolder: boolean;

    constructor(name: string, url: string, isFolder: boolean) {
        this.name = name;
        if (isFolder) {
            this.url = url;
        } else {
            this.rawUrl = url;
            this.url = 'url(' + url + ')';
            this.thumbUrl = 'url(/thumbnails/' + url + ')';
        }
        this.isFolder = isFolder;
    }
}