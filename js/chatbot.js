const chatBtn = document.getElementById('chat-btn');
const chatContainer = document.querySelector('.chat-container');
const messagesContainer = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');
const closeBtn = document.querySelector('.chat-close');

const faqData = {
    'How do I book a hotel?': 'You can book a hotel through our partner websites like Booking.com or directly through the hotel\'s website. We provide links and pricing information for each hotel.',
    'What is the cancellation policy?': 'Cancellation policies vary by hotel and booking platform. Generally, most hotels offer free cancellation up to 24-48 hours before check-in.',
    'Do you offer price matching?': 'Yes, we work with our partners to ensure you get the best available rates. If you find a lower price elsewhere, contact our support team.',
    'Are the reviews verified?': 'Yes, all reviews on our platform are from verified guests who have stayed at the hotels.',
    'How can I contact customer support?': 'You can reach our customer support team 24/7 via email at support@bookadvisor.com or through the chat feature on our website.',
    'Who was this website created by?': webSiteAuthorInfo('Demchenko', 'Yelyzaveta')
};

let isWaitingForConsultant = false;

function initChat() {
    addMessage('Hello! Choose a topic I can help you with:', 'bot');
    const questionList = document.createElement('ul');
    questionList.className = 'question-list';
    
    Object.keys(faqData).forEach(question => {
        const li = document.createElement('li');
        li.className = 'question-item';
        li.textContent = question;
        li.addEventListener('click', () => handleQuestion(question));
        questionList.appendChild(li);
    });
    
    messagesContainer.appendChild(questionList);
}

function addMessage(text, sender) {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    const textNode = document.createTextNode(text);
    message.appendChild(textNode);
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        indicator.appendChild(dot);
    }
    messagesContainer.appendChild(indicator);
    return indicator;
}

function webSiteAuthorInfo(lastName, firstName, position = "Front End Developer"){
    return `BookAdvisor was created by ${firstName} ${lastName} - ${position}`;
}

async function handleQuestion(question) {
    addMessage(question, 'user');
    
    const answer = faqData[question];
    if (answer) {
        const indicator = showTypingIndicator();
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        indicator.remove();
        
        addMessage(answer, 'bot');
    } else {
        const indicator = showTypingIndicator();
        isWaitingForConsultant = true;
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        indicator.remove();
        
        addMessage('We are looking for an available consultant...', 'bot');
    }
}

function closeChatOnOutsideClick(e){
    if (!chatContainer.contains(e.target) && !chatBtn.contains(e.target)) {
        chatContainer.classList.remove('active');
        document.removeEventListener('click', closeChatOnOutsideClick);
    }
}

function toggleChat() {
    chatContainer.classList.toggle('active');
    if (chatContainer.classList.contains('active')) {
        if (messagesContainer.children.length === 0) {
            initChat();
        }
        document.addEventListener('click', closeChatOnOutsideClick);
    } else {
        document.removeEventListener('click', closeChatOnOutsideClick);
    }
}

let isDragging = false;
let hasMovedSinceMouseDown = false;

chatBtn.onmousedown = function(event) {
    event.preventDefault();
    hasMovedSinceMouseDown = false;

    let shiftX = event.clientX - chatBtn.getBoundingClientRect().left;
    let shiftY = event.clientY - chatBtn.getBoundingClientRect().top;

    chatBtn.style.position = 'absolute';
    chatBtn.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
        chatBtn.style.left = pageX - shiftX + 'px';
        chatBtn.style.top = pageY - shiftY + 'px';
        hasMovedSinceMouseDown = true;
        isDragging = true;
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        
        setTimeout(() => {
            isDragging = false;
        }, 50);
    });
};

chatBtn.addEventListener('click', function(event) {
    if (isDragging || hasMovedSinceMouseDown) {
        hasMovedSinceMouseDown = false;
        event.stopPropagation();
        return;
    }
    toggleChat();
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
        handleQuestion(chatInput.value.trim());
        chatInput.value = '';
    }
});

chatSend.addEventListener('click', () => {
    if (chatInput.value.trim()) {
        handleQuestion(chatInput.value.trim());
        chatInput.value = '';
    }
});

closeBtn.addEventListener('click', ()=>{
    chatContainer.classList.remove('active');
});