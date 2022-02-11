import { Directive, HostBinding, HostListener } from '@angular/core'
@Directive({
  selector: '[gpDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.is--open') isOpen = false
  @HostBinding('class.dropdown') dropdown = true
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen
  }
}
