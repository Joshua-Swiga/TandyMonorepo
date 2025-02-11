import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipeName'
})
export class CustomPipeNamePipe implements PipeTransform {

  transform(units: any[], criteria: string): any[] {
    if (!units) return [];  // No units, return an empty array
    if (!criteria) return units;  // No search criteria, return all units

    criteria = criteria.toLowerCase();  // Convert criteria to lowercase for case-insensitive comparison

    return units.filter(unit => {
      // Check if any of the unit's properties match the criteria
      return (
        (unit.title && unit.title.toLowerCase().includes(criteria)) ||
        (unit.subtitle && unit.subtitle.toLowerCase().includes(criteria)) ||
        (unit.category && unit.category.toLowerCase().includes(criteria)) ||
        (unit.accomodation_information && unit.accomodation_information.toLowerCase().includes(criteria)) ||
        (unit.price_information && unit.price_information.toLowerCase().includes(criteria)) ||
        (unit.userThatUploaded && unit.userThatUploaded.toLowerCase().includes(criteria)) ||
        (unit.location && unit.location.toLowerCase().includes(criteria))
      );
    });
  }
}
