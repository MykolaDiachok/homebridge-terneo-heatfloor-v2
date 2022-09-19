import HttpClient from './services/http-client';
import ProtocolCommand1 from './models/protocol-command1';
import PrepareState from './services/prepare-state';
import { BodyType4 } from './models/i-protocol-command4';

async function getState() {
	const preparedBody = { cmd: 1 };
	console.log('prepare body->', preparedBody);

	const returnValue = 'Unknown';

	const client = new HttpClient('192.168.1.68');
	const res1 = await client.Post(preparedBody);

	const preparedBody4 = { cmd: 4 };
	console.log('prepare body->', preparedBody4);
	const res4 = await client.Post(preparedBody4);

	const state = PrepareState.getDefaultState(new ProtocolCommand1(res1), <BodyType4>res4);
	return state;
}

getState().then((x) => console.log('result:', x));
