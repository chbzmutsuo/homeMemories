class TextAnimation {
    constructor(el) {
        this.DOM = {};
        //(1)【取得】TextAnimationの第一引数 を el　に代入
        //書き方としては、以下と同じ
            // if (el instanceof HTMLElement) {
            //     this.DOM.el = el;
            // } else {
            //     this.DOM.el = document.querySelector(el); 
            // }
        this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el); 

        
        //(2)【抽出　＞　代入・変換】第一引数(el)のHTMLをtrimして, splitしたもの＝charsプロパティ
        this.chars = this.DOM.el.innerHTML.trim().split("");

        //(4) 【還元】_splitTextで分割されたテキストをテキストを
        this.DOM.el.innerHTML = this._splitText();
    }

    //(3)【分割】charsプロパティをプロパティを分割<  >表示に
    _splitText() {
        return this.chars.reduce((acc, curr) => {
            curr = curr.replace(/\s+/, '&nbsp;');
            return `${acc}<span class="char">${curr}</span>`;
        }, "");
    }

    //(5) inviewの切り替え
    animate() {
        this.DOM.el.classList.toggle('inview');
    }
}
