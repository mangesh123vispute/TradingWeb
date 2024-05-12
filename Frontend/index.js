// async function fetchReviews() {
//     const response = await fetch('http://localhost:8000/api/users/review/fetchall');
//     const data = await response.json();

//     const reviewsContainer = document.getElementById('reviews-container');
//     reviewsContainer.innerHTML = ''; // Clear existing reviews

//     data.reviews.forEach(review => {
//         const reviewDiv = document.createElement('div');
//         reviewDiv.classList.add('review');
//         reviewDiv.innerHTML = `
//             <div class="elementor-star-rating__wrapper">
//                 <div class="elementor-star-rating" title="${review.rating}/5" itemtype="http://schema.org/Rating" itemscope="" itemprop="reviewRating">
//                     ${'*'.repeat(review.rating)}
//                     <span itemprop="ratingValue" class="elementor-screen-only">${review.rating}/5</span>
//                 </div>
//             </div>
//             <p>${review.content}</p>
//         `;
//         reviewsContainer.appendChild(reviewDiv);
//     });
// }

// // Function to handle form submission
// document.getElementById('review-form').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const content = formData.get('content');
//     const rating = formData.get('rating');

//     try {
//         const response = await fetch('http://localhost:8000/api/users/review/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Adjust according to your authentication method
//             },
//             body: JSON.stringify({ content, rating })
//         });

//         if (!response.ok) {
//             const data = await response.json();
//             throw new Error(data.message);
//         }

//         // Refresh reviews after submission
//         await fetchReviews();
//     } catch (error) {
//         console.error('Error submitting review:', error.message);
//         // Handle error (e.g., display error message to the user)
//     }
// });

// // Fetch reviews when the page loads
// window.addEventListener('load', async () => {
//     await fetchReviews();
// });