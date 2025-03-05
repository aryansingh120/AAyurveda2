import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import img1 from "../assets/aryan2.jpeg";

const reviewsData = [
  {
    id: 1,
    userImg: img1,
    name: "Aryan Singh",
    rating: 5,
    date: "04/07/2023",
    text: "Amazing product! Works perfectly.",
    likes: 10,
    dislikes: 2,
  },
  {
    id: 2,
    userImg: img1,
    name: "the_not_aryan",
    rating: 4,
    date: "04/07/2023",
    text: "Very good, but could be improved in some areas.",
    likes: 5,
    dislikes: 1,
  },{
    id: 1,
    userImg: img1,
    name: "Aryan Singh",
    rating: 5,
    date: "04/07/2023",
    text: "Amazing product! Works perfectly.",
    likes: 10,
    dislikes: 2,
  },
  {
    id: 2,
    userImg: img1,
    name: "the_not_aryan",
    rating: 4,
    date: "04/07/2023",
    text: "Very good, but could be improved in some areas.",
    likes: 5,
    dislikes: 1,
  },{
    id: 1,
    userImg: img1,
    name: "Aryan Singh",
    rating: 5,
    date: "04/07/2023",
    text: "Amazing product! Works perfectly.",
    likes: 10,
    dislikes: 2,
  },
  {
    id: 2,
    userImg: img1,
    name: "the_not_aryan",
    rating: 4,
    date: "04/07/2023",
    text: "Very good, but could be improved in some areas.",
    likes: 5,
    dislikes: 1,
  },{
    id: 1,
    userImg: img1,
    name: "Aryan Singh",
    rating: 5,
    date: "04/07/2023",
    text: "Amazing product! Works perfectly.",
    likes: 10,
    dislikes: 2,
  },
  {
    id: 2,
    userImg: img1,
    name: "the_not_aryan",
    rating: 4,
    date: "04/07/2023",
    text: "Very good, but could be improved in some areas.",
    likes: 5,
    dislikes: 1,
  }
];

const Review = () => {
  const [sortOption, setSortOption] = useState("latest");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email is required";
    if (rating === 0) newErrors.rating = "Please select a rating";
    if (!title) newErrors.title = "Review title is required";
    if (!reviewText) newErrors.reviewText = "Review description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Review submitted successfully!");
      setShowForm(false);
    }
  };

  const handleLike = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const handleDislike = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, dislikes: review.dislikes + 1 } : review
      )
    );
  };

  return (
    <div className="p-4 max-w-6xl mx-auto border-t mt-4">
      <div className="mb-6 flex flex-col md:flex-row justify-between md:items-end">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">4.9 ★★★★★</h2>
          <p className="text-gray-600">Based on 31 Reviews</p>
          <div className="mt-2 space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span>{stars} ★</span>
                <div className="w-40 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-orange-500 rounded-full" style={{ width: `${stars * 20}%` }}></div>
                </div>
                <span className="text-gray-600">({stars * 6})</span>
              </div>
            ))}
          </div>
        </div>
        <button 
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          onClick={() => setShowForm(!showForm)}
        >
          Write a Review
        </button>
      </div>
      <div className="flex justify-between items-center border-t pt-2">
        <p className="text-lg font-medium">2 Reviews</p>
        <select className="border p-2 rounded mt-2 md:mt-0" onChange={(e) => setSortOption(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>
      {showForm && (
        <div className="mt-4 p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Write Your Review</h3>
          <input type="text" placeholder="Enter your name" className="w-full p-2 border rounded mb-2" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <div className="mb-2">
            <span className="block font-semibold">Rating</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < rating ? "text-yellow-500 cursor-pointer" : "text-gray-300 cursor-pointer"} onClick={() => setRating(i + 1)} />
              ))}
            </div>
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
          </div>
          <input type="text" placeholder="Title of Review" className="w-full p-2 border rounded mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          <textarea placeholder="How was your overall experience?" className="w-full p-2 border rounded mb-2" rows="4" value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
          {errors.reviewText && <p className="text-red-500 text-sm">{errors.reviewText}</p>}
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600" onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviewsData.map((review) => (
          <div key={review.id} className="flex flex-col p-4 border rounded-lg shadow-md text-center">
            <img src={review.userImg} alt="User" className="w-12 h-12 rounded-full mx-auto" />
            <h3 className="font-semibold text-lg mt-2">{review.name}</h3>
            <span className="text-sm text-gray-500">{review.date}</span>
            <div className="flex justify-center items-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-1">{review.text}</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
              <span className="text-xs">This was helpful?</span>
              <button onClick={() => handleLike(review.id)} className="flex items-center gap-1 px-2 py-1 border rounded-md hover:bg-gray-100">
                <ThumbsUp size={16} /> {review.likes}
              </button>
              <button onClick={() => handleDislike(review.id)} className="flex items-center gap-1 px-2 py-1 border rounded-md hover:bg-gray-100">
                <ThumbsDown size={16} /> {review.dislikes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;