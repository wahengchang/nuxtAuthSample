const timestamp = new Date().getTime();
const testUsername = `testuser${timestamp}`;
const testEmail = `testuser${timestamp}@example.com`;
const testPassword = 'testpassword';

const collectionName = `TestCollection${timestamp}`;
const updatedCollectionName = `UpdatedCollection${timestamp}`;
const collectionDescription = 'This is a test collection';
const updatedCollectionDescription = 'This is an updated test collection';

describe('Collections Tests', function() {
    before(function(browser) {
        // Register and login before running collection tests
        browser
            .url('http://localhost:3000/register')
            .waitForElementVisible('body', 5000)
            .setValue('input#register-username', testUsername)
            .setValue('input#register-email', testEmail)
            .setValue('input#register-password', testPassword)
            .click('button#register-button')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/dashboard');
    });

    it('Create Collection Test', function(browser) {
        browser
            .url('http://localhost:3000/collections/new')
            .waitForElementVisible('body', 5000)
            .assert.containsText('h1.collection-title', 'Create New Collection')
            .setValue('#collection-name', collectionName)
            .setValue('#collection-description', collectionDescription)
            // .click('#collection-isPublic')
            .click('#add-field')
            .setValue('#field-name-0', 'TestField')
            .click('#field-type-0')
            .pause(1000)
            .click('div[tabindex="0"]')
            // .click('#field-required-0')
            .click('#submit-collection')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/collections')
            .assert.containsText('body', collectionName);
    });

    it('Edit Collection Test', function(browser) {
        browser
            .url('http://localhost:3000/collections')
            .waitForElementVisible('body', 5000)
            .pause(2000)
            .click('.collection-link:first-child')
            .waitForElementVisible('body', 5000)
            .setValue('#collection-name', updatedCollectionName)
            .setValue('#collection-description', updatedCollectionDescription)
            .click('#submit-collection')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/collections')
            .assert.containsText('body', updatedCollectionName);
    });

    it('Delete Collection Test', function(browser) {
        browser
            .url('http://localhost:3000/collections')
            .waitForElementVisible('body', 5000)
            .click(`button[aria-label="Delete ${updatedCollectionName}"]`)
            .waitForElementVisible('.v-dialog', 5000)
            .click('.v-dialog button.error')
            .waitForElementNotPresent('.v-dialog', 5000)
            .assert.not.containsText('body', updatedCollectionName);
    });

    after(function(browser) {
        // Logout and delete user after running collection tests
        browser
            .click('button#logout-button')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/login')
            .setValue('input#login-username', testUsername)
            .setValue('input#login-password', testPassword)
            .click('button#login-button')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/dashboard')
            .click('button#delete-account-button')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/login')
            .end();
    });
});