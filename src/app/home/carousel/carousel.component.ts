import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselImage } from 'src/app/models/carousel-image.model';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images: CarouselImage[] = [];

  constructor(private config: NgbCarouselConfig,
    private carouselService: CarouselService) { }

  ngOnInit(): void {
    // this.images = this.carouselService.getImages();
    this.carouselService.getImagesFromDatabase().subscribe((firebaseImages)=>{
      this.images = firebaseImages;
    });
    this.carouselService.carouselSettings = JSON.parse(localStorage.getItem("settings") as string) || [];
    this.config.interval = this.carouselService.carouselSettings.interval;
    this.config.wrap = this.carouselService.carouselSettings.wrap;
    this.config.keyboard = this.carouselService.carouselSettings.keyboard;
    this.config.pauseOnHover = this.carouselService.carouselSettings.pauseOnHover;
    if (this.images.length == 1) {
      this.config.showNavigationArrows = false;
      this.config.showNavigationIndicators = false;
    }
  }

}