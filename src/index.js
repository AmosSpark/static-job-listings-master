const container = document.querySelector(".container"),
  filterList = [];

// WRAP FETCH IN A PROMISE

const fetchData = () => {
  const pass = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  // FETCH DATA
  return new Promise((resolve, reject) => {
    fetch("data.json", pass)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// CHECK FILTER
const checkFilter = (compareList) => {
  return filterList.every((el) => compareList.indexOf(el) >= 0);
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
        filter = [d.role, d.level, ...(d.languages || []), ...(d.tools || [])];
      let tablet = "";

      filterList.length === 0 || checkFilter(filter)
        ? filter.forEach((filt) => {
            tablet += `<p>${filt}</p>`;
          })
        : "";

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
    /*
      // Add border style to first & second elements of the container
    */
    container.firstElementChild.classList.add("jobs--border");
    container.firstElementChild.nextElementSibling.classList.add(
      "jobs--border"
    );
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
  .catch((error) => error);
