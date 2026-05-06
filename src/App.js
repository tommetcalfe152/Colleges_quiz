import { useState } from "react";
import { motion } from "framer-motion";

// Icon helpers
const colourIcons = {
  Blue: "🔵",
  "Light Blue": "🟦",
  Teal: "🟢",
  Green: "🟢",
  Yellow: "🟡",
  Brown: "🟤",
  Pink: "🌸",
  Coral: "🪸",
  Red: "🔴",
  Black: "⚫",
  Purple: "🟣",
};

const animalIcons = {
  Duck: "🦆",
  Swan: "🦢",
  Eagle: "🦅",
  Dragon: "🐉",
  Owl: "🦉",
  Jackalope: "🦌",
  Lion: "🦁",
  Kangaroo: "🦘",
  Pheasant: "🦃",
};

const interestIcons = {
  "Arts & Crafts": "🎨",
  Gaming: "🎮",
  Music: "🎵",
  "TV & Film": "🎬",
  Outdoors: "🏕️",
  Reading: "📚",
  Sport: "🏅",
};

const questions = [
  {
    id: "colour",
    title: "Choose a colour",
    options: [
      "Blue",
      "Brown",
      "Teal",
      "Yellow",
      "Green",
      "Pink",
      "Coral",
      "Red",
      "Black",
      "Light Blue",
      "Purple",
    ],
  },
  {
    id: "animal",
    title: "Choose an animal",
    options: [
      "Duck",
      "Swan",
      "Eagle",
      "Dragon",
      "Owl",
      "Jackalope",
      "Lion",
      "Kangaroo",
      "Pheasant",
    ],
  },
  {
    id: "interest",
    title: "Choose a niche interest",
    options: [
      "Arts & Crafts",
      "Gaming",
      "Music",
      "TV & Film",
      "Outdoors",
      "Reading",
      "Sport",
    ],
  },
  {
    id: "level",
    title: "Which best describes you?",
    options: ["Undergraduate", "Postgraduate / Research"],
  },
];

const collegeRules = {
  creative: ["Derwent College", "Vanbrugh College"],
  academic: ["Alcuin College", "James College"],
  active: ["Constantine College", "Goodricke College"],
  modern: ["Anne Lister College", "David Kato College"],
  community: ["Langwith College", "Halifax College"],
  postgraduate: ["Wentworth Graduate College", "Constantine College"],
};

const collegeDescriptions = {
  "Derwent College": "Creative, energetic, and performance-focused.",
  "Vanbrugh College": "Central, creative, and media-oriented.",
  "Alcuin College": "Academic, calm, and close to study spaces.",
  "James College": "Modern, focused, and study-friendly.",
  "Constantine College": "Outdoorsy, spacious, and active.",
  "Goodricke College": "Friendly, modern, and sporty.",
  "Anne Lister College": "New, inclusive, and forward-looking.",
  "David Kato College": "Bold, modern, and community-driven.",
  "Langwith College": "Sociable and community-focused.",
  "Halifax College": "Relaxed, value-focused, and social.",
  "Wentworth Graduate College":
    "Designed specifically for postgraduates and researchers.",
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[step].id]: value });
    setStep(step + 1);
  };

  const getResult = () => {
    const { colour, animal, interest, level } = answers;

    // Explicit postgraduate routing
    if (level === "Postgraduate / Research") {
      return collegeRules.postgraduate;
    }

    const scores = {
      creative: 0,
      academic: 0,
      active: 0,
      modern: 0,
      community: 0,
    };

    // Colour (weight 1)
    if (["Pink", "Coral", "Purple", "Teal"].includes(colour))
      scores.creative += 1;
    if (["Blue", "Light Blue", "Brown"].includes(colour)) scores.academic += 1;
    if (["Green", "Yellow"].includes(colour)) scores.active += 1;
    if (["Black", "Red"].includes(colour)) scores.modern += 1;

    // Animal (weight 2)
    if (["Swan", "Dragon"].includes(animal)) scores.creative += 2;
    if (animal === "Owl") scores.academic += 2;
    if (["Eagle", "Lion", "Kangaroo"].includes(animal)) scores.active += 2;
    if (animal === "Jackalope") scores.modern += 2;

    // Interest (weight 3)
    if (["Arts & Crafts", "Music", "TV & Film"].includes(interest))
      scores.creative += 3;
    if (interest === "Reading") scores.academic += 3;
    if (["Outdoors", "Sport"].includes(interest)) scores.active += 3;
    if (interest === "Gaming") scores.modern += 3;

    const topTheme = Object.keys(scores).reduce((a, b) =>
      scores[a] >= scores[b] ? a : b
    );

    return collegeRules[topTheme] || collegeRules.community;
  };

  const results = getResult();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: 16,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          background: "white",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {!started ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1>Find your University of York College</h1>
            <p>
              Answer a few quick questions to discover which colleges might suit
              you best.
            </p>
            <button onClick={() => setStarted(true)}>Start the quiz</button>
            <p style={{ fontSize: 12, marginTop: 12 }}>
              Takes under 30 seconds
            </p>
          </motion.div>
        ) : step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>{questions[step].title}</h2>
            {questions[step].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                style={{ display: "block", width: "100%", margin: "6px 0" }}
              >
                {questions[step].id === "colour" && colourIcons[opt]}
                {questions[step].id === "animal" && animalIcons[opt]}
                {questions[step].id === "interest" && interestIcons[opt]} {opt}
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>Your Suggested Colleges</h2>
            <p style={{ fontSize: 12 }}>
              This quiz is for enjoyment and guidance — students' allocations
              may differ.
            </p>
            {results.map((college) => (
              <div key={college} style={{ marginBottom: 12 }}>
                <strong>{college}</strong>
                <div style={{ fontSize: 13 }}>
                  {collegeDescriptions[college]}
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setStarted(false);
                setStep(0);
                setAnswers({});
              }}
            >
              Restart
            </button>
            <p style={{ fontSize: 11, marginTop: 12 }}></p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
