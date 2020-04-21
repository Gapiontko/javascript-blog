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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

const generateTitleLinks = function (customSelector = ''){
  let html = '';

  /* Remove contents of titleList  */
  const titleList = document.querySelector (optTitleListSelector);
  titleList.innerHTML = '';

  /* For each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};
generateTitleLinks ();

const generateTags = function(){
  /* find all articles */
  const articles =document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper - list in html where tags will be placed on site */
    const tagList = article.querySelector(optArticleTagsSelector);
    tagList.innerHTML = '';
    console.log(tagList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute ('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + ' </span></a></li>';
      console.log(tagHTML);

      /* add generated code to html variable */
      html = html + tagHTML;

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;

  /* END LOOP: for every article: */
  }
};

generateTags();

const tagClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace ('#tag-', '');
  console.log('tag');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for (let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

const generateAuthors = function(){
  /* find all articles */
  const articles =document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find author wrapper - place in html where author will be placed on site */
    const author = article.querySelector(optArticleAuthorSelector);
    author.innerHTML = '';
    console.log(author);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute ('data-author');
    console.log(articleAuthor);

    /* generate HTML of the link */
    const authorHTML = '<span> by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</span></a>';
    console.log(authorHTML);

    /* add generated code to html variable */
    html = html + authorHTML;


    /* insert HTML of all the links into the author wrapper */  author.innerHTML = html;

  /* END LOOP: for every article: */
  }
};

generateAuthors();

const authorClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* Get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace ('#author-', '');
  console.log('author');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthors);

  /* START LOOP: for each active tag link */
  for (let activeAuthor of activeAuthors){

    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
};

function addClickListenersToAuthors(){
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each link */
  for (let authorLink of authorLinks){
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

}
