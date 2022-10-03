import InterchangeBuilder from './services/interchange-builder';
import HeaterState from './models/heater-state';
import HttpClient from './services/http-client';

async function getInterchange() {
	return new InterchangeBuilder().setHttpClient(new HttpClient('192.168.1.66')).build();
}
async function setOn() {
	const ex = await getInterchange();
	await ex.setOn();
	const result = await ex.getDeviceState();
	return <HeaterState>result;
}
async function setOff() {
	const ex = await getInterchange();
	await ex.setOff();
	const result = await ex.getDeviceState();
	return <HeaterState>result;
}

setOff().then((x) => {
	console.log('result:', x);
	// setOff().then((y) => console.log('result:', y));
});
//
