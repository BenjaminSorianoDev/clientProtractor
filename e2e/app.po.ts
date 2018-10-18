import { browser, by, element, Key } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getFirstAppareilName() {
    return element(by.css('app-appareil li h4')).getText();
  }

  getDivOfFirstAppareil() {
    return element(by.css('app-appareil li')).element(by.css('div'));
  }

  getDivOfSecondAppareil() {
    this.getAppareils().then( (items) => {
      return items[1].element(by.css('div'));
    });
  }

  getAppareils() {
    return element.all(by.css('app-appareil li h4'));
  }

  getButtonToutAllumer() {
    return element(by.buttonText('Tout allumer'));
  }

  getButtonToutEteindre() {
    return element(by.buttonText('Tout éteindre'));
  }

  getFirstInput() {
    return element(by.css('app-appareil li input'));
  }

  emptyFirstInput() {
    const firstInput = this.getFirstInput();
    for (let i = 0; i < 30; i++) {
      firstInput.sendKeys(Key.BACK_SPACE);
    }
  }

  getFirstAppareilButton() {
    return element(by.css('app-appareil li')).element(by.css('button'));
  }

  getAuthLink() {
    return element(by.cssContainingText('a.nav-link', 'Authentification'));
  }

}
