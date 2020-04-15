{const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [Done] Remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [Done] Add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [Done] Remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [Done] Get 'href' attribute from the clicked link */
  const clickedLink = clickedElement.getAttribute('href');
  console.log(clickedLink);

  /* [Done] Find the correct article using the selector (value of 'href' attribute) */
  const currentArticle = document.querySelector(clickedLink);
  console.log(currentArticle);

  /* Add class 'active' to the correct article */
  currentArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

const generateTitleLinks = function (){
  let html = '';

  /* Remove contents of titleList  */
  const titleList = document.querySelector (optTitleListSelector);
  titleList.innerHTML = '';

  /* For each article */
  const articles =document.querySelectorAll(optArticleSelector);
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute ('id');

    /* find the article title */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create html of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  /* display the selcted article in the main section */
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};
generateTitleLinks ();
}
