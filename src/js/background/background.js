/**
 * San DevTool
 * Copyright 2020 Ecomfe. All rights reserved.
 *
 * @file Background script
 * @author luyuan(luyuan.china@gmail.com)
 * @author rayjune(rayjune.x@gmail.com)
 */

import Messenger from 'chrome-ext-messenger';

const options = window.localStorage;
const messenger = new Messenger();

messenger.initBackgroundHub({
    connectedHandler: (extensionPart, connectionName, tabId) => {},
    disconnectedHandler: (extensionPart, connectionName, tabId) => {}
});

messenger.initConnection('version', (message, from, sender, sendResponse) => {
    updateBrowserAction(message, true, from);
});
messenger.initConnection('version_visibility', (message, from, sender, sendResponse) => {
    updateBrowserAction(message.version, message.versionVisibility, from);
});
messenger.initConnection('options', (message, from, sender, sendResponse) => {
    for (let k in message) {
        options[k] = message[k];
    }
    sendResponse(options);
});

function updateBrowserAction(ver, visibility, from) {
    if (typeof ver === 'undefined') {
        return;
    }

    let tabId = from.match(/\d+$/)[0];
    if (tabId) {
        updateBadgeTextAndIcon(+tabId, ver, visibility);
    }
}

function updateBadgeTextAndIcon(tabId, ver, visibility) {
    chrome.browserAction.setBadgeText({
        tabId,
        text: visibility && !+options['do_not_show_version'] ? ver : ''
    });
    chrome.browserAction.setIcon({
        tabId,
        path: {
            16: 'icons/logo16.png',
            48: 'icons/logo48.png',
            128: 'icons/logo128.png'
        }
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (typeof changeInfo !== 'object' || changeInfo.status !== 'complete') {
        return;
    }
    chrome.tabs.sendMessage(tabId, {
        message: 'tabUpdated'
    });
});
