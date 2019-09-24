import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../graphql.service';
import { IUser } from '../model/user.interface';
import { RangeData } from '../model/group.interface';

@Component({
  selector: 'app-view-graphql',
  templateUrl: './view-graphql.component.html',
  styleUrls: ['./view-graphql.component.scss']
})
export class ViewGraphqlComponent implements OnInit {
  users: IUser[] = []
  selectedUsers: any[] = []
  begin
  end
  displayedColumns: string[] = ['UserId', 'Username', 'InferredActivities', 'InputActivities'];
  dataRange: any[] = []
  selectedDate: any;
  constructor(private graphqlService: GraphqlService) { 

  }

  ngOnInit() {
    this.getGroups();
  }

  // getGroups() {
    
  //     this.graphqlService.getGroups().subscribe(result => {
  //       this.arrGroup = result.data as IGroup[];
  //       console.log(this.arrGroup); 
  //     })
  // }

  getGroups = () => {
    this.graphqlService.getGroups()
      .subscribe((data) => {
        this.users = data
      })
  }

  handleSelection() {
    // this.begin = "2019-09-02";
    // this.end = "2019-09-04T23:59:59"
    // this.begin = 1567357200000;
    // this.end = 1567530000000;
    let today = new Date()
    if (!this.begin) {
      this.begin = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0).getTime()
      this.end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0).getTime() 
    }
    console.log(this.selectedUsers)
    console.log(this.begin)
    console.log(this.end)
    this.getDataRange()
  
  }

  // kiểu như ngày chọn là ngày 3/9/2019 thì begin là 3/9/2019 lúc 0h 0p 0s, còn end là ngày 4/9/2019 lúc 0h 0p 0s

  displayInferredActivities(inferredActivities = []) {
    return inferredActivities.map(({name}) => name).join(',')
  }

  // onChange(event) {
  //   let checked = event.checked
  //   let value = event.source.value
  //   let existingUser = this.selectedUsers.find(({id}) => Number(value) === Number(id))
  //   if (!existingUser && checked) {
  //     let user = this.users.find(({id}) => Number(value) === Number(id))
  //     this.selectedUsers.push(user)
  //   } else if (existingUser && !checked) {
  //     this.selectedUsers = this.selectedUsers.filter(({id}) => Number(id) !== Number(value))
  //   }
  // }
  onSelect(event){
      this.selectedDate = event;
      this.begin = new Date(this.selectedDate).getTime();
      this.end = new Date(this.selectedDate).getTime() + 86400000;
      console.log(this.selectedUsers)
      console.log(this.begin)
      console.log(this.end)
      this.graphqlService.getRanges(this.selectedUsers.map(({id}) => Number(id)), this.begin, this.end)
      .subscribe((rs) => {
        this.dataRange = rs
      })
  }

  getDataRange() {
    this.graphqlService.getRanges(this.selectedUsers.map(({id}) => Number(id)), this.begin, this.end)
      .subscribe((rs) => {
        this.dataRange = rs
      })
  }

  
}
