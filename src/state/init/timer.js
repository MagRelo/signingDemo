import store from '../store';

let timer = null;

export async function startTipTimer() {
  timer = setTimeout(function() {
    store.dispatch({
      type: 'SHOW_TIP',
      payload: {
        showTip: true
      }
    });

    clearTimeout(timer);
  }, 4000);
}
