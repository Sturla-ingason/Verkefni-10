import { el } from './elements.js';
/**
 * API föll.
 * @see https://lldev.thespacedevs.com/2.2.0/swagger/
 */

/**
 * Sækjum týpurnar okkar.
 * @typedef {import('./api.types.js').Launch} Launch
 * @typedef {import('./api.types.js').LaunchDetail} LaunchDetail
 * @typedef {import('./api.types.js').LaunchSearchResults} LaunchSearchResults
 */

/** Grunnslóð á API (DEV útgáfa) */
const API_URL = 'https://lldev.thespacedevs.com/2.2.0/';

/**
 * Skilar Promise sem bíður í gefnar millisekúndur.
 * Gott til að prófa loading state, en einnig hægt að nota `throttle` í 
 * DevTools.
 * @param {number} ms Tími til að sofa í millisekúndum.
 * @returns {Promise<void>}
 */
export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}

/**
 * Leita í geimskota API eftir leitarstreng.
 * @param {string} query Leitarstrengur.
 * @returns {Promise<Launch[] | null>} Fylki af geimskotum eða `null` ef villa
 *  kom upp.
 */
export async function searchLaunches(query) {
  /* Construct the URL so that it is correctly set before calling the API */
  const url = new URL('launch', API_URL)
  url.searchParams.set('search', query);
  url.searchParams.set('mode', 'list');

  let response

  try{
    /* calling the api */
    response = await fetch(url);
  }

  catch (e){
    console.error('Villa koma upp við að sækja gögn', e);
    return null;
  }

  if (!response.ok){
    console.error('Villa við að sækja gögn, ekki 200 staða', response.status, response.statusText);
    return null;
  }

  try{
    /* converting the response from the api to json */
    const json = await response.json()
    return json.results;
  }

  catch(e){
    console.error('Villa við að vinna ur JSON');
    return null;
  }


}

/**
 * Skilar stöku geimskoti eftir auðkenni eða `null` ef ekkert fannst.
 * @param {string} id Auðkenni geimskots.
 * @returns {Promise<LaunchDetail | null>} Geimskot.
 */
export async function getLaunch(result) {
  /* TODO útfæra */


  history.pushState(null, null, result.id);

  const e = document.createElement('button');
  e.addEventListener('click', () => history.go(-1));
  e.textContent = 'Til baka';

  const missionElement = el('li', { class: 'result'},
  el('span', {class: 'name'}, result.name),
  el('img', {class: 'mynd', src: result.image}),
  el('span', { class: 'status' }, result.status.name),
  el('span', { class: 'mission' }, result.mission),
  e
  );


  document.body.appendChild(missionElement);

}
