export class Parking {
    constructor(
        public name: string,
        public address: string,
        public accesibility: boolean,
        public latitude: number,
        public longitude: number,
        public places: number,
        public score: number
    ) { }
}