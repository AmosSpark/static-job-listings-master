const container = document.querySelector(".container");

// WRAP FETCH IN A PROMISE

let promise = new Promise((resolve, reject) => {
  const pass = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  // FETCH DATA

  fetch("data.json", pass)
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

promise
  .then((data) => {
    data.forEach((d) => {
      /*
        // Set new & featured job value
      */
      const newJob =
          d.new === true
            ? `<span class="category__new category__new--round">New!</span>`
            : "",
        featuredJob =
          d.featured === true
            ? `<span class="category__featured category__featured--round">
        Featured
      </span>`
            : "";
      /*
        // Append jobs to container
      */
      container.innerHTML += `
      <div class="photosnap">
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
        <!-- Role -->
        <p class="tablet__role" data-role="frontend">
          ${d.role}
        </p>
        <!-- Level -->
        <p class="tablet__level" data-level="senior">${d.level}</p>
        <!-- Languages -->
        <p class="tablet__language" data-languages="html">HTML</p>
        <p class="tablet__language" data-languages="css">CSS</p>
        <p class="tablet__language" data-languages="javascript">JavaScript</p>
      </div>
      `;
    });
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
