console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
//   );

//   currentLink?.classList.add('current');

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'Resume/', title: 'Resume'},
    { url: 'contact/', title: 'Contact'},
    { url: 'https://github.com/uhlexa', title: 'GitHub'}
    // add the rest of your pages here
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // next step: create link and add it to nav
    nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
}
