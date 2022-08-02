//pc 탭메뉴
const btns = document.querySelectorAll(".btns li"); 
const boxs = document.querySelectorAll(".shop article"); 
 
for(let i=0; i<btns.length; i++){
    btns[i].addEventListener("click", ()=>{
        activation(i, btns); 
        activation(i, boxs);          
    })
}
 
function activation(index, list){ 
    for(let el of list){
        el.classList.remove("on"); 
    }
    list[index].classList.add("on");
}

//모바일 탭메뉴?.....
const lists = document.querySelectorAll(".shop article ul li");
const lists_open = document.querySelectorAll("shop article ul li .map");

for(let i=0; i<lists.length; i++){
    lists[i].addEventListener("click", ()=>{
        activation(i, lists); 
        activation(i, lists_open);          
    })
}


//지도
var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
const shopWrap = document.querySelectorAll(".shop li");
var mapOption = { 
        center: new kakao.maps.LatLng(37.51271547467465, 127.05876002108529), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 


setDraggable(true);
setZoomable(true);


// 마커를 표시할 위치와 title 객체 배열입니다 
let markerOptions = [
    {
        title: '본점', 
        latlng: new kakao.maps.LatLng(37.51271547467465, 127.05876002108529),
        imgSrc : "img/marker1.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 99)},// 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        button : branch_btns[0]
    },
    {
        title: '지점1', 
        latlng: new kakao.maps.LatLng(37.51034329078403, 127.04387351548293),
        imgSrc : "img/marker2.png",
        imgSize : new kakao.maps.Size(116, 99),
        imgPos : {offset: new kakao.maps.Point(27, 69)},
        button : branch_btns[1]


    },
    {
        title: '지점2', 
        latlng: new kakao.maps.LatLng(37.47787650773127, 127.12461059979591),
        imgSrc : "img/marker3.png",
        imgSize : new kakao.maps.Size(116, 99),
        imgPos : {offset: new kakao.maps.Point(27, 69)},
        button : branch_btns[2]


    }
];

//마커 이미지를 해당위치에 위치시킴
for (let i=0; i < markerOptions.length; i ++) {
    
    // 마커 이미지를 생성합니다    
    let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerOptions[i].latlng, // 마커를 표시할 위치
        title : markerOptions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)// 마커 이미지 

    }) 

    branch_btns[i].addEventListener("click", e=>{//브랜치버튼을 클릭했을때
        e.preventDefault();
        //버튼 활성화
        for(let btn of branch_btns){
            btn.classList.remove("on");
        }
        branch_btns[i].classList.add("on");

        //해당 위치로 이동
        moveTo(markerOptions[i].latlng)

    })
    

}

function moveTo(target){
    let moveLatLon = target;
    map.setCenter(moveLatLon);
}

/*----------------------------------------------------------------------------------
// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.51271547467465, 127.05876002108529); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);    
---------------------------------------------------------------------------------*/



window.addEventListener("resize", ()=>{
    //현재 활성화되어있는 버튼의 순서값을 구해서
    //branch_btns - querySelectorAll 로 구한 유사배열

    let active = document.querySelector(".branch li.on");
    const branch = Array.from(branch_btns);//유사배열을 배열로 변환
    let active_index = branch.indexOf(active);
    console.log(active_index);
    
    //인수값에 활성화 순번 넣기
    map.setCenter(markerOptions[active_index].latlng);
})



// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

// 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);    
}

// 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}

 