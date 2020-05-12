import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElectronicComponentsPage } from './electronic-components.page';

describe('ElectronicComponentsPage', () => {
  let component: ElectronicComponentsPage;
  let fixture: ComponentFixture<ElectronicComponentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicComponentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElectronicComponentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
