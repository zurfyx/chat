import config from 'config';
import ipRangeCheck from 'ip-range-check';

import { chain } from '~/helpers/promise';
import { ApiError } from '~/helpers/api';
import { isAuthenticated } from '~/services/auth';
import { githubWebhook, findGitHubWebhook, githubSubscribeWebhook } from '~/services/webhook';

export const github = (event, uid, ip, data) => {
  return chain
    .then(() => {
      if (!ipRangeCheck(ip, config.get('githubIpRange'))) {
        throw new ApiError('IP does not match GitHub whitelist.');
      }
    })
    .then(() => githubWebhook(event, uid, data))
    .then(() => {
      return { message: 'OK' };
    });
}

export const githubFind = (repository) => {
  return chain
    .then(() => findGitHubWebhook(repository));
}

export const githubSubscribe = (currentUser, repository) => {
  return chain
    .then(() => {
      if (!repository) {
        throw new ApiError('A repository is required.');
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