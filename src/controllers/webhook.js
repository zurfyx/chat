import { chain } from '~/helpers/promise';
import { githubWebhook } from '~/services/webhook';

export const github = (event, uid, data) => {
  // TODO: restrict to GitHub IPs only.
  return chain
    .then(() => githubWebhook(event, uid, data))
    .then(() => {
      return { message: 'OK' };
    });
}