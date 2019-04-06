export class Hotel{
	constructor(
		public _id: string,
		public id: string,
		public name: string,
		public stars: number,
		public price: number,
		public image: string,
		public amenities: Array<string>,

	){}
}