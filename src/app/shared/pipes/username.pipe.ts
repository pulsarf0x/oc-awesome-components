import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username',
  standalone: true
})
export class UsernamePipe implements PipeTransform {

  transform(value: { firstname: string, lastname: string }, locale: 'en' | 'fr' = 'en'): string {
    return locale === 'fr' ? `${value.lastname.toUpperCase()} ${value.firstname}` : `${value.firstname} ${value.lastname.toUpperCase()}`
  }

}
