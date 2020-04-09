const titleClickHandler = function(event){
  console.log('Link was clicked!');
  console.log(event);

  /* Remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* Add class 'active' to the clicked link */

  /* Remove class 'active' from all articles */
  const activeArticle = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');

  /* Get 'href' attribute from the clicked link */

  /* Find the correct article using the selector (value of 'href' attribute) */

  /* Add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
