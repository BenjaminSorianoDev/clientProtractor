import { browser, by, element, Key } from 'protractor';

export class AuthPage {

  navigateTo() {
    return browser.get('/auth');
  }

  getAuthTitle() {
    return element(by.cssContainingText('h2', 'Authentification'));
  }

  getAuthButton() {
    return element(by.css('button'));
  }

}
