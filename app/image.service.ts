import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Image } from './image';
@Injectable()
export class ImageService {
    currentPath = "";

    constructor(private http: Http) { }

    setCurrentPath(path: string) {
        this.currentPath = path;
    }

    getImages(): Promise<Image[]> {
        if (this.currentPath === '/') {
            var images: Image[] = [
                { name: 'fotos', url: '/fotos', thumbUrl: '', rawUrl: '', isFolder: true },
                { name: 'NUESTRAS FOTOS', url: '/NUESTRAS%20FOTOS', thumbUrl: '', rawUrl: '', isFolder: true}
            ]
            return Promise.resolve(images);
        } else {
            console.log('getImages', this.currentPath);
            return this.http.get(this.currentPath)
                .toPromise()
                .then(response => this.handleResponse(response))
                .catch(this.handleError);
        }
    }

    private handleResponse(response: Response): Promise<Image[]> {
        var images: Image[] = [];

        var data = response.text();
        //console.log('handleResponse', data)
        var lines = data.split('\n');
        var regex = /href="(.*)">(.*)<\/a>/;

        for (var line of lines) {
            var match = regex.exec(line);
            if (match && match.length > 2) {
                var name = match[1];
                var desc = match[2];
                if (name[name.length - 1] === '/') {
                    //console.log('DIR');
                    name = name.slice(0, name.length - 1);
                    desc = desc.slice(0, desc.length - 1);
                    images.push(new Image(desc, this.currentPath + '/' + name, true));
                } else if (name.toLowerCase().indexOf('.jpeg') != -1) {
                    //console.log('JPEG');
                    images.push(new Image(desc, this.currentPath + '/' + name, false));
                } else if (name.toLowerCase().indexOf('.jpg') != -1) {
                    //console.log('JPEG');
                    images.push(new Image(desc, this.currentPath + '/' + name, false));
                } else {
                    //console.log('Unknown file');
                }
                //console.log(match[1]);
            }
        }

        return Promise.resolve(images)
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        var images: Image[] = [];
        return Promise.resolve(images);
    }
}