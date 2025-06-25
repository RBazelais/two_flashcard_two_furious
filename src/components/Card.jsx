import React, { useState, useEffect } from "react";
import "./Card.css";

const Card = ({ difficulty, question, answer, ShowFront, setShowFront }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		if (ShowFront) {
			setIsFlipped(false);
			setShowFront(false);
		}
	}, [ShowFront, setShowFront]);

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	const getDifficultyColor = () => {
		switch (difficulty) {
			case "Easy":
				return "#4CAF50";
			case "Medium":
				return "#FFC107";
			case "Hard":
				return "#F44336";
			default:
				return "#9E9E9E";
		}
	};

	return (
		<div className="card-container">
			<div
				className={`card ${isFlipped ? "flipped" : ""}`}
				onClick={handleFlip}
			>
				<div className="card-front">
					<span
						className="difficulty"
						style={{ backgroundColor: getDifficultyColor() }}
					>
						{difficulty}
					</span>
					<h3 className="question">{question}</h3>
					<p className="hint">Click to reveal answer</p>
				</div>
				<div className="card-back">
					<span
						className="difficulty"
						style={{ backgroundColor: getDifficultyColor() }}
					>
						{difficulty}
					</span>
					<h3 className="answer">{answer}</h3>
				</div>
			</div>
		</div>
	);
};
export default Card;
