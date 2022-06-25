const API_HOST = 'mashape-community-urban-dictionary.p.rapidapi.com';
const API_OPTS = {
  headers: {
    'x-rapidapi-key': "f70abe6673msh2f5e56190c90cedp1d8ac7jsn42325656fd27",
    'x-rapidapi-host': API_HOST,
  },
};

chrome.tabs.executeScript({
  code: 'getSelection().toString()',
}, async pageData => {
  try {
    const term = pageData[0].trim();
    if (!term) throw new Error('No selection!');
    const apiUrl = `https://${API_HOST}/define?term=${encodeURIComponent(term)}`;
    const apiRes = await (await fetch(apiUrl, API_OPTS)).json();
    const def = apiRes.list[0].definition;
    document.getElementById('test').textContent = def;
  } catch (e) {
    document.getElementById('test').textContent =
      chrome.runtime.lastError ? 'Cannot access this page' : e.message;
  }
});