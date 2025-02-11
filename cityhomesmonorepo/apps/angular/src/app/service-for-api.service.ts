import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceForAPIService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // User Services
  registerUser(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'is_admin': localStorage.getItem('authentication-token') ?? '',
    });
    return this.http.post(`${this.apiUrl}/register`, data, { headers });
  }

  editUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, data);
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${userId}`);
  }

  viewUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/read`);
  }

  viewUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/each_user/${id}`);
  }

  signIn(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/sign-in`, userData);
  }
  // Profile service.
  profileData(){
    const CustomHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'username' : localStorage.getItem('user-name') ?? '',
    });

    return this.http.get(`${this.apiUrl}/get-profile-data`, {
      headers: CustomHeader
    });
  }

  publicView(){
    const CustomHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'username' : localStorage.getItem('publicViewName') ?? '',
    });

    localStorage.removeItem('publicViewName')

    return this.http.get(`${this.apiUrl}/get-profile-data`, { 
      headers: CustomHeader 
    });
  }


  // Location Services
  viewLocation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/see-location`);
  }

  viewEachLocation(id: number){
    return this.http.get(`${this.apiUrl}/see-location/${id}`)
  }

  editLocation(id: number, data: any): Observable<any>{

    const Customheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'is_admin': localStorage.getItem('authentication-token') ?? '',
    });

    return this.http.put(`${this.apiUrl}/edit-location/${id}`, data, { headers: Customheaders })
  }

  createLocation(data: any): Observable<any>{
    const Customheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'is_admin': localStorage.getItem('authentication-token') ?? '',
    });

    return this.http.post(`${this.apiUrl}/add-location`, data, { headers: Customheaders })
  }

  deleteLocation(id: number): Observable<any>{
    const customHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'is_admin': localStorage.getItem('authentication-token') ?? '',
    });

    return this.http.delete(`${this.apiUrl}/delete-location/${id}`, { headers: customHeaders })
  }

  // Unit Services
  getUnit(){
    return this.http.get(`${this.apiUrl}/see-units`);
  }

  getSingleUnit(unitId: number): void | any{
    return this.http.get(`${this.apiUrl}/see-unit/${unitId}`);
  }

  createUnit(unitData: any){
    const unitHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'username': localStorage.getItem('user-name') ?? '',
      'authentication_token': localStorage.getItem('authentication-token') ?? '',
    })

    return this.http.post(`${this.apiUrl}/add-unit`, unitData, { headers: unitHeader })
  }

  editUnit(data: any, id: number | any){
    let unitId ={
      UnitId: localStorage.getItem('unitId') ?? ''
    }
    return this.http.put(`${this.apiUrl}/edit-unit/${id}`, data, { headers: unitId })
  }

  deleteUnit(unitID: number){
    return this.http.delete(`${this.apiUrl}/delete-unit/${unitID}`)
  }
  // Image Routes
  addImage(ImageData: any){
    let username = localStorage.getItem('username') ?? '';

    return this.http.post(`${this.apiUrl}/add-image`, ImageData)
  }

  getImageData(){
    return this.http.get(`${this.apiUrl}/see-images`)
  }

  // Amenity Routes
  editAmenityService(amenityId: number | any, data: any): void| any {

    let amenityHeader = {
      unitId: localStorage.getItem('amenityId') ?? ''
    }

    localStorage.removeItem('amenityId');

    return this.http.put(`${this.apiUrl}/edit-amenity/${amenityId}`, { headers: amenityHeader })

  }

  // Contact Services
  customUnitQuery(userData: any): void | any{
    return this.http.post(`${this.apiUrl}/add-query`, userData);
  }

  getQueryData(){
    return this.http.get(`${this.apiUrl}/view-queries`)
  }

  deleteUserQuery(queryId: number): any{
    return this.http.delete(`${this.apiUrl}/remove-query/${queryId}`)
  }

  // Contact Information

  sendContactInformation(data: any): any{
    return this.http.post(`${this.apiUrl}/add-contact-information`, data)
  }

  getContactInformation(){
    return this.http.get(`${this.apiUrl}/see-contact-information`)
  }

  deleteContactInformation(id: number | any): void | any{
    return this.http.delete(`${this.apiUrl}/delete-contact-information/${id}`)
  }

}
