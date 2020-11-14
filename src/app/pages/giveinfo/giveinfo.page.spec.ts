import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiveinfoPage } from './giveinfo.page';

describe('GiveinfoPage', () => {
  let component: GiveinfoPage;
  let fixture: ComponentFixture<GiveinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiveinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
