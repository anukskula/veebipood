import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarouselImage } from '../models/carousel-image.model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private images = [
    {
      url: "https://picsum.photos/id/700/900/500",
      header: "Osta elevant ära",
      description: "Hästi palju elevante müügiks",
      alt: "Random 1 slide"
    },    {
      url: "https://picsum.photos/id/100/900/500",
      header: "Osta lõvi ära",
      description: "Hästi palju lõvisid müügiks",
      alt: "Random 2 slide"
    },    {
      url: "https://picsum.photos/id/200/900/500",
      header: "Osta hiir ära",
      description: "Hästi palju hiiri müügiks",
      alt: "Random 3 slide"
    },    {
      url: "https://picsum.photos/id/500/900/500",
      header: "Osta KÕIK ära",
      description: "Hästi palju asju müügiks",
      alt: "Random 4 slide"
    }]

    carouselSettings = {
      interval: 5000,
      wrap: true,
      keyboard: true,
      pauseOnHover: true
    }

    // interval = 5000;
    // wrap = true;
    // keyboard = true;
    // pauseOnHover = true;

    private firebaseUrl = "https://webshop-69e2e-default-rtdb.europe-west1.firebasedatabase.app/images.json";

  constructor(private http: HttpClient) { }

   saveImagesToDatabase() {
     return this.http.put(this.firebaseUrl, this.images);
   }

   getImagesFromDatabase() {
     return this.http.get<CarouselImage[]>(this.firebaseUrl);
   }

   saveToServiceFromDatabase(imagesFromDatabase: CarouselImage[]) {
      this.images = imagesFromDatabase;
   }

  getImages(): { url: string, header: string, description: string, alt: string }[] {
      return this.images.slice();
    }

  addImage(image: CarouselImage) {
    this.images.push(image);
  }

  deleteImage(image: CarouselImage) {
    let index = this.images.indexOf(image);
    this.images.splice(index, 1);
  }

  editImage(index: number, image: CarouselImage) {
    this.images[index] = image;
  }

}
