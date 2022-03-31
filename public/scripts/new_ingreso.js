"use strict"

const checkbox = document.getElementById('checkbox');
const inputIp = document.getElementById('ip');

checkbox.addEventListener('click', async function() {
	if(checkbox.checked){
		try {
		    const response = await axios.get('https://api.ipify.org?format=json');
		    inputIp.value = response.data.ip;

		} catch (error) {
			console.error(error);
			inputIp.value = '0';
		}
	}
	else {
		inputIp.value = '0';
	}
})
