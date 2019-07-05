/**
 * Things Screen.
 *
 * UI for showing Things connected to the gateway.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

// eslint-disable-next-line no-unused-vars
const SpeakerScreen = {

  NO_THINGS_MESSAGE: 'No devices yet. Click + to scan for available devices.',
  THING_NOT_FOUND_MESSAGE: 'Thing not found.',
  ACTION_NOT_FOUND_MESSAGE: 'Action not found.',
  EVENTS_NOT_FOUND_MESSAGE: 'This thing has no events.',

  /**
   * Initialise Things Screen.
   */
  init: function() {
    this.menuButton = document.getElementById('menu-button');
    this.backButton = document.getElementById('back-button');
    this.backRef = '/speakers';
    require('../vue/index');
  },
};

module.exports = SpeakerScreen;
