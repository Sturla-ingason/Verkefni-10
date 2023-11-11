import { getLaunch, searchLaunches } from './api.js';
import { el } from './elements.js';

/**
 * Býr til leitarform.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarstrengur.
 * @returns {HTMLElement} Leitarform.
 */
export function renderSearchForm(searchHandler, query = undefined) {
  /* TODO útfæra */
  const form = el('form', {}, 
  el('input', {value: query ?? '', name: 'query'}), 
  el('button', {}, 'Leita')
  );

  form.addEventListener('submit', searchHandler);

  return form;
}

/**
 * Setur „loading state“ skilabað meðan gögn eru sótt.
 * @param {HTMLElement} parentElement Element sem á að birta skilbaoð í.
 * @param {Element | undefined} searchForm Leitarform sem á að gera óvirkt.
 */
function setLoading(parentElement, searchForm = undefined) {
  /* TODO útfæra */
  
  let loadingElement = parentElement.querySelector('.loading');

  if (!loadingElement){
    loadingElement = el('div', {class : 'loading'}, 'Sæki gögn...');
    parentElement.appendChild(loadingElement);
  }

  if (!searchForm){
    return;
  }

  const button = searchForm.querySelector('button');

  if (button){
    button.setAttribute('disabled', 'disabled');
  }
}

/**
 * Fjarlægir „loading state“.
 * @param {HTMLElement} parentElement Element sem inniheldur skilaboð.
 * @param {Element | undefined} searchForm Leitarform sem á að gera virkt.
 */
function setNotLoading(parentElement, searchForm = undefined) {
  /* TODO útfæra */
  const loadingElement = parentElement.querySelector('.loading');

  if (loadingElement){
    loadingElement.remove();
  }

  if (!searchForm){
    return;
  }

  const disabledButton = searchForm.querySelector('button[disabled]');

  if (disabledButton){
    disabledButton.removeAttribute('disabled');
  }
}

/**
 * Birta niðurstöður úr leit.
 * @param {import('./api.types.js').Launch[] | null} results Niðurstöður úr leit
 * @param {string} query Leitarstrengur.
 */
function createSearchResults(results, query) {
  /* TODO útfæra */

  const list = el('ul', {class : 'results'});

  if (!results){
    const noResultsElement = el('li', {}, `Villa við leit að ${query}`);
    list.appendChild(noResultsElement);
    return list;
  }

  if (results.length === 0){
    const noResultsElement = el('li', {}, `Eingar niðurstöður fyrir leit að ${query}`);
    list.appendChild(noResultsElement);
    return list;
  }



    

  for (const result of results){
    const e = document.createElement('span');
    e.addEventListener('click', () => getLaunch(result));
    e.textContent = result.name;
    
    const resultElement = el('li', { class: 'result'},
      e,
      el('span', { class: 'mission' }, result.mission),
      el('span', { class: 'status' }, result.status.name)
    );

    list.appendChild(resultElement);
  }

  return list;

}

/**
 *
 * @param {HTMLElement} parentElement Element sem á að birta niðurstöður í.
 * @param {Element} searchForm Form sem á að gera óvirkt.
 * @param {string} query Leitarstrengur.
 */
export async function searchAndRender(parentElement, searchForm, query) {
  /* TODO útfæra */

  /* getting the main tag in html code */
  const mainElement = parentElement.querySelector('main');

  if(!mainElement){
    console.warn('fann ekki <main> element');
    return;
  }

  const resultsElement = mainElement.querySelector('.results');
  if (resultsElement) {
    resultsElement.remove();
  }

  
  setLoading(mainElement, searchForm); /* Force loading screen and disable button */
  const results = await searchLaunches(query); /* response from api on json format */
  setNotLoading(mainElement, searchForm); /* removes loading screen */

  console.log(results);

  const resultsEl = createSearchResults(results, query); /* creates result html from the json response */

  mainElement.appendChild(resultsEl);
}

/**
 * Sýna forsíðu, hugsanlega með leitarniðurstöðum.
 * @param {HTMLElement} parentElement Element sem á að innihalda forsíðu.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarorð, ef eitthvað, til að sýna niðurstöður fyrir.
 */
export function renderFrontpage(
  parentElement,
  searchHandler,
  query = undefined,
) {
  const heading = el('h1', {class: 'heading'}, 'Geimskotaleitin 🚀');
  const searchForm = renderSearchForm(searchHandler, query);
  const container = el('main', {class: 'container'}, heading, searchForm);
  parentElement.appendChild(container);

  if (!query) {
    return;
  }

  searchAndRender(parentElement, searchForm, query);
}

/**
 * Sýna geimskot.
 * @param {HTMLElement} parentElement Element sem á að innihalda geimskot.
 * @param {string} id Auðkenni geimskots.
 */
export async function renderDetails(parentElement, id) {
  const container = el('main', {});
  const backElement = el(
    'div',
    { class: 'back' },
    el('a', { href: '/' }, 'Til baka'),
  );

  parentElement.appendChild(container);

  /* TODO setja loading state og sækja gögn */

  // Tómt og villu state, við gerum ekki greinarmun á þessu tvennu, ef við
  // myndum vilja gera það þyrftum við að skilgreina stöðu fyrir niðurstöðu
  if (!result) {
    /* TODO útfæra villu og tómt state */
  }

  /* TODO útfæra ef gögn */
}
