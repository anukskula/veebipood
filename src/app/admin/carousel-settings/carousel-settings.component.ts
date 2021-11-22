import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { CarouselImage } from 'src/app/models/carousel-image.model';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-carousel-settings',
  templateUrl: './carousel-settings.component.html',
  styleUrls: ['./carousel-settings.component.css']
})
export class CarouselSettingsComponent implements OnInit {
  carouselImages: CarouselImage[] = [];
  carouselConfigForm!: FormGroup;

  constructor(private carouselService: CarouselService) { }

  ngOnInit(): void {
    // this.carouselImages = this.carouselService.getImages();
    this.carouselService.getImagesFromDatabase().subscribe((firebaseImages)=>{
      this.carouselImages = firebaseImages;
    });
    this.carouselService.carouselSettings = JSON.parse(localStorage.getItem("settings") as string) || [];
    this.carouselConfigForm = new FormGroup({
      interval: new FormControl(this.carouselService.carouselSettings.interval),
      wrap: new FormControl(this.carouselService.carouselSettings.wrap),
      keyboard: new FormControl(this.carouselService.carouselSettings.keyboard),
      pauseOnHover: new FormControl(this.carouselService.carouselSettings.pauseOnHover)
    });
  }

  onSubmitConfig() {
    this.carouselService.carouselSettings.interval = this.carouselConfigForm.value.interval;
    this.carouselService.carouselSettings.wrap = this.carouselConfigForm.value.wrap;
    this.carouselService.carouselSettings.keyboard = this.carouselConfigForm.value.keyboard;
    this.carouselService.carouselSettings.pauseOnHover = this.carouselConfigForm.value.pauseOnHover;
    localStorage.setItem("settings", JSON.stringify(this.carouselService.carouselSettings));
  }

  onSubmitImage(form: NgForm) {
    this.carouselService.addImage(form.value);
    form.reset();
    this.carouselImages = this.carouselService.getImages();
  }

  imageChanged(index: number, image: CarouselImage) {
    image.isEditState = false;
    this.carouselService.editImage(index, image);
    this.carouselImages = this.carouselService.getImages();
  }

  onDeleteImage(image: CarouselImage) {
    this.carouselService.deleteImage(image);
      this.carouselImages = this.carouselService.getImages();
  }

  onChangeImage(image: CarouselImage) {
    image.isEditState = !image.isEditState;
  }

   onSendImagesToDatabase() {
     this.carouselService.saveImagesToDatabase().subscribe(()=> {
       alert("Andmebaasi lisatud!");
     });
   }

}
