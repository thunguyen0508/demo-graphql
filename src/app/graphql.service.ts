import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import gql from 'graphql-tag';
import { IUser } from './model/user.interface';
import { IGroup, Query, RangeData } from './model/group.interface';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo, httpLink: HttpLink) { 
    apollo.create({
      link: httpLink.create({ uri: "http://localhost:4000/graphql"}),
      cache: new InMemoryCache()
    })
  }

  public getGroups = (): Observable<IUser[]> => {
    return this.apollo.watchQuery<Query>({
      query: gql`query getGroups{
      groups{
        id,
        name,
        user{
          id,
          name
        }
      }
    }`
    })
      .valueChanges
      .pipe(
        map(result => {
          // move phần xử lý, convert data qua service --> trả về kq là ds User thay vì lúc trước là trả về Group
          // rồi qua compponent mới xử lý để trả về ds User
          let users: IUser[] = []
          result.data.groups.map(({user}) => {
            let userIds = users.map(({id}) => id)
            user = user.filter(({id}) => !userIds.includes(id))
            users = users.concat(user)
          })
          return users
        })
      );
  }
  public getRanges = (ids: Number[] = [], begin?: Number, end?: Number): Observable<RangeData[]> => {
    // let query = begin ? `, begin : "${begin}"` : ''
    // query += end ? `, end: "${end}"` : ''
    let query = begin ? `, begin : ${begin}` : ''
    query += end ? `, end: ${end}` : ''
    return this.apollo.watchQuery<Query>({
       query: gql`query getRanges{
        rangeData(userId: [${ids}] ${query}) {
          userId
          userName
          inferredActivities {
            id
            name
            begin
            end
            confidence
            result
          }
          inputActivities {
            id
            name
            begin
            end
            comment
          }
        }
     }`
     })
       .valueChanges
       .pipe(
         map(result => {
          let dataRange: RangeData[] = []
          dataRange = result.data.rangeData.filter(({inferredActivities, inputActivities}) => (inferredActivities && inferredActivities.length > 0) || (inputActivities && inputActivities.length > 0))
          return dataRange
         })
       )
   }
}
