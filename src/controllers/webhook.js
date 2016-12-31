import config from 'config';
import ipRangeCheck from 'ip-range-check';

import { chain } from '~/helpers/promise';
import { githubWebhook } from '~/services/webhook';

export const github = (event, uid, ip, data) => {
  return chain
    .then(() => {
      if (!ipRangeCheck(ip, config.get('githubIpRange'))) {
        throw 'IP does not match GitHub whitelist.';
      }
    })
    .then(() => githubWebhook(event, uid, data))
    .then(() => {
      return { message: 'OK' };
    });
}