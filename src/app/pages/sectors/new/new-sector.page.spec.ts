import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSectorPage } from './new-sector.page';

describe('NewSectorPage', () => {
  let component: NewSectorPage;
  let fixture: ComponentFixture<NewSectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
