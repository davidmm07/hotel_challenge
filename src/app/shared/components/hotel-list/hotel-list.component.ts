import { Component, OnInit , ViewChild} from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service';
import { Hotel } from '../../models/hotel';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject,} from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime , finalize} from 'rxjs/operators';


@Component({
	selector: 'app-hotel-list',
	templateUrl: './hotel-list.component.html',
	styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {

	@ViewChild(CdkVirtualScrollViewport) 
	viewport: CdkVirtualScrollViewport;
	public batchSize = 10;
	public isLoading :boolean;
	public alertMessage:any;
	public hotels: Hotel;
	public hotel:any;
	public endBatch = false;
	offset = new BehaviorSubject(null);
	infinite: Observable<any[]>;

	

	constructor(
		private hotelService : HotelService
		) {
		const batchMap = this.offset.pipe(
			throttleTime(500),
			mergeMap(n=>this.getBatch(n)),
			scan((acc,batch)=>{
				return { ...acc, ...batch};
			},{})
		);
		this.infinite = batchMap.pipe(map(v => Object.values(v)));


	}

	ngOnInit() {
		this.isLoading = true;
		//this.getAllHotels()
		//this.getBatch('0');
	}
	//Ejecuta el evento al hacer el scroll
	nextBatch(e:Event, offset:any){
		console.log('nextBatch',offset);
		if (this.endBatch) {
			return;
		}
		const end = this.viewport.getRenderedRange().end;
		const total = this.viewport.getDataLength();
		console.log(`${end}, '>=', ${total}`);
		if (end === total) {
			this.offset.next(offset);
		}
	}

	trackByIdx(i:any){
		return i;
	}
	//Obtiene listado de hoteles por lotes de datos
	getBatch(offset: string){
		 console.log(offset);
		let params = '?limit='+this.batchSize+'&skip='+offset;
		return this.hotelService.get('hotel/'+params)
		.pipe(
			tap(arr => (arr.hotels.length ? null : (this.endBatch = true))),
				map(arr => {
					return arr.hotels.reduce((acc:any, cur:any) => {
						const id = cur._id;
						const data = cur;
						return { ...acc, [id]: data };
					}, {});
				}),
				finalize(() => {
					this.isLoading = false;
				})
				
			);
	}

	getAllHotels(){
		this.hotelService.get('hotel').subscribe(
			response =>{
				this.hotels = response.hotels;
				console.log(this.hotels);
			},error =>{
				if (error != null) {
					this.alertMessage = error.error.message;          
				}				
			});
	}

	arrayOne(n: number): any[] {
		return Array(n);
	}

}
