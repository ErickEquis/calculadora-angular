import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'calculadora' title`, () => {
    expect(app.title).toEqual('calculadora');
  });

  // it('should render router-outlet', () => {
  //   fixture = TestBed.createComponent(AppComponent);
  //   expect(compiled.querySelector('router-outlet')?.textContent).not.toBeNull;
  // });

  it('should render router-outlet wrapper with css classes', () => {
    const divElement = compiled.querySelector('div');

    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ')

    const divClasses = divElement?.classList.value.split(' ')

    expect(divElement).not.toBeNull;

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className)
    })

  })

});
