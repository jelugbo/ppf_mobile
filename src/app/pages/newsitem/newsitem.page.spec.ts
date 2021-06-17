import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsitemPage } from './newsitem.page';

describe('NewsitemPage', () => {
  let component: NewsitemPage;
  let fixture: ComponentFixture<NewsitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsitemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
