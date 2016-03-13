import {dispatch} from './redux-util';

export default {
  onAddGift() {
    dispatch('addGift');
  },
  onChangeGift(event) {
    dispatch('changeGift', event.target.value);
  },
  onDeleteGift() {
    dispatch('deleteGift');
  },
  onSelectGift(event) {
    dispatch('selectGift', event.target.value);
  }
};
