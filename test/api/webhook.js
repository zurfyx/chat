import { expect } from 'chai';

import Webhook from '~/models/Webhook';

describe('Webhook', () => {
  describe('POST /webhooks/github', () => {
    // it('should return an error if the url contains parameters', (done) => {
    //   request
    //     .post(`${server}/webhooks/github?`)
    //     .send({ data: 'lots of github data' })
    //     .end((err, res) => {
    //       expect(res.status).to.equal(500);
    //       expect(res.body.message).to.equal('Provided GitHub webhooks URL is invalid');
    //     });
    // });

    it('should create a Webhook entry if the request is valid (comment test)', (done) => {
      request
        .post(`${server}/webhooks/github`)
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
          expect(res.status).to.equal(200);
          expect(res.body).to.eql({ message: 'OK' });
          Webhook.findOne({}).exec().then((webhook) => {
            expect(webhook.github.repository).to.equal('github/repo');
            expect(webhook.github.action).to.equal('created');
            done();
          });
        });
    });
  });
});