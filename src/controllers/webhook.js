import config from 'config';
import ipRangeCheck from 'ip-range-check';

import { chain } from '~/helpers/promise';
import { isAuthenticated } from '~/services/auth';
import { githubWebhook, githubSubscribeWebhook } from '~/services/webhook';

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

export const githubSubscribe = (currentUser, repository) => {
  return chain
    .then(() => {
      if (!repository) {
        throw 'A repository is required.';
      }
    })
    .then(() => isAuthenticated(currentUser))
    .then((user) => {
      // TODO: Filter by token scope.
      const githubTokens = currentUser.tokens.filter((token) => token.kind === 'github');
      if (githubTokens.length === 0) {
        throw 'No GitHub tokens were found.';
      }
      const githubToken = githubTokens[githubTokens.length - 1].accessToken;
      return githubSubscribeWebhook(repository, githubToken);
    })
    .then(() => ({ message: 'OK' }));
}