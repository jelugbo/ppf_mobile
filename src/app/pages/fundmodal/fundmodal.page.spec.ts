import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundmodalPage } from './fundmodal.page';

describe('FundmodalPage', () => {
  let component: FundmodalPage;
  let fixture: ComponentFixture<FundmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
