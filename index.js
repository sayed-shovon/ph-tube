const dataContainer = document.getElementById('dataContainer');
const btnContainer = document.getElementById('btnContainer');

//fetch all category
var category = [];
const url = 'https://openapi.programming-hero.com/api/videos/categories';
fetch(url)
  .then(resp => resp.json())
  .then(function (data) {
    category = data.data;

    btnContainer.innerHTML = category
      .map(item => {
        return `<button class="btn ml-1 active" onclick="loadData(${item.category_id})">${item.category}</button>`;
      })
      .join('');
  });

//fetch all videos
loadData(1000);

//load data by category
function loadData(item) {
  const url2 =
    'https://openapi.programming-hero.com/api/videos/category/' + item;
  fetch(url2)
    .then(resp => resp.json())
    .then(function (data) {
      videos = data.data;

      if (videos.length == 0) {
        dataContainer.innerHTML = `<img src="icon.png" alt="404" border="0">
          <h1 class="text-4xl">No Data Found</h1>
        `;
      } else {
        dataContainer.innerHTML = videos
          .map(item => {
            var date = mintoDay(item.others.posted_date);
            return `
          <div class="w-12/12 md:w-2/4 lg:w-1/4 p-2">
          <div class="col-span-12 sm:col-span-6 md:col-span-3">
      <card class="w-full flex flex-col">
        <div class="relative">

          <!-- Image Video -->
          <a href="#">
            <img src="${
              item.thumbnail
            }" class="w-96 h-[250px] shadow-xl rounded-xl" />
          </a>

          <p class="absolute right-9 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">${date}</p>
        </div>

        <div class="flex flex-row mt-2 gap-2">

          <!-- Profile Picture -->
          <a href="#">
            <img src="${
              item.authors[0].profile_picture
            }" class="rounded-full w-[45px] h-[45px]" />
          </a>

          <!-- Description -->
          <div class="flex flex-row">       
            <div class="flex flex-col">                 
              <p class="text-black-100 mt-3 text-sm font-semibold">${
                item.authors[0].profile_name
              }  </p> 
              </div>
              <div class="flex flex-col">
              ${
                item.authors[0].verified
                  ? '<img class="w-[15px] mt-3 ml-3" src="https://cdn-icons-png.flaticon.com/512/6928/6928921.png">'
                  : ''
              }
              </div>  
                          
          </div>

        </div>
      </card>
    </div>
          
          </div>
          `;
          })
          .join('');
      }
    });
}

function mintoDay(n) {
  var num = n;
  var h = num / 60;
  var m = Math.floor(num % 60);

  return m + ' hrs ' + m + ' min ago';
}



const dateFormat = seconds => {
  let formatedDate = '';

  const years = Math.floor(seconds / 31536000);
  const months = Math.floor((seconds % 31536000) / 26280000);
  const days = Math.floor(((seconds % 31536000) % 26280000) / 86400);
  const hours = Math.floor((((seconds % 31536000) % 26280000) % 86400) / 3600);
  const minutes = MAth.floor(
    ((((seconds % 31536000) % 2628000) % 86400) % 3600) / 60
  );

  if (years > 0) {
    formatedDate += years + ' years ';
  }
  if (months > 0) {
    formatedDate += months + ' months ';
  }

  if (days > 0) {
    formatedDate += days + ' days ';
  }
  if (hours > 0) {
    formatedDate += hours + ' hours ';
  }
  if (minutes > 0) {
    formatedDate += minutes + ' minutes ';
  }
  return formatedDate + ' ago ';
};