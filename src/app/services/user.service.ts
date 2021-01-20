import { Injectable } from '@angular/core';
import { Endpoints } from './../config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = Endpoints; // fetch all endpoints
  constructor(private api:ApiService){ }

  fetchAssessments()
  {
    return this.api.get(this.endpoint.userassessments)
  }
  fetchAssessmentGraph(id)
  {
    return this.api.get(this.endpoint.userassessmentGraph+'?id='+id)
  }
}
