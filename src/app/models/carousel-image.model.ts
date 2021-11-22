export class CarouselImage {
    constructor(
        public url: string,
        public header: string,
        public description: string,
        public alt: string,
        public isEditState?: boolean
    ) {}
}