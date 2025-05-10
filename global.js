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
    { url: 'meta/', title: 'Meta'},
    { url: 'https://github.com/uhlexa/portfolio', title: 'GitHub'}
    // add the rest of your pages here
  ];

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
? "/"                  // Local server
: "/portfolio/";         // GitHub Pages repo name


let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // next step: create link and add it to nav

    url = !url.startsWith('http') ? BASE_PATH + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);


    a.classList.toggle(
        'current',
        a.host === location.host && a.pathname === location.pathname,
    );

    if (a.host !== location.host) {
        a.target = "_blank";
    }
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
          Theme:
          <select id="color-scheme-select">
            <option value="light dark" id="auto-option">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
      </label>`,
  );
const select = document.querySelector('#color-scheme-select')

if ("colorScheme" in localStorage) {
    const saved = localStorage.colorScheme;
    setColorScheme(saved);
    select.value = saved;
}

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
//   document.documentElement.style.setProperty('color-scheme', event.target.value);
  setColorScheme(event.target.value);
  localStorage.colorScheme = event.target.value;
});

function setColorScheme(scheme) {
    document.documentElement.style.setProperty('color-scheme', scheme);
}

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(project, containerElement, headingLevel = 'h2') {
  // Your code will go here
  containerElement.innerHTML = '';

  if (!Array.isArray(project)) {
    console.error('"projects" not an array');
    return;
  }

  if (!(containerElement instanceof Element)) {
    console.error('"containerElement" not a valid DOM element');
    return;
  }

  const projectsTitle = document.querySelector('.projects-title');
  console.log('Projects:', project);

  // If there's a valid title element, update the project count
  if (projectsTitle) {
    projectsTitle.textContent = `${project.length} Projects`; // Update the title to include the count
  }

  for (const pro of project) {
    const article = document.createElement('article');

    article.innerHTML = `
    <h3>${pro.title}</h3>
    <img src="${pro.image}" alt="${pro.title}">
    <div class="info">
      <p>${pro.description}</p>
      <p class="year">${pro.year}</p>
    </div>
    `;
    containerElement.appendChild(article);
  }

}



export async function fetchGitHubData(username) {
  // return statement here
  return fetchJSON(`https://api.github.com/users/${username}`);
  
}


