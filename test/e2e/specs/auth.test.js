const timestamp = new Date().getTime();
const testUsername = `testuser${timestamp}`;
const testEmail = `testuser${timestamp}@example.com`;
const testPassword = 'testpassword';

const testUsername2 = `testuser2${timestamp}`;
const testEmail2 = `testuser2${timestamp}@example.com`;

describe('Authentication Tests', function() {
    it.only('Registration Test', function(browser) {
        browser
            .url('http://localhost:3000/register')
            .waitForElementVisible('body', 5000)
            .waitForElementVisible('input[type="text"]#username', 5000)
            .setValue('input[type="text"]#username', testUsername)
            .setValue('input[type="email"]#email', testEmail)
            .setValue('input[type="password"]#password', testPassword)
            .click('button[type="submit"]')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/dashboard')
            .assert.textContains('p', testEmail)
    });

    it.only('Logout Test', function(browser) {
        browser
            .url('http://localhost:3000/register')
            .waitForElementVisible('body', 5000)
            .waitForElementVisible('input[type="text"]#username', 5000)
            .setValue('input[type="text"]#username', testUsername2)
            .setValue('input[type="email"]#email', testEmail2)
            .setValue('input[type="password"]#password', testPassword)
            .click('button[type="submit"]')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/dashboard')
            .assert.textContains('p', testEmail2)
            // -=-=-= step 1
            .url('http://localhost:3000/dashboard')
            .assert.textContains('p', testEmail2) // Assuming the username is displayed on the dashboard page
            .click('button#logoutButton') // Using the id of the logout button
            .waitForElementVisible('body', 5000)
            // -=-=-= step 2
            .url('http://localhost:3000/dashboard')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/login') // Assuming the user is redirected to the home page after logout
            // -=-=-= step 3
            .url('http://localhost:3000/login')
            .waitForElementVisible('body', 5000)
            .setValue('input[type="text"]#username', testUsername2)
            .setValue('input[type="password"]#password', testPassword)
            .click('button[type="submit"]')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/dashboard')
            .assert.textContains('p', testEmail2)
            .click('button#deleteUserButton')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/login')
    });
});