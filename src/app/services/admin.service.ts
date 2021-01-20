import { Injectable } from '@angular/core';
import { Endpoints } from './../config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  endpoint = Endpoints; // fetch all endpoints
  constructor(private api:ApiService){ }

  fetchUserList()
  {
    return this.api.get(this.endpoint.users)
  }
}
