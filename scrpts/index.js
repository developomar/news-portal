const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();

  const buttonContainer = document.getElementById("button-container");
  data.data.news_category.forEach((item) => {
    const categoryButton = document.createElement("button");
    categoryButton.className = `category-button px-2 py-1 hover:text-[#5D5FEF] hover:bg-[#EEEFFF] duration-[0.5s] rounded-md`;
    categoryButton.innerText = item.category_name;
    categoryButton.addEventListener('click', () =>{
        loadNews(item.category_id)
        const allButtons = document.querySelectorAll('.category-button');
                for (const button of allButtons){
                    button.classList.remove('bg-[#EEEFFF]');
                    button.classList.remove('text-[#5D5FEF]');
                }
               categoryButton.classList.add('bg-[#EEEFFF]');
               categoryButton.classList.add('text-[#5D5FEF]');
        

    })
    buttonContainer.appendChild(categoryButton);
  });
};

const loadNews = async (categoryID) => {
    document.getElementById('loading').classList.remove('hidden')
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryID}`
  );
  const data = await response.json();

  const newsContainer = document.getElementById("news-container");
  const errorContent = document.getElementById('error-content')
    if(data.data.length === 0){
        errorContent.classList.remove('hidden')
        document.getElementById('loading').classList.add('hidden');
    }
    else {
        errorContent.classList.add('hidden')
    }
  newsContainer.innerHTML = ''
  
   
  data.data.forEach((item) => {
    document.getElementById('loading').classList.add('hidden');
    const newsDiv = document.createElement("div");
    newsDiv.className = `mt-[60px] flex justify-between items-center  gap-4 p-5 bg-[#FFF]  rounded-xl shadow-lg`;
    newsDiv.innerHTML = `
        <div class="w-[20%]"><img src="${item.thumbnail_url}" alt=""></div>
      <div class="w-[75%]">
        <h2 class="text-[#121221] text-[1.5rem] font-bold mb-3">${item.title}</h2>
        <p class="text-[#949494]">${item.details.slice(0,200)}...</p>
          <div class="flex items-center justify-between gap-4 mt-8">
            <div class="flex gap-3">
              <div class="w-[50px] h-[50px] "><img class="w-full h-full object-cover rounded-full" src="${item.author.img}" alt=""></div>
              <div>
                <p class="text-[#2B2C34] text-[1.125rem]">${item.author.name}</p>
                <p class="text-[#718797] text-[0.875rem]">${item.author.published_date} </p>
              </div>
            </div>
  
            <div class="flex gap-3">
              <img src="assets/carbon_view.png" alt="">
              <p class="text-[#515151] text-[1.125rem] font-bold"><span>${item.total_view}</span>M</p>
            </div>
  
            <div class="flex gap-2">
              <img src="assets/bxs_star-half.png" alt="">
              <img src="assets/ant-design_star-outlined.png" alt="">
              <img src="assets/ant-design_star-outlined.png" alt="">
              <img src="assets/ant-design_star-outlined.png" alt="">
              <img src="assets/ant-design_star-outlined.png" alt="">
            </div>
            <div><button><img src="assets/bi_arrow-right-short.png" alt=""></button></div>
          </div>
      </div>

        `;

    newsContainer.appendChild(newsDiv);
  });
};


const handleSearch = () => {
    const inputValue = document.getElementById('search-box').value;

    if(inputValue) {
        loadNews(inputValue)
    }
    else{
        alert('please enter a valid id')
    }

}

loadNews("01");

loadCategory();
