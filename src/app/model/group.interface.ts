import { IUser } from './user.interface';

export type IGroup = {
    'id': number;
    'name': string;
    'user': IUser[];
}

export type Query = {
    groups: IGroup[];
    rangeData: RangeData[];
}
export type RangeData = {
    userId: number
    userName: string
    inferredActivities: [InferredActivity]
    inputActivities: [InputActivity]
}
export type InferredActivity = {
    id: number
    name: String
    begin: Date
    end: Date
    confidence: number
    result: String
}
type InputActivity = {
    id: number
    name: String
    begin: Date
    end: Date
    comment: String
}