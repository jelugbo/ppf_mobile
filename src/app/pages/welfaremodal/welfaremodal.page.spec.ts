import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelfaremodalPage } from './welfaremodal.page';

describe('WelfaremodalPage', () => {
  let component: WelfaremodalPage;
  let fixture: ComponentFixture<WelfaremodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelfaremodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelfaremodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
