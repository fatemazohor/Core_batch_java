import { Component, OnInit } from '@angular/core';
import { StudentModel } from './student.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  dataModel:StudentModel = new StudentModel()
  formValue!: FormGroup
  studata:any

  constructor(private stuService:StudentService , private formBuild:FormBuilder){}
  ngOnInit(): void {
    this.formValue= this.formBuild.group({
      name:[''],
      department:[''],
      marks:['']
    })
    this.getAllStudent()
  }

  setData(){
    this.dataModel.name=this.formValue.value.name
    this.dataModel.department=this.formValue.value.department
    this.dataModel.marks=this.formValue.value.marks
  }
  saveStudent(){
    this.setData()

    this.stuService.saveStu(this.dataModel)
    .subscribe({
      next:res => {
        console.log(res)
        alert('Data Saved')
        this.formValue.reset()
        this.getAllStudent()
      },
      error: err => {
        console.log(err)
        alert('Data not Saved')
      }
      
    })
  }

  getAllStudent(){
    this.stuService.getAllStu()
    .subscribe(res => {this.studata = res})
  }

  deleteStudent(tech:any){
    this.stuService.deleteStu(tech.id)
    .subscribe({
      next:res => {
        console.log(res)
        alert('Data deleted')
        this.formValue.reset()
        this.getAllStudent()
      },
      error: err => {
        console.log(err)
        alert('Data not deleted')
      }
      
    })
  }

  onEdit(tech:any){
    this.dataModel.id = tech.id
    this.formValue.controls['name'].setValue(tech.name)
    this.formValue.controls['department'].setValue(tech.department)
    this.formValue.controls['marks'].setValue(tech.marks)
  }

  updateStudent(){
    this.setData()

    this.stuService.updateStu(this.dataModel.id, this.dataModel)
    .subscribe({
      next:res => {
        console.log(res)
        alert('Data Updated')
        this.formValue.reset()
        this.getAllStudent()
      },
      error: err => {
        console.log(err)
        alert('Data not Updated')
      }
      
    })
  }

}
