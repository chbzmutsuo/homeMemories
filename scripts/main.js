 //top page-begin
 
 $(function(){
    var menuIcons = $('.pageIndex');
    function menuShowupDown() {
        if((menuIcons).hasClass("d-block")){
        (menuIcons).removeClass("d-block");
        } else {
        (menuIcons).addClass("d-block");
        }
    }
 
   $('.Menu-btn').click(menuShowupDown);
 
   $('.pageIndex').hover(
     function(){
     $(this).find('.treeFrame').addClass('d-block');
     }, 
      function(){
     $(this).find('.treeFrame').removeClass('d-block');
     }
   );
 })




document.addEventListener('DOMContentLoaded', function () {
    function randomImages() {
        //関数の引数に設定したid要素を変数に代入
        var box = document.querySelector('.main-content');
      
        //画像配列（ファイル名や連番等を入れる）
        var imageList = [
          'images/Wedding-img/wedding-img1',
          'images/Wedding-img/wedding-img2',
          'images/Wedding-img/wedding-img3',
          'images/Wedding-img/wedding-img4',
          'images/Wedding-img/wedding-img5',
          'images/Wedding-img/wedding-img6',
          'images/Wedding-img/wedding-img7',
          'images/Wedding-img/wedding-img8',
          'images/Wedding-img/wedding-img9',
          'images/Wedding-img/wedding-img10',
          'images/Wedding-img/wedding-img11',
          'images/Wedding-img/wedding-img12',
          'images/Wedding-img/wedding-img13',
          'images/Wedding-img/wedding-img14',
          'images/Wedding-img/wedding-img15',
          'images/Wedding-img/wedding-img16',
          'images/Wedding-img/wedding-img17',
          'images/Wedding-img/wedding-img18',
          'images/Wedding-img/wedding-img19',
          'images/Wedding-img/wedding-img20',
        ];
      
        //配列の数だけ繰り返し処理
        for( var i = 0; i < imageList.length; i++){
      
          //縦横軸用の乱数生成
          var x = Math.floor(Math.random() * 100);
          var y = Math.floor(Math.random() * 100);
    
          var image = document.createElement("div");
          image.innerHTML = `<img src="${imageList[i]}.JPG" alt="" style="top:${y}%; left:${x}%;">`;
          image.classList.add("random-img");
          image.style.position = "absolute";
          image.style.left = `${x}%`;
          image.style.top = `${y}%`;
          box.appendChild(image);
        }
    }
    
    randomImages();    
});




document.addEventListener('DOMContentLoaded', function () {
    const main = new Main();
    
});



class Main {
    constructor() {
        this.header = document.querySelector('.header');
        this.sides = document.querySelectorAll('.side');
        this._observers = [];
        this._init();
    }

    set observers(val) {
        this._observers.push(val);
    }

    get observers() {
        return this._observers;
    }

    _init() {
        new MobileMenu();
        this.hero = new HeroSlider('.swiper-container');
        Pace.on('done', this._paceDone.bind(this));
    }

    _paceDone() {
        this._scrollInit();
    }

    _inviewAnimation(el, inview) {
        if(inview) {
            el.classList.add('inview');
        }else {
            el.classList.remove('inview');
        }
    }

    _navAnimation(el, inview) {
        if(inview) {
            this.header.classList.remove('triggered');
        } else {
            this.header.classList.add('triggered');
        }
    }

    _sideAnimation(el, inview) {
        if(inview) {
            this.sides.forEach(side => side.classList.add('inview'));
        } else {
            this.sides.forEach(side => side.classList.remove('inview'));
        }
    }

    _textAnimation(el, inview) {
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    _toggleSlideAnimation(el, inview) {
        if(inview) {
            this.hero.start();
        } else {
            this.hero.stop();
        }
    }

    _destroyObservers() {
        this.observers.forEach(ob => {
            ob.destroy();
        });
    }

    destroy() {
        this._destroyObservers();
    }

    _scrollInit() {
        this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false});
        this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
        this.observers = new ScrollObserver('.appear', this._inviewAnimation);
        this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation, {rootMargin: "-200px 0px"});
        this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false});
        this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
    }
}

