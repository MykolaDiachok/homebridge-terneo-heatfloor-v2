import PrepareState from './prepare-state';
import ProtocolCommand1 from '../models/protocol-command1';
import { BodyType4 } from '../models/i-protocol-command4';
import HeaterState from '../models/heater-state';
// eslint-disable-next-line import/no-cycle
import InterchangeBuilder from './interchange-builder';
import HttpClient from './http-client';

export default class InterchangeDevice {
	private serialNumber?: string;

	private httpClient: HttpClient;

	constructor(builder: InterchangeBuilder) {
		this.httpClient = builder.httpClient;
	}

	async InitAsync(): Promise<void> {
		const result = await this.getDeviceState();
		this.serialNumber = result?.serialNumber;
	}

	async getDeviceState(): Promise<HeaterState | undefined> {
		const preparedBody = { cmd: 1 };
		return this.httpClient.Post(preparedBody).then(async (result1) => {
			if (result1) {
				const preparedBody4 = { cmd: 4 };
				return this.httpClient.Post(preparedBody4).then(function (result4) {
					if (result4) {
						return PrepareState.getDefaultState(new ProtocolCommand1(result1), <BodyType4>result4);
					}
					return undefined;
				});
			}
			return undefined;
		});
	}

	async setOn(): Promise<boolean | undefined> {
		const preparedBody = {
			sn: this.serialNumber,
			par: [[125, 7, '0']]
		};

		return (await this.httpClient.Post(preparedBody)).success;
	}

	async setOff(): Promise<boolean | undefined> {
		const preparedBody = { sn: this.serialNumber, par: [[125, 7, '1']] };

		return (await this.httpClient.Post(preparedBody)).success;
	}

	async setTemperature(value: number): Promise<boolean | undefined> {
		const preparedBody = {
			sn: this.serialNumber,
			par: [
				[125, 7, '0'],
				[5, 1, value.toString(10)]
			]
		};

		return (await this.httpClient.Post(preparedBody)).success;
	}

	async setBrightness(value: number): Promise<boolean | undefined> {
		const preparedBody = {
			sn: this.serialNumber,
			par: [[23, 2, value.toString(10)]]
		};

		return (await this.httpClient.Post(preparedBody)).success;
	}

	async setChildrenLock(value: boolean): Promise<boolean | undefined> {
		const preparedBody = {
			sn: this.serialNumber,
			par: [[124, 7, value ? '1' : '0']]
		};

		return (await this.httpClient.Post(preparedBody)).success;
	}

	async setAndroidBlock(value: boolean): Promise<boolean | undefined> {
		const preparedBody = {
			sn: this.serialNumber,
			par: [[114, 7, value ? '1' : '0']]
		};

		return (await this.httpClient.Post(preparedBody)).success;
	}

	async setCloudBlock(value: boolean): Promise<boolean | undefined> {
		const preparedBody = {
			sn: this.serialNumber,
			par: [[115, 7, value ? '1' : '0']]
		};

		return (await this.httpClient.Post(preparedBody)).success;
	}
}
