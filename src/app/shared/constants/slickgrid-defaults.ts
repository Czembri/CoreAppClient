import { GridOption } from "angular-slickgrid";

export const defaultGridOptions: GridOption = {
  autoResize: {
    container: '.trading-platform',
    rightPadding: 0,
    bottomPadding: 10,
  },
  formatterOptions: {
    displayNegativeNumberWithParentheses: true,
    thousandSeparator: ','
  },
  draggableGrouping: {
    deleteIconCssClass: 'fa fa-times',
  },
  enableDraggableGrouping: false,
  createPreHeaderPanel: true,
  showPreHeaderPanel: true,
  preHeaderPanelHeight: 40,
  enableCellNavigation: true,
  enableFiltering: true,
  cellHighlightCssClass: 'changed',
  forceFitColumns: true,
  checkboxSelector: {
    hideInFilterHeaderRow: true,
    hideInColumnTitleRow: false
  },
  rowSelectionOptions: {
    // True (Single Selection), False (Multiple Selections)
    selectActiveRow: true
  },
  enableCheckboxSelector: true,
  enableAutoResize: true,
  gridWidth: "100%",
  showCellSelection: true,
  alwaysShowVerticalScroll: false,
  enableTranslate: true,
};
