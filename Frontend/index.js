// async function fetchReviews() {

//   try {
    
 
//   const response = await fetch(
//     "http://localhost:8000/api/users/review/fetchall"
//   );
//   const data = await response.json();

//   const reviewsContainer = document.getElementById("reviews-container");
//   reviewsContainer.innerHTML = ""; // Clear existing reviews

//   console.log("review data " ,data)

//   data.data.reviews.forEach((review) => {
//     const reviewDiv = document.createElement("div");
//     reviewDiv.classList.add("review");
//     reviewDiv.innerHTML = `
//             <div class="elementor-star-rating__wrapper">
//                 <div class="elementor-star-rating" title="${
//                   review.rating
//                 }/5" itemtype="http://schema.org/Rating" itemscope="" itemprop="reviewRating">
//                     ${"★".repeat(review.rating)}
//                     <span itemprop="ratingValue" class="elementor-screen-only">${
//                       review.rating
//                     }/5</span>
//                 </div>
//             </div>
//             <p>${review.content}</p>
//         `;
//     reviewsContainer.appendChild(reviewDiv);
//     console.log(review.content)
//   });
// } catch (error) {
//      console.log(error)
// }
// }


// async function fetchReviews() {
//   try {
//     const response = await fetch(
//       "http://localhost:8000/api/users/review/fetchall"
//     );
//     const data = await response.json();

//     const reviewsContainer = document.getElementById("reviews-container");
//     reviewsContainer.innerHTML = ""; // Clear existing reviews

//     console.log("review data ", data);

//     // Dynamically create a style element and append it to the document's head
//     const styleElement = document.createElement("style");
//     styleElement.innerHTML = `
//       .elementor--star-style-star_unicode .elementor-star-rating i:not(.elementor-star-empty):before {
//         content: "★";
//       }
//     `;
//     document.head.appendChild(styleElement);

//     data.data.reviews.forEach((review) => {
//       const reviewDiv = document.createElement("div");
//       reviewDiv.classList.add("review");
//       reviewDiv.innerHTML = `
//         <div class="elementor-star-rating__wrapper">
//           <div class="elementor-star-rating" title="${
//             review.rating
//           }/5" itemtype="http://schema.org/Rating" itemscope="" itemprop="reviewRating">
//             ${"★".repeat(review.rating)}
//             <span itemprop="ratingValue" class="elementor-screen-only">${
//               review.rating
//             }/5</span>
//           </div>
//         </div>
//         <p>${review.content}</p>
//       `;
//       reviewsContainer.appendChild(reviewDiv);
//       console.log(review.content);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }


async function fetchReviews() {
  try {
      const response = await fetch(
          "http://localhost:8000/api/users/review/fetchall"
      );
      const data = await response.json();

      const reviewsContainer = document.getElementById("reviews-container");
      reviewsContainer.innerHTML = ""; // Clear existing reviews

      console.log("review data ", data);

      // Create a style element and set its innerHTML to include the provided CSS
     
      data.data.reviews.forEach((review) => {
          const reviewDiv = document.createElement("div");
          reviewDiv.classList.add("review");
          reviewDiv.innerHTML = `
          <div class="elementor-star-rating__wrapper">
          <div class="elementor-star-rating"  title="${
            review.rating
        }/5" itemtype="http://schema.org/Rating" itemscope="" itemprop="reviewRating">
        ${"⭐".repeat(review.rating)}
             
              <span itemprop="ratingValue" class="elementor-screen-only">5/5</span>
          </div>
      </div>
      <div class="elementor-testimonial-content">${review.content}</div>
    
      <div class="elementor-testimonial-meta elementor-has-image elementor-testimonial-image-position-aside">
              <div class="elementor-testimonial-meta-inner">
                  <div class="elementor-testimonial-details">
                     <div class="elementor-testimonial-name">${review?.user?.firstName} ${review?.user?.lastName}</div>              
                  </div>                                                                          
              </div>
       </div>
          `;
          reviewsContainer.appendChild(reviewDiv);
          console.log(review.content);
      });
  } catch (error) {
      console.log(error);
  }
}



// Function to handle form submission
document
  .getElementById("review-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!localStorage.getItem("accessToken")) {
      alert("Not logged in");
      return; // Prevent further execution
    }

    const formData = new FormData(event.target);
    const content = formData.get("content");
    const rating = formData.get("rating");

    console.log(content, rating);

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/review/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Adjust according to your authentication method
          },
          body: JSON.stringify({ content, rating }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      // Refresh reviews after submission
      event.target=''
      await fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error.message);
      // Handle error (e.g., display error message to the user)
    }
  });

// Fetch reviews when the page loads
window.addEventListener("load", async () => {
  await fetchReviews();
});
