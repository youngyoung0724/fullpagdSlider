$(document).ready(function(){

    //Full Page Slider - mousewheel() 이벤트
    //mousewheel : 크롬, 익스엣지, 사파리, 오페라
    //DOMMouseScroll : 파이어폭스

    var elm = ".box"; //각 세션을 지목할 클래스명을 저장 
    //$(elm).css("background","#08f");
    $(elm).each(function(index){ //index = 0->1->2->3...-> 6까지 
        //개별 색션에서 접근하여 이벤트를 발생시킨다. 
        $(this).on("mousewheel DOMMouseScroll", function(e){
            e.preventDefault(); // 초기화되는 것을 막는 구성, fullpage slider에서는 대기시키는 이동공간을 고정화
            //console.log("마우스휠 이벤트 발생");
            //console.log(e);
            //console.log(e.originalEvent.wheelDelta);
            console.log(event.wheelDelta); // (e.originalEvent.wheelDelta)를 줄여서 쓸 수 있음
            //크롬 브라우저에서는 마우스 휠을 내렸을 때, event.wheelDelta : -120
            //크롬 브라우저에서는 마우스 휠을 올렸을 때, event.wheelDelta : 120

            var delta = 0; //마우스 휠을 돌리지 않았을 때 초기값(마우스 휠 이벤트에 의해 받아오는 값을 넣는 공간)

            //event.wheelDelta가 존재한다면 
            if(event.wheelDelta){
                //크롬, 익스엣지, 사파리, 오페라
                //console.log("wheelDelta 값 발생");
                delta = event.wheelDelta / 3;
                //크롬 브라우저 기준으로 휠 내렸을 때 delta  = -120(또는 -3) / 120 = -1(또는 -3/120) = > 음수
                 //크롬 브라우저 기준으로 휠 올렸을 때 delta  = 120(또는 3) / 120 = 1(또는 3/120) = > 양수
                if(window.opera){ //오페라브라우저는 크롬브라우저와 반대값으로 전달
                    delta = -delta; //오페라의 결과값과 크롬의 결과값을 일치시키고자 할 때 적용

                }
                console.log(delta);


            }else if(e.detail){
                //파이어폭스 
                //console.log("detail 값 발생");
                console.log(e.detail);
                //파이어폭스에서는 휠을 내렸을 때, e.detail : 3(또는1)
                //파이어폭스에서는 휠을 올렸을 때, e.detail : -3(또는-1)

                if(e.detail == 3 || -3 ){
                    delta = -e.detail / 3;
                    //파이어폭스에서는 휠을 내렸을 때, e.detail = -(3) / 3 = -1 => 음수
                    //파이어폭스에서는 휠을 올렸을 때, e.detail = -(-3) / 3 = 1 => 양수
                    console.log(delta);
                }else if(e.detail == 1 || e.detail == -1){
                    delta = -e.detail 
                    //파이어폭스에서는 휠을 내렸을 때, e.detail = -(3) / 3 = -1 => 음수
                    //파이어폭스에서는 휠을 올렸을 때, e.detail = -(-3) / 3 = 1 => 양수
                }
                
                console.log(delta);

            }
            //delta값이 음의 실수 일때는 => 내린다. => 다음 섹션(현재 보여지는 화면보다 아래)이 나와야 함
            //delta값이 양의 실수 일때는 => 올린다. => 이전 섹션(현재 보여지는 화면보다 위)이 나와야 함

            var moveTo = $(window).scrollTop(); //각 섹션별로 상단으로부터 절대위치를 파악하기 위함
            var elmIndex = $(elm).eq(index); // 각 섹션별로 순차적으로 접근
            console.log(elmIndex); //마우스 휠 이벤트가 발생한 장소 객체(7개의 섹션 중에서 하나의 섹션에서 이벤트를 발생시킴)
           


            if(delta < 0){
                //console.log("마우스 휠 아래로 내렸다.");
                try{ //시도해라 
                    //마우스 휠을 내리는 시점에서 다음 섹션이 존재한다면
                    if($(elmIndex).next() != undefined){
                        moveTo = $(elmIndex).next().offset().top; //다음 섹션의 상단 수직방향 절대 위치값 

                        $(elm).removeClass("active");
                        $(elmIndex).next().addClass("active");
                        var $cur_index = $(".box.active").index(); //이동시킨 다음 active라는 클래스가 존재한 곳의 인덱스값을 받아온다. 
                        console.log($cur_index);
                        $("header li").removeClass("active");
                        $("header li").eq($cur_index).addClass("active");

                        $("header").removeClass("show");


                    }
                }catch(e){// 시도하는 과정에서 문제점이 발생한 곳은 catch문에서 강제로 잡아버린다. (에러 발생에 대한 예외처리)
                    console.log(e); //타입에러 파트를 검사창에 노출시키는 것이 아닌 강제로 숨김처리 => 시스템의 에러도 에러로 발생시키는 것을 막는 기능
                }
            }else{
                //console.log("마우스 휠 위로 올렸다.");
                try{ //시도해라 
                    //마우스 휠을 올리는 시점에서 이전 섹션이 존재한다면
                    if($(elmIndex).prev() != undefined){
                        moveTo = $(elmIndex).prev().offset().top; // 이전 섹션의 상단 수직방향 절대 위치값

                        $(elm).removeClass("active");
                        $(elmIndex).prev().addClass("active");
                        var $cur_index = $(".box.active").index();
                        console.log($cur_index);
                        $("header li").removeClass("active");
                        $("header li").eq($cur_index).addClass("active");

                        $("header").addClass("show");


                    }
                }catch(e){// 시도하는 과정에서 문제점이 발생한 곳은 catch문에서 강제로 잡아버린다. (에러 발생에 대한 예외처리)
                console.log(e); //타입에러 파트를 검사창에 노출시키는 것이 아닌 강제로 숨김처리 => 시스템의 에러도 에러로 발생시키는 것을 막는 기능
                }
            }
            $("html, body").stop().animate({scrollTop : moveTo + "px"}, 500)
        });

        //상단 메뉴 클릭시 해당하는 페이지로 이동하기 (+ section .box에 존재한 active 영역도 변경한다.)
        $("header li").click(function(){
            var $index = $(this).index(); // 인덱스 추출
            $("header li").removeClass("active");
            $(this).addClass("active");
            
            $(elm).removeClass("active");
            $(elm).eq($index).addClass("active");
            
            $("html, body").stop().animate({scrollTop : $(elm).eq($index).offset().top}, 1000);


            return false;
        })

    });

    //키보드 이벤트를 통해서 fullpage 슬라이드 제어 
    //$("선택자").이벤트명(function(){실행문}); ==> 기존에 어떤 완성이 종료된 시점에서 접근시 작성 ==> 이벤트관련 실행에 대한 메모리 값(실행문)을 브라우저가 로딩시 저장
    //$(document).on("이벤트명", "선택자" , function(){실행문}); ==> 기존에 완성된 구조가 존재하든 말든 상관없이 이벤트가 발생되는 시점까지 무조건 기다린다. (DOM이라는 구조에서) ==> 이벤트관련 실행에 대한 메모리 값(실행문)을 이벤트가 발생되는 시점에서 저장


    //키보드 keycode
    //상방향 : 38 / PageUp : 33
    //하방향 : 40 / PageDown : 34
    //home : 36 / end : 35

    var key_num = 0;
    $(document).on("keydown", function(evt){
        //console.log(evt);
        console.log(evt.keyCode); //숫자형 데이터 
        key_num = evt.keyCode;

        var $target = $(".box.active").index(); // $(elm+".active")
        if(key_num == 40 || key_num == 34){
            try{
                $("html, body").stop().animate({scrollTop : $(elm).eq($target + 1).offset().top}, 500);
                $(elm).removeClass("active");
                $(elm).eq($target + 1).addClass("active");
                $("header li").removeClass("active");
                $("header li").eq($target + 1).addClass("active");
            }catch(evt){

            }
        }else if(key_num == 38 || key_num == 33){
            try{
                $("html, body").stop().animate({scrollTop : $(elm).eq($target - 1).offset().top}, 500);
                $(elm).removeClass("active");
                $(elm).eq($target - 1).addClass("active");
                $("header li").removeClass("active");
                $("header li").eq($target - 1).addClass("active");
            }catch(evt){

            }
        }

    });









});