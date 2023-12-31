import { getListings } from '../../api/listings/listings.js';
import { renderError } from '../../components/errors.js';
import { renderListings } from '../../components/cards/explore/index.js';
import { pagination } from './paginate.js';
import { getSearchParam, searchListener } from './search.js';
import { param } from '../../utility/params.js';

let page = Number(param.get('page'));
const search = getSearchParam();

let limit = 13;
let offset = 12 * page;

const ascending = 'asc'; // eslint-disable-line
const descending = 'desc'; // eslint-disable-line

const listings = async (
  limit = 10,
  offset = 0,
  sort = 'desc',
  active = true,
  search = '',
) => {
  const data = await getListings(limit, offset, sort, active, search);

  if (data.errors) {
    const section = document.querySelector('#explore-section');
    renderError(section);
  } else if (data.length === 0) {
    const section = document.querySelector('#explore-section');
    renderError(section);
    searchListener(page);
  } else {
    renderListings(data, limit);
    pagination(offset, data, limit, page);
    searchListener(page);
  }
};

listings(limit, offset, descending, true, search);

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('popstate', () => {
  window.location.reload();
});
