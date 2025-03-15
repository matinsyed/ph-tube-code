function removeActiveClass(){
  const activeBtns = document.getElementsByClassName("active");
  for (let activeBtn of activeBtns){
    activeBtn.classList.remove("active");
    //  console.log(activeBtn);
  }
  }
  


function loadCategories() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));

}

const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideoCard(data.videos)
    })
}

function displayCategory(categories) {
  const categoryContainer = document.getElementById("categories-container");

  categories.forEach(element => {
    const categoryDiv = document.createElement("div")
    categoryDiv.innerHTML = `
            <button id="btn-${element.category_id}" onClick = loadCategoryVideo(${element.category_id}) class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${element.category}</button>
       `
    categoryContainer.append(categoryDiv);
  });
}


const loadCategoryVideo = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    removeActiveClass();
    const clickedBtn = document.getElementById(`btn-${id}`)
    clickedBtn.classList.add("active")
    displayVideoCard(data.category)
  })
  // console.log(url);
}


// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

function displayVideoCard(videos) {
  const videoCardContainerId = document.getElementById("video-card-container");
  videoCardContainerId.innerHTML = '';
  if(videos.length ==0){
    videoCardContainerId.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center mt-10">
            <img src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
    `;
  }
  
  // console.log(videoCardContainerId)
  videos.forEach(element => {
    const videoCardDiv = document.createElement('div');
    let verifiedIcon = '';
    if (element.authors[0].verified) {
      verifiedIcon = '<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">';
    }

    videoCardDiv.innerHTML = `
           <div class="card bg-base-100 shadow-sm">
            <figure class="relative mb-3">
              <img class="w-full h-[150px] object-cover"
                src="${element.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 bg-black text-sm text-white rounded-md px-2">3hrs 56 min ago</span>
            </figure>
            <div class="px-0 gap-3 flex">
                <div class="profile">
                    <div class="avatar w-5 h-5 px-0">
                        <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                          <img 
                          class="" src="${element.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>       
                <div class="intro">
                    <h2 class="text-sm font-semibold">${element.title}</h2>
                    <p class="text-sm  text-gray-400 flex gap-2">${element.authors[0].profile_name}                    
                      ${verifiedIcon}
                    </p>
                    <p class="text-sm  text-gray-400">${element.others.views} views</p>
                </div>       
            </div>
          </div>
        `;

    videoCardContainerId.append(videoCardDiv)

    // console.log(element)
  })
  // console.log(videos)
}

loadCategories();
// loadVideos();