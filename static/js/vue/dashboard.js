import request from './request';

export function clickCall(data) {
  return request({
    url: `/coocenter-api/plugin-asterisk/extension/click-number`,
    method: 'post',
    data,
  });
}

export function hangup(data) {
  return request({
    url: `/coocenter-api/plugin-asterisk/extension/hangup`,
    method: 'post',
    data,
  });
}

export function spy(data) {
  return request({
    url: `/coocenter-api/plugin-asterisk/extension/extension-spy`,
    method: 'post',
    data,
  });
}

export function transfer(data) {
  return request({
    url: `/coocenter-api/plugin-asterisk/extension/transfer`,
    method: 'post',
    data,
  });
}

export function bargeIn(data) {
  return request({
    url: `/coocenter-api/plugin-asterisk/extension/extension-barge-in`,
    method: 'post',
    data,
  });
}

export function whisper(data) {
  return request({
    url: `/coocenter-api/plugin-asterisk/extension/extension-whisper`,
    method: 'post',
    data,
  });
}
