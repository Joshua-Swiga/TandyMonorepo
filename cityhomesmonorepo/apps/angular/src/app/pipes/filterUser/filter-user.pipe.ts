import { Pipe, PipeTransform } from '@angular/core';

// For Filterfing users based on their name
@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(user: any[], criteria: string | any): any | unknown {
    if (!user) return [];
    if (!criteria) return user;

    criteria = criteria.toLowerCase();

    return user.filter(user => {
      return (
        (user.name && user.name.toLowerCase().includes(criteria))
      )
    })
    
  }

}
