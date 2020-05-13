import { EShopSPAPage } from './app.po';

describe('eshop-spa App', () => {
  let page: EShopSPAPage;

  beforeEach(() => {
    page = new EShopSPAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect<any>(page.getParagraphText()).toEqual('app works!');
  });
});
