class ScrollObserver {
    constructor(els, cb, options) { //引数＝（監視対象、コールバック関数、、スクロールオプション）

        //(1)プロパティの初期化（監視対象、callback動作、デフォルトオプション、回数、init?
        this.els = document.querySelectorAll(els);　//(1)【監視対象設定】
        const defaultOptions = { //オプション　特に変更なし
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        };
        this.cb = cb; //左辺cb：プロパティ　　右辺cb：第二引数に入れた値 


        //初期設定オプションと、第３引数のオプションのうち、あとから設定したほうがoptionsに代入される
        this.options = Object.assign(defaultOptions, options); 

        this.once = this.options.once;
        this._init();  
    }

    //初期化のメソッドは、値（els, cb, options, once）とは別で定義している。_initはただの箱
    _init() {

        //(3) 監視対象が複数あるから(entries)
        const callback = function (entries, observer) {  

            //　監視対象物(entries配列）のそれぞれに対して、
            entries.forEach(entry => {

                //１つの監視対象(entry)が　交差した場合 isIntersecting
                if (entry.isIntersecting) {

                    //監視対象(entry)に対して,cb(constructor第２引数の処理を実行)
                    this.cb(entry.target, true);

                    //onceプロパティがtrueに設定されていたら、監視をやめる
                    if(this.once) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        };



        //ここで初めて、IntersectionObserverが実体化
        this.io = new IntersectionObserver(callback.bind(this), this.options); //(2)【インスタンス設定】オブザーバーインスタンスの定義。（動作＝callback、オプション）

        // @see https://github.com/w3c/IntersectionObserver/tree/master/polyfill
        this.io.POLL_INTERVAL = 100;
        

        //【監視発動！！！】constructor第１引数のelsに対して、それぞれオブザーバーを起動
        this.els.forEach(el => this.io.observe(el));
    }

    destroy() {
        this.io.disconnect();
    }
}