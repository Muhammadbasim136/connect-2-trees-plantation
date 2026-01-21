const projects = [
    {
        id: 1,
        title: "Urban Forest Initiative",
        location: "Downtown District",
        status: "completed",
        description: "Successfully planted 500 trees across major parks and streets in the downtown area.",
        icon: "🌳"
    },
    {
        id: 2,
        title: "Green Roof Project",
        location: "Business Park Area",
        status: "ongoing",
        description: "Installing vegetation and green infrastructure on 15 commercial buildings.",
        icon: "🏢"
    },
    {
        id: 3,
        title: "River Valley Restoration",
        location: "East Valley",
        status: "ongoing",
        description: "Restoring native vegetation along 5 miles of riverbank to prevent erosion.",
        icon: "🌊"
    },
    {
        id: 4,
        title: "Community Garden Network",
        location: "Residential Areas",
        status: "completed",
        description: "Established 12 community gardens providing fresh produce to local neighborhoods.",
        icon: "🥬"
    },
    {
        id: 5,
        title: "School Green Spaces",
        location: "Educational District",
        status: "planned",
        description: "Planning to transform 20 school yards into green learning environments.",
        icon: "🏫"
    },
    {
        id: 6,
        title: "Highway Median Gardens",
        location: "City Highways",
        status: "planned",
        description: "Proposed native plant gardens along 10 miles of highway medians.",
        icon: "🛣️"
    }
];

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">${project.icon}</div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-location">📍 ${project.location}</p>
                <span class="project-status status-${project.status}">${project.status.toUpperCase()}</span>
                <p class="project-description">${project.description}</p>
                <button class="btn btn-secondary" onclick="viewProjectDetails(${project.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

function viewProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        showToast(`Viewing details for: ${project.title}`);
    }
}

function handleNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function handleMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });
}

function handleApplicationForm() {
    const form = document.getElementById('applicationForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('applyName').value,
            email: document.getElementById('applyEmail').value,
            city: document.getElementById('applyCity').value,
            trees: document.getElementById('applyTrees').value,
            message: document.getElementById('applyMessage').value
        };

        if (!formData.name || !formData.email || !formData.city || !formData.trees) {
            showToast('Please fill in all required fields!');
            return;
        }

        console.log('Application submitted:', formData);

        showToast('Application submitted successfully! We will contact you soon.');

        form.reset();
    });
}

function handleComplaintForm() {
    const form = document.getElementById('complaintForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('complaintName').value,
            email: document.getElementById('complaintEmail').value,
            type: document.getElementById('complaintType').value,
            location: document.getElementById('complaintLocation').value,
            description: document.getElementById('complaintDescription').value
        };

        if (!formData.name || !formData.email || !formData.type || !formData.location || !formData.description) {
            showToast('Please fill in all required fields!');
            return;
        }

        console.log('Complaint submitted:', formData);

        showToast('Complaint submitted successfully! Reference number: #' + Math.floor(Math.random() * 10000));

        form.reset();
    });
}

function handleDonations() {
    const donateButtons = document.querySelectorAll('.donate-btn');
    const modal = document.getElementById('donationModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    donateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = button.getAttribute('data-amount');

            if (amount === 'custom') {
                modalBody.innerHTML = `
                    <p>Enter your custom donation amount:</p>
                    <input type="number" id="customAmount" min="1" placeholder="Enter amount in USD" />
                    <button class="btn btn-primary" onclick="processCustomDonation()">Confirm Donation</button>
                `;
            } else {
                modalBody.innerHTML = `
                    <p>You are about to donate <strong>$${amount}</strong> to support our green initiatives.</p>
                    <p>This donation will help us plant trees and maintain our environmental projects.</p>
                    <button class="btn btn-primary" onclick="processDonation(${amount})">Confirm Donation</button>
                    <button class="btn btn-secondary" onclick="closeDonationModal()" style="margin-left: 10px;">Cancel</button>
                `;
            }

            modal.classList.add('show');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function processDonation(amount) {
    console.log('Donation processed:', amount);
    showToast(`Thank you for your donation of $${amount}!`);
    closeDonationModal();
}

function processCustomDonation() {
    const customAmount = document.getElementById('customAmount').value;

    if (!customAmount || customAmount <= 0) {
        showToast('Please enter a valid amount!');
        return;
    }

    console.log('Custom donation processed:', customAmount);
    showToast(`Thank you for your donation of $${customAmount}!`);
    closeDonationModal();
}

function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    modal.classList.remove('show');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function handleStickyHeader() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    handleNavigation();
    handleMobileMenu();
    handleApplicationForm();
    handleComplaintForm();
    handleDonations();
    handleStickyHeader();
});
