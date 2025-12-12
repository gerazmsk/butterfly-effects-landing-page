/* ============================================
   Butterfly Effects - Deerfield Beach ABA Therapy
   Landing Page JavaScript
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // FAQ ACCORDION FUNCTIONALITY
    // ============================================
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = document.getElementById(this.getAttribute('aria-controls'));
            
            // Close all other FAQ items (optional - remove if you want multiple open)
            faqQuestions.forEach(function(otherQuestion) {
                if (otherQuestion !== question) {
                    const otherIsExpanded = otherQuestion.getAttribute('aria-expanded') === 'true';
                    if (otherIsExpanded) {
                        const otherAnswer = document.getElementById(otherQuestion.getAttribute('aria-controls'));
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.classList.remove('active');
                    }
                }
            });
            
            // Toggle current FAQ item
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('active');
            }
        });
        
        // Keyboard support (Enter and Space keys)
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset for sticky header
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // CHAT WIDGET FUNCTIONALITY
    // ============================================
    
    // Chat widget state
    const chatState = {
        isOpen: false,
        leadFormCompleted: false,
        userName: '',
        userPhone: ''
    };
    
    // DOM elements
    const chatWidgetToggle = document.getElementById('chat-widget-toggle');
    const chatWidgetContainer = document.getElementById('chat-widget-container');
    const chatWidgetClose = document.getElementById('chat-widget-close');
    const chatWidgetMessages = document.getElementById('chat-widget-messages');
    const chatWidgetFormContainer = document.getElementById('chat-widget-form-container');
    const chatWidgetInputContainer = document.getElementById('chat-widget-input-container');
    const chatWidgetInput = document.getElementById('chat-widget-input');
    const chatWidgetSend = document.getElementById('chat-widget-send');
    
    // Initialize chat widget
    function initChatWidget() {
        // Show lead form initially
        showLeadForm();
        
        // Toggle chat widget
        chatWidgetToggle.addEventListener('click', function() {
            toggleChatWidget();
        });
        
        chatWidgetClose.addEventListener('click', function() {
            toggleChatWidget();
        });
        
        // Handle form submission
        const form = document.getElementById('lead-capture-form');
        if (form) {
            form.addEventListener('submit', handleLeadFormSubmit);
        }
        
        // Handle message sending
        chatWidgetSend.addEventListener('click', handleSendMessage);
        chatWidgetInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }
    
    // Toggle chat widget open/close
    function toggleChatWidget() {
        chatState.isOpen = !chatState.isOpen;
        if (chatState.isOpen) {
            chatWidgetContainer.style.display = 'flex';
        } else {
            chatWidgetContainer.style.display = 'none';
        }
    }
    
    // Show lead capture form
    function showLeadForm() {
        chatWidgetFormContainer.innerHTML = `
            <form id="lead-capture-form" class="chat-widget-form">
                <div class="chat-widget-form-group">
                    <label for="lead-name">Your Name</label>
                    <input type="text" id="lead-name" name="name" required>
                </div>
                <div class="chat-widget-form-group">
                    <label for="lead-phone">Phone Number</label>
                    <input type="tel" id="lead-phone" name="phone" required>
                </div>
                <button type="submit" class="chat-widget-form-submit">Submit</button>
            </form>
        `;
        chatWidgetFormContainer.style.display = 'block';
        chatWidgetInputContainer.style.display = 'none';
        
        // Re-attach form submit handler
        const form = document.getElementById('lead-capture-form');
        if (form) {
            form.addEventListener('submit', handleLeadFormSubmit);
        }
    }
    
    // Handle lead form submission
    async function handleLeadFormSubmit(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('lead-name');
        const phoneInput = document.getElementById('lead-phone');
        
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        
        if (!name || !phone) {
            addMessage('bot', 'Please fill in both your name and phone number.');
            return;
        }
        
        // Store user info
        chatState.userName = name;
        chatState.userPhone = phone;
        
        // Disable form
        const submitButton = e.target.querySelector('.chat-widget-form-submit');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Send email using form submission (will work with email services like Formspree, EmailJS, or backend)
        try {
            await sendLeadEmail(name, phone);
            
            // Hide form
            chatWidgetFormContainer.style.display = 'none';
            
            // Show thank you message
            addMessage('bot', `Thank you, ${name}! We've received your information and will contact you soon.`);
            
            // Wait a moment, then show greeting
            setTimeout(() => {
                addMessage('bot', 'Hi! I\'m here to help answer questions about our Deerfield Beach ABA therapy programs. What would you like to know?');
                
                // Show input container
                chatWidgetInputContainer.style.display = 'flex';
                chatState.leadFormCompleted = true;
                
                // Focus input
                chatWidgetInput.focus();
            }, 1500);
            
        } catch (error) {
            console.error('Error sending email:', error);
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            addMessage('bot', 'There was an error submitting your information. Please try again or contact us directly.');
        }
    }
    
    // Send lead email
    async function sendLeadEmail(name, phone) {
        const emailTo = 'georgii.zalygin@butterflyeffects.com';
        const emailSubject = 'New Lead - Deerfield Beach ABA Chat Widget';
        const emailBody = `New Lead from Chat Widget\n\nName: ${name}\nPhone: ${phone}\n\nSubmitted from: ${window.location.href}`;
        
        // Option 1: Use EmailJS, Formspree, or similar service
        // Replace the endpoint below with your email service endpoint
        const emailServiceEndpoint = 'YOUR_EMAIL_SERVICE_ENDPOINT_HERE';
        
        // Option 2: Use a backend API endpoint
        // const backendEndpoint = '/api/send-email';
        
        // For now, we'll use a simple approach that works with Formspree or similar services
        // To configure: Replace 'YOUR_EMAIL_SERVICE_ENDPOINT_HERE' with your actual endpoint
        // Or uncomment and configure the fetch() example below
        
        try {
            // Example using Formspree (uncomment and configure):
            /*
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('_to', emailTo);
            formData.append('_subject', emailSubject);
            
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            */
            
            // Example using fetch with JSON (for custom backend):
            /*
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: emailTo,
                    subject: emailSubject,
                    body: emailBody,
                    name: name,
                    phone: phone
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            */
            
            // For demo/testing: Simulate successful email send
            // In production, replace this with actual email service call above
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Log for debugging (remove in production)
            console.log('Lead submitted:', { name, phone, emailTo });
            
        } catch (error) {
            console.error('Email sending error:', error);
            throw error;
        }
    }
    
    // Handle sending a message
    function handleSendMessage() {
        if (!chatState.leadFormCompleted) {
            return;
        }
        
        const message = chatWidgetInput.value.trim();
        if (!message) {
            return;
        }
        
        // Add user message
        addMessage('user', message);
        
        // Clear input
        chatWidgetInput.value = '';
        
        // Disable input while processing
        chatWidgetInput.disabled = true;
        chatWidgetSend.disabled = true;
        
        // Process message with rule-based logic
        setTimeout(() => {
            const response = processMessage(message);
            addMessage('bot', response);
            
            // Re-enable input
            chatWidgetInput.disabled = false;
            chatWidgetSend.disabled = false;
            chatWidgetInput.focus();
        }, 500);
    }
    
    // Add a message to the chat
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.textContent = text;
        chatWidgetMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatWidgetMessages.scrollTop = chatWidgetMessages.scrollHeight;
    }
    
    // Process message with rule-based logic
    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // INTENT 1: Programs overview
        if (matchesProgramsIntent(lowerMessage)) {
            // Check for specific program sub-intents first
            if (matchesFullDayIntent(lowerMessage)) {
                return getFullDayDetails();
            }
            if (matchesAfterSchoolIntent(lowerMessage)) {
                return getAfterSchoolDetails();
            }
            // General programs overview
            return getProgramsOverview();
        }
        
        // INTENT 2: Age fit
        if (matchesAgeIntent(lowerMessage)) {
            return getAgeResponse(lowerMessage);
        }
        
        // INTENT 3: Insurance and cost
        if (matchesInsuranceIntent(lowerMessage)) {
            return getInsuranceResponse(lowerMessage);
        }
        
        // FALLBACK
        return getFallbackResponse();
    }
    
    // Intent matching functions
    function matchesProgramsIntent(message) {
        const triggers = [
            'program', 'programs', 'services', 'what do you offer',
            'what do you have', 'center program', 'full day program',
            'after school program'
        ];
        return triggers.some(trigger => message.includes(trigger));
    }
    
    function matchesFullDayIntent(message) {
        const triggers = ['full day', 'full-day', 'full day program', 'day program'];
        return triggers.some(trigger => message.includes(trigger));
    }
    
    function matchesAfterSchoolIntent(message) {
        const triggers = ['after school', 'after-school', 'after school program', 'after-school program'];
        return triggers.some(trigger => message.includes(trigger));
    }
    
    function matchesAgeIntent(message) {
        const ageKeywords = ['age', 'how old', 'what age', 'too young', 'too old'];
        const hasAgeKeyword = ageKeywords.some(keyword => message.includes(keyword));
        
        // Check for age numbers (2, 3, 4, 5, 6, etc.) near "year" or "yo"
        const agePattern = /\b([2-9]|1[0-7])\s*(year|years|yo|y\.o\.)/i;
        const hasAgeNumber = agePattern.test(message);
        
        return hasAgeKeyword || hasAgeNumber;
    }
    
    function matchesInsuranceIntent(message) {
        const triggers = [
            'insurance', 'covered', 'do you take', 'do you accept',
            'in-network', 'out-of-network', 'cost', 'price', 'how much',
            'aetna', 'blue cross', 'blue shield', 'bcbs', 'cigna',
            'united', 'unitedhealthcare', 'tricare', 'medicaid'
        ];
        return triggers.some(trigger => message.includes(trigger));
    }
    
    // Response functions
    function getProgramsOverview() {
        return `We offer two main ABA programs at our Deerfield Beach center:

• Full-day ABA therapy (ages 2–6) – A structured early intervention program that runs during the day and focuses on communication, social interaction, school readiness, and motor development.

• After-school ABA therapy (ages 5 and up) – A program for school-aged children that takes place after the school day and focuses on confidence, peer relationships, emotional regulation, and daily living skills.

If you tell me your child's age, I can suggest which program might be the best fit.`;
    }
    
    function getFullDayDetails() {
        return `Our full-day ABA program in Deerfield Beach is an early intervention program for children ages 2–6. Throughout the day, children work one-on-one with our ABA team in structured activities that target communication, social interaction, school readiness, and daily living skills. The environment includes learning pods, classroom-style spaces, play areas, and sensory rooms designed to help children feel supported while they build new skills.`;
    }
    
    function getAfterSchoolDetails() {
        return `Our after-school ABA program in Deerfield Beach is for school-aged children, starting around age 5. Sessions are held after the school day and focus on building confidence, improving peer relationships, managing emotions, and practicing daily living and communication skills in a structured, supportive setting.`;
    }
    
    function getAgeResponse(message) {
        // Extract age from message
        const ageMatch = message.match(/\b([2-9]|1[0-7])\s*(?:year|years|yo|y\.o\.)/i);
        
        if (ageMatch) {
            const age = parseInt(ageMatch[1]);
            
            if (age >= 2 && age <= 4) {
                return getAge2To4Response();
            } else if (age >= 5 && age <= 6) {
                return getAge5To6Response();
            } else if (age > 6) {
                return getAgeOlderResponse();
            }
        }
        
        // Check for "too young" or "too old" keywords
        if (message.includes('too young')) {
            return getAge2To4Response();
        }
        if (message.includes('too old')) {
            return getAgeOlderResponse();
        }
        
        // General age response
        return getAgeGeneralResponse();
    }
    
    function getAgeGeneralResponse() {
        return `Our Deerfield Beach center typically serves children in early childhood and school-age ranges. Many families choose our full-day program for children ages 2–6 and our after-school program for children 5 and up.

If you tell me your child's age, I can share how they might fit into our programs. Our intake team will also review your situation in more detail during the first call.`;
    }
    
    function getAge2To4Response() {
        return `For a child around this age, our full-day ABA program in Deerfield Beach is often a great fit. It focuses on early communication, social interaction, play skills, and school readiness in a structured, center-based setting. During your intake call, our team can confirm whether the full-day program is the best option based on your child's needs and schedule.`;
    }
    
    function getAge5To6Response() {
        return `For a child around this age, there may be two options at our Deerfield Beach center:

• Full-day ABA therapy (ages 2–6), for children who benefit from a more intensive daytime schedule.
• After-school ABA therapy (ages 5 and up), for children who attend school and come to the center afterward.

Our intake team will review your child's needs and your family's schedule to recommend the best fit during your first call.`;
    }
    
    function getAgeOlderResponse() {
        return `Our Deerfield Beach center mainly focuses on early childhood and younger school-aged children. However, we sometimes have options for older children depending on their needs, schedule, and insurance coverage. The best next step is to discuss this with our intake team during your call so they can review what's available for your child's age.`;
    }
    
    function getInsuranceResponse(message) {
        // Check if a specific insurance provider is mentioned
        const providers = ['aetna', 'cigna', 'blue cross', 'blue shield', 'bcbs', 'united', 'unitedhealthcare', 'tricare', 'medicaid'];
        const hasProvider = providers.some(provider => message.includes(provider));
        
        if (hasProvider) {
            return `We work with many major insurance providers, including plans like the one you mentioned. Exact coverage for ABA therapy depends on your specific policy and state. During your intake call, our client services team will review your insurance details, explain what is covered, and answer questions about any out-of-pocket costs.`;
        }
        
        return `Butterfly Effects works with many major insurance providers, but coverage and out-of-pocket costs can vary depending on your specific plan and state. For ABA therapy at our Deerfield Beach center, our client services team will review your insurance information, explain what is covered, and walk you through any next steps.

Because each situation is different, the most accurate way to understand your coverage is to let our team verify your benefits during the intake process.`;
    }
    
    function getFallbackResponse() {
        return `I can help you with information about our Deerfield Beach ABA programs, age fit, insurance and enrollment steps. You can ask about:

• Programs at the Deerfield Beach center (full-day or after-school)
• Whether your child's age fits our programs
• How insurance and enrollment work

If you'd prefer, our team can discuss all of this with you directly during your intake call, using the contact details you already shared.`;
    }
    
    // Initialize chat widget when DOM is ready
    if (chatWidgetToggle && chatWidgetContainer) {
        initChatWidget();
        console.log('Chat widget initialized');
    } else {
        console.error('Chat widget elements not found:', {
            toggle: !!chatWidgetToggle,
            container: !!chatWidgetContainer
        });
    }
    
});

