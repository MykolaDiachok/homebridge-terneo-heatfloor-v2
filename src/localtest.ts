import superagent from 'superagent';
import Protocol from './models/protocol';

// const prepareBody = {
//     sn: '',
//     par: [[125, 7, Number(!value).toString()]]
// };

async function getState() {
	const preparedBody = { cmd: 1 };
	console.log('prepare body->', preparedBody);
	let returnValue = 'Unknown';
	await superagent
		.post('http://192.168.1.68/api.cgi')
		.send(preparedBody)
		.timeout(5000)
		.then((res) => {
			console.log(res.text);
			const resp = new Protocol(res.body);

			const params = resp.par.filter((x) => x.parNumber === 125);
			if (res.status !== 200 || params.length === 0) {
				returnValue = 'Unknown';
			}

			if (resp.state.powerOff) {
				returnValue = 'Off';
			} else {
				returnValue = 'On';
			}
		})
		.catch((error) => {
			console.error('Error:', error.message);
		});
	return returnValue;
}

getState().then((x) => {
	console.log('State:', x);
});
