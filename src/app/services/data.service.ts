import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SearchResult} from './SearchResult';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public defLink = 'https://rccgamericas.app/api/v1/';
  public defLink1 = 'http://9f466f01c406.ngrok.io/api/v1/';
  constructor(public http: HttpClient) {
    console.log('Hello Data Provider');
  }

  fetchData(path: string, urlParam: string, restricted?: boolean){
    const authHeader = new HttpHeaders();
    const searchParams =  (urlParam.indexOf('=') > 0)  ?  new HttpParams({fromString: urlParam}) : new HttpParams();
    console.log(searchParams);
    path = (path.indexOf('://') > -1) ? path : this.defLink + path ; // + localStorage.getItem("ParishId");
    if (restricted) { authHeader.append('Authorization', 'Bearer ' + localStorage.getItem('LoginId')); }
    const itemList = this.http.get<SearchResult>(path, {params: searchParams, headers: authHeader}).pipe(map(
        response => response
    ));
    console.log(itemList);
    return itemList;
  }

  getData(path: string, urlParam: string, restricted?: boolean){
    const authHeader = new HttpHeaders();
    const searchParams =  (urlParam.indexOf('=') > 0)  ?  new HttpParams({fromString: urlParam}) : new HttpParams();
    // console.log(searchParams);
    path = (path.indexOf('://') > -1) ? path : this.defLink + path;
    // console.log(path);
    if (restricted) { authHeader.append('Authorization', 'Bearer ' + localStorage.getItem('LoginId')); }
    return this.http.get(path, {params: searchParams, headers: authHeader}).pipe(map(response => response));
  }

  fetchJsonp(path: string){
    path = (path.indexOf('://') > -1) ? path : this.defLink + path + localStorage.getItem('ParishId');
    // console.log(path);
    // console.log(itemList);
    return this.http.jsonp(path, 'callback').pipe(map(response => response));
  }

  loadJSON(path: string){
    // console.log(itemList);
    return this.http.get(path).pipe((response => response));
  }

  fetchUserData(path: string, urlParam: string, restricted?: boolean, profiled?: boolean){
    const authHeader = new HttpHeaders();
    const searchParams =  (urlParam.indexOf('=') > 0)  ?  new HttpParams({fromString: urlParam}) : new HttpParams();
    // console.log(searchParams);
    path = (path.indexOf('://') > -1) ? path : this.defLink + path ; // + localStorage.getItem("ProfileId");
    path = profiled ? path + localStorage.getItem('ProfileId') : path;
    console.log(path);
    if (restricted) { authHeader.append('Authorization', 'Bearer ' + localStorage.getItem('LoginId')); }
    const itemList = this.http.get(path, {params: searchParams, headers: authHeader}).pipe((response => response));
    console.log(itemList);
    return itemList;
  }

  sendData(path: string, data: any, restricted?: boolean){
    const authHeader = new HttpHeaders();
    path = (path.indexOf('://') > -1) ? path : this.defLink + path;
    if (restricted) { authHeader.append('Authorization', 'Bearer ' + localStorage.getItem('LoginId')); }
    return this.http.post<SearchResult>(path, data, {headers: authHeader}).pipe(map(response => response));
  }

  putData(path: string, data: any, restricted?: boolean){
    const authHeader = new HttpHeaders();
    path = (path.indexOf('://') > -1) ? path : this.defLink + path;
    if (restricted) { authHeader.append('Authorization', 'Bearer ' + localStorage.getItem('LoginId')); }
    const  item = this.http.put<SearchResult>(path, data, {headers: authHeader}).pipe(map(response => response));
    return item;
  }

  removeData(path: string, urlParam: string, restricted?: boolean){
    const authHeader = new HttpHeaders();
    const bodyParams =  (this.isJSON(urlParam))  ?  new HttpParams({fromString: urlParam}) : new HttpParams();
    // console.log(bodyParams);
    path = (path.indexOf('://') > -1) ? path : this.defLink + path;
    if (restricted) { authHeader.append('Authorization', 'Bearer ' + localStorage.getItem('LoginId')); }
    // console.log(itemList);
    return this.http.delete(path, {params: bodyParams, headers: authHeader}).pipe(map(response => response));
  }

  isJSON(str){
    try{ JSON.parse(str); }catch (e){ return false; }
    return true;
  }
}
