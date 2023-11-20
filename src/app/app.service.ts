import { Injectable } from '@angular/core';

interface SharedObject {
  [id: string]: any;
}

@Injectable()
export class AppState {
  constructor(){}
  shared: SharedObject = {};

  get state() {
    return this.shared = this._clone(this.shared);
  }

  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    return this.shared[prop] = value;
  }

  public setValue(id: string, value: string | undefined | null) {
    if (value) {
      sessionStorage.setItem(id, value);
    } else {
      sessionStorage.removeItem(id);
    }
  }

  public getValue(id: string) : string | null {
    return sessionStorage.getItem(id);
  }

  private _clone(object: SharedObject) {
    return JSON.parse(JSON.stringify( object ));
  }

  public setSharedObj(id: string, obj: any){
    this.shared[id] = obj;
    let newObj = obj;
    if(typeof obj == "object")
      newObj = JSON.stringify(obj);
    sessionStorage.setItem(id, newObj);
  }

  public getSharedObj(id: string){
    if (this.shared[id]) {
      return this.shared[id];
    } else if(sessionStorage.getItem(id)){
      let data: any = sessionStorage.getItem(id);
      this.shared[id] = data;
      return JSON.parse(data);
    } else {
      return JSON.parse('{}');
    }
  }

  public deleteSharedObj(id: string) {
    if (this.shared[id]) {
      delete this.shared[id];
    }
    if(sessionStorage.getItem(id)) {
      sessionStorage.removeItem(id);
    }
    
  }
  
  get applicationIdentifier(): string | null {
    return this.getValue('applicationIdentifier') ?? null;
  }

  set applicationIdentifier(value: string | null) {
    this.setValue('applicationIdentifier', value);
  }

  get partyIdentifier(): string | null {
    return this.getValue('partyIdentifier') ?? null;
  }

  set partyIdentifier(value: string | null) {
    this.setValue('partyIdentifier', value);
  }
}
