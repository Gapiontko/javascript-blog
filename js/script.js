{const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.author .list';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* [Done] Remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [Done] Add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [Done] Remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [Done] Get 'href' attribute from the clicked link */
  const clickedLink = clickedElement.getAttribute('href');

  /* [Done] Find the correct article using the selector (value of 'href' attribute) */
  const currentArticle = document.querySelector(clickedLink);

  /* Add class 'active' to the correct article */
  currentArticle.classList.add('active');
};

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

const calculateTagsParams = function (tags){
  const params = {min: 999999, max: 0};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if (tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
};
const calculateTagClass = function (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix, classNumber;
};

const generateTags = function(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles =document.querySelectorAll(optArticleSelector);

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

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + ' </span></a></li>';

      /* add generated code to html variable */
      html = html + tagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in the right column */
  const tagList = document.querySelector('.tags');
  console.log(tagList);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<a href="#tag-' + tag + '" class="'+ optCloudClassPrefix + calculateTagClass (allTags[tag], tagsParams) + '"><span>' + tag + '</span></a>';
    console.log(allTagsHTML);

  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
};

generateTags();

const tagClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace ('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

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

  /* START LOOP: for each link */
  for (let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

const calculateAuthorsParams = function (authors){
  const params = {min: 999999, max: 0};
  for(let author in authors){
    if(authors[author] > params.max){
      params.max = authors[author];
    }
    if (authors[author] < params.min){
      params.min = authors[author];
    }
    console.log(author + ' is used ' + authors[author] + ' times');
  }
  return params;
};

const generateAuthors = function(){
  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find author wrapper - place in html where author will be placed on site */
    const author = article.querySelector(optArticleAuthorSelector);
    author.innerHTML = '';

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute ('data-author');

    /* generate HTML of the link */
    const authorHTML = '<span> by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</span></a>';

    /* add generated code to html variable */
    html = html + authorHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[author]) {
    /* [NEW] add tag to allTags object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    /* insert HTML of all the links into the author wrapper */  author.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector('.authors');

  /* [NEW] create variable for all links HTML code */
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
  /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += author + '(' + allAuthors[author] + ')';
    console.log(allAuthorsHTML);
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  authorsList.innerHTML = allAuthorsHTML;
};

generateAuthors();

const authorClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /* Get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace ('#author-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

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

  /* START LOOP: for each link */
  for (let authorLink of authorLinks){
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

}
