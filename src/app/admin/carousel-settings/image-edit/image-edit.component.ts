import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarouselImage } from 'src/app/models/carousel-image.model';


@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {
  @Input() carouselImage!: CarouselImage;
  editImageForm!: FormGroup;
  @Output() imageChangedEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.editImageForm = new FormGroup({
      url: new FormControl(this.carouselImage.url),
      header: new FormControl(this.carouselImage.header),
      description: new FormControl(this.carouselImage.description),
      alt: new FormControl(this.carouselImage.alt)
    });
  }

  onSubmit() {
    this.imageChangedEvent.emit(this.editImageForm.value);
  }

}
