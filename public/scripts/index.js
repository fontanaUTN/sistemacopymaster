"use strict"

async function getIpClient() {
	try {
    	const response = await axios.get('https://api.ipify.org?format=json');
    	location.href = `/ingreso_send_${response.data.ip}`;

	} catch (error) {
    	console.error(error);
    	location.href = `/ingreso_send_25`;
	}
}

getIpClient();