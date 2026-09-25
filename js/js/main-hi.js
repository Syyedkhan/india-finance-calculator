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
