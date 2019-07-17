/**
 * Things Controller.
 *
 * Manages HTTP requests to /things.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const AddonManager = require('../addon-manager');
const PromiseRouter = require('express-promise-router');
const Things = require('../models/things');

const SpeakersController = PromiseRouter();

/**
 * 只显示 speaker 设备
 */
SpeakersController.get('/', (request, response) => {
  Things.getSpeakerListThingDescriptions(request.get('Host'), request.secure)
    .then((things) => {
      response.status(200).json(things);
    });
});

SpeakersController.patch('/', async (request, response) => {
  if (!request.body ||
      !request.body.hasOwnProperty('thingId') ||
      !request.body.thingId) {
    response.status(400).send('Invalid request');
    return;
  }

  const thingId = request.body.thingId;

  if (request.body.hasOwnProperty('pin') &&
      request.body.pin.length > 0) {
    const pin = request.body.pin;

    try {
      const device = await AddonManager.setPin(thingId, pin);
      response.status(200).json(device);
    } catch (e) {
      console.error(`Failed to set PIN for ${thingId}: ${e}`);
      response.status(400).send(e);
    }
  } else if (request.body.hasOwnProperty('username') &&
             request.body.username.length > 0 &&
             request.body.hasOwnProperty('password') &&
             request.body.password.length > 0) {
    const username = request.body.username;
    const password = request.body.password;

    try {
      const device = await AddonManager.setCredentials(
        thingId,
        username,
        password
      );
      response.status(200).json(device);
    } catch (e) {
      console.error(`Failed to set credentials for ${thingId}: ${e}`);
      response.status(400).send(e);
    }
  } else {
    response.status(400).send('Invalid request');
  }
});

module.exports = SpeakersController;
