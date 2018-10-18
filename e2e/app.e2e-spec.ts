import { AppPage } from './app.po';
import {browser, protractor} from 'protractor';
import {AuthPage} from './auth.po';

describe('client-protractor App', () => {
  let page: AppPage;
  let authPage: AuthPage;

  beforeEach(() => {
    page = new AppPage();
    authPage = new AuthPage();
  });

  it('should display heading ClientProtractor', () => {
    page.navigateTo();
    expect(page.getFirstAppareilName()).toEqual('Appareil : Machine à laver -- Statut : éteint');
  });

  it('should have 3 appareils', () => {
    // page.navigateTo();
    const appareils = page.getAppareils();
    expect(appareils.count()).toBe(3);
  });

  it('button "Tout allumer" should be disabled', () => {
    // page.navigateTo();
    const button = page.getButtonToutAllumer();
    expect(button.getAttribute('disabled')).toBeFalsy();
  });

  it('should change the name', () => {
    // page.navigateTo();
    page.emptyFirstInput();
    expect(page.getFirstAppareilName()).toEqual('Appareil : -- Statut : éteint');
    page.getFirstInput().sendKeys('lave linge');
    expect(page.getFirstAppareilName()).toEqual('Appareil : lave linge -- Statut : éteint');
  });

  it('should have a "red" div', () => {
    // page.navigateTo();
    expect(page.getDivOfFirstAppareil()).toBeTruthy();
  });

  it('should not have a "red" div', () => {
    // page.navigateTo();
    expect(page.getDivOfSecondAppareil()).toBeFalsy();
  });

  it('all appareils should be on', () => {
    // page.navigateTo();
    const button = page.getButtonToutAllumer();
    button.click();
    page.getAppareils().then( (app) => {
      for (const appareil of app) {
        expect(appareil.getCssValue('color')).toBe('rgba(0, 128, 0, 1)');
      }
    });
  });

  it('all appareils should be off', () => {
    // page.navigateTo();
    const button = page.getButtonToutEteindre();
    button.click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.alertIsPresent(), 5000);

    // const alertDialog = browser.switchTo().alert();
    // alertDialog.accept();
    browser.switchTo().alert().then( // <- this fixes the problem
      function (alert) {
        alert.accept();
      },
      function (error) {
      }
    );
    // page.selectEnterKey();
    page.getAppareils().then( (app) => {
      for (const appareil of app) {
        expect(appareil.getCssValue('color')).toBe('rgba(255, 0, 0, 1)');
      }
    });
  });

  it('should be switch the first appareil', () => {
    page.navigateTo();
    const button = page.getFirstAppareilButton();
    expect(button.getText()).toEqual('Allumer');
    button.click();
    expect(button.getText()).toEqual('Eteindre');
  });

  it('should go to authentification page', () => {
    page.getAuthLink().click()
      expect(authPage.getAuthTitle().getText()).toBeTruthy();
  });

  it('should authentifiate the user', () => {
    page.navigateTo();
    page.getAuthLink().click();
    expect(authPage.getAuthButton().getText()).toEqual('Se connecter');
    authPage.getAuthButton().click();
    expect(page.getFirstAppareilName()).toBeTruthy();
    page.getAuthLink().click();
    expect(authPage.getAuthButton().getText()).toEqual('Se déconnecter');
    authPage.getAuthButton().click();
    expect(authPage.getAuthButton().getText()).toEqual('Se connecter');
  });

});
