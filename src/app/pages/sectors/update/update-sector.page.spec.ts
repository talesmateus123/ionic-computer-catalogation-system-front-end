import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateSectorPage } from './update-sector.page';

describe('UpdateSectorPage', () => {
  let component: UpdateSectorPage;
  let fixture: ComponentFixture<UpdateSectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateSectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
