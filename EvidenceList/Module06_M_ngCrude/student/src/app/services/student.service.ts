import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baserUrl:string='http://localhost:3000/posts/'
  constructor(private http:HttpClient) { }

  saveStu(data:any){
    return this.http.post<any>(this.baserUrl, data)
    .pipe(map(res => {return res}))
  }
  getAllStu(){
    return this.http.get<any>(this.baserUrl)
    .pipe(map(res => {return res}))
  }
  deleteStu(id:number){
    return this.http.delete<any>(this.baserUrl + id)
    .pipe(map(res => {return res}))
  }
  updateStu(id:number , data:any){
    return this.http.put<any>(this.baserUrl+id, data)
    .pipe(map(res => {return res}))
  }
}
