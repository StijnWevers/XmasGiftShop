document.addEventListener('DOMContentLoaded', () => {
    const nameInputs = document.querySelectorAll('#naam input'); 
    const saveButton = document.getElementById('save'); 
    const resultaat = document.getElementById('resultaat'); 
    const tvCount = document.getElementById('tvCount');
    const shirtCount = document.getElementById('shirtCount');
    const sockCount = document.getElementById('sockCount'); 
    let currentKidIndex = 0; 

    const presents = [
        { name: 'tv', quantity: 0 },
        { name: 'shirt', quantity: 0 },
        { name: 'sock', quantity: 0 }
    ];

    function updateCounters() {
        tvCount.textContent = presents[0].quantity;
        shirtCount.textContent = presents[1].quantity;
        sockCount.textContent = presents[2].quantity;
    }

    document.querySelectorAll('.add-button').forEach((button, index) => {
        button.addEventListener('click', () => {
            presents[index].quantity++;
            updateCounters();
        });
    });

    saveButton.addEventListener('click', () => {
        if (currentKidIndex < nameInputs.length) {
            const kidName = nameInputs[currentKidIndex].value || `Kid ${currentKidIndex + 1}`;
            const kidData = {
                tv: presents[0].quantity,
                shirt: presents[1].quantity,
                sock: presents[2].quantity
            };

            localStorage.setItem(kidName, JSON.stringify(kidData));

            const resultText = `${kidName} gets ${presents[0].quantity} TV(s), ${presents[1].quantity} shirt(s), and ${presents[2].quantity} sock(s).`;

            const resultElement = document.createElement('p');
            resultElement.textContent = resultText;
            resultaat.appendChild(resultElement);

            presents.forEach(present => (present.quantity = 0));
            updateCounters();
            currentKidIndex++;
        }
    });
});
