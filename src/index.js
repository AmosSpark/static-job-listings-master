// SELECT GLOBAL VARIABLES
const bodyOfPage = document.querySelector("body"), // body
  container = document.querySelector(".container"); // render space
filterBar = document.createElement("div"); // filter-bar / container

// WRAP FETCH IN A PROMISE

const fetchData = () => {
  const pass = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  // Fetch Data
  return new Promise((resolve, reject) => {
    fetch("data.json", pass)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// PROMISE SETTLED RESULT

fetchData()
  .then((data) => {
    data.forEach((d) => {
      // SET CONTAINER VARIABLES
      // Set company name
      const profileName = d.company,
        // Set new & featured job value using tenary operator
        newJob =
          d.new === true
            ? `<span class="category__new category__new--round">New!</span>`
            : "",
        featuredJob =
          d.featured === true
            ? `<span class="category__featured category__featured--round">
        Featured
      </span>`
            : "",
        // Set tablets using array spread method
        // 1- get tablet data
        tabletData = [
          d.role,
          d.level,
          ...(d.languages || []),
          ...(d.tools || []),
        ];
      // 2- convert tablet data in array to HTML
      const convertTabletDataToHTML = tabletData.map(
        (tablet) => `<p>${tablet}</p>`
      );
      // 3 - append converted tablet data to tablet variable
      let tablet = "";
      convertTabletDataToHTML.forEach((convertedData) => {
        tablet += convertedData;
      });

      // APPEND JOBS TO CONTAINER

      container.innerHTML += `
      <div class="jobs">
      <!-- Item Start -->
      <div class="dp">
        <figure>
          <img src ="${d.logo}">
        </figure>
      </div>
      <div class="profile">
        <!--Profile-->
        <div class="grp">
          <div class="profile__category">
            <p class="profile__name">
              ${profileName}
              ${newJob}
              ${featuredJob}
            </p>
          </div>
          <p class="profile__title">${d.position}</p>
          <div class="profile__time-loc">
            <div class="time-loc__posted">
              <p>${d.postedAt}</p>
            </div>
            <span>.</span>
            <div class="time-loc__type">
              <p>${d.contract}</p>
            </div>
            <span><b>.</b></span>
            <div class="time-loc__location">
              <p>${d.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tablet">
        ${tablet}
      </div>
      `;
    });
  })
  .then(() => {
    // Apeend footer to container
    appendFooter();
  })
  .then(() => {
    // Insert filterbar before container
    insertFilterBarToContainer();
  })
  .then(() => {
    // Render filterbar
    renderFilterBar();
  })
  .then(() => {
    // Add border style to first & second elements of the container
    addBorderStyle();
  })
  .catch((error) => error);

// RESOLVED FUNCTIONS

const appendFooter = () => {
  container.innerHTML += `
     </div>
     <div class="attribution">
       Challenge by
       <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
         >Frontend Mentor</a
       >. Coded by <a href="https://devcareer.io/amosspark">Spark</a>.
     </div>
     `;
};

const insertFilterBarToContainer = () => {
  filterBar.style.display = "none";
  filterBar.className = "filterBar";
  bodyOfPage.insertBefore(filterBar, container);
};

const renderFilterBar = () => {
  //set array object
  const filterList = [];
  // set click event for tablet
  const tabletPanel = document.querySelectorAll(".tablet");
  tabletPanel.forEach((tablet) => {
    tablet.addEventListener("click", (e) => {
      // push clicked tab to filter list array
      filterList.push(
        `<p>${e.target.textContent}</p>` + `<span class="cancel">X</span>`
      );
      // filterList.push(
      //   `<p>${e.target.textContent}<span class="cancel">X</span></p>`
      // );
      console.log(filterList);
      // display filter list on filter tab
      const formatedFilterList = filterList.join("");
      filterBar.style.display = "flex";
      filterBar.innerHTML = formatedFilterList;
      filterBar.innerHTML += `<a href="#" class="clearFilter">Clear</a>`;
    });
  });
};

const addBorderStyle = () => {
  container.firstElementChild.classList.add("jobs--border");
  container.firstElementChild.nextElementSibling.classList.add("jobs--border");
};
