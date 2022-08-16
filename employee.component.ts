import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute ,Params} from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  list:any=[];

  public userForm:FormGroup;  
  a:number=0;
  lastdummyId:any=0;
  id:number=0;
  visitor_name:string="";
  organization_name:string="";
  purpose:string="";
  cnic:string="";
  contact_no:string="";
  checkin_time:Date=new Date();
  checkout_time:Date=new Date();
  gender:string="";
  employee_id:number=0;
  employee_number:number=0;
  group_id:number=0;
  status2:string='';
  name:string='';
  status:string='';

  constructor(private fb:FormBuilder,private service:SharedService,private route: ActivatedRoute) { 
    this.userForm=this.fb.group({
      id:'',
      visitor_name:"",
      organization_name:"",
      purpose:"",
      cnic:"",
      contact_no:"",
      checkout_time:'',
      checkin_time:'',
      gender:"",
      employee_id:0,
      name:'',
      group_id:0,
      status:'',
      status2:'',
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe((param : Params) => {
      this.id = param['id'];
  });
  this.EmpList(this.id);
  this.FetchGroupId();
  }

  EmpList(id:number){
    this.service.getEmpListId(id).subscribe(data=>{
      this.list=[data];
      // console.log(this.list)
    });
  }
  FetchGroupId(){
    this.service.getSortAscVisListByGroup().subscribe(data=>{
      // this.dummylist=data;
      this.lastdummyId = data[data.length-1];
      // this.id=this.lastempId.id;
    })
  }
  editForm(){
    this.id=this.userForm.get("id")?.value;
    this.visitor_name=this.userForm.get("visitor_name")?.value;
    this.organization_name= this.userForm.get("organization_name")?.value;
    this.purpose = this.userForm.get("purpose")?.value;
    this.cnic = this.userForm.get("cnic")?.value;
    this.contact_no =this.userForm.get("contact_no")?.value;
    this.checkin_time = this.userForm.get("checkin_time")?.value;
    this.checkout_time = this.userForm.get("checkout_time")?.value;
    this.gender = this.userForm.get("gender")?.value;
    this.employee_id=this.userForm.get("employee_id")?.value;
    this.status = this.userForm.get("status")?.value;
    this.status2 = this.userForm.get("status2")?.value;
    this.group_id = this.userForm.get("group_id")?.value;
    var val={id:this.id,visitor_name:this.visitor_name,
      organization_name:this.organization_name,
      purpose:this.purpose,
      cnic:this.cnic,
      checkin_time:this.checkin_time,
      checkout_time:this.checkout_time,
      contact_no:this.contact_no,gender:this.gender,
      status:this.status,
      employee_id:this.employee_id,
      group_id:this.group_id,
      status2:this.status2};
      console.log(val);
      this.service.editVisitorfromId(this.id,val).subscribe(res=>{
      alert(res.toString());
    });
  }
}
