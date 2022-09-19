interface IProtocolCommand4 {
	sn: string;
	time: string;
	[key: string]: string;
}
export type BodyType4 = { sn: string; time: string; [key: string]: string };
export default class ProtocolCommand4 implements IProtocolCommand4 {
	[key: string]: string;

	sn = '';

	time = '';

	constructor(tbody: object) {
		const body = <BodyType4>tbody;
		this.sn = body.sn;
		this.time = body.time;
	}
}
