import Game from './game';
import View from './hanoi-view';

$( (): void => {
  const rootEl: any = $('.hanoi');
  const game: any = new Game();
  new View(game, rootEl);
});
