export class ColorImage {
    color: string;
    images: Array<String>;
    priority: number;

    constructor(body) {
        this.color = body.color;
        this.images = body.images;
        this.priority = body.priority;
    }
 
}