/**
 * San Devtool
 * Copyright 2020 Ecomfe. All rights reserved.
 *
 * @file Create san panel dynamically in devtools if needed
 * @author rayjune(rayjune.x@gmail.com)
 */

let created = false;
let createdCheckInterval = setInterval(createPanel, 1000);

function createPanel() {
    chrome.devtools.network.onNavigated.addListener(createPanel);

    if (created) {
        return;
    }

    clearInterval(createdCheckInterval);

    chrome.devtools.inspectedWindow.eval(
        '!!(window.__san_devtool__&&window.__san_devtool__.san)', hasSan => {
            if (!hasSan || created) {
                return;
            }

            chrome.devtools.panels.create(
                'San',
                '../../icons/logo128.png',
                'html/devtool/panel_index.html'
            );
            created = true;
        }
    );
}

createPanel();
