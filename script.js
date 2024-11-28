document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close');
    const submitBtn = document.getElementById('submit-answer');
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const feedback = document.createElement('div'); // Add a feedback box
    feedback.id = 'feedback';
    feedback.classList.add('feedback', 'hidden'); // Initially hidden
    modal.querySelector('.modal-content').appendChild(feedback);


    let hasAnsweredFirstQuestion = false; // Tracks if a question has been answered
    const messageModal = document.getElementById('message-modal');
    const messageText = document.getElementById('message-text');
    const messageClose = document.getElementById('message-close');
    let currentQuestion = {};
    let score = 0;

    // Select a random Daily Double question
    const questionButtons = document.querySelectorAll('.question');
    const dailyDoubleButton = questionButtons[Math.floor(Math.random() * questionButtons.length)];
    dailyDoubleButton.classList.add('daily-double');


    // Sample question set
    const questions = [
        // Category 1: Lighthouses of the Great Lakes
        {
            category: 'Lighthouses of the Great Lakes',
            points: 100,
            question: 'Michigan is home to this many different lighthouses, more than any other state.',
            answer: '129'
        },
        {
            category: 'Lighthouses of the Great Lakes',
            points: 200,
            question: 'This Michigan landmark is situated on 99 acres of township parkland.',
            answer: 'Presque Isle'
        },
        {
            category: 'Lighthouses of the Great Lakes',
            points: 300,
            question: 'This iconic Michigan landmark is considered the most photographed in the Midwest.',
            answer: 'Grand Haven'
        },
        {
            category: 'Lighthouses of the Great Lakes',
            points: 400,
            question: 'The first one was destroyed and was rebuilt further inland.',
            answer: 'Tawas Point'
        },
        {
            category: 'Lighthouses of the Great Lakes',
            points: 500,
            question: '“The loneliest place in North America.”',
            answer: 'Stannard Rock'
        },
        
        // Category 2: Counties of the Mitten State
        {
            category: 'Counties of the Mitten State',
            points: 100,
            question: 'The only county to border two other states.',
            answer: 'Hillsdale'
        },
        {
            category: 'Counties of the Mitten State',
            points: 200,
            question: 'The most northern county, which also happens to be a peninsula.',
            answer: 'Keweenaw'
        },
        {
            category: 'Counties of the Mitten State',
            points: 300,
            question: 'Eastern Michigan and the University of Michigan are located here.',
            answer: 'Washtenaw'
        },
        {
            category: 'Counties of the Mitten State',
            points: 400,
            question: 'At the very tip of a thumbs up.',
            answer: 'Huron'
        },
        {
            category: 'Counties of the Mitten State',
            points: 500,
            question: 'Shares a name with a Supernatural character.',
            answer: 'Cass'
        },
        
        // Category 3: Fascinating Facts from Michigan
        {
            category: 'Fascinating Facts from Michigan',
            points: 100,
            question: 'Michigan’s only “King” lived here.',
            answer: 'Beaver Island'
        },
        {
            category: 'Fascinating Facts from Michigan',
            points: 200,
            question: 'Michigan has the 2nd most of these in the country.',
            answer: 'Ski Resorts'
        },
        {
            category: 'Fascinating Facts from Michigan',
            points: 300,
            question: 'Lions, Tigers, Pistons Oh My! Name the missing professional sports team.',
            answer: 'Red Wings'
        },
        {
            category: 'Fascinating Facts from Michigan',
            points: 400,
            question: 'Michigan is home to this first all-inclusive playground.',
            answer: 'Play Michigan'
        },
        {
            category: 'Fascinating Facts from Michigan',
            points: 500,
            question: 'This Michigan University has its historic district.',
            answer: 'Eastern Michigan University'
        },
        
        // Category 4: Michigan’s Metropolitan Marvels
        {
            category: 'Michigan’s Metropolitan Marvels',
            points: 100,
            question: 'Earl Young built his mushroom houses here.',
            answer: 'Charlevoix'
        },
        {
            category: 'Michigan’s Metropolitan Marvels',
            points: 200,
            question: 'Home to the Cherry Republic and many wineries.',
            answer: 'Traverse City'
        },
        {
            category: 'Michigan’s Metropolitan Marvels',
            points: 300,
            question: 'These three cities are nicknamed the “Tri-Cities”.',
            answer: 'Saginaw, Bay City, and Midland'
        },
        {
            category: 'Michigan’s Metropolitan Marvels',
            points: 400,
            question: 'Home to the only functioning Dutch Windmill, De Zwaan.',
            answer: 'Holland'
        },
        {
            category: 'Michigan’s Metropolitan Marvels',
            points: 500,
            question: 'Formerly known as Furniture City, now nicknamed Beer City.',
            answer: 'Grand Rapids'
        },
        
        // Category 5: The Great Lakes and Beyond
        {
            category: 'The Great Lakes and Beyond',
            points: 100,
            question: 'This chain of lakes and rivers is over 75 miles long.',
            answer: 'Elk River Chain of Lakes'
        },
        {
            category: 'The Great Lakes and Beyond',
            points: 200,
            question: 'This lake is Michigan’s longest lake.',
            answer: 'Torch Lake'
        },
        {
            category: 'The Great Lakes and Beyond',
            points: 300,
            question: 'This river holds the title of Michigan’s longest river at 252 miles long.',
            answer: 'Grand River'
        },
        {
            category: 'The Great Lakes and Beyond',
            points: 400,
            question: 'Isle Royale resides in this Michigan Great Lake.',
            answer: 'Lake Superior'
        },
        {
            category: 'The Great Lakes and Beyond',
            points: 500,
            question: 'Traverse City is home to these two limb-named bays.',
            answer: 'East and West Arm Grand Traverse Bay'
        },
        
        // Final Jeopardy
        {
            category: 'Final Jeopardy',
            points: 0,
            question: 'Michigan shares its border with this state nicknamed the armpit of America or the worst state ever.',
            answer: 'Ohio'
        }
    ];

    document.getElementById('increase-score').addEventListener('click', () => {
        score += 100;
        updateScore();
    });
    
    document.getElementById('decrease-score').addEventListener('click', () => {
        score -= 100;
        updateScore();
    });
    

    document.getElementById('final-jeopardy').addEventListener('click', () => {
        // Reset feedback when opening Final Jeopardy
        feedback.classList.add('hidden');
        feedback.textContent = ''; // Clear any previous feedback

        currentQuestion = questions.find(q => q.category === 'Final Jeopardy');
        questionText.textContent = currentQuestion.question;
        modal.style.display = 'flex';
    });
    
    
    
        

    questionButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('hidden-question')) return; // Skip if already answered
            feedback.classList.add('hidden');
            feedback.textContent = ''; // Clear any previous feedback
    
            // Handle Daily Double before any question has been answered
            if (button.classList.contains('daily-double') && !hasAnsweredFirstQuestion) {
              //  alert("You must answer at least one question before attempting the Daily Double! Reassigning...");
    
                // Remove Daily Double class from the current button
                button.classList.remove('daily-double');
    
                // Find a new question to assign as the Daily Double
                const availableQuestions = Array.from(questionButtons).filter(btn => 
                    !btn.classList.contains('hidden-question') && 
                    btn !== button // Exclude the current button
                );
    
                if (availableQuestions.length > 0) {
                    const newDailyDouble = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
                    newDailyDouble.classList.add('daily-double');
                   // alert("A new Daily Double has been assigned!");
                }
    
                return; // Stop further processing of the current click
            }
    
            const points = parseInt(button.getAttribute('data-points'), 10);
            const categoryIndex = parseInt(button.getAttribute('data-category'), 10);
            currentQuestion = questions.find(q => 
                q.points === points && 
                q.category === document.querySelectorAll('.category h2')[categoryIndex - 1].textContent
            );
    
            if (currentQuestion) {
                if (button.classList.contains('daily-double')) {
                    // Check if the player has a negative score
                    let maxWager = score >= 500 ? score : 500; // Wager capped at 500 if score is lower
                    const wager = prompt(`Daily Double! Enter your wager! `);
    
                    // Ensure the wager is a valid number and within the allowed range
                    if (wager !== null) {
                        const wagerValue = parseInt(wager, 10);
                        if (!isNaN(wagerValue) && wagerValue > 0 && wagerValue <= maxWager) {
                            currentQuestion.points = wagerValue; // Set the wager
                        } else {
                            return; // alert(`Invalid wager! It must be a positive number no greater than ${maxWager}.`);
                        }
                    } else {
                        return; // Prevent opening the question if the wager is canceled
                    }
                }
    
                questionText.textContent = currentQuestion.question;
                modal.style.display = 'flex';
                button.classList.add('hidden-question'); // Mark the question as answered
                hasAnsweredFirstQuestion = true; // Set flag to true after answering
            }
        });
    });
    
    
    
    
    
    
    
    
    submitBtn.addEventListener('click', () => {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const resultText = document.getElementById('result-text'); // Ensure you have a result message container

        // Clear any previous result message
        if (resultText) {
            resultText.textContent = '';
        }
        if (userAnswer) {
            if (userAnswer === currentQuestion.answer.toLowerCase()) {
                feedback.textContent = 'Correct! Well done!';
                feedback.style.backgroundColor = '#0c3d91'; // Light blue for correct
                score += currentQuestion.points;
            } else {
                feedback.textContent = `Incorrect! The correct answer was: ${currentQuestion.answer}`;
                feedback.style.backgroundColor = 'red'; // Red for incorrect
                score -= currentQuestion.points;
            }
            feedback.classList.remove('hidden'); // Show feedback
            updateScore();
        }
        answerInput.value = ''; // Clear the answer input

    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function updateScore() {
        let scoreElement = document.getElementById('score');
        scoreElement.textContent = `Score: ${score}`;
    }
});
