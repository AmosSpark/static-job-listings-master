// SELECT VARIABLES
const bodyOfPage = document.querySelector("body"), // body
  container = document.querySelector(".container"), // render space
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

// PROMISE SETTLED RESULT - EITHER FULFILLED OR REJECTED

fetchData()
  .then((data) => {
    data.forEach((d) => {
      /*
        // Set company name
      */
      const profileName = d.company,
        /*
          // Set new & featured job value
      */
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
        /*
          // Set tablets
      */
        tabletData = [
          d.role,
          d.level,
          ...(d.languages || []),
          ...(d.tools || []),
        ]; // get tablet data
      const convertTabletDataToHTML = tabletData.map(
        // convert tablet data in array to HTML
        (tablet) => `<p>${tablet}</p>`
      );
      let tablet = "";
      convertTabletDataToHTML.forEach((convertedData) => {
        tablet += convertedData; // append converted tablet data to tablet variable
      });

      /* 
        // Append jobs to container
      */

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
    /*
      // Insert filterbar before container
    */
    filterBar.innerHTML = `<a href="#" class="clearFilter">Clear</a>`;
    filterBar.style.display = "none";
    filterBar.className = "filterBar";
    bodyOfPage.insertBefore(filterBar, container);
    console.log(filterBar);
  })
  .then(() => {
    /*
    // Add border style to first & second elements of the container
  */
    container.firstElementChild.classList.add("jobs--border");
    container.firstElementChild.nextElementSibling.classList.add(
      "jobs--border"
    );
  })
  .then(() => {
    /*
      // Apeend footer to container
    */
    container.innerHTML += `
   </div>
   <div class="attribution">
     Challenge by
     <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
       >Frontend Mentor</a
     >. Coded by <a href="https://devcareer.io/amosspark">Spark</a>.
   </div>
   `;
  })
  .then(() => {
    // To add a filter, the user needs to click on the tablets on the right-side of the listing on desktop or the bottom on mobile.
    //set array object
    const filterLIst = [];
    // set click event for tablet
    const tabletPanel = document.querySelectorAll(".tablet");
    tabletPanel.forEach((tablet) => {
      tablet.addEventListener("click", (e) => {
        // push clicked tab to filter list array
        filterLIst.push(e.target.textContent);
        console.log(filterLIst);
        // display filter list on filter tab
        filterBar.style.display = "flex";
        // For each filter added, only listings containing all selected filters should be returned.
      });
    });
    // display filter list on filter tab
  })
  .catch((error) => error);
