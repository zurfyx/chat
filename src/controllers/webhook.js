import { chain } from '~/helpers/promise';
import { githubWebhook } from '~/services/webhook';

export const github = (info, params) => {
  // TODO: restrict to GitHub IPs only.
  return chain
    .then(() => {
      // A trivial way to avoid duplicates is to restrict the URL to a single one (no parameters).
      // GitHub already prevents duplicates.
      if (!(Object.keys(params).length === 0 && params.constructor === Object)) {
        throw 'GitHub webhooks URL can\'t have params.';
      }
    })
    .then(() => githubWebhook(info));
}