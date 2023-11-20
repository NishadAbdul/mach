import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HttpLoaderService {
    public isLoading = new BehaviorSubject<boolean>(false);
    private busyRequestCount: number = 0;
    constructor() { }

    public busy() {
        this.busyRequestCount++;
        this.isLoading.next(true);
    }

    public idle() {
        this.busyRequestCount--;
        if (this.busyRequestCount <= 0) {
            this.busyRequestCount = 0;
            this.isLoading.next(false);
        }
    }
}