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

    document.getElementById('addChild').addEventListener('click', () => {
        const newKidRow = document.createElement('div');
        newKidRow.classList.add('kidRow');
        
        const newKidInput = document.createElement('input');
        newKidInput.type = 'text';
        newKidInput.placeholder = 'Naam van kind';
        newKidInput.classList.add('childName', 'childBox');

        newKidRow.appendChild(newKidInput);
        nameContainer.appendChild(newKidRow);
    });

    document.getElementById('addToy').addEventListener('click', () => {
        const lastKidRow = nameContainer.lastElementChild;
        if (!lastKidRow) return;

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
        lastKidRow.appendChild(toyDiv);
    });

    saveButton.addEventListener('click', async () => {
        resultaat.innerHTML = '';

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