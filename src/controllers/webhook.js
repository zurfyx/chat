import { chain } from '~/helpers/promise';
import { githubWebhook } from '~/services/webhook';

export const github = (info) => {
  // TODO: restrict to GitHub IPs only.
  // TODO. Restrict to exact URL to avoid duplicated requests with URL variants.
  return chain
    .then(() => githubWebhook(info))
    .then(() => {
      return { message: 'OK' };
    });
}