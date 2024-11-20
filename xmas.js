const API_URL = 'http://localhost:3000/kids';

class KidsManager {
    static async createKid(kidData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(kidData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating kid:', error);
        }
    }

    static async getAllKids() {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error('Error fetching kids:', error);
            return [];
        }
    }

    static async updateKid(kidId, updatedData) {
        try {
            const response = await fetch(`${API_URL}/${kidId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating kid:', error);
        }
    }

    static async deleteKid(kidId) {
        try {
            const response = await fetch(`${API_URL}/${kidId}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting kid:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nameContainer = document.getElementById('naam');
    const saveButton = document.getElementById('save');
    const resultaat = document.getElementById('resultaat');
    const addToyButton = document.getElementById('addToy'); // De knop voor speelgoed

    let currentKidRow = null; // Houd de huidige kindrij bij

    // Voeg een kind toe
    document.getElementById('addChild').addEventListener('click', () => {
       
        const newKidRow = document.createElement('div');
        newKidRow.classList.add('kidRow');
        newKidRow.style.marginBottom = '10px';

        const newKidInput = document.createElement('input');
        newKidInput.type = 'text';
        newKidInput.placeholder = 'Naam van kind';
        newKidInput.classList.add('childName', 'childBox');

        newKidRow.appendChild(newKidInput);
        nameContainer.appendChild(newKidRow);

        addToyButton.style.display = 'block';

        document.getElementById('addChild').disabled = true;

        currentKidRow = newKidRow;
    });

    // Voeg speelgoed toe aan het laatste kind
    addToyButton.addEventListener('click', () => {
        if (!currentKidRow) return; // Zorg ervoor dat er een kindrij is
    
        // Tel het aantal speelgoeditems dat al is toegevoegd
        const existingToys = currentKidRow.querySelectorAll('.toyDiv').length;
    
        // Limiteer het aantal speelgoeditems tot 4
        if (existingToys >= 4) {
            alert('Niemand is zo flink geweest dat die meer als 4 speelgoedjes verdiend!');
            return; // Stop het toevoegen van meer speelgoed als het maximum is bereikt
        }
    
        // Voeg speelgoed toe aan het huidige kind
        const toyDiv = document.createElement('div');
        toyDiv.classList.add('toyDiv');
        
        const toyInput = document.createElement('input');
        toyInput.type = 'text';
        toyInput.placeholder = 'Naam van speelgoed';
        toyInput.classList.add('toyBox');
        
        const toyCounter = document.createElement('span');
        toyCounter.textContent = '0';
    
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
            toyCounter.textContent = parseInt(toyCounter.textContent) + 1;
        });
    
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => {
            const currentCount = parseInt(toyCounter.textContent);
            if (currentCount > 0) toyCounter.textContent = currentCount - 1;
        });
    
        toyDiv.append(toyInput, toyCounter, plusButton, minusButton);
        currentKidRow.appendChild(toyDiv);
    });

    saveButton.addEventListener('click', async () => {
        for (const kidRow of nameContainer.querySelectorAll('.kidRow')) {
            const nameInput = kidRow.querySelector('.childName');
            const kidName = nameInput.value.trim();
    
            const toys = Array.from(kidRow.querySelectorAll('.toyDiv'))
                .map(container => {
                    const toyName = container.querySelector('input').value.trim();
                    const quantity = parseInt(container.querySelector('span').textContent);
                    return toyName ? { name: toyName, quantity } : null;
                })
                .filter(toy => toy !== null);
    
            if (kidName && toys.length) {
                try {
                    const kidData = { name: kidName, toys };
                    const createdKid = await KidsManager.createKid(kidData);
    
                    const resultText = `${kidName} gets ${toys.map(toy => `${toy.quantity} ${toy.name}(s)`).join(', ')}. HO HO HO!`;
                    const resultElement = document.createElement('p');
                    resultElement.textContent = resultText;

                    resultaat.appendChild(resultElement);
                } catch (error) {
                    console.error('Error saving kid data:', error);
                }
            }
            nameInput.value = '';
            kidRow.querySelectorAll('.toyDiv').forEach(toyDiv => toyDiv.remove());
        }
    });
    
});