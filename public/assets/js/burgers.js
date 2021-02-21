// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  // UPDATE
  const devourBtns = document.querySelectorAll(".eat");

  // Set up the event listener for the create button
  if (devourBtns) {
    devourBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        let eaten = e.target.getAttribute("data-eaten");
        if (eaten === "false") {
          eaten = false;
        } else {
          eaten = true;
        }

        const newEatenState = {
          devoured: !eaten,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newEatenState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page
          if (response.ok) {
            console.log(`changed devour to: ${eaten}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }


// CREATE
const submitBurgerBtn = document.getElementById("submit");
const textarea = document.getElementById("newBurgerInput");

  submitBurgerBtn.addEventListener("click", (e) => {
    console.log("click");
    e.preventDefault();

    // Grabs the value of the textarea that goes by the name, "newBurgerInput"
    const newBurger = {
      burger_name: textarea.value.trim(),
      devoured: 0,
    };

    // Send POST request to create a new burger
    fetch("/api/burgers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      // make sure to serialize the JSON body
      body: JSON.stringify(newBurger),
    }).then(() => {
      // Empty the form
      document.getElementById("newBurgerInput").value = "";

      // Reload the page so the user can see the new quote
      console.log("Created a new Burger!");
      location.reload("/");
    });
  });
});
