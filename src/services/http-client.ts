import superagent from 'superagent';

export default class HttpClient {
	private fullUrl: string;

	constructor(private url: string) {
		// noinspection HttpUrlsUsage
		this.fullUrl = `http://${url}/api.cgi`;
	}

	async Post(preparedBody: string | object): Promise<any> {
		return superagent
			.post(this.fullUrl)
			.send(preparedBody)
			.timeout(5000)
			.then((x) => Promise.resolve(x.body))
			.catch((x) => {
				throw new Error(x);
			});
	}
}
