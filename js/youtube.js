/*
API key = "AIzaSyB5JZfJTpMHm2WfEEIid2Dt443MfKM9XAU";

데이터 요청 url = "https://www.googleapis.com/youtube/v3/playlistItems";

재생목록 id = "PL0niq1d_d9TMdO7g4cTijertcogNNZkDM" 

//옵션값 

part : 'snippet', 

maxResults : 불러올 영상 갯수 

playlistId : 재생목록 아이디 

*/
/*
const main = document.querySelector("main");

const key = "AIzaSyB5JZfJTpMHm2WfEEIid2Dt443MfKM9XAU";
const playlistId = "PL0niq1d_d9TMdO7g4cTijertcogNNZkDM";
const num = 6;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`; 
*/
const main = document.querySelector("main"); 
const key = "AIzaSyCGykznZWOOZr7B0qeYpPyra9ImsveL5Z0";
const playlistId = "PLYOPkdUKSFgX5CgKf68RJzJHec0XEdBNd";
const num = 6; 
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`; 

createList(url);


main.addEventListener("click", e=>{
    e.preventDefault();
    
    if(!e.target.closest("a"))return;//클릭한 대상이 부모가 a일때만 함수실행//다른 부분을 클릭할 때는 return으로 함수실행하지
    createPop(e);
});

document.body.addEventListener("click",e=>{
    closePop(e);
});

function closePop(e){
    const pop = document.querySelector("aside");
    if(pop){
        const close = pop.querySelector("span");
        if(e.target == close) pop.remove();
    }
}


function createPop(e){
    let vidId = e.target.parentElement.getAttribute("data-vid");
    // console.log(vidId);
 
    let pop = document.createElement("aside");
    pop.innerHTML = `
                     <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen width="100%" height="100%"></iframe>
                     <span class="close">CLOSE</span>
                     
     `;
 
     document.body.append(pop);
}

function createList(url){
    fetch(url)
    .then(data=>{
        return data.json();
    })
    .then(json=>{
        console.log(json.items);

        let items = json.items;
        let result ="";

        items.forEach(item=>{

            let tit = item.snippet.title;
            let desc = item.snippet.description;
            let date = item.snippet.publishedAt.split("T")[0];
           
            
            //if(tit.length > 50) tit = tit.substr(0,50)+"...";
            //if(desc.length > 100) desc = desc.substr(0,150)+"...";
            result +=`
                    <article>
                        <div class="con" data-vid="${item.snippet.resourceId.videoId}">
                            <span class="orderNum">01</span>
                            <h2>${tit}</h2>
                            <p>${desc}</p>
                            <span class="date">${date}</span>
                            
                        </div>
                        <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
							<img src="${item.snippet.thumbnails.standard.url}">
                        </a>
                    </article>

                    <article>
                        <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
							<img src="${item.snippet.thumbnails.standard.url}">
                        </a>
                        <div class="con" data-vid="${item.snippet.resourceId.videoId}">
                            <span class="orderNum">02</span>
                            <h2>${tit}</h2>
                            <p>${desc}</p>
                            <span class="date">${date}</span>
                        
                    </div>

                    </article>


                    
            `;

        });

        main.innerHTML = result;
    });
}











