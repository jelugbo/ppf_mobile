import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelfaresPage } from './welfares.page';

describe('WelfaresPage', () => {
  let component: WelfaresPage;
  let fixture: ComponentFixture<WelfaresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelfaresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelfaresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
