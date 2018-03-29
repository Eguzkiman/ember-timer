import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
	timerSize: 1800,
	isTicking: false,

	init () {
		this._super(...arguments);
		let timerSize = this.get('timerSize');
		this.set('time', timerSize);
		this.set('currentSize', timerSize);
	},

	tick () {
		if (!this.get('isTicking')) return;

		let now = Date.now();
		let startedAt = this.get('startedAt');
		let currentSize = this.get('currentSize');

		let timePassed = startedAt + currentSize - now;

		if (timePassed <= 0) {
			timePassed = 0;
			this.set('isTicking', false);
			this.onFinish();
		}

		this.set('time', timePassed);


		later(() => this.tick());
	},

	onFinish () {
		// Override me
	},

	actions: {
		start () {
			let startedAt = Date.now();
			this.set('startedAt', startedAt);
			this.set('isTicking', true);
			this.tick();
		},

		stop () {
			this.set('isTicking', false);
			this.set('currentSize', this.get('time'));
		},

		reset () {
			this.set('isTicking', false);
			let timerSize = this.get('timerSize');
			this.set('time', timerSize);
			this.set('currentSize', timerSize);;
		}
	}
});