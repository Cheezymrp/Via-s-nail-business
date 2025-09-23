
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyADKUORBKTx5wEdCB7lL744kMcTfoEL5Ac",
    authDomain: "via-swebsite.firebaseapp.com",
    projectId: "via-swebsite",
    storageBucket: "via-swebsite.firebasestorage.app",
    messagingSenderId: "365516769245",
    appId: "1:365516769245:web:38edbcaef0be7a0c5d1834"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const reviewerName = document.getElementById('reviewerName');
    const reviewText = document.getElementById('reviewText');
    const ratingInputs = reviewForm.querySelectorAll('input[name="rating"]');

    async function loadReviews() {
        const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        let html = '';
        querySnapshot.forEach((doc) => {
            const r = doc.data();
            html += `<div class='review-item'>
                <span class=\"stars\">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</span>
                <strong>${r.name}</strong><br>${r.text}
            </div>`;
        });
        reviewsList.innerHTML = '<h3>What others are saying:</h3>' + (html || '<p>No reviews yet. Be the first!</p>');
    }

    reviewForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = reviewerName.value.trim() || 'Anonymous';
        const text = reviewText.value.trim();
        let rating = 0;
        ratingInputs.forEach(input => { if (input.checked) rating = parseInt(input.value); });
        if (text && rating > 0) {
            await addDoc(collection(db, "reviews"), {
                name,
                text,
                rating,
                timestamp: Date.now()
            });
            reviewForm.reset();
            loadReviews();
        }
    });

    loadReviews();
});
