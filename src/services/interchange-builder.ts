// eslint-disable-next-line import/no-cycle
import InterchangeDevice from './interchange-device';
import HttpClient from './http-client';

export default class InterchangeBuilder {
	private http_client!: HttpClient;

	setHttpClient(http_client: HttpClient): InterchangeBuilder {
		this.http_client = http_client;
		return this;
	}

	async build() {
		const newClass = new InterchangeDevice(this);
		await newClass.InitAsync();
		return newClass;
	}

	get httpClient() {
		return this.http_client;
	}
}
