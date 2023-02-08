'use strict';

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
figma.showUI(__html__, { themeColors: true, width: 232, height: 100 });
figma.ui.onmessage = msg => {
    if (msg.type === 'timer-finished') {
        figma.notify("🍅 It's time to take a break!", { timeout: 10000 });
    }
};
