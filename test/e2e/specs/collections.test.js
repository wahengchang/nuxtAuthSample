const timestamp = new Date().getTime();
const testUsername = `testuser${timestamp}`;
const testEmail = `testuser${timestamp}@example.com`;
const testPassword = 'testpassword';

const collectionName = `TestCollection${timestamp}`;
const collectionDescription = 'This is a test collection';
const itemName = `TestItem${timestamp}`;

describe('Collections Tests', function() {
    it('Create User, Collection, and Item Test', function(browser) {
        browser
        // Register a new user
            .url('http://localhost:3000/register')
            .waitForElementVisible('body', 5000)
            .setValue('input#register-username', testUsername)
            .setValue('input#register-email', testEmail)
            .setValue('input#register-password', testPassword)
            .click('button#register-button')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/dashboard')

        // Navigate to collections page
        .click('a[href="/collections"]')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/collections')
            .assert.containsText('h1', 'My Collections')

        // Check for empty state
        .waitForElementVisible('#empty-state', 5000)
            .assert.containsText('#empty-state h2', 'No Collections Yet')
            .assert.visible('#create-first-collection')

        // Create a new collection
        .click('#create-first-collection')
            .waitForElementVisible('body', 5000)
            .setValue('input#name', collectionName)
            .setValue('textarea#description', collectionDescription)
            .click('button[type="submit"]')
            .waitForElementVisible('body', 5000)
            .assert.urlEquals('http://localhost:3000/collections')

        // Verify the created collection
        .waitForElementVisible('#collections-table', 5000)
            .assert.containsText('#collections-table', collectionName)

        // Test search functionality
        .setValue('#collection-search', collectionName)
            .assert.containsText('#collections-table', collectionName)
            .clearValue('#collection-search')

        // Test sorting functionality
        // .click('#collection-sort')
        //     .click('.v-list-item__title:contains("Date Created")')
        //     .assert.containsText('#collections-table tbody tr:first-child', collectionName)

        // View the created collection
        // .click(`#collections-table a[href^="/collections/"]`)
        //     .waitForElementVisible('body', 5000)
        //     .assert.containsText('h1', collectionName)
        //     .assert.containsText('body', collectionDescription)

        // Add a new item to the collection
        // .click('a[href$="/items/new"]')
        //     .waitForElementVisible('body', 5000)
        //     .setValue('input[name="name"]', itemName)
        //     .click('button[type="submit"]')
        //     .waitForElementVisible('body', 5000)
        //     .assert.containsText('body', itemName)

        // // Verify item in collection list
        // .assert.containsText('#collections-table', itemName)

        // // Navigate back to collections page
        // .click('a[href="/collections"]')
        //     .waitForElementVisible('body', 5000)

        // // Verify updated item count
        // .assert.containsText('#collections-table', '1 items')

        // // Test edit functionality
        // .click(`#edit-collection-${browser.globals.lastCreatedCollectionId}`)
        //     .waitForElementVisible('body', 5000)
        //     .assert.urlContains('/edit')
        //     .click('a[href="/collections"]') // Go back to collections page

        // // Clean up: Delete the collection
        // .click(`#delete-collection-${browser.globals.lastCreatedCollectionId}`)
        //     .waitForElementNotPresent(`#collections-table td:contains("${collectionName}")`, 5000)

        // // Verify empty state is shown again
        // .assert.visible('#empty-state')

        // // Logout
        // .click('button#logoutButton')
        //     .waitForElementVisible('body', 5000)
        //     .assert.urlEquals('http://localhost:3000/login')

        // // Clean up: Delete the user
        // .url('http://localhost:3000/login')
        //     .waitForElementVisible('body', 5000)
        //     .setValue('input#login-username', testUsername)
        //     .setValue('input#login-password', testPassword)
        //     .click('button#login-button')
        //     .waitForElementVisible('body', 5000)
        //     .assert.urlEquals('http://localhost:3000/dashboard')
        //     .click('button#deleteUserButton')
        //     .waitForElementVisible('body', 5000)
        //     .assert.urlEquals('http://localhost:3000/login')

        .end();
    });
});