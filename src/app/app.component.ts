import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('content') contentTemplate: TemplateRef<any>;

  selected = false;

  constructor(public viewContainerRef: ViewContainerRef) {}
}
