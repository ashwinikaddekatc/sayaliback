import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiRequestService } from '../api/api-request.service';
import{environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { sftp } from 'src/app/models/fnd/sftp';

@Injectable({
  providedIn: 'root'
})
export class SftplocationService {

  sftpUrl = environment.sureConnecturl;

  constructor(private apiRequest: ApiRequestService,private http: HttpClient) { }

  getAllSftpData(): Observable<sftp[]> {
    return this.http.get<sftp[]>(`${this.sftpUrl}/sureconnect/sftp/sftpdata/sftpdata`);
  }

  getSftpDataById(id: number): Observable<sftp> {
    return this.http.get<sftp>(`${this.sftpUrl}/sureconnect/sftp/sftpdata/sftpdata/${id}`);
  }

  saveSftpData(sftpData: sftp): Observable<sftp> {
    return this.http.post<sftp>(`${this.sftpUrl}/sureconnect/sftp/sftpdata/sftpdata`, sftpData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.sftpUrl}/sureconnect/sftp/sftpdata/sftpdata/${id}`);
  }

  updateSftpData(id: number, data: any): Observable<any> {
    return this.http.put(`${this.sftpUrl}/sureconnect/sftp/sftpdata/sftpdata/${id}`, data);
  }

}
