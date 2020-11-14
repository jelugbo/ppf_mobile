import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpdeskmodalPage } from './helpdeskmodal.page';

describe('HelpdeskmodalPage', () => {
  let component: HelpdeskmodalPage;
  let fixture: ComponentFixture<HelpdeskmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpdeskmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
