 export type UserType = {
    id?: number | undefined;
    login?: string | undefined;
    avatar_url?: string | undefined ;
    html_url?: string | undefined;
    type?: string | undefined;
  }
 
 export class User {
    id?: number | undefined;
    name?: string | undefined;
    avatar_url?: string;
    url?: string;
    type?: string
 }


 export const toUsers = (items: UserType[]) => {
   return items.map((x:UserType) => {
     return toUser(x)
   });
 }
 
 export const toUser = (item: UserType) => {
   const user = new(User)
 
   user.id = item.id
   user.url = item.html_url
   user.name = item.login
   user.type = item.type
   user.avatar_url = item.avatar_url
 
   return user
 }