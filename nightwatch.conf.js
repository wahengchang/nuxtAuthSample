// Refer to the online docs for more details: https://nightwatchjs.org/gettingstarted/configuration/
const Services = {};
loadServices()

module.exports = {
    // Change this line to point to your tests directory
    src_folders: ['test/e2e/specs'],

    exclude: [],

    // Comment out or remove this line since you don't have page objects yet
    // page_objects_path: 'test/e2e/pageObjects',

    // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands
    custom_commands_path: '',

    // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-assertions
    custom_assertions_path: '',

    // See https://nightwatchjs.org/guide/#external-globals
    globals_path: 'nightwatch_globals.js',

    webdriver: {},

    test_settings: {
        default: {
            disable_error_log: false,
            launch_url: 'http://localhost:3000',

            screenshots: {
                enabled: false,
                path: 'screens',
                on_failure: true
            },

            desiredCapabilities: {
                browserName: 'chrome'
            },

            webdriver: {
                start_process: true,
                server_path: 'node_modules/.bin/chromedriver',
                port: 9515
            }
        },

        safari: {
            desiredCapabilities: {
                browserName: 'safari',
                alwaysMatch: {
                    acceptInsecureCerts: false
                }
            },
            webdriver: {
                port: 4445,
                start_process: true,
                server_path: '/usr/bin/safaridriver'
            }
        },

        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                alwaysMatch: {
                    // Enable this if you encounter unexpected SSL certificate errors in Firefox
                    // acceptInsecureCerts: true,
                    'moz:firefoxOptions': {
                        args: [
                            // '-headless',
                            // '-verbose'
                        ]
                    }
                }
            },
            webdriver: {
                start_process: true,
                // default_path_prefix: '/wd/hub',
                use_legacy_jsonwire: true,
                port: 4444,
                server_path: (Services.geckodriver ? Services.geckodriver.path : ''),
                cli_args: [
                    // very verbose geckodriver logs
                    // '-vv'
                ]
            }
        },

        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    // This tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
                    // w3c: false,
                    // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
                    args: [
                        // '--no-sandbox',
                        // '--ignore-certificate-errors',
                        // '--allow-insecure-localhost',
                        // '--headless'
                    ]
                }
            },

            webdriver: {
                start_process: true,
                port: 9515,
                server_path: (Services.chromedriver ? Services.chromedriver.path : ''),
                cli_args: [
                    // --verbose
                ]
            }
        },

        // ////////////////////////////////////////////////////////////////////////////////
        // Configuration for when using the browserstack.com cloud service               |
        //                                                                               |
        // Please set the username and access key by setting the environment variables:  |
        // - BROWSERSTACK_USER                                                           |
        // - BROWSERSTACK_KEY                                                            |
        // .env files are supported                                                      |
        // ////////////////////////////////////////////////////////////////////////////////
        browserstack: {
            selenium: {
                host: 'hub-cloud.browserstack.com',
                port: 443
            },
            // More info on configuring capabilities can be found on:
            // https://www.browserstack.com/automate/capabilities?tag=selenium-4
            desiredCapabilities: {
                'bstack:options': {
                    local: 'false',
                    userName: '{BROWSERSTACK_USER}',
                    accessKey: '{BROWSERSTACK_KEY}'
                }
            },

            disable_error_log: true,
            webdriver: {
                keep_alive: true,
                start_process: false
            }
        },

        'browserstack.chrome': {
            extends: 'browserstack',
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    // This tells Chromedriver to run using the legacy JSONWire protocol
                    // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
                    w3c: false
                }
            }
        },

        'browserstack.firefox': {
            extends: 'browserstack',
            desiredCapabilities: {
                browserName: 'firefox'
            }
        },

        'browserstack.ie': {
            extends: 'browserstack',
            desiredCapabilities: {
                browserName: 'IE',
                browserVersion: '11.0',
                'bstack:options': {
                    os: 'Windows',
                    osVersion: '10',
                    local: 'false',
                    seleniumVersion: '3.5.2',
                    resolution: '1366x768'
                }
            }
        },

        // ////////////////////////////////////////////////////////////////////////////////
        // Configuration for when using the Selenium service, either locally or remote,  |
        //  like Selenium Grid                                                           |
        // ////////////////////////////////////////////////////////////////////////////////
        selenium: {
            // Selenium Server is running locally and is managed by Nightwatch
            selenium: {
                start_process: true,
                port: 4444,
                server_path: (Services.seleniumServer ? Services.seleniumServer.path : ''),
                cli_args: {
                    'webdriver.gecko.driver': (Services.geckodriver ? Services.geckodriver.path : ''),
                    'webdriver.chrome.driver': (Services.chromedriver ? Services.chromedriver.path : '')
                }
            }
        },

        'selenium.chrome': {
            extends: 'selenium',
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    w3c: false
                }
            }
        },

        'selenium.firefox': {
            extends: 'selenium',
            desiredCapabilities: {
                browserName: 'firefox',
                'moz:firefoxOptions': {
                    args: [
                        // '-headless',
                        // '-verbose'
                    ]
                }
            }
        }
    }
}

function loadServices() {
    try {
        Services.seleniumServer = require('selenium-server')
    } catch (err) {}

    try {
        Services.chromedriver = require('chromedriver')
    } catch (err) {}

    try {
        Services.geckodriver = require('geckodriver')
    } catch (err) {}
}