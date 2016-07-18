import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from './image';
import { ImageService }         from './image.service';

@Component({
    selector: 'my-gallery',
    templateUrl: 'app/gallery.component.html',
    providers: [ImageService]
})

export class GalleryComponent {
    private currentPath: string = '';
    images: Image[];
    allImages: Image[];
    currentImage: number = 0;
    totalImages: number = 0;
    imageBatch: number = 40;
    loading: boolean = false;
    selectedImageUrl: string = "";
    selectedImage: boolean = false;

    constructor(private router: Router, private imageService: ImageService) { }

    getImages() {
        this.imageService
            .getImages()
            .then(images => this.handleGetImages(images))
            .catch(this.handleError)
    }

    handleError(error: any) {
        this.loading = false;
    }

    handleGetImages(images: Image[]) {
        if (images.length == 0) {
            alert('error opening folder');
        } else if (images.length <= this.imageBatch) {
            this.images = images;
        } else {
            this.allImages = images;
            this.currentImage = this.imageBatch;
            this.totalImages = images.length;
            this.images = images.slice(0, this.imageBatch);
        }

        this.loading = false;
    }

    ngOnInit() {
        console.log(this.router.url);
        this.totalImages = 0;
        this.navigateToFolder('/', '/');
    }

    onImageClick(imageUrl: string) {
        console.log("image clicked");
        this.selectedImageUrl = imageUrl;
        this.selectedImage = true;
    }

    onFolderClick(folderUrl: string, folderName: string) {
        console.log('nagivate', folderUrl, folderName);
        this.loading = true;
        this.navigateToFolder(folderUrl, folderName);
        document.body.scrollTop = 0;
    }

    navigateToFolder(folderUrl: string, folderName: string) {
        console.log('navigateToFolder', folderName);
        if (folderName == '..') {
            var items = this.currentPath.split('/');
            items = items.slice(0, items.length - 1);
            this.currentPath = items.join('/');
            if (this.currentPath == '') {
                this.currentPath = '/';
            }
        } else {
            this.currentPath = folderUrl;
        }

        this.imageService.setCurrentPath(this.currentPath);
        this.getImages();
    }

    onScroll(event) {
        if (document.body.scrollHeight ==
            document.body.scrollTop +
            window.innerHeight) {
            if (this.totalImages != 0) {
                var lastImage = this.currentImage + this.imageBatch;
                if (lastImage > this.totalImages) {
                    lastImage = this.totalImages;
                    this.totalImages = 0;
                }

                this.images = this.images.concat(this.allImages.slice(this.currentImage, lastImage));
                this.currentImage = lastImage;
            }
        }
    }
}
