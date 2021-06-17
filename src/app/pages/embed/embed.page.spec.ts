import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmbedPage } from './embed.page';

describe('EmbedPage', () => {
  let component: EmbedPage;
  let fixture: ComponentFixture<EmbedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmbedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
