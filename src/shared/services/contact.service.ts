import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { ContactInformationModel } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = environments.apiUrl;

  getContactInformation(): Observable<ContactInformationModel[]> {
    return this.http.get<ContactInformationModel[]>(`${this.apiUrl}/contactinfos`);
  }

  addNewContactInformation(
    contactInfo: ContactInformationModel,
  ): Observable<ContactInformationModel> {
    return this.http.post<ContactInformationModel>(`${this.apiUrl}/contactinfos`, contactInfo);
  }
}
