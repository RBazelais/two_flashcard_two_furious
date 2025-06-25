import React, { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
	const cardSet = {
		title: "Data Structures",
		description: "Common data structures and their use cases",
		cards: [
			{
				difficulty: "Easy",
				question:
					"What data structure follows the Last In, First Out principle?",
				answer: "Stack",
			},
			{
				difficulty: "Easy",
				question:
					"What data structure follows the First In, First Out principle?",
				answer: "Queue",
			},
			{
				difficulty: "Medium",
				question:
					"What technique uses two pointers to traverse a sequence?",
				answer: "Two-Pointer",
			},
			{
				difficulty: "Medium",
				question:
					"What data structure is used for Breadth First Search?",
				answer: "Queue",
			},
			{
				difficulty: "Medium",
				question: "What data structure is used for Depth First Search?",
				answer: "Stack",
			},
			{
				difficulty: "Hard",
				question:
					"What data structure is used to efficiently store and search strings?",
				answer: "Trie",
			},
			{
				difficulty: "Medium",
				question:
					"What data structure is used to process tasks in a cyclic order?",
				answer: "Queue",
			},
			{
				difficulty: "Hard",
				question:
					"What data structure is used to efficiently retrieve the minimum or maximum element?",
				answer: "Heap",
			},
			{
				difficulty: "Medium",
				question:
					"What technique is used to find pairs or triplets in a sorted array?",
				answer: "Two Pointer",
			},
			{
				difficulty: "Hard",
				question:
					"What data structure is used for range queries and updates?",
				answer: "Segment Tree",
			},
			{
				difficulty: "Medium",
				question:
					"What data structure is used to remove duplicates from a sorted array in place?",
				answer: "Two Pointer",
			},
			{
				difficulty: "Hard",
				question:
					"What data structure is used to manage connected components efficiently?",
				answer: "Union-Find",
			},
			{
				difficulty: "Medium",
				question:
					"What data structure is used to process items in the order they arrive?",
				answer: "Queue",
			},
			{
				difficulty: "Hard",
				question:
					"What data structure is used for prefix sum queries and updates?",
				answer: "Fenwick Tree",
			},
			{
				difficulty: "Medium",
				question:
					"What data structure is used to traverse data in both directions?",
				answer: "Doubly Linked List",
			},
			{
				difficulty: "Easy",
				question:
					"What Python method is used to add an element to a stack?",
				answer: "Append",
			},
			{
				difficulty: "Easy",
				question:
					"What Python method is used to remove an element from a stack?",
				answer: "Pop",
			},
			{
				difficulty: "Medium",
				question:
					"What Python method is used to remove an element from the front of a queue?",
				answer: "Popleft",
			},
			{
				difficulty: "Medium",
				question:
					"What Python method is used to add an element to the end of a queue?",
				answer: "Append",
			},
			{
				difficulty: "Hard",
				question:
					"What data structure is used to partition data into multiple parts?",
				answer: "Two Pointer",
			},
		],
	};

	const [reviewCards, setReviewCards] = useState(cardSet.cards);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [userInput, setUserInput] = useState("");
	const [feedback, setFeedback] = useState("");
	const [streak, setStreak] = useState(0);
	const [longestStreak, setLongestStreak] = useState(0);

	const handleNextCard = () => {
		setCurrentCardIndex((prevIndex) =>
			prevIndex >= reviewCards.length - 1 ? 0 : prevIndex + 1
		);
		setUserInput("");
		setFeedback("");
	};

	const handlePreviousCard = () => {
		setCurrentCardIndex((prevIndex) =>
			prevIndex <= 0 ? reviewCards.length - 1 : prevIndex - 1
		);
		setUserInput("");
		setFeedback("");
	};

	const shuffleCards = () => {
		const shuffled = [...reviewCards].sort(() => Math.random() - 0.5);
		setReviewCards(shuffled);
		setCurrentCardIndex(0);
		setUserInput("");
		setFeedback("");
		setStreak(0);
	};

	const handleInputChange = (e) => {
		setUserInput(e.target.value);
	};

	const handleSubmit = () => {
		const currentAnswer = reviewCards[currentCardIndex].answer;
		if (userInput.trim().toLowerCase() === currentAnswer.toLowerCase()) {
			setFeedback("Correct");
			setStreak((prevStreak) => {
				const newStreak = prevStreak + 1;
				if (newStreak > longestStreak) {
					setLongestStreak(newStreak);
				}
				return newStreak;
			});
		} else {
			setFeedback("Incorrect");
			setStreak(0);
		}
	};

	return (
		<div className="app">
			<header>
				<h1>{cardSet.title}</h1>
				<p>{cardSet.description}</p>
				<p>Total cards: {reviewCards.length}</p>
				<div className="streak-container">
					<p>
						Current Streak: <span className="streak">{streak}</span>
					</p>
					<p>
						Longest Streak:{" "}
						<span className="streak">{longestStreak}</span>
					</p>
				</div>
			</header>

			{reviewCards.length > 0 ? (
				<>
					<div className="progress-indicator">
						Card {currentCardIndex + 1} of {reviewCards.length}
					</div>

					<Card {...reviewCards[currentCardIndex]} />

					<div className="navigation-buttons">
						<button
							className="arrow-button"
							onClick={handlePreviousCard}
						>
							←
						</button>
						<button
							className="shuffle-button"
							onClick={shuffleCards}
						>
							Shuffle
						</button>
						<button
							className="arrow-button"
							onClick={handleNextCard}
						>
							→
						</button>
					</div>

					<div className="answer-input">
						<h3>Guess the answer: </h3>
						<input
							type="text"
							placeholder="Type your guess"
							value={userInput}
							onChange={handleInputChange}
						/>
						<button onClick={handleSubmit}>Submit</button>
					</div>

					{feedback && (
						<p className={`feedback ${feedback}`}>
							{feedback === "correct"
								? "Correct!"
								: "Incorrect. Try again!"}
						</p>
					)}
				</>
			) : (
				<div className="completion-message">
					<p>You've reviewed all the cards!</p>
					<button
						className="reset-button"
						onClick={() => setReviewCards(cardSet.cards)}
					>
						Reset Deck
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
