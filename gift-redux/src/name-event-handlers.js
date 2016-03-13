import {dispatch} from './redux-util';

export default {
  onAddName() {
    dispatch('addName');
  },
  onChangeName(event) {
    dispatch('changeName', event.target.value);
  },
  onCloseConfirmDeleteModal() {
    dispatch('closeConfirmDeleteModal');
  },
  onConfirmDeleteName() {
    dispatch('confirmDeleteName');
  },
  onDeleteName() {
    dispatch('deleteSelectedName');
  },
  onSelectName(event) {
    dispatch('selectName', event.target.value);
  }
};
