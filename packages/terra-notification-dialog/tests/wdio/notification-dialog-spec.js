const selector = '#root';
const NOTIFICATION_DIALOG_SELECTOR = '[data-terra-notification-dialog]';
const ACCEPT_ACTION_SELECTOR = '[data-terra-notification-dialog-button="accept"]';
const REJECT_ACTION_SELECTOR = '[data-terra-notification-dialog-button="reject"]';

const openNotificationDialog = (buttonSelector = '#trigger-notification-dialog') => {
  $(buttonSelector).waitForExist();
  $(buttonSelector).click();
};

Terra.describeViewports('Notification Dialog', ['tiny', 'medium', 'large'], () => {
  describe('Variants', () => {
    it('shows notification dialog with hazard-high variant', () => {
      browser.url('#/raw/tests/cerner-terra-framework-docs/notification-dialog/hazard-high-variant');
      openNotificationDialog();
      Terra.validates.element('hazard-high', { selector });
    });

    it('shows notification dialog with hazard-medium variant', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/hazard-medium-variant');
      openNotificationDialog();
      Terra.validates.element('hazard-medium', { selector });
    });

    it('shows notification dialog with hazard-low variant', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/hazard-low-variant');
      openNotificationDialog();
      Terra.validates.element('hazard-low', { selector });
    });

    it('shows notification dialog with error variant', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/error-variant');
      openNotificationDialog();
      Terra.validates.element('error', { selector });
    });

    it('shows notification dialog with custom variant', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/custom-variant');
      openNotificationDialog();
      Terra.validates.element('custom', { selector });
    });
  });

  describe('Actions', () => {
    it('goes to test page', () => {
      browser.url('#/raw/tests/cerner-terra-framework-docs/notification-dialog/action-combinations');
    });

    it('shows notification dialog with only accept action', () => {
      openNotificationDialog('#accept');
      Terra.validates.element('only accept action', { selector });
    });

    it('closed dialog with accept action', () => {
      $(ACCEPT_ACTION_SELECTOR).click();
    });

    it('shows notification dialog with only reject action', () => {
      openNotificationDialog('#reject');
      Terra.validates.element('only reject action', { selector });
    });

    it('closed dialog with reject action', () => {
      $(REJECT_ACTION_SELECTOR).click();
    });

    it('shows notification dialog with accept and reject action', () => {
      openNotificationDialog('#acceptAndReject');
      Terra.validates.element('accept and reject action', { selector });
    });

    it('closed dialog with reject action', () => {
      $(REJECT_ACTION_SELECTOR).click();
    });

    it('shows notification dialog with accept action first', () => {
      openNotificationDialog('#acceptFirst');
      Terra.validates.element('accept action first', { selector });
    });

    it('closed dialog with reject action', () => {
      $(REJECT_ACTION_SELECTOR).click();
    });

    it('shows notification dialog with reject action first', () => {
      openNotificationDialog('#rejectFirst');
      Terra.validates.element('reject action first', { selector });
    });

    it('closed dialog with reject action', () => {
      $(REJECT_ACTION_SELECTOR).click();
    });

    it('shows notification dialog with accept action emphasized', () => {
      openNotificationDialog('#acceptEmphasized');
      Terra.validates.element('accept action emphasized', { selector });
    });

    it('closed dialog with reject action', () => {
      $(REJECT_ACTION_SELECTOR).click();
    });

    it('shows notification dialog with reject action emphasized', () => {
      openNotificationDialog('#rejectEmphasized');
      Terra.validates.element('reject action emphasized', { selector });
    });

    it('closed dialog with reject action', () => {
      $(REJECT_ACTION_SELECTOR).click();
    });

    it('shows notification dialog with neither action emphasized', () => {
      openNotificationDialog('#neitherEmphasized');
      Terra.validates.element('neither action emphasized', { selector });
    });

    it('closed dialog with reject action', () => {
      $(REJECT_ACTION_SELECTOR).click();
    });
  });

  describe('Layouts', () => {
    it('shows notification dialog without a title', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/notification-dialog-with-no-title');
      openNotificationDialog();
      Terra.validates.element('no title', { selector });
    });

    it('shows notification dialog without a message', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/notification-dialog-with-no-message');
      openNotificationDialog();
      Terra.validates.element('no message', { selector });
    });

    it('shows notification dialog with a long message', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/notification-dialog-with-long-message');
      openNotificationDialog();
      Terra.validates.element('long message', { selector });
    });

    it('shows notification dialog with a details message', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/notification-dialog-with-detailed-message');
      openNotificationDialog();
      Terra.validates.element('detailed message', { selector });
    });

    it('shows a custom unpopulated notification dialog', () => {
      browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/unpopulated-custom-variant');
      openNotificationDialog();
      Terra.validates.element('unpopulated custom variant', { selector });
    });
  });

  it('shows notification dialog over a modal', () => {
    browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/notification-dialog-in-modal-manager');
    $('#openModal').click();
    openNotificationDialog();
    Terra.validates.element('over modal', { selector });
  });
});

Terra.describeViewports('Keyboard Accessibility', ['medium'], () => {
  it('notification dialog receives focus when displayed', () => {
    browser.url('/#/raw/tests/cerner-terra-framework-docs/notification-dialog/hazard-high-variant');
    openNotificationDialog();
    expect($(NOTIFICATION_DIALOG_SELECTOR).isFocused()).toBeTruthy();
  });

  it('shifts focus to the accept button in the notification dialog when tab is pressed', () => {
    browser.keys('Tab');
    expect($(ACCEPT_ACTION_SELECTOR).isFocused()).toBeTruthy();
    Terra.validates.element('accept focused', { selector });
  });

  it('closes the notification dialog when ENTER is pressed', () => {
    browser.keys('Enter');
    Terra.validates.element('closes on enter', { selector });
    expect($(NOTIFICATION_DIALOG_SELECTOR).isExisting()).toBeFalsy();
  });

  it('reopens dialog and tabs to accept action', () => {
    openNotificationDialog();
    browser.keys('Tab');
    expect($(ACCEPT_ACTION_SELECTOR).isFocused()).toBeTruthy();
  });

  it('closes the notification dialog when SPACE is pressed', () => {
    browser.keys('Space');
    expect($(NOTIFICATION_DIALOG_SELECTOR).isExisting()).toBeFalsy();
  });

  it('reopens dialog shifts focus to the reject button in the notification dialog via tab', () => {
    openNotificationDialog();
    browser.keys(['Tab', 'Tab']);
    expect($(REJECT_ACTION_SELECTOR).isFocused()).toBeTruthy();
    Terra.validates.element('reject focused', { selector });
  });

  it('the notification dialog traps focus in modal', () => {
    browser.keys('Tab');
    expect($(NOTIFICATION_DIALOG_SELECTOR).isFocused()).toBeTruthy();
    browser.keys('Tab');
    expect($(ACCEPT_ACTION_SELECTOR).isFocused()).toBeTruthy();
    browser.keys('Tab');
    expect($(REJECT_ACTION_SELECTOR).isFocused()).toBeTruthy();
    browser.keys('Tab');
    expect($(NOTIFICATION_DIALOG_SELECTOR).isFocused()).toBeTruthy();
  });
});
