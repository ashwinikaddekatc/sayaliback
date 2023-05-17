import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from 'src/environments/environment';
import { ApiRequestService } from '../api/api-request.service';
import { HealthCheckup } from 'src/app/models/fnd/health_checkup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckupService {

  baseUrl = 'HealthCheckup'
  constructor(private _http: HttpClient,
    private apiRequest: ApiRequestService) { }

  getHealthCheckups(): Observable<HealthCheckup[]> {
    return this.apiRequest.get(`${this.baseUrl}/HealthCheckup`);
  }

  getHealthCheckupById(id: number): Observable<HealthCheckup> {
    return this.apiRequest.get(`${this.baseUrl}/HealthCheckup/${id}`);
  }

  saveHealthCheckup(data: HealthCheckup): Observable<HealthCheckup> {
    return this.apiRequest.post(`${this.baseUrl}/HealthCheckup`, data);
  }

  updateHealthCheckup(id: number, data: HealthCheckup): Observable<HealthCheckup> {
    return this.apiRequest.put(`${this.baseUrl}/HealthCheckup/${id}`, data);
  }

  deleteHealthCheckup(id: number): Observable<any> {
    return this.apiRequest.delete(`${this.baseUrl}/HealthCheckup/${id}`);
  }

  // getHealthCheck(): Observable<any> {
  //   return this.apiRequest.get(`${this.baseUrl}/healthcheck`);
  // }
  getHealthCheckup(jobtype: string): Observable<any> {
    const url = `${this.baseUrl}/healthcheckup?jobtype=${jobtype}`;
    return this.apiRequest.get(url);
  }
}
