describe('/screenshots/', () => {
  // Should update the netlify.toml so in dev I serve local files from html/dev
  // and not html/prod
  // Those files should have some stuff displayed
  //
  // I then query the /screenshot/ with a url to this local server
  // I will need to handle the localhost:XXXX stuff, which might not work
  // and I should expect the returned element to match what is expected
  // I might need to look at Jest snapshots for that
  it('should work', async () => {
    expect(true).toEqual(false);
  });
});
