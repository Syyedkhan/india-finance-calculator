/* ============================================
   India Finance Calculator - Hindi JavaScript
   ============================================ */

// Indian number format helper
function formatINR(num) {
    return '₹ ' + Math.round(num).toLocaleString('en-IN');
}

/* ============================================
   1. EMI CALCULATOR (Hindi)
   ============================================ */
function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const annualRate = parseFloat(document.getElementById("interestRate").value);
    const years = parseFloat(document.getElementById("loanTenure").value);
    const resultDiv = document.getElementById("emiResult");

    if (!loanAmount || loanAmount <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ लोन राशि 0 से अधिक होनी चाहिए।</p>';
        return;
    }
    if (!annualRate || annualRate <= 0 || annualRate > 50) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ ब्याज दर 0 से 50% के बीच होनी चाहिए।</p>';
        return;
    }
    if (!years || years <= 0 || years > 40) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ अवधि 1 से 40 वर्ष के बीच होनी चाहिए।</p>';
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)
                / (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    let balance = loanAmount;
    let scheduleHTML = '<h3>वर्ष-वार विवरण</h3>';
    scheduleHTML += '<div class="table-wrap"><table class="amort-table">';
    scheduleHTML += '<tr><th>वर्ष</th><th>मूलधन</th><th>ब्याज</th><th>शेष</th></tr>';

    for (let y = 1; y <= Math.ceil(years); y++) {
        let yearPrincipal = 0, yearInterest = 0;
        for (let m = 0; m < 12 && balance > 0.01; m++) {
            const interestPart = balance * monthlyRate;
            const principalPart = emi - interestPart;
            yearPrincipal += principalPart;
            yearInterest += interestPart;
            balance -= principalPart;
        }
        scheduleHTML += `<tr>
            <td>वर्ष ${y}</td>
            <td>${formatINR(yearPrincipal)}</td>
            <td>${formatINR(yearInterest)}</td>
            <td>${formatINR(Math.max(0, balance))}</td>
        </tr>`;
    }
    scheduleHTML += '</table></div>';

    resultDiv.innerHTML = `
        <h2>EMI परिणाम</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>मासिक EMI</span>
                <strong>${formatINR(emi)}</strong>
            </div>
            <div class="emi-result-card">
                <span>कुल ब्याज</span>
                <strong>${formatINR(totalInterest)}</strong>
            </div>
            <div class="emi-result-card">
                <span>कुल भुगतान</span>
                <strong>${formatINR(totalPayment)}</strong>
            </div>
        </div>

        ${scheduleHTML}

        <p class="note">💡 सुझाव: अधिक डाउन पेमेंट या कम अवधि से कुल ब्याज कम हो सकता है।</p>

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}

/* ============================================
   2. GST CALCULATOR (Hindi)
   ============================================ */
function calculateGST() {
    const amount = parseFloat(document.getElementById("gstAmount").value);
    const rate = parseFloat(document.getElementById("gstRate").value);
    const type = document.getElementById("gstType").value;
    const resultDiv = document.getElementById("gstResult");

    if (!amount || amount <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ राशि 0 से अधिक होनी चाहिए।</p>';
        return;
    }

    let netPrice, gstAmount, grossPrice;

    if (type === "add") {
        netPrice = amount;
        gstAmount = amount * rate / 100;
        grossPrice = amount + gstAmount;
    } else {
        grossPrice = amount;
        netPrice = amount * 100 / (100 + rate);
        gstAmount = grossPrice - netPrice;
    }

    resultDiv.innerHTML = `
        <h2>GST परिणाम</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>नेट प्राइस</span>
                <strong>${formatINR(netPrice)}</strong>
            </div>
            <div class="emi-result-card">
                <span>GST राशि (${rate}%)</span>
                <strong>${formatINR(gstAmount)}</strong>
            </div>
            <div class="emi-result-card">
                <span>ग्रॉस प्राइस</span>
                <strong>${formatINR(grossPrice)}</strong>
            </div>
        </div>

        <p class="note">💡 सुझाव: भारत में GST दरें 5%, 12%, 18% और 28% हैं।</p>

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}

/* ============================================
   3. SIP CALCULATOR (Hindi)
   ============================================ */
function calculateSIP() {
    const monthly = parseFloat(document.getElementById("sipAmount").value);
    const annualRate = parseFloat(document.getElementById("sipRate").value);
    const years = parseFloat(document.getElementById("sipYears").value);
    const resultDiv = document.getElementById("sipResult");

    if (!monthly || monthly <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ मासिक निवेश 0 से अधिक होना चाहिए।</p>';
        return;
    }
    if (!annualRate || annualRate <= 0 || annualRate > 50) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ रिटर्न दर 0 से 50% के बीच होनी चाहिए।</p>';
        return;
    }
    if (!years || years <= 0 || years > 50) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ अवधि 1 से 50 वर्ष के बीच होनी चाहिए।</p>';
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const futureValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthly * months;
    const returns = futureValue - invested;

    resultDiv.innerHTML = `
        <h2>SIP परिणाम</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>निवेशित राशि</span>
                <strong>${formatINR(invested)}</strong>
            </div>
            <div class="emi-result-card">
                <span>अनुमानित रिटर्न</span>
                <strong>${formatINR(returns)}</strong>
            </div>
            <div class="emi-result-card">
                <span>मैच्योरिटी वैल्यू</span>
                <strong>${formatINR(futureValue)}</strong>
            </div>
        </div>

        <p class="note">💡 सुझाव: SIP में जितना लंबा निवेश करेंगे, उतना ज्यादा कंपाउंडिंग का फायदा मिलेगा।</p>

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}

/* ============================================
   4. FD CALCULATOR (Hindi)
   ============================================ */
function calculateFD() {
    const principal = parseFloat(document.getElementById("fdAmount").value);
    const annualRate = parseFloat(document.getElementById("fdRate").value);
    const years = parseFloat(document.getElementById("fdYears").value);
    const n = parseFloat(document.getElementById("fdCompound").value);
    const resultDiv = document.getElementById("fdResult");

    if (!principal || principal <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ जमा राशि 0 से अधिक होनी चाहिए।</p>';
        return;
    }
    if (!annualRate || annualRate <= 0 || annualRate > 20) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ ब्याज दर 0 से 20% के बीच होनी चाहिए।</p>';
        return;
    }
    if (!years || years <= 0 || years > 20) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ अवधि 0.5 से 20 वर्ष के बीच होनी चाहिए।</p>';
        return;
    }

    const rate = annualRate / 100;
    const maturity = principal * Math.pow(1 + rate / n, n * years);
    const interest = maturity - principal;

    resultDiv.innerHTML = `
        <h2>FD परिणाम</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>मूलधन</span>
                <strong>${formatINR(principal)}</strong>
            </div>
            <div class="emi-result-card">
                <span>अर्जित ब्याज</span>
                <strong>${formatINR(interest)}</strong>
            </div>
            <div class="emi-result-card">
                <span>मैच्योरिटी राशि</span>
                <strong>${formatINR(maturity)}</strong>
            </div>
        </div>

        <p class="note">💡 सुझाव: FD पर ब्याज कर योग्य होता है। ₹40,000+ ब्याज पर TDS लगता है।</p>

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}

/* ============================================
   5. SALARY CALCULATOR (Hindi)
   ============================================ */
function calculateSalary() {
    const basic = parseFloat(document.getElementById("basicSalary").value) || 0;
    const hra = parseFloat(document.getElementById("hra").value) || 0;
    const special = parseFloat(document.getElementById("specialAllowance").value) || 0;
    const otherAllow = parseFloat(document.getElementById("otherAllowances").value) || 0;
    const empPF = parseFloat(document.getElementById("empPF").value) || 0;
    const profTax = parseFloat(document.getElementById("profTax").value) || 0;
    const otherDed = parseFloat(document.getElementById("otherDeductions").value) || 0;
    const applyTax = document.getElementById("applyTax").value;
    const resultDiv = document.getElementById("salaryResult");

    if (basic <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ बेसिक सैलरी 0 से अधिक होनी चाहिए।</p>';
        return;
    }

    const grossMonthly = basic + hra + special + otherAllow;
    const grossAnnual = grossMonthly * 12;

    let annualTax = 0;
    if (applyTax === "yes") {
        const taxableIncome = Math.max(0, grossAnnual - 75000);
        const slabs = [
            [400000, 0],
            [800000, 0.05],
            [1200000, 0.10],
            [1600000, 0.15],
            [2000000, 0.20],
            [2400000, 0.25],
            [Infinity, 0.30]
        ];
        let prev = 0;
        for (let [limit, rate] of slabs) {
            if (taxableIncome > prev) {
                const amt = Math.min(taxableIncome, limit) - prev;
                annualTax += amt * rate;
                prev = limit;
            }
        }
        if (taxableIncome <= 1200000) {
            annualTax = Math.max(0, annualTax - 60000);
        }
        annualTax = annualTax * 1.04;
    }
    const monthlyTax = annualTax / 12;

    const totalDeductions = empPF + profTax + otherDed + monthlyTax;
    const netMonthly = grossMonthly - totalDeductions;
    const netAnnual = netMonthly * 12;

    resultDiv.innerHTML = `
        <h2>सैलरी विवरण</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>मासिक इन-हैंड</span>
                <strong>${formatINR(netMonthly)}</strong>
            </div>
            <div class="emi-result-card">
                <span>वार्षिक इन-हैंड</span>
                <strong>${formatINR(netAnnual)}</strong>
            </div>
            <div class="emi-result-card">
                <span>कुल कटौतियाँ</span>
                <strong>${formatINR(totalDeductions)}</strong>
            </div>
        </div>

        <h3>विस्तृत विवरण (मासिक)</h3>
        <div class="table-wrap">
            <table class="amort-table">
                <tr><th>घटक</th><th>राशि</th></tr>
                <tr><td>बेसिक सैलरी</td><td>${formatINR(basic)}</td></tr>
                <tr><td>HRA</td><td>${formatINR(hra)}</td></tr>
                <tr><td>स्पेशल अलाउंस</td><td>${formatINR(special)}</td></tr>
                <tr><td>अन्य अलाउंस</td><td>${formatINR(otherAllow)}</td></tr>
                <tr><td><strong>कुल मासिक सैलरी</strong></td><td><strong>${formatINR(grossMonthly)}</strong></td></tr>
                <tr><td>कर्मचारी PF</td><td>- ${formatINR(empPF)}</td></tr>
                <tr><td>प्रोफेशनल टैक्स</td><td>- ${formatINR(profTax)}</td></tr>
                <tr><td>अन्य कटौतियाँ</td><td>- ${formatINR(otherDed)}</td></tr>
                <tr><td>इनकम टैक्स (नई व्यवस्था)</td><td>- ${formatINR(monthlyTax)}</td></tr>
                <tr><td><strong>शुद्ध मासिक इन-हैंड</strong></td><td><strong>${formatINR(netMonthly)}</strong></td></tr>
            </table>
        </div>

        <p class="note">💡 सुझाव: टैक्स नई व्यवस्था (₹75,000 मानक कटौती) के साथ गणना किया गया है। PF और अन्य कटौतियाँ अपनी सैलरी स्लिप से जांचें।</p>

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}

/* ============================================
   6. INCOME TAX CALCULATOR (Hindi)
   Old Regime vs New Regime — FY 2025-26
   ============================================ */

function calcOldRegime(income, age, ded) {
    const taxable = Math.max(0, income - 50000 - ded);
    let tax = 0;
    let slabs = [];

    if (age === "below60") {
        slabs = [
            [250000, 0],
            [500000, 0.05],
            [1000000, 0.20],
            [Infinity, 0.30]
        ];
    } else if (age === "60to80") {
        slabs = [
            [300000, 0],
            [500000, 0.05],
            [1000000, 0.20],
            [Infinity, 0.30]
        ];
    } else {
        slabs = [
            [500000, 0],
            [1000000, 0.20],
            [Infinity, 0.30]
        ];
    }

    let prev = 0;
    for (let [limit, rate] of slabs) {
        if (taxable > prev) {
            const amt = Math.min(taxable, limit) - prev;
            tax += amt * rate;
            prev = limit;
        }
    }

    if (taxable <= 500000) {
        tax = Math.max(0, tax - 12500);
    }

    return tax;
}

function calcNewRegime(income) {
    const taxable = Math.max(0, income - 75000);
    const slabs = [
        [400000, 0],
        [800000, 0.05],
        [1200000, 0.10],
        [1600000, 0.15],
        [2000000, 0.20],
        [2400000, 0.25],
        [Infinity, 0.30]
    ];
    let tax = 0, prev = 0;
    for (let [limit, rate] of slabs) {
        if (taxable > prev) {
            const amt = Math.min(taxable, limit) - prev;
            tax += amt * rate;
            prev = limit;
        }
    }

    if (taxable <= 1200000) {
        tax = Math.max(0, tax - 60000);
    }

    return tax;
}

function calculateIncomeTax() {
    const income = parseFloat(document.getElementById("taxIncome").value) || 0;
    const age = document.getElementById("taxAge").value;
    const ded = (parseFloat(document.getElementById("ded80c").value) || 0)
              + (parseFloat(document.getElementById("ded80d").value) || 0)
              + (parseFloat(document.getElementById("ded24b").value) || 0)
              + (parseFloat(document.getElementById("dednps").value) || 0);
    const resultDiv = document.getElementById("taxResult");

    if (!income || income <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ वार्षिक आय 0 से अधिक होनी चाहिए।</p>';
        return;
    }

    const oldTax = calcOldRegime(income, age, ded);
    const newTax = calcNewRegime(income);

    const oldTotal = oldTax * 1.04;
    const newTotal = newTax * 1.04;

    const better = oldTotal < newTotal ? "पुरानी" : "नई";
    const saving = Math.abs(oldTotal - newTotal);

    resultDiv.innerHTML = `
        <h2>टैक्स तुलना (FY 2025-26)</h2>

        <div class="table-wrap">
            <table class="amort-table">
                <tr><th>विवरण</th><th>पुरानी व्यवस्था</th><th>नई व्यवस्था</th></tr>
                <tr><td>कुल आय</td><td>${formatINR(income)}</td><td>${formatINR(income)}</td></tr>
                <tr><td>कटौतियाँ</td><td>${formatINR(50000 + ded)}</td><td>${formatINR(75000)}</td></tr>
                <tr><td>कर योग्य आय</td><td>${formatINR(Math.max(0, income - 50000 - ded))}</td><td>${formatINR(Math.max(0, income - 75000))}</td></tr>
                <tr><td>इनकम टैक्स (रिबेट से पहले)</td><td>${formatINR(oldTax + (Math.max(0, income - 50000 - ded) <= 500000 ? 12500 : 0))}</td><td>${formatINR(newTax + (Math.max(0, income - 75000) <= 1200000 ? 60000 : 0))}</td></tr>
                <tr><td>धारा 87A रिबेट</td><td>- ${formatINR(Math.max(0, income - 50000 - ded) <= 500000 ? 12500 : 0)}</td><td>- ${formatINR(Math.max(0, income - 75000) <= 1200000 ? 60000 : 0)}</td></tr>
                <tr><td>रिबेट के बाद टैक्स</td><td>${formatINR(oldTax)}</td><td>${formatINR(newTax)}</td></tr>
                <tr><td>सेस (4%)</td><td>${formatINR(oldTax * 0.04)}</td><td>${formatINR(newTax * 0.04)}</td></tr>
                <tr><td><strong>कुल टैक्स</strong></td><td><strong>${formatINR(oldTotal)}</strong></td><td><strong>${formatINR(newTotal)}</strong></td></tr>
            </table>
        </div>

        <p class="note">✅ <strong>${better} व्यवस्था</strong> आपके लिए बेहतर है — आप ${formatINR(saving)} बचा सकते हैं!</p>

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}

/* ============================================
   7. LOAN ELIGIBILITY CALCULATOR (Hindi)
   ============================================ */
function calculateLoanEligibility() {
    const monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value) || 0;
    const existingEmi = parseFloat(document.getElementById("existingEmi").value) || 0;
    const loanType = document.getElementById("loanType").value;
    const annualRate = parseFloat(document.getElementById("loanRate").value) || 0;
    const years = parseFloat(document.getElementById("loanTenure").value) || 0;
    const age = parseFloat(document.getElementById("age").value) || 0;
    const resultDiv = document.getElementById("loanResult");

    if (!monthlyIncome || monthlyIncome <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ मासिक आय 0 से अधिक होनी चाहिए।</p>';
        return;
    }
    if (!annualRate || annualRate <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ ब्याज दर 0 से अधिक होनी चाहिए।</p>';
        return;
    }
    if (!years || years <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ अवधि 0 से अधिक होनी चाहिए।</p>';
        return;
    }
    if (age < 21 || age > 65) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ आयु 21 से 65 के बीच होनी चाहिए।</p>';
        return;
    }

    // FOIR based on loan type
    let foir = 0.50;
    if (loanType === "car") foir = 0.40;
    if (loanType === "personal") foir = 0.35;

    // Max EMI possible
    const maxEmi = (monthlyIncome * foir) - existingEmi;

    if (maxEmi <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ आपकी मौजूदा EMI बहुत ज्यादा है। कोई अतिरिक्त लोन संभव नहीं है।</p>';
        return;
    }

    // Max loan based on EMI capacity
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const maxLoan = maxEmi * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));

    // Age-based tenure check
    const maxTenureByAge = 65 - age;
    let tenureWarning = "";
    if (years > maxTenureByAge) {
        tenureWarning = `<p class="note" style="background:#fff3cd;">⚠️ ध्यान दें: बैंक आमतौर पर लोन अवधि को 65 वर्ष की आयु तक सीमित करते हैं। आपकी आयु (${age}) के आधार पर अधिकतम अवधि लगभग ${maxTenureByAge} वर्ष है।</p>`;
    }

    // Total interest
    const totalPayment = maxEmi * months;
    const totalInterest = totalPayment - maxLoan;

    resultDiv.innerHTML = `
        <h2>लोन पात्रता परिणाम</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>अधिकतम लोन</span>
                <strong>${formatINR(maxLoan)}</strong>
            </div>
            <div class="emi-result-card">
                <span>अधिकतम मासिक EMI</span>
                <strong>${formatINR(maxEmi)}</strong>
            </div>
            <div class="emi-result-card">
                <span>कुल ब्याज</span>
                <strong>${formatINR(totalInterest)}</strong>
            </div>
        </div>

        <p class="note">💡 इस लोन प्रकार के लिए आपका FOIR <strong>${(foir * 100)}%</strong> है। मौजूदा EMI ${formatINR(existingEmi)} घटा दी गई है।</p>
        ${tenureWarning}

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}

/* ============================================
   8. GRATUITY CALCULATOR (Hindi)
   ============================================ */
function calculateGratuity() {
    const lastSalary = parseFloat(document.getElementById("lastSalary").value) || 0;
    const serviceYears = parseFloat(document.getElementById("serviceYears").value) || 0;
    const resultDiv = document.getElementById("gratuityResult");

    if (!lastSalary || lastSalary <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ सैलरी 0 से अधिक होनी चाहिए।</p>';
        return;
    }
    if (!serviceYears || serviceYears <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ सेवा के वर्ष 0 से अधिक होने चाहिए।</p>';
        return;
    }
    if (serviceYears < 5) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ ग्रेच्युटी के लिए कम से कम 5 वर्ष की निरंतर सेवा आवश्यक है।</p>';
        return;
    }

    // Round off service years: >6 months = next year, <6 months = ignore
    const decimal = serviceYears - Math.floor(serviceYears);
    let roundedYears;
    if (decimal >= 0.5) {
        roundedYears = Math.ceil(serviceYears);
    } else {
        roundedYears = Math.floor(serviceYears);
    }

    // Gratuity formula
    const gratuity = (15 * lastSalary * roundedYears) / 26;

    // Tax exemption
    const taxExemptLimit = 2000000; // ₹20 lakh
    const taxableAmount = Math.max(0, gratuity - taxExemptLimit);

    resultDiv.innerHTML = `
        <h2>ग्रेच्युटी परिणाम</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>ग्रेच्युटी राशि</span>
                <strong>${formatINR(gratuity)}</strong>
            </div>
            <div class="emi-result-card">
                <span>सेवा वर्ष (राउंडेड)</span>
                <strong>${roundedYears} वर्ष</strong>
            </div>
            <div class="emi-result-card">
                <span>कर योग्य राशि</span>
                <strong>${formatINR(taxableAmount)}</strong>
            </div>
        </div>

        <p class="note">💡 ₹20 लाख तक ग्रेच्युटी कर मुक्त है। ₹20 लाख से अधिक राशि कर योग्य है।</p>
        <p class="note">📊 सूत्र: (15 × ₹${lastSalary.toLocaleString('en-IN')} × ${roundedYears}) / 26 = ${formatINR(gratuity)}</p>

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}

/* ============================================
   9. INSURANCE CALCULATOR (Hindi)
   ============================================ */
function calculateInsurance() {
    const age = parseFloat(document.getElementById("insAge").value) || 0;
    const income = parseFloat(document.getElementById("insIncome").value) || 0;
    const childAge = parseFloat(document.getElementById("insChildAge").value) || 0;
    const loans = parseFloat(document.getElementById("insLoans").value) || 0;
    const savings = parseFloat(document.getElementById("insSavings").value) || 0;
    const gender = document.getElementById("insGender").value;
    const smoker = document.getElementById("insSmoker").value;
    const resultDiv = document.getElementById("insuranceResult");

    if (!age || age < 18 || age > 65) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ आयु 18 से 65 के बीच होनी चाहिए।</p>';
        return;
    }
    if (!income || income <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ वार्षिक आय 0 से अधिक होनी चाहिए।</p>';
        return;
    }

    // Human Life Value calculation
    let cover = income * 15;

    // Add outstanding loans
    cover += loans;

    // Add child education corpus
    if (childAge > 0) {
        const educationCost = 1500000; // ₹15 lakh assumed
        cover += educationCost;
    }

    // Subtract current savings
    cover -= savings;

    // Minimum cover
    if (cover < income * 10) {
        cover = income * 10;
    }

    // Round to nearest lakh
    cover = Math.round(cover / 100000) * 100000;

    // Estimate premium (indicative rates)
    let ratePerLakh = 0;
    if (age <= 25) ratePerLakh = 80;
    else if (age <= 30) ratePerLakh = 100;
    else if (age <= 35) ratePerLakh = 130;
    else if (age <= 40) ratePerLakh = 180;
    else if (age <= 45) ratePerLakh = 260;
    else if (age <= 50) ratePerLakh = 400;
    else if (age <= 55) ratePerLakh = 650;
    else ratePerLakh = 1000;

    if (gender === "female") ratePerLakh = ratePerLakh * 0.85;
    if (smoker === "yes") ratePerLakh = ratePerLakh * 1.6;

    const annualPremium = (cover / 100000) * ratePerLakh;

    resultDiv.innerHTML = `
        <h2>बीमा अनुशंसा</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>अनुशंसित कवर</span>
                <strong>${formatINR(cover)}</strong>
            </div>
            <div class="emi-result-card">
                <span>अनुमानित वार्षिक प्रीमियम</span>
                <strong>${formatINR(annualPremium)}</strong>
            </div>
            <div class="emi-result-card">
                <span>मासिक लागत</span>
                <strong>${formatINR(annualPremium / 12)}</strong>
            </div>
        </div>

        <p class="note">💡 यह एक सांकेतिक अनुमान है। वास्तविक प्रीमियम आपके चिकित्सा इतिहास, बीमाकर्ता और पॉलिसी शर्तों पर निर्भर करता है।</p>
        <p class="note">📊 कवर = (आय × 15) + लोन + बच्चों की शिक्षा − बचत</p>

        <a href="index-hi.html" class="back-link">← होम पर वापस जाएं</a>
    `;
}
