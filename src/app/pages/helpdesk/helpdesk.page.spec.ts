import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpdeskPage } from './helpdesk.page';

describe('HelpdeskPage', () => {
  let component: HelpdeskPage;
  let fixture: ComponentFixture<HelpdeskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpdeskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
