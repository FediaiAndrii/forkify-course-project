import View from './View.js';
import { ICONS as icons } from '../../config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );
    let arrowMarkup = '';
    const numbersMarkup = this._generateMarkupNumbers(curPage, numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      arrowMarkup = this._generateMarkupButton(curPage + 1, 'next');
    } else if (curPage === numPages && numPages > 1) {
      arrowMarkup = this._generateMarkupButton(curPage - 1, 'prev');
    } else if (curPage < numPages) {
      arrowMarkup =
        this._generateMarkupButton(curPage + 1, 'next') +
        this._generateMarkupButton(curPage - 1, 'prev');
    }
    // Page 1, and there are NO other pages
    return `${arrowMarkup}
      <div class="pagination__numbers" style="margin-top: 45px; display: flex; justify-content: center; gap: 5px;">
      ${numbersMarkup}
      </div>
    `;
  }

  _generateMarkupButton(page, type) {
    if (type === 'next') {
      return `
        <button data-goto ="${page}" class="btn--inline pagination__btn--next">
          <span>Page ${page}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> 
      `;
    }

    if (type === 'prev') {
      return `
        <button data-goto ="${page}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page}</span>
        </button>
      `;
    }
  }

  _generateMarkupNumbers(curPage, numPages) {
    let startPage = curPage - 2;
    let endPage = curPage + 2;
    let markup = '';
    if (startPage < 1) startPage = 1;
    if (endPage > numPages) endPage = numPages;
    for (let i = startPage; i <= endPage; i++) {
      const style =
        i === curPage ? 'background-color: #f38e82; color: #fff;' : '';
      markup += `
      <button data-goto="${i}" class="btn--inline" style="${style} margin: 0 2px">
      ${i}
      </button>
      `;
    }
    return markup;
  }
}

export default new PaginationView();
