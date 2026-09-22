/* ============================================
   India Finance Calculator - Main JavaScript
   ============================================ */

// Indian number format helper
function formatINR(num) {
    return '₹ ' + Math.round(num).toLocaleString('en-IN');
}


/* ============================================
   1. EMI CALCULATOR
   ============================================ */
function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const annualRate = parseFloat(document.getElementById("interestRate").value);
    const years = parseFloat(document.getElementById("loanTenure").value);
    const resultDiv = document.getElementById("emiResult");

    if (!loanAmount || loanAmount <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Loan amount 0 se bada hona chahiye.</p>';
        return;
    }
    if (!annualRate || annualRate <= 0 || annualRate > 50) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Interest rate 0 se 50% ke beech hona chahiye.</p>';
        return;
    }
    if (!years || years <= 0 || years > 40) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Tenure 1 se 40 saal ke beech hona chahiye.</p>';
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)
                / (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    // Amortization schedule
    let balance = loanAmount;
    let scheduleHTML = '<h3>Year-wise Breakdown</h3>';
    scheduleHTML += '<div class="table-wrap"><table class="amort-table">';
    scheduleHTML += '<tr><th>Year</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>';

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
            <td>Year ${y}</td>
            <td>${formatINR(yearPrincipal)}</td>
            <td>${formatINR(yearInterest)}</td>
            <td>${formatINR(Math.max(0, balance))}</td>
        </tr>`;
    }
    scheduleHTML += '</table></div>';

    resultDiv.innerHTML = `
        <h2>EMI Result</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>Monthly EMI</span>
                <strong>${formatINR(emi)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Total Interest</span>
                <strong>${formatINR(totalInterest)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Total Payment</span>
                <strong>${formatINR(totalPayment)}</strong>
            </div>
        </div>

        ${scheduleHTML}

        <p class="note">💡 Tip: Zyada down payment ya kam tenure se total interest kam ho sakta hai.</p>

        <a href="index.html" class="back-link">← Back to Home</a>
    `;
}


/* ============================================
   2. GST CALCULATOR
   ============================================ */
function calculateGST() {
    const amount = parseFloat(document.getElementById("gstAmount").value);
    const rate = parseFloat(document.getElementById("gstRate").value);
    const type = document.getElementById("gstType").value;
    const resultDiv = document.getElementById("gstResult");

    if (!amount || amount <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Amount 0 se bada hona chahiye.</p>';
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
        <h2>GST Result</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>Net Price</span>
                <strong>${formatINR(netPrice)}</strong>
            </div>
            <div class="emi-result-card">
                <span>GST Amount (${rate}%)</span>
                <strong>${formatINR(gstAmount)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Gross Price</span>
                <strong>${formatINR(grossPrice)}</strong>
            </div>
        </div>

        <p class="note">💡 Tip: GST rates India mein 5%, 12%, 18%, aur 28% hoti hain.</p>

        <a href="index.html" class="back-link">← Back to Home</a>
    `;
}


/* ============================================
   3. SIP CALCULATOR
   ============================================ */
function calculateSIP() {
    const monthly = parseFloat(document.getElementById("sipAmount").value);
    const annualRate = parseFloat(document.getElementById("sipRate").value);
    const years = parseFloat(document.getElementById("sipYears").value);
    const resultDiv = document.getElementById("sipResult");

    if (!monthly || monthly <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Monthly investment 0 se bada hona chahiye.</p>';
        return;
    }
    if (!annualRate || annualRate <= 0 || annualRate > 50) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Return rate 0 se 50% ke beech hona chahiye.</p>';
        return;
    }
    if (!years || years <= 0 || years > 50) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Period 1 se 50 saal ke beech hona chahiye.</p>';
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const futureValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthly * months;
    const returns = futureValue - invested;

    resultDiv.innerHTML = `
        <h2>SIP Result</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>Invested Amount</span>
                <strong>${formatINR(invested)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Estimated Returns</span>
                <strong>${formatINR(returns)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Maturity Value</span>
                <strong>${formatINR(futureValue)}</strong>
            </div>
        </div>

        <p class="note">💡 Tip: SIP mein jitna lamba invest karenge, utna zyada compounding ka fayda milega.</p>

        <a href="index.html" class="back-link">← Back to Home</a>
    `;
}


/* ============================================
   4. FD CALCULATOR
   ============================================ */
function calculateFD() {
    const principal = parseFloat(document.getElementById("fdAmount").value);
    const annualRate = parseFloat(document.getElementById("fdRate").value);
    const years = parseFloat(document.getElementById("fdYears").value);
    const n = parseFloat(document.getElementById("fdCompound").value);
    const resultDiv = document.getElementById("fdResult");

    if (!principal || principal <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Deposit amount 0 se bada hona chahiye.</p>';
        return;
    }
    if (!annualRate || annualRate <= 0 || annualRate > 20) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Interest rate 0 se 20% ke beech hona chahiye.</p>';
        return;
    }
    if (!years || years <= 0 || years > 20) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Time period 0.5 se 20 saal ke beech hona chahiye.</p>';
        return;
    }

    const rate = annualRate / 100;
    const maturity = principal * Math.pow(1 + rate / n, n * years);
    const interest = maturity - principal;

    resultDiv.innerHTML = `
        <h2>FD Result</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>Principal</span>
                <strong>${formatINR(principal)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Interest Earned</span>
                <strong>${formatINR(interest)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Maturity Amount</span>
                <strong>${formatINR(maturity)}</strong>
            </div>
        </div>

        <p class="note">💡 Tip: FD par interest taxable hota hai. TDS 40,000+ interest par lagta hai.</p>

        <a href="index.html" class="back-link">← Back to Home</a>
    `;
}


/* ============================================
   5. SALARY CALCULATOR
   ============================================ */
function calculateSalary() {
    const ctc = parseFloat(document.getElementById("ctc").value);
    const pfOption = document.getElementById("pfOption").value;
    const ptOption = document.getElementById("ptOption").value;
    const resultDiv = document.getElementById("salaryResult");

    if (!ctc || ctc <= 0) {
        resultDiv.innerHTML = '<p class="error-msg">⚠️ CTC 0 se bada hona chahiye.</p>';
        return;
    }

    // Basic = 40% of CTC (approx standard)
    const basic = ctc * 0.40;
    const hra = basic * 0.40;
    const specialAllowance = ctc - basic - hra;

    // PF = 12% of basic
    const pf = pfOption === "yes" ? basic * 0.12 : 0;

    // Professional Tax = ₹200/month = ₹2400/year
    const pt = ptOption === "yes" ? 2400 : 0;

    // Standard deduction
    const standardDeduction = 50000;

    // Taxable income (new regime, approx)
    const taxableIncome = ctc - standardDeduction;

    // New regime tax FY 2025-26
    let tax = 0;
    if (taxableIncome > 300000) {
        tax += Math.min(taxableIncome, 700000) > 300000 ? (Math.min(taxableIncome, 700000) - 300000) * 0.05 : 0;
    }
    if (taxableIncome > 700000) {
        tax += (Math.min(taxableIncome, 1000000) - 700000) * 0.10;
    }
    if (taxableIncome > 1000000) {
        tax += (Math.min(taxableIncome, 1200000) - 1000000) * 0.15;
    }
    if (taxableIncome > 1200000) {
        tax += (Math.min(taxableIncome, 1500000) - 1200000) * 0.20;
    }
    if (taxableIncome > 1500000) {
        tax += (taxableIncome - 1500000) * 0.30;
    }

    // Rebate 87A: income up to 7L no tax
    if (taxableIncome <= 700000) tax = 0;

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const annualDeductions = pf + pt + totalTax;
    const annualInHand = ctc - annualDeductions;
    const monthlyInHand = annualInHand / 12;

    resultDiv.innerHTML = `
        <h2>Salary Breakdown</h2>

        <div class="emi-result-grid">
            <div class="emi-result-card">
                <span>Monthly In-Hand</span>
                <strong>${formatINR(monthlyInHand)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Annual In-Hand</span>
                <strong>${formatINR(annualInHand)}</strong>
            </div>
            <div class="emi-result-card">
                <span>Total Deductions</span>
                <strong>${formatINR(annualDeductions)}</strong>
            </div>
        </div>

        <h3>Deduction Breakdown (Annual)</h3>
        <div class="table-wrap">
            <table class="amort-table">
                <tr><th>Component</th><th>Amount</th></tr>
                <tr><td>Basic Salary (40%)</td><td>${formatINR(basic)}</td></tr>
                <tr><td>HRA (40% of Basic)</td><td>${formatINR(hra)}</td></tr>
                <tr><td>Special Allowance</td><td>${formatINR(specialAllowance)}</td></tr>
                <tr><td>PF Deduction</td><td>${formatINR(pf)}</td></tr>
                <tr><td>Professional Tax</td><td>${formatINR(pt)}</td></tr>
                <tr><td>Income Tax + Cess</td><td>${formatINR(totalTax)}</td></tr>
                <tr><td><strong>Net Annual In-Hand</strong></td><td><strong>${formatINR(annualInHand)}</strong></td></tr>
            </table>
        </div>

        <p class="note">💡 Tip: Yeh approximate calculation hai. Actual salary structure company ke hisaab se alag ho sakta hai.</p>

        <a href="index.html" class="back-link">← Back to Home</a>
    `;
}


/* ============================================
   6. INCOME TAX CALCULATOR
   ============================================ */
function calcOldRegime(income, age, ded) {
    const taxable = Math.max(0, income - 50000 - ded);
    let tax = 0;
    let slabs = [];

    if (age === "below60") {
        slabs = [[250000, 0], [500000, 0.05], [1000000, 0.20], [Infinity, 0.30]];
    } else if (age === "60to80") {
        slabs = [[300000, 0], [500000, 0.05], [1000000, 0.20], [Infinity, 0.30]];
    } else {
        slabs = [[500000, 0], [1000000, 0.20], [Infinity, 0.30]];
    }

    let prev = 0;
    for (let [limit, rate] of slabs) {
        if (taxable > prev) {
            const amt = Math.min(taxable, limit) - prev;
            tax += amt * rate;
            prev = limit;
        }
    }
    return tax;
}

function calcNewRegime(income) {
    const taxable = Math.max(0, income - 75000);
    const slabs = [[300000, 0], [700000, 0.05], [1000000, 0.10], [1200000, 0.15], [1500000, 0.20], [Infinity, 0.30]];
    let tax = 0, prev = 0;
    for (let [limit, rate] of slabs) {
        if (taxable > prev) {
            const amt = Math.min(taxable, limit) - prev;
            tax += amt * rate;
            prev = limit;
        }
    }
    if (taxable <= 700000) tax = 0;
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
        resultDiv.innerHTML = '<p class="error-msg">⚠️ Annual income 0 se bada hona chahiye.</p>';
        return;
    }

    const oldTax = calcOldRegime(income, age, ded);
    const newTax = calcNewRegime(income);

    const oldTotal = oldTax * 1.04;
    const newTotal = newTax * 1.04;

    const better = oldTotal < newTotal ? "Old" : "New";
    const saving = Math.abs(oldTotal - newTotal);

    resultDiv.innerHTML = `
        <h2>Tax Comparison</h2>

        <div class="table-wrap">
            <table class="amort-table">
                <tr><th>Particulars</th><th>Old Regime</th><th>New Regime</th></tr>
                <tr><td>Gross Income</td><td>${formatINR(income)}</td><td>${formatINR(income)}</td></tr>
                <tr><td>Deductions</td><td>${formatINR(50000 + ded)}</td><td>${formatINR(75000)}</td></tr>
                <tr><td>Taxable Income</td><td>${formatINR(Math.max(0, income - 50000 - ded))}</td><td>${formatINR(Math.max(0, income - 75000))}</td></tr>
                <tr><td>Income Tax</td><td>${formatINR(oldTax)}</td><td>${formatINR(newTax)}</td></tr>
                <tr><td>Cess (4%)</td><td>${formatINR(oldTax * 0.04)}</td><td>${formatINR(newTax * 0.04)}</td></tr>
                <tr><td><strong>Total Tax</strong></td><td><strong>${formatINR(oldTotal)}</strong></td><td><strong>${formatINR(newTotal)}</strong></td></tr>
            </table>
        </div>

        <p class="note">✅ <strong>${better} Regime</strong> better hai — Aap ${formatINR(saving)} bacha sakte hain!</p>

        <a href="index.html" class="back-link">← Back to Home</a>
    `;
}