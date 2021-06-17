import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpdesksPage } from './helpdesks.page';

describe('HelpdesksPage', () => {
  let component: HelpdesksPage;
  let fixture: ComponentFixture<HelpdesksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdesksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpdesksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
