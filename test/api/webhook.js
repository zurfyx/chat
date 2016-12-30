import { expect } from 'chai';

import { chain } from '~/helpers/promise';
import Webhook from '~/models/Webhook';

describe('Webhook', () => {
  describe('POST /webhooks/github', () => {
    it('should prevent duplicate entries', (done) => {
      chain
        .then(() => sendGithubWebhook())
        .then((res) => {
          expect(res.status).to.equal(200);
          return sendGithubWebhook();
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          return sendGithubWebhook('different-github-uid');
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.eql({ message: 'OK' });
          Webhook.find({}).exec().then((webhooks) => {
            expect(webhooks.length).to.equal(2);
            done();
          });
        });
    });

    it('should create a Webhook entry if the request is valid (comment test)', (done) => {
      sendGithubWebhook()
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.eql({ message: 'OK' });
          Webhook.findOne({}).exec().then((webhook) => {
            expect(webhook.type).to.equal('github');
            expect(webhook.uid).to.equal('45bb5780-ceca-11e6-9b9e-67ff3f65ca27');
            expect(webhook.github.repository).to.equal('github/repo');
            expect(webhook.github.action).to.equal('created');
            done();
          });
        });
    });
  });
});

function sendGithubWebhook(uid = '45bb5780-ceca-11e6-9b9e-67ff3f65ca27') {
  return new Promise((resolve, reject) => {
    request
      .post(`${server}/webhooks/github`)
      .set('X-GitHub-Delivery', uid)
      .set('X-GitHub-Event', 'issue_comment')
      .send({
        action: 'created',
        repository: { full_name: 'github/repo' },
        issue: {
          number: 1,
          title: 'issueTitle',
          user: { login: 'issueUser' },
        },
        comment: {
          id: 111,
          user: { login: 'commentUser' },
          body: 'body',
        },
      })
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
}