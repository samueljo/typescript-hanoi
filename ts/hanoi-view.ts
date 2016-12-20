export default class View {
  game: any;
  $el: any;
  fromTowerIdx: number | null;

  constructor(game: any, $el: any) {
    this.game = game;
    this.$el = $el;

    this.fromTowerIdx = null;

    this.$el.on('click', 'ul', this.clickTower.bind(this));

    this.setupTowers();
    this.render();
  }

  clickTower(event: Event): void {
    const clickedTowerIdx: number = $(event.currentTarget).index();

    if (this.fromTowerIdx === null) {
      this.fromTowerIdx = clickedTowerIdx;
    } else {
      if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
        alert('Invalid Move! Try Again.');
      }

      this.fromTowerIdx = null;
    }

    this.render();

    if (this.game.isWon()) {
      this.$el.off('click');
      this.$el.addClass('game-over');
      alert("Good Work!");
    }
  }

  setupTowers(): void {
    this.$el.empty();
    this.$el.addClass('group');

    let $tower: any;
    let $disk: any;

    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
      $tower = $('<ul>');

      for (let diskIdx = 0; diskIdx < 3; diskIdx++) {
        $disk = $('<li>');
        $tower.append($disk);
      }

      this.$el.append($tower);
    };
  }

  render(): void {
    const $towers: any = this.$el.find('ul');
    $towers.removeClass();

    if (this.fromTowerIdx !== null) {
      $towers.eq(this.fromTowerIdx).addClass('selected');
    }

    this.game.towers.forEach((disks: any, towerIdx: number) => {
      const $disks: any = $towers.eq(towerIdx).children();
      $disks.removeClass();

      disks.forEach((diskWidth: any, diskIdx: number) => {
        $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskWidth}`);
      });
    });
  }
}
