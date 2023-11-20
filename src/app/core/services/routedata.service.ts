import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class RouteDataService {
    public progressMeterIndex = new BehaviorSubject<number>(0);
    constructor() { }

    public setIndex(count: number) {
        this.progressMeterIndex.next(count);
    }
}