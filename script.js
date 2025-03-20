document.addEventListener("DOMContentLoaded", () => {
  // Header animation
  gsap.from("header", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Hero title, subtitle, buttons animation
  gsap.to(".hero-title", {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.to(".hero-subtitle", {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.7,
    ease: "power3.out",
  });

  gsap.to(".buttons", {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.9,
    ease: "power3.out",
  });

  // Hero card animation
  gsap.to(".hero-card", {
    x: 0,
    opacity: 1,
    duration: 1.2,
    delay: 1.1,
    ease: "power3.out",
  });

  // Card items animation
  gsap.to(".item-1", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 1.4,
    ease: "power3.out",
  });

  gsap.to(".item-2", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 1.6,
    ease: "power3.out",
  });

  // Nav links hover effect
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        color: "#32CD32",
        duration: 0.3,
      });
    });

    link.addEventListener("mouseleave", () => {
      if (!link.classList.contains("active")) {
        gsap.to(link, {
          color: "#ffffff",
          duration: 0.3,
        });
      }
    });
  });

  // Get elements
  const investmentHorizon = document.getElementById("investment-horizon");
  const horizonValue = document.getElementById("horizon-value");
  const yearsDisplay = document.getElementById("years-display");
  const calculateButton = document.getElementById("calculate-button");
  const resultsMessage = document.querySelector(".results-message");
  const resultsContent = document.getElementById("results-content");

  // Display slider value
  investmentHorizon.addEventListener("input", function () {
    horizonValue.textContent = this.value + " years";
    yearsDisplay.textContent = this.value;
  });

  // Calculate button click handler
  calculateButton.addEventListener("click", function () {
    // Get input values
    const monthlyIncome =
      parseFloat(document.getElementById("monthly-income").value) || 0;
    const monthlyExpenses =
      parseFloat(document.getElementById("monthly-expenses").value) || 0;
    const educationFund =
      parseFloat(document.getElementById("education-fund").value) || 0;
    const healthcareFund =
      parseFloat(document.getElementById("healthcare-fund").value) || 0;
    const years = parseInt(investmentHorizon.value);

    // Validate inputs
    if (monthlyIncome === 0) {
      alert("Please enter your monthly income");
      return;
    }

    if (monthlyExpenses === 0) {
      alert("Please enter your monthly expenses");
      return;
    }

    // Calculate available amount for investment
    const availableForInvestment = monthlyIncome - monthlyExpenses;

    if (availableForInvestment <= 0) {
      alert("Your expenses exceed your income. Please adjust your values.");
      return;
    }

    // Calculate SIP amount (using a simple calculation - in real world this would be more complex)
    let recommendedSip = Math.min(availableForInvestment * 0.3, 50000);

    // Calculate education SIP (simplified)
    const educationSip =
      educationFund > 0 ? calculateEducationSip(educationFund, years) : 0;

    // Calculate SWP for healthcare
    const healthcareSWP =
      healthcareFund > 0
        ? calculateHealthcareSWP(healthcareFund, recommendedSip)
        : 0;

    // Calculate expected corpus
    const expectedCorpus = calculateExpectedCorpus(recommendedSip, years);

    // Determine recommended plan
    const recommendedPlan = getRecommendedPlan(recommendedSip);

    // Update results
    document.getElementById("recommended-sip").textContent =
      "₹" + recommendedSip.toLocaleString();
    document.getElementById("recommended-plan").textContent = recommendedPlan;
    document.getElementById("education-sip").textContent =
      "₹" + educationSip.toLocaleString();
    document.getElementById("healthcare-swp").textContent =
      "₹" + healthcareSWP.toLocaleString();
    document.getElementById("expected-corpus").textContent =
      "₹" + expectedCorpus.toLocaleString();

    // Hide message and show results
    resultsMessage.style.display = "none";
    resultsContent.style.display = "block";
  });

  // Helper functions
  function calculateEducationSip(targetAmount, years) {
    // Simplified calculation assuming 12% annual return
    const monthlyRate = 0.12 / 12;
    const months = years * 12;
    return Math.round(
      targetAmount / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    );
  }

  function calculateHealthcareSWP(monthlyHealthcare, sip) {
    // Simplified calculation - in reality would be more complex
    return Math.round(Math.min(sip * 0.2, monthlyHealthcare * 2));
  }

  function calculateExpectedCorpus(monthlySip, years) {
    // Simplified corpus calculation assuming 12% annual return
    const monthlyRate = 0.12 / 12;
    const months = years * 12;
    return Math.round(
      monthlySip *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate)
    );
  }

  function getRecommendedPlan(sipAmount) {
    if (sipAmount < 5000) {
      return "Starter Plan";
    } else if (sipAmount < 15000) {
      return "Starter Plan+";
    } else if (sipAmount < 25000) {
      return "Growth Plan";
    } else {
      return "Premium Plan";
    }
  }
});
