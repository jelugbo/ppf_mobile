import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialsPage } from './socials.page';

describe('SocialsPage', () => {
  let component: SocialsPage;
  let fixture: ComponentFixture<SocialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
