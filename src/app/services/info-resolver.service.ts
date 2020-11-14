import { Injectable } from '@angular/core';
import {InfoService} from './info.service';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InfoResolverService implements Resolve<any>{

  constructor(private infoService: InfoService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.infoService.getData(id);
  }
}
