import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundinfoPage } from './fundinfo.page';

describe('FundinfoPage', () => {
  let component: FundinfoPage;
  let fixture: ComponentFixture<FundinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
