// モバイルメニューを表示する際に、次のような仕組みをとっている。
// 全体のコンテンツを "#container"とする
// スマホ時のメニューを".mobile-menu"とする
// "#.container"と"#.mobile-menu"を共に格納する最も大きな領域を"#global-container"とする。


class MobileMenu {
  constructor() {
    this.DOM = {}; 
    this.DOM.btn = document.querySelector(".mobile-menu__btn"); //ボタン要素の取得
    this.DOM.cover = document.querySelector(".mobile-menu__cover"); //
    this.DOM.container = document.querySelector("#global-container"); // global-container(ズレる画面)
    this.eventType = this._getEventType();　　　　
  }



//---------処理（メソッド）は以下にまとめて記述----------//
  //スマホのtouchEventが適応されるかどうかを確認するかくにんするメソッド
  _getEventType() {
    const isTouchCapable =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0;

    return isTouchCapable ? "touchstart" : "click";
  }

  _toggle() {
    this.DOM.container.classList.toggle("menu-open"); //【切り替え機能】global-containerの"menu-open"クラスをtoggleして切り替える
  }

  _addEvent() {
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
  }
}
