export default class HeaterState {
	// 7 (bool)	powerOff	power off
	powerOff?: boolean;

	// 7 (bool)	childrenLock	children protect
	childrenLock?: boolean;

	// 7 (bool)	windowOpenControl	open window control
	windowOpenControl?: boolean;

	// 7 (bool)	preControl	preheat
	preControl?: boolean;

	// 7 (bool)	useNightBright	activate using night bright
	useNightBright?: boolean;

	// 7 (bool)	coolingControlWay	heat/cool mode
	coolingControlWay?: boolean;

	// 7 (bool)	NCContactControl	inverted relay
	NCContactControl?: boolean;

	// 7 (bool)	useContactorControl	load through contactor
	useContactorControl?: boolean;

	// 7 (bool)	cloudBlock	cloud control block
	cloudBlock?: boolean;

	// 7 (bool)	androidBlock	local newort control block
	androidBlock?: boolean;

	// 7 (bool)	voltageStableDelay	delay on starts after voltage is ok
	voltageStableDelay?: boolean;

	// 7 (bool)	proMode	professional voltage cutoff delay model
	proMode?: boolean;

	// 55	2 (uint8)	relayOnTimeLimit	in hours, max allowed time load on until error
	relayOnTimeLimit?: number;

	// 54	2 (uint8)	wifiPower	lovel 1..3, Wi-Fi power
	wifiPower?: number;

	// 53	4 (uint16)	nightBrightEnd	in minutes from 00:00, night low bright end time
	nightBrightEnd?: number;

	// 52	4 (uint16)	nightBrightStart	in minutes from 00:00, night low bright start time
	nightBrightStart?: number;

	// 	51	2 (uint8)	sensorСontrolNumber	remote temperature sensor number
	sensorСontrolNumber?: number;

	// 50	2 (uint8)	showType	parameter to show type: current=0, active power=1, reactive power=2, apparent power=3, cosFi=4
	showType?: number;

	// 49	2 (uint8)	powerType	controlled power type: active(W)=0, reactive(VAR)=1, apparent(VA)=2
	powerType?: number;

	// 48	2 (uint8)	repTimes	number of relay off before device block
	repTimes?: number;

	// 47	1 (int8)	correctionsI	in percent, current correction
	correctionsI?: number;

	// 46	1 (int8)	correctionsU	in V, voltage correction
	correctionsU?: number;

	// 45	4 (uint16)	lowVoltageTime	in 1/10 seconds, voltage failure duration
	lowVoltageTime?: number;

	// 44	2 (uint8)	lowerITime	in 1/10 seconds, delay off after lower current limit falling
	lowerITime?: number;

	// 43	2 (uint8)	middleITime	in 1/10 seconds, delay off after middle current limit exceeding
	middleITime?: number;

	// 42	2 (uint8)	tOffDelay	in seconds, delay off delay after current or power limit exceeding
	tOffDelay?: number;

	// 41	4 (uint16)	tOnDelay	in seconds, relay on delay
	tOnDelay?: number;

	// 40	4 (uint16)	lowerI	in 1/10 A, lower current limit
	lowerI?: number;

	// 39	4 (uint16)	middleI	in 1/10 A, middle current limit
	middleI?: number;

	// 38	4 (uint16)	upperI	in 1/10 A, upper current limit
	upperI?: number;

	// 37	2 (uint8)	upperP	in 100 W, power limit
	upperP?: number;

	// 36	2 (uint8)	lowerU	in volts, lower voltage limit
	lowerU?: number;

	// 35	4 (uint16)	upperU	in volts, upper voltage limit
	upperU?: number;

	// 34	1 (int8)	lowerAirLimit	in °C, min setting value of the air temperature
	lowerAirLimit?: number;

	// 33	1 (int8)	upperAirLimit	in °C, max setting value of the air temperature
	upperAirLimit?: number;

	// 31	2 (uint8)	setTemperature	in °C, setting temperature of current mode (awayFloorTemperature | manualFloorTemperature | tempTemperature)
	setTemperature?: number;

	// 29	2 (uint8)	tempTemperature	in °C, temporary mode temperature
	tempTemperature?: number;

	// 28	2 (uint8)	maxSchedulePeriod	max number of perioods per day
	maxSchedulePeriod?: number;

	// 27	1 (int8)	lowerLimit	in °C, min setting value of the floor temperature
	lowerLimit?: number;

	// 26	1 (int8)	upperLimit	in °C, max setting value of the floor temperature
	upperLimit?: number;

	// 25	2 (uint8)	propKoef	in minutes when load on within 30-minutes cycle of the proportional mode
	propKoef?: number;

	// 23	2 (uint8)	brightness	in a.e. (from 0 to 9) brightness
	brightness?: number;

	// 21	1 (int8)	floorCorrection	in 1/10 °C, floor temperature sensor correction
	floorCorrection?: number;

	// 20	1 (int8)	airCorrection	in 1/10 °C, air temperature sensor correction
	airCorrection?: number;

	// 19	2 (uint8)	histeresis	in 1/10 °C, hysteresis
	histeresis?: number;

	// 18	2 (uint8)	sensorType	type of connected temperature sensor: 4,7kOhm=0, 6,8kOhm=1, 10kOhm=2, 12kOhm=3, 15kOhm=4, 33kOhm=5, 47kOhm=6
	sensorType?: number;

	// 17	4 (uint16)	power	in a.e., P=(power<=150)?(power*10):(1500+power*20), connected power
	power?: number;

	// 15	2 (uint8)	maxTempAdvancedMode	in °C, maximum floor temperature in extended mode
	maxTempAdvancedMode?: number;

	// 14	2 (uint8)	minTempAdvancedMode	in °C, minimum floor temperature in extended mode
	minTempAdvancedMode?: number;

	// 7	1 (int8)	awayFloorTemperature	in °C, departure mode setting by floor
	awayFloorTemperature?: number;

	// 6	1 (int8)	awayAirTemperature	in °C,  departure air mode setting
	awayAirTemperature?: number;

	// 5	1 (int8)	manualFloorTemperature	in °C, manual mode setpoint by floor
	manualFloorTemperature?: number;

	// 4	1 (int8)	manualAir	in °C, manual air mode setpoint by floor
	manualAir?: number;

	// 3	2 (uint8)	controlType	control tupe: by floor=0, by air=1, extended=2
	controlType?: number;

	// 2	2 (uint8)	mode	mode: schedule=0, manual=1
	mode?: number;

	// 1	6 (uint32)	endAwayTime	in seconds from 01.01.2000, away end time
	endAwayTime?: number;

	// 0	6 (uint32)	startAwayTime	in seconds from 01.01.2000, away start time
	startAwayTime?: number;
}
