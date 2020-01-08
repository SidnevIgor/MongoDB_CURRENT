import { FrontPage } from './app.po';

describe('front App', () => {
  let page: FrontPage;

  beforeEach(() => {
    page = new FrontPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
